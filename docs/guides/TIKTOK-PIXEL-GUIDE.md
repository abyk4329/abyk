# 🎯 TikTok Pixel Implementation Guide

## ✅ What Was Implemented

### 1. TikTok Pixel Component
- **File**: `app/components/analytics/TikTokPixel.tsx`
- **Features**:
  - Only loads after user accepts cookies
  - Uses Next.js Script component for optimal loading
  - Includes TypeScript declarations
  - Default Pixel ID: `D3C3JDBC77UEJB9H374G`

### 2. Cookie Consent Banner
- **File**: `app/components/layout/CookieConsent.tsx`
- **Updates**:
  - Changed to singular form (לשון יחיד)
  - Mentions TikTok Pixel usage
  - Single "אני מאשר" button only
  - Triggers pixel initialization on consent
  - Saves preference in localStorage

### 3. Privacy Policy
- **File**: `app/components/sections/TermsPrivacy.tsx`
- **Updates**:
  - Section 4: Cookie usage includes TikTok Pixel
  - Section 5: Dedicated TikTok Pixel explanation
  - Mentions data collection and marketing purposes

### 4. Environment Variables
- **File**: `.env.example`
- **New Variable**: `NEXT_PUBLIC_TIKTOK_PIXEL_ID=D3C3JDBC77UEJB9H374G`

### 5. Integration
- **File**: `app/components/layout/AppShell.tsx`
- TikTokPixel component added to main layout

---

## 🧪 How to Test with TikTok Pixel Helper

### Step 1: Install TikTok Pixel Helper
1. Open Chrome Web Store
2. Search for "TikTok Pixel Helper"
3. Install the extension
4. The TikTok icon will appear in your Chrome toolbar

### Step 2: Clear Your Cookies
```bash
# Or clear manually in Chrome DevTools:
# DevTools -> Application -> Storage -> Local Storage -> Clear All
```

### Step 3: Start Dev Server
```bash
pnpm dev
```

### Step 4: Test the Flow

#### 4.1 Initial Visit (No Consent)
1. Visit `http://localhost:3000`
2. **Expected**: Cookie consent banner appears
3. **Expected**: TikTok Pixel Helper icon is gray (not active)
4. Open DevTools Console
5. **Expected**: No TikTok pixel events

#### 4.2 Accept Cookies
1. Click "אני מאשר" button
2. **Expected**: Banner disappears
3. **Expected**: TikTok Pixel Helper icon turns green
4. Open DevTools Console
5. **Expected**: See TikTok pixel initialization and PageView event
6. Check Pixel Helper extension
7. **Expected**: Shows PageView event with Pixel ID

#### 4.3 Reload Page (Consent Saved)
1. Refresh the page
2. **Expected**: Banner does NOT appear (consent remembered)
3. **Expected**: TikTok Pixel Helper icon is immediately green
4. **Expected**: PageView event fires automatically

---

## 🔍 Debug Checklist

### Check 1: Pixel ID
```javascript
// Open browser console and check:
console.log(window.ttq);
// Should show TikTok pixel object if loaded
```

### Check 2: Consent Status
```javascript
// Check localStorage
localStorage.getItem('abyk-cookie-consent');
// Should return: "accepted" or null
```

### Check 3: Script Tag
1. Open DevTools -> Elements
2. Find `<script id="tiktok-pixel">`
3. Verify it contains your Pixel ID: `D3C3JDBC77UEJB9H374G`

### Check 4: Network Requests
1. Open DevTools -> Network
2. Filter by "analytics.tiktok.com"
3. After accepting cookies, you should see requests to TikTok

---

## 🎯 Expected Events

### PageView (Automatic)
- **When**: After consent, on every page load
- **Event Name**: PageView
- **Verification**: TikTok Pixel Helper shows green badge with "1"

### Custom Events (Future)
You can track custom events like this:

```typescript
// In any component after user accepts cookies
if (window.ttq) {
  window.ttq.track('ViewContent', {
    content_type: 'wealth_code',
    content_id: '1234'
  });
  
  window.ttq.track('CompleteRegistration');
  
  window.ttq.track('Purchase', {
    value: 99,
    currency: 'ILS'
  });
}
```

---

## 📝 Environment Setup

### Production (.env.local or Vercel)
```bash
NEXT_PUBLIC_TIKTOK_PIXEL_ID=D3C3JDBC77UEJB9H374G
```

### Testing with Different Pixel ID
1. Copy `.env.example` to `.env.local`
2. Update `NEXT_PUBLIC_TIKTOK_PIXEL_ID` with your test pixel
3. Restart dev server

---

## 🚀 Deployment

### Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Settings -> Environment Variables
4. Add: `NEXT_PUBLIC_TIKTOK_PIXEL_ID` = `D3C3JDBC77UEJB9H374G`
5. Redeploy

### Verify on Production
1. Visit your live site
2. Accept cookies
3. Check TikTok Pixel Helper
4. Verify events in TikTok Events Manager dashboard

---

## 🔐 Privacy Compliance

### GDPR/Privacy Law Compliant
- ✅ Pixel loads ONLY after explicit consent
- ✅ Clear explanation in cookie banner
- ✅ Detailed privacy policy section
- ✅ User can view and delete consent (clear localStorage)
- ✅ Single, clear "Accept" action

### Privacy Policy Sections
- **Section 4**: Cookie usage
- **Section 5**: TikTok Pixel details
- Both explain data collection and marketing purposes

---

## 📊 Monitoring in TikTok

### Access TikTok Events Manager
1. Go to [TikTok Ads Manager](https://ads.tiktok.com)
2. Assets -> Events
3. Select your Pixel: `D3C3JDBC77UEJB9H374G`
4. Monitor events in real-time

### What You'll See
- **PageView** events from website visits
- Event details: URL, timestamp, device info
- Audience insights (after enough data)

---

## 🛠 Troubleshooting

### Pixel Not Loading?
1. Check consent: `localStorage.getItem('abyk-cookie-consent')`
2. Check Pixel ID in `.env.local`
3. Restart dev server after env changes
4. Clear browser cache and cookies

### Events Not Showing?
1. Verify TikTok Pixel Helper shows green icon
2. Check browser console for errors
3. Verify network requests to `analytics.tiktok.com`
4. Wait a few minutes (TikTok can have delay)

### Production Issues?
1. Verify env variable in Vercel
2. Check build logs for errors
3. Test in incognito/private window
4. Check TikTok Events Manager for pixel status

---

## 📚 Resources

- [TikTok Pixel Helper Extension](https://chrome.google.com/webstore/detail/tiktok-pixel-helper/)
- [TikTok Events Manager](https://ads.tiktok.com/help/article?aid=10000357)
- [TikTok Pixel Documentation](https://ads.tiktok.com/marketing_api/docs?id=1701890973258754)

---

## ✨ Summary

Your TikTok Pixel is now:
- ✅ **Installed** and integrated in the app
- ✅ **GDPR compliant** - loads only with consent
- ✅ **Documented** in privacy policy
- ✅ **Ready for testing** with Pixel Helper
- ✅ **Ready for production** deployment

Next step: Test with TikTok Pixel Helper and verify events in TikTok Events Manager! 🎉
