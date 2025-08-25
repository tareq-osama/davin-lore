"use client"

import { useCartInitializer } from "@lib/hooks/use-cart-initializer"

interface CartStatusIndicatorProps {
  countryCode: string
}

export default function CartStatusIndicator({ countryCode }: CartStatusIndicatorProps) {
  const { cart, isLoading, error } = useCartInitializer(countryCode)

  // Only show in development or when explicitly enabled
  if (process.env.NODE_ENV !== 'development' && !process.env.NEXT_PUBLIC_SHOW_CART_STATUS) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-3 shadow-lg z-50 text-xs">
      <div className="font-semibold mb-2">Cart Status</div>
      <div className="space-y-1">
        <div>Country: {countryCode}</div>
        <div>Status: {isLoading ? 'Loading...' : error ? 'Error' : 'Ready'}</div>
        {cart && <div>Cart ID: {cart.id?.substring(0, 8)}...</div>}
        {cart && <div>Items: {cart.items?.length || 0}</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
      </div>
    </div>
  )
}
