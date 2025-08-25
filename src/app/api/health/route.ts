import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"

export async function GET(request: NextRequest) {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
      backendUrl: process.env.MEDUSA_BACKEND_URL || "not_set",
      publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ? "set" : "not_set",
    }

    // Test backend connectivity
    try {
      const regionsResponse = await sdk.client.fetch("/store/regions", {
        method: "GET",
        cache: "no-store",
      })
      
      health.backendStatus = "connected"
      health.regionsCount = regionsResponse.regions?.length || 0
    } catch (backendError: any) {
      health.backendStatus = "error"
      health.backendError = backendError.message || "Unknown error"
    }

    return NextResponse.json(health, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error.message || "Unknown error",
      },
      { status: 500 }
    )
  }
}
