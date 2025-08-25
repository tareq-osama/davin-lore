"use client"

import { useCartInitializer } from "@lib/hooks/use-cart-initializer"
import { runVercelDiagnostics } from "@lib/util/vercel-debug"
import { ReactNode, useEffect } from "react"

interface CartProviderWrapperProps {
  children: ReactNode
  countryCode: string
}

export default function CartProviderWrapper({ children, countryCode }: CartProviderWrapperProps) {
  // Initialize cart using the more reliable hook
  const cartState = useCartInitializer(countryCode)

  // Run Vercel diagnostics on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      console.log("🚀 Running Vercel diagnostics for production...")
      runVercelDiagnostics()
    }
  }, [])

  // Log cart status for debugging
  if (typeof window !== 'undefined') {
    console.log("🛒 CartProviderWrapper initialized with country code:", countryCode)
    console.log("📊 Cart status:", {
      hasCart: !!cartState.cart,
      isLoading: cartState.isLoading,
      error: cartState.error,
      cartId: cartState.cart?.id?.substring(0, 8)
    })
  }

  return <>{children}</>
}
