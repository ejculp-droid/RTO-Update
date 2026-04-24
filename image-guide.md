# Image Guide - M&A Advisory Website

Complete specifications for all image assets needed for the website.

## 📐 General Guidelines

### File Formats
- **Logos**: SVG (preferred) or PNG with transparent background
- **Photos**: JPG (JPEG) for photographs
- **Icons**: SVG for scalability
- **Backgrounds**: JPG for large images, PNG for overlays

### Optimization
- **Tools**: TinyPNG, Squoosh.app, ImageOptim
- **Target**: < 100KB per image when possible
- **Compression**: 80-85% quality for JPGs
- **Responsive**: Provide 1x, 2x versions for retina displays

### Naming Convention
```
category-description-size.ext
Example: hero-background-1920x1080.jpg
         logo-primary-light.svg
         team-john-smith-800x800.jpg
```

## 🖼️ Required Images

### 1. Logo & Branding

#### Primary Logo
- **Size**: Variable (SVG) or 200px width minimum
- **Format**: SVG or PNG
- **Background**: Transparent
- **Variants**: Dark version, Light version, Icon only
- **Location**: `/assets/images/logos/logo.svg`

**Usage:**
```html
<img src="/assets/images/logos/logo.svg" alt="Company Name" width="200">
```

#### Favicon Set
- **16x16**: Standard browser tab
- **32x32**: Standard browser bookmark
- **180x180**: Apple Touch Icon
- **192x192**: Android Chrome
- **512x512**: PWA app icon

**Location**: `/assets/images/favicon/`

```html
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png">
```

---

### 2. Hero Section

#### Hero Background Image
- **Size**: 1920x1080px minimum (16:9 ratio)
- **Format**: JPG
- **Quality**: High (professional photography)
- **Subject**: 
  - Office environment
  - Business meeting
  - City skyline
  - Abstract business concept
- **Overlay**: Will have dark blue overlay (CSS)
- **Target File Size**: < 300KB
- **Location**: `/assets/images/hero/hero-bg.jpg`

**Suggestions:**
- Professional office with natural light
- Business handshake or meeting
- Modern city financial district
- Abstract data/charts visualization

**Sources:**
- Unsplash.com (free, high-quality)
- Pexels.com (free stock photos)
- Your own professional photography

---

### 3. Service Icons

#### Icon Specifications
- **Size**: 64x64px (or 48x48px)
- **Format**: SVG (vector)
- **Style**: Line icons or solid
- **Color**: Single color (will use CSS `currentColor`)
- **Stroke Width**: 2px for consistency
- **Location**: `/assets/images/icons/services/`

**Required Icons:**
1. `mergers-acquisitions.svg` - Handshake or people icon
2. `capital-advisory.svg` - Dollar sign or money icon
3. `valuations.svg` - Bar chart or graph icon
4. `restructuring.svg` - Pie chart or circular arrows

**Icon Libraries:**
- Heroicons (heroicons.com)
- Feather Icons (feathericons.com)
- Font Awesome (fontawesome.com)
- Material Icons (material.io/icons)

**Implementation:**
Icons are currently inline SVG in HTML. To use external files:

```html
<img src="/assets/images/icons/services/mergers-acquisitions.svg" 
     alt="" 
     class="service-icon">
```

---

### 4. Transaction Logos

#### Company Logos
- **Size**: Height 80px max, width proportional
- **Format**: PNG with transparent background or SVG
- **Style**: Grayscale or brand colors
- **Background**: Transparent
- **Location**: `/assets/images/logos/clients/`

**Example Files:**
- `company-a-logo.svg`
- `acquirer-b-logo.svg`
- `healthcare-co-logo.png`

**Placeholder Handling:**
Current HTML uses styled divs. Replace with actual logos:

```html
<!-- Before -->
<div class="company-logo" style="background: var(--color-gray-200); padding: 1rem 2rem;">
  Company A
</div>

<!-- After -->
<img src="/assets/images/logos/clients/company-a.svg" 
     alt="Company A" 
     class="company-logo">
```

---

### 5. Team Photos

#### Individual Headshots
- **Size**: 800x800px (1:1 square ratio)
- **Format**: JPG
- **Style**: Professional, consistent lighting
- **Background**: Neutral (white, gray, or solid color)
- **Target File Size**: < 100KB each
- **Location**: `/assets/images/team/`

**Naming:**
- `firstname-lastname.jpg`
- Example: `john-smith.jpg`

**Photography Guidelines:**
- Professional attire
- Consistent lighting and background
- Same framing/composition for all
- High resolution source (downscale to 800x800)
- Friendly, approachable expression

**CSS Application:**
```css
.team-photo {
  width: 100%;
  height: auto;
  border-radius: 50%; /* Circular photos */
  object-fit: cover;
}
```

---

### 6. Office/Location Photos

#### Office Images (for About page)
- **Size**: 1200x800px (3:2 ratio)
- **Format**: JPG
- **Subjects**: 
  - Office exterior
  - Reception area
  - Conference rooms
  - Team workspace
- **Location**: `/assets/images/office/`

---

### 7. Social Media / OG Images

#### Open Graph Image
- **Size**: 1200x630px (1.91:1 ratio)
- **Format**: JPG or PNG
- **Content**: Logo + tagline + branded background
- **Text**: Large, readable
- **Location**: `/assets/images/og-image.jpg`

**Usage:**
```html
<meta property="og:image" content="https://yoursite.com/assets/images/og-image.jpg">
```

**Design Tips:**
- Include company logo
- Add tagline or value proposition
- Use brand colors
- Ensure text is readable at small sizes
- Test how it appears when shared on social media

---

## 📋 Image Inventory Checklist

### Essential (Must Have)
- [ ] Primary logo (SVG/PNG)
- [ ] Favicon set (16x16, 32x32, 180x180)
- [ ] Hero background image (1920x1080)
- [ ] 4 Service icons (64x64 SVG)
- [ ] OG social sharing image (1200x630)

### Important (High Priority)
- [ ] 3-6 Transaction company logos
- [ ] 5-10 Team member headshots (800x800)

### Nice to Have
- [ ] Office photos (1200x800)
- [ ] Industry-specific imagery
- [ ] Additional background images
- [ ] Brand pattern/texture files

---

## 🛠️ Image Optimization Workflow

### 1. Source Images
- Obtain high-resolution originals
- Professional photography or licensed stock photos
- Minimum 2x final display size

### 2. Edit & Crop
- Crop to exact specifications
- Adjust brightness/contrast
- Apply consistent color grading
- Remove background if needed

### 3. Resize
- Scale down to target dimensions
- Create 1x and 2x versions for retina
- Use bicubic interpolation for quality

### 4. Optimize
- **JPG**: 80-85% quality
- **PNG**: Use compression tools
- **SVG**: Minify and remove unnecessary data

**Tools:**
- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app
- **ImageOptim**: https://imageoptim.com (Mac)
- **SVGOMG**: https://jakearchibald.github.io/svgomg/

### 5. Test
- Check file sizes
- Verify quality on various devices
- Test loading performance
- Validate on retina displays

---

## 🎨 Stock Photo Resources

### Free High-Quality Photos
- **Unsplash**: https://unsplash.com
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com
- **StockSnap**: https://stocksnap.io

### Premium Stock Photos
- **Shutterstock**: https://shutterstock.com
- **Adobe Stock**: https://stock.adobe.com
- **iStock**: https://istockphoto.com
- **Getty Images**: https://gettyimages.com

### Search Terms for M&A/Finance
- "business meeting"
- "office professional"
- "financial district"
- "corporate handshake"
- "team collaboration"
- "modern office"
- "city skyline finance"
- "data analytics"

---

## 🖥️ Responsive Image Implementation

### Using srcset for Retina Displays

```html
<img 
  src="/assets/images/team/john-smith-800.jpg"
  srcset="/assets/images/team/john-smith-800.jpg 1x,
          /assets/images/team/john-smith-1600.jpg 2x"
  alt="John Smith, CEO"
  width="400"
  height="400">
```

### Picture Element for Art Direction

```html
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="/assets/images/hero/hero-desktop-1920.jpg">
  <source 
    media="(min-width: 768px)" 
    srcset="/assets/images/hero/hero-tablet-1024.jpg">
  <img 
    src="/assets/images/hero/hero-mobile-640.jpg" 
    alt="Office Background">
</picture>
```

### Lazy Loading

```html
<img 
  src="/assets/images/team/john-smith.jpg" 
  alt="John Smith"
  loading="lazy">
```

---

## 🎯 Image Performance Targets

- **Hero Background**: < 300KB
- **Team Photos**: < 100KB each
- **Logos/Icons**: < 20KB each (SVG < 5KB)
- **Total Page Weight**: < 2MB including all images
- **Lazy Load**: Images below fold
- **Format**: WebP with JPG fallback (advanced)

---

## ✅ Final Checklist

Before launching:
- [ ] All images optimized for web
- [ ] Alt text added to all images
- [ ] Responsive versions created where needed
- [ ] Images tested on various devices
- [ ] File sizes meet targets
- [ ] Copyright/licensing verified
- [ ] Images backed up in original quality
- [ ] CDN configured (if using)

---

**Questions?** Refer to the README.md for general guidance or IMPLEMENTATION.md for development timeline.
