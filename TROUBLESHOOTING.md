# Troubleshooting Guide - Automatic Text Color Feature

## How to Debug the Issue

### Step 1: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Navigate to a page with the accessibility widget
4. Try changing the background color
5. Look for these console messages:

**Expected Console Output:**
```
colourwidget init called for: accessibility_backgroundcolour backgroundcolour background-color
Setting up color input event handlers
Color input changed to: #ff0000
Background color detected, applying auto text color
applyAutoTextColor called with: #ff0000
Calculated optimal text color: #ffffff
Text color configuration saved
Updated text color input field
Auto text color applied successfully
```

### Step 2: Check for JavaScript Errors
Look for any error messages in the console that might indicate:
- Module loading failures
- Missing dependencies
- Network errors

### Step 3: Verify Widget Containers
Check if these elements exist on the page:
- `#accessibility_backgroundcolour-container`
- `#accessibility_textcolour-container`
- Color input: `input[name=color]`

### Step 4: Test Manual Function Call
In the browser console, try manually calling:
```javascript
require(['local_accessibility/colorcontrast'], function(colorcontrast) {
    colorcontrast.applyAutoTextColor('#ff0000');
});
```

## Common Issues and Solutions

### Issue 1: No Console Messages
**Problem**: No debug messages appear
**Solution**: 
- Clear browser cache
- Check if plugins are enabled in Moodle admin
- Verify JavaScript files are loaded

### Issue 2: "Module not found" Error
**Problem**: JavaScript modules not loading
**Solution**:
- Check file permissions on amd/build/ directory
- Ensure Moodle cache is cleared
- Verify file paths are correct

### Issue 3: Widget Container Not Found
**Problem**: Elements missing from page
**Solution**:
- Check if both backgroundcolour and textcolour widgets are enabled
- Verify widget templates are rendering correctly
- Check for conflicting CSS that might hide elements

### Issue 4: Color Format Issues
**Problem**: Invalid color format messages
**Solution**:
- Ensure color picker returns 6-digit hex codes
- Check color input validation

## Manual Testing Steps

1. **Enable both widgets** in Moodle admin
2. **Clear all caches** (Moodle and browser)
3. **Navigate to any Moodle page**
4. **Open the accessibility panel**
5. **Select a background color**
6. **Check if text color changes automatically**

## Quick Fix Options

If the automatic feature isn't working, you can:

1. **Use widgets separately**: Background and text color widgets still work independently
2. **Manual color coordination**: Choose contrasting colors manually
3. **Check server logs**: Look for PHP errors in Moodle logs

## Support Information

- Check Moodle version compatibility (requires 4.0+)
- Ensure local_accessibility plugin is latest version
- Verify both backgroundcolour and textcolour sub-plugins are installed