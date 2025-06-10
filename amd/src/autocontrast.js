// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Automatic text color contrast system
 *
 * @module      local/accessibility
 * @copyright   2025 GitHub Copilot
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {saveWidgetConfig} from './common';
import $ from 'jquery';

/**
 * Calculate luminance of a color
 * @param {string} hex - Hex color code (e.g., "#ff0000")
 * @returns {number} Luminance value between 0 and 1
 */
const calculateLuminance = (hex) => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Apply gamma correction
    const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Calculate luminance using WCAG formula
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * Get optimal text color (black or white) for given background
 * @param {string} backgroundColor - Background color hex code
 * @returns {string} Either "#000000" or "#ffffff"
 */
const getOptimalTextColor = (backgroundColor) => {
    const luminance = calculateLuminance(backgroundColor);
    // Use threshold of 0.179 for WCAG AA compliance
    return luminance > 0.179 ? '#000000' : '#ffffff';
};

/**
 * Apply automatic text color based on background color
 * @param {string} bgColor - Background color hex code
 */
export const applyAutoTextColor = async (bgColor) => {
    console.log('🎨 Applying auto text color for background:', bgColor);
    
    if (!bgColor || !bgColor.match(/^#[0-9a-f]{6}$/i)) {
        console.warn('Invalid background color format:', bgColor);
        return;
    }
    
    const textColor = getOptimalTextColor(bgColor);
    console.log('✅ Calculated optimal text color:', textColor);
    
    // Apply text color using CSS
    $('body').addClass('accessibility-auto-text');
    
    // Create or update style element
    let $styleElement = $('#accessibility-auto-text-style');
    if ($styleElement.length === 0) {
        $styleElement = $('<style id="accessibility-auto-text-style"></style>');
        $('head').append($styleElement);
    }
    
    const css = `
        body.accessibility-auto-text,
        body.accessibility-auto-text *:not(.mediaplugin, .mediaplugin *, .qnbutton *, .filter_mathjaxloader_equation *, img, .btn, button) {
            color: ${textColor} !important;
        }
    `;
    
    $styleElement.html(css);
    
    // Update text color widget if it exists
    const $textInput = $('#accessibility_textcolour-container input[name="color"]');
    if ($textInput.length) {
        $textInput.val(textColor);
    }
    
    // Save text color configuration
    try {
        await saveWidgetConfig('textcolour', textColor);
        console.log('💾 Text color configuration saved');
    } catch (error) {
        console.error('❌ Error saving text color:', error);
    }
};

/**
 * Reset automatic text color
 */
export const resetAutoTextColor = async () => {
    console.log('🔄 Resetting auto text color');
    
    // Remove CSS class and style
    $('body').removeClass('accessibility-auto-text');
    $('#accessibility-auto-text-style').remove();
    
    // Clear text color widget
    const $textInput = $('#accessibility_textcolour-container input[name="color"]');
    if ($textInput.length) {
        $textInput.val('');
    }
    
    // Clear text color configuration
    try {
        await saveWidgetConfig('textcolour', null);
        console.log('💾 Text color configuration cleared');
    } catch (error) {
        console.error('❌ Error clearing text color:', error);
    }
};