// Script to convert logo to base64 for email template
// Run this in the browser console or Node.js to get the base64 string

// If running in browser:
// 1. Open browser console
// 2. Run this function with the logo image
// 3. Copy the base64 result and replace LOGO_BASE64_HERE in EmailTemplate.tsx

function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]; // Remove data:image/png;base64, prefix
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Alternative: Use this URL if the logo is accessible via URL
// Replace YOUR_LOGO_URL with the actual URL
async function urlToBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting URL to base64:', error);
  }
}

// Usage example:
// const base64 = await urlToBase64('https://your-logo-url.com/logo.png');
// console.log(base64);

console.log('Logo to Base64 converter ready!');
console.log('Use imageToBase64(file) or urlToBase64(url) to convert your logo.');