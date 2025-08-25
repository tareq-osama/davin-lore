import { NextRequest, NextResponse } from "next/server"
import { cleanupInvalidCustomerAuth } from "@lib/util/customer-auth-cleanup"

export async function POST(request: NextRequest) {
  try {
    console.log("🧹 Manual customer auth cleanup triggered")
    
    const result = await cleanupInvalidCustomerAuth()
    
    return NextResponse.json({
      success: true,
      cleaned: result.cleaned,
      reason: result.reason,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Error during manual customer auth cleanup:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Cleanup failed",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Checking customer auth status")
    
    const result = await cleanupInvalidCustomerAuth()
    
    return NextResponse.json({
      success: true,
      cleaned: result.cleaned,
      reason: result.reason,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Error checking customer auth status:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Status check failed",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
