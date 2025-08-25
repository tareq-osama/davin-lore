/**
 * Vercel-specific debugging utilities
 * Use these to debug production issues on Vercel
 */

export const logVercelEnvironment = () => {
  if (typeof window === 'undefined') return // Server-side only
  
  console.log("🌐 Vercel Environment Debug:")
  console.log("   Environment:", process.env.NODE_ENV)
  console.log("   Vercel URL:", process.env.NEXT_PUBLIC_VERCEL_URL)
  console.log("   Backend URL:", process.env.MEDUSA_BACKEND_URL)
  console.log("   Publishable Key:", process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ? "✅ Set" : "❌ Not Set")
  console.log("   Base URL:", process.env.NEXT_PUBLIC_BASE_URL)
  console.log("   Current URL:", window.location.href)
  console.log("   User Agent:", navigator.userAgent)
}

export const testBackendConnectivity = async () => {
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL
    if (!backendUrl) {
      console.error("❌ MEDUSA_BACKEND_URL not set")
      return false
    }

    console.log("🔍 Testing backend connectivity to:", backendUrl)
    
    const response = await fetch(`${backendUrl}/store/regions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add a timeout
      signal: AbortSignal.timeout(10000)
    })

    if (response.ok) {
      const data = await response.json()
      console.log("✅ Backend accessible, regions found:", data.regions?.length || 0)
      return true
    } else {
      console.error("❌ Backend responded with status:", response.status)
      return false
    }
  } catch (error: any) {
    console.error("❌ Backend connectivity test failed:", error.message)
    return false
  }
}

export const testCartCreation = async () => {
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    if (!backendUrl || !publishableKey) {
      console.error("❌ Missing required environment variables")
      return false
    }

    console.log("🛒 Testing cart creation...")
    
    // This will fail with invalid region_id, but we're testing connectivity
    const response = await fetch(`${backendUrl}/store/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey,
      },
      body: JSON.stringify({ region_id: 'test-region' }),
      signal: AbortSignal.timeout(10000)
    })

    if (response.status === 400) {
      // Expected error for invalid region_id, but shows API is working
      console.log("✅ Cart API accessible (Status 400 - expected for test)")
      return true
    } else if (response.status === 401) {
      console.error("❌ Cart API authentication failed - check publishable key")
      return false
    } else {
      console.log("⚠️ Cart API responded with unexpected status:", response.status)
      return false
    }
  } catch (error: any) {
    console.error("❌ Cart creation test failed:", error.message)
    return false
  }
}

export const runVercelDiagnostics = async () => {
  console.log("🚀 Running Vercel diagnostics...")
  
  logVercelEnvironment()
  
  const backendOk = await testBackendConnectivity()
  const cartOk = await testCartCreation()
  
  console.log("📊 Vercel Diagnostic Results:")
  console.log("   Backend Connectivity:", backendOk ? "✅ OK" : "❌ FAILED")
  console.log("   Cart API:", cartOk ? "✅ OK" : "❌ FAILED")
  
  if (!backendOk) {
    console.log("🚨 CRITICAL: Backend not accessible from Vercel")
    console.log("   - Check MEDUSA_BACKEND_URL environment variable")
    console.log("   - Verify backend allows requests from Vercel")
    console.log("   - Check CORS configuration")
  }
  
  if (!cartOk && backendOk) {
    console.log("⚠️ ISSUE: Cart API not working despite backend being accessible")
    console.log("   - Check NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY")
    console.log("   - Verify backend has regions configured")
  }
  
  return { backendOk, cartOk }
}
