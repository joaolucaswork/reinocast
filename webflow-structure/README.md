# ⚠️ WEBFLOW STRUCTURE - READ-ONLY REFERENCE DIRECTORY

## 🚨 CRITICAL WARNING - DO NOT EDIT FILES IN THIS DIRECTORY

**This directory is for REFERENCE PURPOSES ONLY.**

All files in this folder are exported from Webflow and should **NEVER** be manually edited.

---

## ❌ What NOT to Do

### **DO NOT:**
- ❌ Edit any HTML files in this directory
- ❌ Modify CSS in these files
- ❌ Add JavaScript to these files
- ❌ Change class names in these files
- ❌ Update the structure in these files
- ❌ Expect changes here to affect your live site

### **Why?**
These files are **static exports** from Webflow. They are snapshots of your Webflow project at a specific point in time. Any changes you make here will:
- **NOT appear on your live website**
- **NOT sync back to Webflow**
- **Be overwritten** the next time you export from Webflow
- **Cause confusion** and wasted development time

---

## ✅ What TO Do Instead

### **For HTML Structure Changes:**
1. Open your **Webflow Designer**
2. Make changes to the structure there
3. Publish or export the updated HTML
4. Update this reference folder if needed (optional)

### **For JavaScript/TypeScript Functionality:**
1. Edit files in the `src/` directory:
   - `src/utils/swiper.ts` - Swiper carousel logic
   - `src/utils/lite-youtube.ts` - YouTube embed logic
   - `src/index.ts` - Main initialization
2. Run `pnpm run build` to compile
3. Upload `dist/index.js` to your hosting
4. Reference it in Webflow's **Project Settings > Custom Code > Footer**

### **For CSS Styling:**
1. Add CSS in Webflow Designer's style panel
2. OR add custom CSS in **Project Settings > Custom Code > Head Code**
3. OR create a CSS file in `src/` and import it in your TypeScript

### **For Configuration Changes:**
1. Edit `src/utils/swiper.ts` to change carousel behavior
2. Edit `src/index.ts` to change initialization logic
3. Rebuild with `pnpm run build`

---

## 📖 How to Use This Directory

### **Purpose:**
This directory serves as a **reference** to understand:
- The HTML structure Webflow generates
- Class names used in your Webflow project
- The DOM hierarchy for targeting elements
- How Webflow organizes your content

### **Use Cases:**

#### 1. **Understanding Class Names**
```html
<!-- From webflow-structure/index.html -->
<div class="swiper is-podcast">
  <div class="swiper-wrapper is-podcast">
    <div class="swiper-slide is-podcast">
```
**Action:** Use these class names in your TypeScript selectors:
```typescript
// In src/utils/swiper.ts
const containers = document.querySelectorAll('.swiper.is-podcast');
```

#### 2. **Understanding Structure**
```html
<!-- From webflow-structure/index.html -->
<div class="swiper is-podcast">
  <div class="swiper-wrapper is-podcast">
    <div class="swiper-slide is-podcast">
      <lite-youtube videoid="..."></lite-youtube>
    </div>
  </div>
</div>
```
**Action:** Write TypeScript that expects this structure:
```typescript
// In src/utils/swiper.ts
const wrapper = container.querySelector('.swiper-wrapper');
const slides = container.querySelectorAll('.swiper-slide');
```

#### 3. **Debugging Issues**
- Compare the reference HTML with what's in your browser's DevTools
- Check if class names match between Webflow and your TypeScript
- Verify the DOM hierarchy is correct

#### 4. **Documentation**
- Share with team members to show the expected structure
- Use as a reference when writing new features
- Keep updated when making major Webflow changes

---

## 🔄 Updating This Directory

### **When to Update:**
- After making significant structural changes in Webflow
- When adding new components or sections
- When class names change in Webflow
- Periodically to keep reference current

### **How to Update:**
1. In Webflow, go to **Project Settings > Export Code**
2. Download the exported ZIP file
3. Extract the HTML files
4. Copy relevant HTML to this directory for reference
5. **DO NOT** copy the entire export - only what you need for reference

---

## 📋 Current Structure Reference

### **Files in This Directory:**

- **`index.html`** - Main page structure exported from Webflow
  - Contains the Swiper carousel structure
  - Shows class names: `swiper`, `is-podcast`, `swiper-wrapper`, `swiper-slide`
  - Includes lite-youtube embed examples

### **Key Class Names Found:**

| Class Name | Element | Purpose |
|------------|---------|---------|
| `swiper` | Container | Main Swiper container |
| `is-podcast` | Combo class | Identifies podcast carousel variant |
| `swiper-wrapper` | Wrapper | Contains all slides |
| `swiper-slide` | Slide | Individual slide container |
| `reinocast_section` | Section | Main section wrapper |
| `container-large` | Container | Webflow container |

### **Current Structure:**
```
swiper.is-podcast
└── swiper-wrapper.is-podcast
    ├── swiper-slide.is-podcast
    │   └── lite-youtube
    └── swiper-slide.is-podcast
        └── lite-youtube
```

**Note:** Missing navigation buttons and pagination elements. These need to be added in Webflow:
- `swiper-button-prev`
- `swiper-button-next`
- `swiper-pagination`

---

## 🐛 Common Mistakes

### **Mistake 1: Editing HTML Here**
```diff
- ❌ Editing webflow-structure/index.html
+ ✅ Editing in Webflow Designer
```

### **Mistake 2: Adding JavaScript Here**
```diff
- ❌ Adding <script> tags to webflow-structure/index.html
+ ✅ Adding code to src/index.ts or src/utils/
```

### **Mistake 3: Changing Class Names Here**
```diff
- ❌ Renaming classes in webflow-structure/index.html
+ ✅ Renaming classes in Webflow Designer
```

### **Mistake 4: Expecting Changes to Appear**
```diff
- ❌ Editing files here and expecting them on the live site
+ ✅ Making changes in Webflow or src/ directory
```

---

## 🎯 Quick Reference Workflow

### **When You Need to:**

#### **Add a New Slide:**
1. ✅ Add it in Webflow Designer
2. ✅ Publish in Webflow
3. ❌ Don't edit webflow-structure/index.html

#### **Change Carousel Behavior:**
1. ✅ Edit `src/utils/swiper.ts`
2. ✅ Run `pnpm run build`
3. ✅ Upload new `dist/index.js`
4. ❌ Don't edit webflow-structure/index.html

#### **Fix a Bug:**
1. ✅ Check webflow-structure/index.html to understand structure
2. ✅ Fix code in `src/utils/swiper.ts`
3. ✅ Test and rebuild
4. ❌ Don't edit webflow-structure/index.html

#### **Add Navigation Buttons:**
1. ✅ Add div blocks in Webflow Designer
2. ✅ Give them classes: `swiper-button-prev`, `swiper-button-next`
3. ✅ Publish in Webflow
4. ❌ Don't edit webflow-structure/index.html

---

## 📚 Related Documentation

- [Swiper Integration Guide](../docs/SWIPER-WEBFLOW-GUIDE.md)
- [Swiper Quick Reference](../docs/SWIPER-QUICK-REFERENCE.md)
- [Lite-YouTube Guide](../docs/LITE-YOUTUBE-WEBFLOW-GUIDE.md)
- [Main README](../README.md)

---

## 💡 Summary

**Remember:**
- 📖 This directory = **REFERENCE ONLY**
- 🚫 **NEVER EDIT** files here
- ✅ Make changes in **Webflow Designer** or **src/ directory**
- 🔄 Update this directory **only for reference purposes**
- 🎯 Use it to **understand structure**, not to make changes

**If you edit files here, you're wasting your time. The changes won't appear anywhere.**

---

**Last Updated:** 2025-10-17
**Purpose:** Reference for Webflow HTML structure
**Status:** Read-only reference directory

