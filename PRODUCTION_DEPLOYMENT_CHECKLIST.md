# Production Deployment Checklist for Cart Functionality

## 🚨 Critical Issues Fixed

Based on the Medusa AI analysis and our investigation, we've implemented the following fixes:

### 1. Enhanced Cart Context Provider ✅
- **File**: `src/lib/context/cart-context.tsx`
- **Purpose**: Ensures cart is available throughout the app
- **Implementation**: React Context with automatic cart creation/retrieval

### 2. Improved Cart Hook ✅
- **File**: `src/lib/hooks/use-cart-context.tsx`
- **Purpose**: Provides cart functionality with fallbacks
- **Features**: Global cart availability, error handling, automatic refresh

### 3. Enhanced Error Logging ✅
- **File**: `src/lib/data/cart.ts`
- **Purpose**: Better debugging in production
- **Features**: Detailed error messages, backend URL logging, region validation

### 4. Health Check Endpoint ✅
- **File**: `src/app/api/health/route.ts`
- **Purpose**: Test backend connectivity
- **Usage**: Visit `/api/health` to check system status

### 5. Cart Status Indicator ✅
- **File**: `src/modules/layout/components/cart-status-indicator/index.tsx`
- **Purpose**: Visual debugging in development
- **Features**: Shows cart status, country code, error messages

## 🔧 Required Environment Variables

### Production Environment (`.env.production`)

```bash
# REQUIRED - Medusa Backend Configuration
MEDUSA_BACKEND_URL=https://your-production-backend-domain.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_production_publishable_key

# OPTIONAL - Default Region
NEXT_PUBLIC_DEFAULT_REGION=us

# OPTIONAL - Base URL
NEXT_PUBLIC_BASE_URL=https://your-storefront-domain.com

# OPTIONAL - Debug Mode
NEXT_PUBLIC_SHOW_CART_STATUS=true
```

## 📋 Pre-Deployment Checklist

### Backend Verification
- [ ] Medusa backend is running and accessible
- [ ] Backend has regions configured
- [ ] Publishable key is valid and active
- [ ] CORS is properly configured
- [ ] Network/firewall allows connections

### Frontend Configuration
- [ ] Environment variables are set correctly
- [ ] Build process includes production environment
- [ ] Cart context provider is included in layout
- [ ] Error logging is enabled
- [ ] Health check endpoint is accessible

### Testing
- [ ] Cart creation works in development
- [ ] Cart retrieval works in development
- [ ] Add to cart functionality works
- [ ] Error handling works properly
- [ ] Cart context is available globally

## 🚀 Deployment Steps

### 1. Set Environment Variables
```bash
# On your production server
export MEDUSA_BACKEND_URL=https://your-backend-domain.com
export NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_key_here
export NODE_ENV=production
```

### 2. Build Application
```bash
npm run build
# or
yarn build
```

### 3. Test Health Endpoint
```bash
curl https://your-domain.com/api/health
```

### 4. Test Cart Functionality
- Visit your production site
- Try to add a product to cart
- Check browser console for errors
- Verify cart context is working

## 🔍 Debugging in Production

### 1. Enable Cart Status Indicator
```bash
export NEXT_PUBLIC_SHOW_CART_STATUS=true
```

### 2. Check Health Endpoint
Visit `/api/health` to see:
- Backend connectivity status
- Environment variable status
- Region count
- Error details

### 3. Monitor Browser Console
Look for:
- Cart context initialization messages
- Cart creation/retrieval logs
- Error messages with detailed context
- Backend URL being used

### 4. Check Network Tab
Look for:
- Failed requests to backend
- Cart creation/retrieval requests
- Region lookup requests
- Authentication errors

## 🐛 Common Issues and Solutions

### Issue: "Error retrieving or creating cart"
**Solution**: Check `MEDUSA_BACKEND_URL` and backend accessibility

### Issue: "Region not found for country code"
**Solution**: Verify regions are configured in Medusa backend

### Issue: 404 Customer Service Error
**Solution**: Check route configuration and environment variables

### Issue: Cart context not available
**Solution**: Ensure `CartProviderWrapper` is included in layout

## 📊 Monitoring and Maintenance

### 1. Regular Health Checks
- Monitor `/api/health` endpoint
- Check backend connectivity
- Verify environment variables

### 2. Error Monitoring
- Monitor browser console errors
- Check server logs for cart errors
- Track cart creation failures

### 3. Performance Monitoring
- Monitor cart creation response times
- Track cart retrieval performance
- Monitor backend API response times

## 🆘 Emergency Procedures

### If Cart Functionality Breaks:

1. **Check Health Endpoint**
   ```bash
   curl https://your-domain.com/api/health
   ```

2. **Verify Environment Variables**
   ```bash
   echo $MEDUSA_BACKEND_URL
   echo $NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
   ```

3. **Test Backend Connectivity**
   ```bash
   curl https://your-backend-domain.com/store/regions
   ```

4. **Check Backend Logs**
   - Look for cart creation errors
   - Check region configuration
   - Verify publishable key validity

5. **Rollback if Necessary**
   - Revert to previous working version
   - Check for environment variable changes
   - Verify backend configuration

## 📞 Support Resources

- **Health Check**: `/api/health`
- **Debug Script**: `debug-cart.js`
- **Production Guide**: `PRODUCTION_SETUP.md`
- **Cart Context**: `src/lib/context/cart-context.tsx`
- **Cart Hook**: `src/lib/hooks/use-cart-context.tsx`

## ✅ Final Verification

After deployment, verify:

- [ ] Cart can be created successfully
- [ ] Items can be added to cart
- [ ] Cart persists across page refreshes
- [ ] No console errors related to cart
- [ ] Health endpoint shows "connected" status
- [ ] Cart context is available globally
- [ ] Error handling works properly
- [ ] Performance is acceptable

---

**Note**: This checklist addresses the specific issues identified by Medusa AI and implements the recommended solutions for proper cart context management and error handling.
