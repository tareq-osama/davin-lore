"use server"

import { removeAuthToken } from "@lib/data/cookies"
import { sdk } from "@lib/config"

/**
 * Cleans up invalid customer authentication data
 * This is useful when a customer ID stored in cookies no longer exists in the backend
 */
export async function cleanupInvalidCustomerAuth() {
  try {
    const cookies = await import("next/headers").then(m => m.cookies())
    const token = cookies.get("_medusa_jwt")?.value

    if (!token) {
      return { cleaned: false, reason: "No token found" }
    }

    // Test if the customer token is valid
    try {
      await sdk.client.fetch("/store/customers/me", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
        cache: "no-store",
      })
      return { cleaned: false, reason: "Token is valid" }
    } catch (error: any) {
      if (error.message?.includes('Customer with id') && error.message?.includes('was not found')) {
        console.log("🧹 Cleaning up invalid customer authentication...")
        
        // Clear the invalid token
        await removeAuthToken()
        
        // Also clear any cart ID that might be associated with the invalid customer
        const cartId = cookies.get("_medusa_cart_id")?.value
        if (cartId) {
          cookies.set("_medusa_cart_id", "", { maxAge: -1 })
          console.log("🧹 Cleared invalid cart ID")
        }
        
        return { cleaned: true, reason: "Invalid customer token cleared" }
      }
      
      return { cleaned: false, reason: "Other error occurred" }
    }
  } catch (error: any) {
    console.error("Error during customer auth cleanup:", error)
    return { cleaned: false, reason: "Cleanup failed" }
  }
}

/**
 * Checks if the current customer authentication is valid
 */
export async function isCustomerAuthValid(): Promise<boolean> {
  try {
    const cookies = await import("next/headers").then(m => m.cookies())
    const token = cookies.get("_medusa_jwt")?.value

    if (!token) {
      return false
    }

    await sdk.client.fetch("/store/customers/me", {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    
    return true
  } catch (error: any) {
    if (error.message?.includes('Customer with id') && error.message?.includes('was not found')) {
      // Automatically clean up invalid auth
      await cleanupInvalidCustomerAuth()
    }
    return false
  }
}
