"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { addToCart, getOrSetCart, retrieveCart } from "@lib/data/cart"

interface CartContextHook {
  cart: HttpTypes.StoreCart | null
  isLoading: boolean
  error: string | null
  addItem: (variantId: string, quantity: number, countryCode: string) => Promise<{ success: boolean; error: string | null }>
  refreshCart: () => Promise<void>
  clearError: () => void
}

export const useCartContext = (countryCode: string): CartContextHook => {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshCart = async () => {
    try {
      setError(null)
      setIsLoading(true)
      
      console.log("Refreshing cart for country code:", countryCode)
      
      // First try to retrieve existing cart
      let existingCart = await retrieveCart()
      
      if (!existingCart) {
        // If no existing cart, create a new one
        console.log("No existing cart found, creating new cart...")
        existingCart = await getOrSetCart(countryCode)
      }
      
      if (existingCart) {
        setCart(existingCart)
        console.log("Cart loaded successfully:", existingCart.id)
        
        // Make cart available globally for components that can't use context
        if (typeof window !== 'undefined') {
          (window as any).__CART_CONTEXT__ = {
            cart: existingCart,
            addItem: addItem,
            refreshCart: refreshCart
          }
        }
      } else {
        setError("Failed to create or retrieve cart")
        console.error("Cart creation/retrieval failed")
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to load cart"
      setError(errorMessage)
      console.error("Error refreshing cart:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const addItem = async (variantId: string, quantity: number, countryCode: string) => {
    try {
      setError(null)
      
      console.log("Adding item to cart:", { variantId, quantity, countryCode })
      
      // Ensure we have a cart before adding items
      if (!cart) {
        console.log("No cart available, creating one before adding item...")
        await refreshCart()
      }
      
      if (!cart) {
        return { success: false, error: "Unable to create cart" }
      }
      
      const result = await addToCart({ variantId, quantity, countryCode })
      
      if (result.success) {
        // Refresh cart to get updated state
        await refreshCart()
        console.log("Item added successfully, cart refreshed")
        return { success: true, error: null }
      } else {
        const errorMsg = result.error || "Failed to add item to cart"
        setError(errorMsg)
        console.error("Failed to add item to cart:", errorMsg)
        return result
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to add item to cart"
      setError(errorMessage)
      console.error("Error adding item to cart:", err)
      return { success: false, error: errorMessage }
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
    addItem,
    refreshCart,
    clearError,
  }
}
