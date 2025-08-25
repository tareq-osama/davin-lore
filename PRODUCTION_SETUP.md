# Production Environment Setup Guide

## Critical Issue: Cart Functionality Not Working

The cart functionality is failing in production due to missing or incorrect environment variables. Follow this guide to resolve the issue.

## Required Environment Variables

Create a `.env.production` file in your production environment with these variables:

```bash
# Medusa Backend Configuration (REQUIRED)
MEDUSA_BACKEND_URL=https://your-production-backend-domain.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_production_publishable_key_here

# Default Region (optional - defaults to "us")
NEXT_PUBLIC_DEFAULT_REGION=us

# Environment
NODE_ENV=production

# Base URL for the storefront
NEXT_PUBLIC_BASE_URL=https://your-storefront-domain.com

# Stripe Configuration (if using Stripe payments)
NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key

# Vercel Configuration (if deploying on Vercel)
NEXT_PUBLIC_VERCEL_URL=https://your-vercel-domain.vercel.app
```

## Step-by-Step Resolution

### 1. Verify Backend Connectivity

First, ensure your Medusa backend is accessible:

```bash
# Test if your backend is reachable
curl -I https://your-production-backend-domain.com/health
curl -I https://your-production-backend-domain.com/store/regions
```

### 2. Check Publishable Key

Verify your publishable key is valid:

```bash
# Test the key with a simple API call
curl -H "x-publishable-api-key: your_key_here" \
     https://your-production-backend-domain.com/store/regions
```

### 3. Verify Regions Configuration

Ensure your Medusa backend has regions configured:

```bash
# Check if regions exist
curl https://your-production-backend-domain.com/store/regions
```

### 4. Test Cart Creation

Test cart creation directly:

```bash
# Create a test cart
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-publishable-api-key: your_key_here" \
  -d '{"region_id": "your_region_id"}' \
  https://your-production-backend-domain.com/store/carts
```

## Common Issues and Solutions

### Issue 1: "Error retrieving or creating cart"

**Cause**: Backend URL is incorrect or backend is unreachable
**Solution**: 
- Verify `MEDUSA_BACKEND_URL` is correct
- Ensure backend is running and accessible
- Check firewall/network settings

### Issue 2: "Region not found for country code"

**Cause**: Regions not configured in Medusa backend
**Solution**:
- Login to Medusa admin panel
- Go to Settings > Regions
- Create regions for your target countries
- Ensure countries have correct ISO codes

### Issue 3: 404 Customer Service Error

**Cause**: Route not configured or environment variable mismatch
**Solution**:
- Check `NEXT_PUBLIC_BASE_URL` matches your domain
- Verify all routes are properly configured
- Check middleware configuration

### Issue 4: Authentication Errors

**Cause**: Invalid publishable key or backend configuration
**Solution**:
- Verify `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` is correct
- Check backend JWT and cookie secrets
- Ensure backend is properly configured for production

## Debugging Steps

### 1. Check Browser Console

Look for these specific errors:
- "Error retrieving or creating cart"
- "Region not found for country code"
- Network request failures to backend

### 2. Check Server Logs

Monitor your production server logs for:
- Cart creation errors
- Region lookup failures
- Backend connection issues

### 3. Test API Endpoints

Verify these endpoints work:
- `/store/regions` - Should return available regions
- `/store/carts` - Should allow cart creation
- `/store/products` - Should return products

## Environment Variable Priority

The system checks environment variables in this order:
1. `.env.production` (production builds)
2. `.env.local` (local development)
3. `.env` (fallback)

## Verification Checklist

- [ ] Backend is accessible from production server
- [ ] Publishable key is valid and working
- [ ] Regions are configured in Medusa backend
- [ ] Environment variables are set correctly
- [ ] Cart creation API endpoint works
- [ ] No firewall/network blocking issues
- [ ] Backend is running in production mode

## After Fixing

Once you've resolved the environment variables:

1. Rebuild your application
2. Restart your production server
3. Test cart functionality
4. Monitor logs for any remaining errors

## Support

If issues persist after following this guide:
1. Check Medusa backend logs
2. Verify network connectivity
3. Test with a simple curl command
4. Review browser console for specific error messages
