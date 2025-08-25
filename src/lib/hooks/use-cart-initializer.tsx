"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { getOrSetCart, retrieveCart } from "@lib/data/cart"
import { cleanupInvalidCustomerAuth } from "@lib/util/customer-auth-cleanup"

interface UseCartInitializerReturn {
  cart: HttpTypes.StoreCart | null
  isLoading: boolean
  error: string | null
  refreshCart: () => Promise<void>
  clearError: () => void
}

export const useCartInitializer = (countryCode: string): UseCartInitializerReturn => {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshCart = async () => {
    try {
      setError(null)
      setIsLoading(true)
      
      console.log("🔄 Initializing cart for country code:", countryCode)
      
      // Clean up any invalid customer authentication first
      const cleanupResult = await cleanupInvalidCustomerAuth()
      if (cleanupResult.cleaned) {
        console.log("🧹 Cleaned up invalid customer auth:", cleanupResult.reason)
      }
      
      // First try to retrieve existing cart
      let existingCart = await retrieveCart()
      
      if (!existingCart) {
        // If no existing cart, create a new one
        console.log("📦 No existing cart found, creating new cart...")
        existingCart = await getOrSetCart(countryCode)
      }
      
      if (existingCart) {
        setCart(existingCart)
        console.log("✅ Cart initialized successfully:", existingCart.id)
        
        // Make cart available globally for debugging
        if (typeof window !== 'undefined') {
          (window as any).__CART_DEBUG__ = {
            cart: existingCart,
            countryCode,
            timestamp: new Date().toISOString()
          }
        }
      } else {
        const errorMsg = "Failed to create or retrieve cart"
        setError(errorMsg)
        console.error("❌ Cart initialization failed")
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to initialize cart"
      setError(errorMessage)
      console.error("❌ Error initializing cart:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  // Initialize cart on mount and when country code changes
  useEffect(() => {
    if (countryCode) {
      refreshCart()
    }
  }, [countryCode])

  return {
    cart,
    isLoading,
    error,
    refreshCart,
    clearError,
  }
}
