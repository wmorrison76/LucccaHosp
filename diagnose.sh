#!/bin/bash

echo "========================================="
echo "LUCCCA Application Diagnostics"
echo "========================================="
echo ""

# Check if frontend is built
echo "📁 Checking frontend build..."
if [ -d "frontend/dist" ]; then
    echo "✅ frontend/dist exists"
    echo "   Files: $(ls -1 frontend/dist | wc -l) items"
    ls -lh frontend/dist | head -10
else
    echo "❌ frontend/dist NOT FOUND"
    echo "   Run: cd frontend && npm run build"
fi
echo ""

# Check index.html
echo "📄 Checking index.html..."
if [ -f "frontend/dist/index.html" ]; then
    SIZE=$(stat -f%z "frontend/dist/index.html" 2>/dev/null || stat -c%s "frontend/dist/index.html" 2>/dev/null)
    echo "✅ index.html found (${SIZE} bytes)"
    echo "   First 5 lines:"
    head -5 "frontend/dist/index.html" | sed 's/^/   /'
else
    echo "❌ index.html NOT FOUND"
fi
echo ""

# Check backend server
echo "🖥️  Checking backend server..."
if [ -f "backend/server.js" ]; then
    echo "✅ backend/server.js exists"
else
    echo "❌ backend/server.js NOT FOUND"
fi
echo ""

# Check if backend is running
echo "🔌 Testing backend on localhost:3001..."
if command -v curl &> /dev/null; then
    RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:3001/ 2>/dev/null)
    HTTP_CODE=$(echo "$RESPONSE" | tail -1)
    BODY=$(echo "$RESPONSE" | head -1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Backend is running (HTTP $HTTP_CODE)"
    else
        echo "⚠️  Backend returned HTTP $HTTP_CODE"
        if [ ! -z "$BODY" ]; then
            echo "   Response: $BODY" | head -c 100
        fi
    fi
else
    echo "⚠️  curl not available, skipping connection test"
fi
echo ""

# Check frontend dev server
echo "📡 Testing frontend dev server on localhost:5173..."
if command -v curl &> /dev/null; then
    RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:5173/ 2>/dev/null)
    HTTP_CODE=$(echo "$RESPONSE" | tail -1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Frontend dev server is running (HTTP $HTTP_CODE)"
    elif [ "$HTTP_CODE" = "000" ]; then
        echo "❌ Frontend dev server is NOT running"
        echo "   Start with: cd frontend && npm run dev"
    else
        echo "⚠️  Frontend dev server returned HTTP $HTTP_CODE"
    fi
else
    echo "⚠️  curl not available, skipping connection test"
fi
echo ""

# Test diagnostics endpoint
echo "🔍 Testing diagnostics endpoint..."
if command -v curl &> /dev/null; then
    DIAG=$(curl -s http://localhost:3001/api/diagnostics/status 2>/dev/null)
    if [ ! -z "$DIAG" ]; then
        echo "✅ Diagnostics endpoint responding"
        echo "   Response:"
        echo "$DIAG" | head -20 | sed 's/^/   /'
    else
        echo "⚠️  Diagnostics endpoint not responding"
    fi
else
    echo "⚠️  curl not available, skipping diagnostics test"
fi
echo ""

echo "========================================="
echo "📋 Summary:"
echo "========================================="
echo ""
echo "If you see 'Cannot GET /', check these:"
echo ""
echo "1. ✅ Is frontend/dist built?"
echo "   cd frontend && npm run build"
echo ""
echo "2. ✅ Is backend running?"
echo "   cd backend && npm start"
echo ""
echo "3. ✅ Check diagnostics at:"
echo "   http://localhost:3001/api/diagnostics/status"
echo ""
echo "4. ✅ Test the app at:"
echo "   http://localhost:5173 (dev)"
echo "   http://localhost:3001 (production build)"
echo ""
