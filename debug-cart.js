#!/usr/bin/env node

/**
 * Cart Functionality Debug Script
 * Run this script to diagnose cart issues in production
 */

const https = require('https');
const http = require('http');

// Configuration - Update these values
const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'not_set';

console.log('🔍 Cart Functionality Debug Script');
console.log('=====================================\n');

console.log('📋 Environment Check:');
console.log(`   Backend URL: ${BACKEND_URL}`);
console.log(`   Publishable Key: ${PUBLISHABLE_KEY ? '✅ Set' : '❌ Not Set'}`);
console.log(`   Environment: ${process.env.NODE_ENV || 'unknown'}\n`);

// Test backend connectivity
async function testBackendConnectivity() {
  console.log('🌐 Testing Backend Connectivity...');
  
  try {
    const url = new URL(BACKEND_URL);
    const protocol = url.protocol === 'https:' ? https : http;
    
    return new Promise((resolve, reject) => {
      const req = protocol.get(`${BACKEND_URL}/store/regions`, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (res.statusCode === 200) {
              console.log(`   ✅ Backend accessible (Status: ${res.statusCode})`);
              console.log(`   📍 Regions found: ${response.regions?.length || 0}`);
              resolve(true);
            } else {
              console.log(`   ⚠️  Backend responded with status: ${res.statusCode}`);
              console.log(`   📄 Response: ${data.substring(0, 200)}...`);
              resolve(false);
            }
          } catch (parseError) {
            console.log(`   ⚠️  Backend responded but couldn't parse JSON`);
            console.log(`   📄 Response: ${data.substring(0, 200)}...`);
            resolve(false);
          }
        });
      });
      
      req.on('error', (error) => {
        console.log(`   ❌ Backend connection failed: ${error.message}`);
        resolve(false);
      });
      
      req.setTimeout(10000, () => {
        console.log('   ⏰ Backend connection timeout');
        req.destroy();
        resolve(false);
      });
    });
  } catch (error) {
    console.log(`   ❌ Invalid backend URL: ${error.message}`);
    return false;
  }
}

// Test cart creation
async function testCartCreation() {
  console.log('\n🛒 Testing Cart Creation...');
  
  if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === 'not_set') {
    console.log('   ❌ Cannot test cart creation - no publishable key');
    return false;
  }
  
  try {
    const url = new URL(BACKEND_URL);
    const protocol = url.protocol === 'https:' ? https : http;
    
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({
        region_id: 'test-region' // This will fail, but we're testing connectivity
      });
      
      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: '/store/carts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'x-publishable-api-key': PUBLISHABLE_KEY
        }
      };
      
      const req = protocol.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode === 400) {
            // Expected error for invalid region_id, but shows API is working
            console.log('   ✅ Cart API endpoint accessible (Status: 400 - expected for test)');
            console.log(`   📄 Response: ${data.substring(0, 200)}...`);
            resolve(true);
          } else if (res.statusCode === 401) {
            console.log('   ❌ Cart API authentication failed - check publishable key');
            resolve(false);
          } else {
            console.log(`   ⚠️  Cart API responded with unexpected status: ${res.statusCode}`);
            console.log(`   📄 Response: ${data.substring(0, 200)}...`);
            resolve(false);
          }
        });
      });
      
      req.on('error', (error) => {
        console.log(`   ❌ Cart API connection failed: ${error.message}`);
        resolve(false);
      });
      
      req.write(postData);
      req.end();
      
      req.setTimeout(10000, () => {
        console.log('   ⏰ Cart API connection timeout');
        req.destroy();
        resolve(false);
      });
    });
  } catch (error) {
    console.log(`   ❌ Cart API test failed: ${error.message}`);
    return false;
  }
}

// Main diagnostic function
async function runDiagnostics() {
  const backendOk = await testBackendConnectivity();
  const cartOk = await testCartCreation();
  
  console.log('\n📊 Diagnostic Summary:');
  console.log('========================');
  console.log(`   Backend Connectivity: ${backendOk ? '✅ OK' : '❌ FAILED'}`);
  console.log(`   Cart API: ${cartOk ? '✅ OK' : '❌ FAILED'}`);
  console.log(`   Environment Variables: ${PUBLISHABLE_KEY !== 'not_set' ? '✅ OK' : '❌ FAILED'}`);
  
  if (!backendOk) {
    console.log('\n🚨 CRITICAL ISSUE: Backend is not accessible');
    console.log('   - Check MEDUSA_BACKEND_URL environment variable');
    console.log('   - Verify backend server is running');
    console.log('   - Check firewall/network settings');
  }
  
  if (!cartOk && backendOk) {
    console.log('\n⚠️  ISSUE: Cart API not working despite backend being accessible');
    console.log('   - Check NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY');
    console.log('   - Verify backend has regions configured');
    console.log('   - Check backend logs for errors');
  }
  
  if (PUBLISHABLE_KEY === 'not_set') {
    console.log('\n⚠️  ISSUE: Missing publishable key');
    console.log('   - Set NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY environment variable');
    console.log('   - Ensure key is valid and active');
  }
  
  if (backendOk && cartOk && PUBLISHABLE_KEY !== 'not_set') {
    console.log('\n✅ All checks passed! Cart functionality should work.');
    console.log('   If issues persist, check browser console for JavaScript errors.');
  }
}

// Run diagnostics
runDiagnostics().catch(console.error);
