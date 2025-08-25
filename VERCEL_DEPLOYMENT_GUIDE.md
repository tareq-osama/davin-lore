# Vercel Deployment Guide for Cart Functionality

## 🚨 **Critical Issue: Cart Not Working on Vercel**

The cart functionality is working on localhost but failing on Vercel. This is typically due to environment variable configuration or CORS issues.

## 🔧 **Immediate Fixes Applied**

### 1. **Simplified Cart Logic** ✅
- Updated `product-actions/index.tsx` to use direct API calls
- Removed complex cart context dependencies
- Added better error logging

### 2. **Vercel-Specific Diagnostics** ✅
- Created `src/lib/util/vercel-debug.ts`
- Added automatic diagnostics on production
- Enhanced error reporting for Vercel environment

### 3. **Robust Cart Initialization** ✅
- Created `use-cart-initializer` hook
- Better handling of server/client rendering
- Improved error handling and logging

## 🌐 **Vercel Environment Variables**

### **Required Variables in Vercel Dashboard:**

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings → Environment Variables**
3. **Add these variables:**

```bash
# REQUIRED - Medusa Backend
MEDUSA_BACKEND_URL=https://your-backend-domain.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key

# OPTIONAL - Debug Mode
NEXT_PUBLIC_SHOW_CART_STATUS=true
NEXT_PUBLIC_VERCEL_URL=https://your-vercel-domain.vercel.app
```

### **Environment Variable Priority:**
1. **Production** (Vercel dashboard)
2. **Preview** (for preview deployments)
3. **Development** (local .env files)

## 🚀 **Deployment Steps**

### **Step 1: Set Environment Variables in Vercel**
```bash
# In Vercel Dashboard → Settings → Environment Variables
MEDUSA_BACKEND_URL=https://your-backend-domain.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key
NODE_ENV=production
```

### **Step 2: Redeploy**
```bash
# Push to your main branch or manually redeploy
git push origin main
```

### **Step 3: Test Cart Functionality**
1. Visit your Vercel deployment
2. Open browser console (F12)
3. Try to add a product to cart
4. Look for diagnostic messages

## 🔍 **Debugging on Vercel**

### **1. Check Browser Console**
Look for these messages:
```
🚀 Running Vercel diagnostics for production...
🌐 Vercel Environment Debug:
🔄 Initializing cart for country code: us
📦 No existing cart found, creating new cart...
✅ Cart initialized successfully: cart_123...
```

### **2. Check Network Tab**
- Look for failed requests to your backend
- Check if `MEDUSA_BACKEND_URL` is correct
- Verify CORS headers

### **3. Use Vercel Diagnostics**
The app automatically runs diagnostics in production. Look for:
- Backend connectivity status
- Cart API accessibility
- Environment variable status

## 🐛 **Common Vercel Issues**

### **Issue 1: Environment Variables Not Set**
**Symptoms**: `MEDUSA_BACKEND_URL` shows as `undefined`
**Solution**: Set variables in Vercel dashboard, not in code

### **Issue 2: CORS Errors**
**Symptoms**: Network requests blocked by CORS
**Solution**: Configure CORS on your Medusa backend

### **Issue 3: Backend Not Accessible**
**Symptoms**: Timeout or connection refused errors
**Solution**: Verify backend URL and network accessibility

### **Issue 4: Publishable Key Invalid**
**Symptoms**: 401 Unauthorized errors
**Solution**: Check `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` value

## 📋 **Vercel-Specific Checklist**

### **Environment Variables:**
- [ ] `MEDUSA_BACKEND_URL` set in Vercel dashboard
- [ ] `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` set in Vercel dashboard
- [ ] Variables applied to Production environment
- [ ] Variables applied to Preview environment (if needed)

### **Backend Configuration:**
- [ ] Backend allows requests from Vercel domains
- [ ] CORS properly configured
- [ ] Publishable key is valid and active
- [ ] Regions configured in Medusa backend

### **Deployment:**
- [ ] Environment variables are loaded
- [ ] Build process completes successfully
- [ ] No build-time errors
- [ ] Cart functionality works after deployment

## 🆘 **Emergency Debugging**

### **If Cart Still Doesn't Work:**

1. **Check Vercel Function Logs**
   ```bash
   # In Vercel dashboard → Functions
   # Look for any errors in the logs
   ```

2. **Test Backend Directly**
   ```bash
   curl -I https://your-backend-domain.com/store/regions
   ```

3. **Verify Environment Variables**
   ```bash
   # In browser console
   console.log(process.env.MEDUSA_BACKEND_URL)
   console.log(process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY)
   ```

4. **Check Network Requests**
   - Open browser dev tools
   - Go to Network tab
   - Try to add item to cart
   - Look for failed requests

## 📊 **Monitoring and Maintenance**

### **1. Regular Checks**
- Monitor Vercel function logs
- Check environment variable status
- Verify backend connectivity

### **2. Performance Monitoring**
- Monitor cart creation response times
- Track failed cart operations
- Monitor backend API performance

### **3. Error Tracking**
- Set up error monitoring (e.g., Sentry)
- Track cart-related errors
- Monitor user experience metrics

## 🔄 **Rollback Plan**

### **If Issues Persist:**

1. **Revert to Previous Version**
   ```bash
   # In Vercel dashboard → Deployments
   # Click on previous working deployment
   # Click "Promote to Production"
   ```

2. **Check Environment Variables**
   - Compare with working version
   - Verify no variables were changed

3. **Test Backend Independently**
   - Use Postman or curl to test API
   - Verify backend is working correctly

## 📞 **Support Resources**

- **Vercel Dashboard**: Environment variables and deployment logs
- **Browser Console**: Automatic diagnostics and error messages
- **Network Tab**: Failed request details
- **Health Endpoint**: `/api/health` for system status
- **Debug Script**: `debug-cart.js` for local testing

## ✅ **Success Indicators**

After fixing, you should see:

- [ ] ✅ Cart initialization messages in console
- [ ] ✅ Successful cart creation
- [ ] ✅ Items added to cart without errors
- [ ] ✅ No CORS or network errors
- [ ] ✅ Environment variables properly loaded
- [ ] ✅ Backend connectivity confirmed

---

**Note**: This guide specifically addresses Vercel deployment issues. The cart functionality should work once environment variables are properly configured in the Vercel dashboard.
