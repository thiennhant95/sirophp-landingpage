# OG Image & Assets Documentation

## Required Images for SEO

### 1. Open Graph Image (og-image.png)
**Location**: `/public/og-image.png`
**Dimensions**: 1200 x 630 pixels (1.91:1 ratio)
**Format**: PNG or JPG
**File Size**: < 5MB

**Purpose**: Displayed when sharing links on social media (Facebook, LinkedIn, Twitter)

**Design Guidelines**:
- Include SiroPHP logo
- Text: "Debug APIs Instantly. Built for Speed."
- Background: Dark (#000000) with cyan/purple gradient accents
- Clean, professional design
- High contrast text

**Tools to Create**:
- Canva (free)
- Figma (free)
- Adobe Photoshop
- Online OG image generators

---

### 2. Logo (logo.png)
**Location**: `/public/logo.png`
**Dimensions**: 512 x 512 pixels (square)
**Format**: PNG with transparent background
**File Size**: < 500KB

**Purpose**: Used in structured data and brand recognition

---

### 3. Favicon
**Location**: `/public/favicon.ico`
**Dimensions**: 32 x 32 pixels
**Format**: ICO

**Optional additional sizes**:
- 16x16
- 48x48
- 64x64

---

### 4. Apple Touch Icon
**Location**: `/public/apple-touch-icon.png`
**Dimensions**: 180 x 180 pixels
**Format**: PNG

---

## Image Optimization Tips

### Best Practices:
1. **Compress images** before uploading
   - Use TinyPNG.com (free)
   - Use ImageOptim (Mac)
   - Use Squoosh.app (web-based)

2. **Use WebP format** for better compression
   - Convert PNG/JPG to WebP
   - Provide fallback formats

3. **Optimize for retina displays**
   - Use 2x resolution for crisp display
   - Maintain aspect ratios

4. **Add alt text** to all images
   - Descriptive and keyword-rich
   - Example: "SiroPHP - Debug APIs Instantly"

---

## Next.js Image Optimization

### Built-in Features:
- ✅ Automatic image optimization
- ✅ Lazy loading
- ✅ Responsive images (srcset)
- ✅ WebP/AVIF format support
- ✅ Blur-up placeholder

### Usage:
```tsx
import Image from 'next/image';

<Image
  src="/og-image.png"
  alt="SiroPHP OG Image"
  width={1200}
  height={630}
  priority={true} // For above-the-fold images
/>
```

---

## Quick Checklist

- [ ] Create og-image.png (1200x630)
- [ ] Create logo.png (512x512)
- [ ] Create favicon.ico (32x32)
- [ ] Create apple-touch-icon.png (180x180)
- [ ] Compress all images
- [ ] Place in `/public` folder
- [ ] Test with Facebook Sharing Debugger
- [ ] Test with Twitter Card Validator

---

## Testing Tools

1. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Tests: OG tags, image display

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Tests: Twitter card display

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Tests: LinkedIn sharing

4. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Tests: Structured data
