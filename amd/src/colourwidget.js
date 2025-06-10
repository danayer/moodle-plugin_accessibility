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
 * Default script for colourpicker widgets with automatic contrast
 *
 * @module      local/accessibility
 * @copyright   2023 Ponlawat Weerapanpisit <ponlawat_w@outlook.co.th>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {saveWidgetConfig} from './common';
import $ from 'jquery';

// Inline auto contrast functions to avoid module loading issues
const calculateLuminance = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

const getOptimalTextColor = (backgroundColor) => {
    const luminance = calculateLuminance(backgroundColor);
    return luminance > 0.179 ? '#000000' : '#ffffff';
};

const applyAutoTextColor = async (bgColor) => {
    console.log('🎨 AUTO CONTRAST: Applying auto text color for background:', bgColor);
    
    if (!bgColor || !bgColor.match(/^#[0-9a-f]{6}$/i)) {
        console.warn('❌ Invalid background color format:', bgColor);
        return;
    }
    
    const textColor = getOptimalTextColor(bgColor);
    console.log('✅ AUTO CONTRAST: Calculated optimal text color:', textColor);
    
    // Apply text color using CSS
    $('body').addClass('accessibility-auto-text');
    
    // Create or update style element
    let $styleElement = $('#accessibility-auto-text-style');
    if ($styleElement.length === 0) {
        $styleElement = $('<style id="accessibility-auto-text-style"></style>');
        $('head').append($styleElement);
        console.log('📝 AUTO CONTRAST: Created new style element');
    }
    
    // Enhanced CSS with higher specificity and more comprehensive targeting
    const css = `
        body.accessibility-auto-text,
        body.accessibility-auto-text *,
        body.accessibility-auto-text h1,
        body.accessibility-auto-text h2,
        body.accessibility-auto-text h3,
        body.accessibility-auto-text h4,
        body.accessibility-auto-text h5,
        body.accessibility-auto-text h6,
        body.accessibility-auto-text p,
        body.accessibility-auto-text div,
        body.accessibility-auto-text span,
        body.accessibility-auto-text li,
        body.accessibility-auto-text a,
        body.accessibility-auto-text td,
        body.accessibility-auto-text th,
        body.accessibility-auto-text label,
        body.accessibility-auto-text .text-muted,
        body.accessibility-auto-text .card-text,
        body.accessibility-auto-text .navbar-text {
            color: ${textColor} !important;
        }
        
        /* Exclude specific elements that should keep their original colors */
        body.accessibility-auto-text .btn,
        body.accessibility-auto-text button,
        body.accessibility-auto-text .mediaplugin,
        body.accessibility-auto-text .mediaplugin *,
        body.accessibility-auto-text .qnbutton,
        body.accessibility-auto-text .qnbutton *,
        body.accessibility-auto-text .filter_mathjaxloader_equation,
        body.accessibility-auto-text .filter_mathjaxloader_equation *,
        body.accessibility-auto-text img,
        body.accessibility-auto-text .badge,
        body.accessibility-auto-text .alert {
            color: initial !important;
        }
    `;
    
    $styleElement.html(css);
    console.log('🎯 AUTO CONTRAST: Applied enhanced CSS with higher specificity');
    console.log('🎯 AUTO CONTRAST: Text color should now be:', textColor);
    
    // Update text color widget if it exists
    const $textInput = $('#accessibility_textcolour-container input[name="color"]');
    if ($textInput.length) {
        $textInput.val(textColor);
        console.log('🔄 AUTO CONTRAST: Updated text color input field to:', textColor);
    } else {
        console.log('⚠️ AUTO CONTRAST: Text color input field not found');
    }
    
    // Save text color configuration
    try {
        await saveWidgetConfig('textcolour', textColor);
        console.log('💾 AUTO CONTRAST: Text color configuration saved');
    } catch (error) {
        console.error('❌ AUTO CONTRAST: Error saving text color:', error);
    }
    
    // Visual verification
    console.log('👁️ AUTO CONTRAST: Check page - all text should now be', textColor);
    console.log('👁️ AUTO CONTRAST: If text is still not visible, inspect element to check CSS conflicts');
};

const resetAutoTextColor = async () => {
    console.log('🔄 AUTO CONTRAST: Resetting auto text color');
    
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
        console.log('💾 AUTO CONTRAST: Text color configuration cleared');
    } catch (error) {
        console.error('❌ AUTO CONTRAST: Error clearing text color:', error);
    }
};

/**
 * Function to initialise a colour-picker widget
 * @param {string} widget plugin full name
 * @param {string} savewidgetname widget name to be saved as user config
 * @param {string} stylename css attribute name to be applied the colour value
 * @param {string} bodyclassname class name of default value in body tag
 * @param {string} selector css selector of affected elements
 */
export const init = (widget, savewidgetname, stylename, bodyclassname = undefined, selector = 'body, body *') => {
    console.log('🚀 COLOURWIDGET: Initializing widget:', widget, savewidgetname, stylename);
    
    $(() => {
        const revokedefault = () => {
            if (bodyclassname) {
                $('body').removeClass(bodyclassname);
            }
        };

        const defaultattrname = `data-default-${stylename}`;
        const $container = $(`#${widget}-container`);
        if (!$container.length) {
            console.log('❌ COLOURWIDGET: Container not found:', `#${widget}-container`);
            return;
        }

        const $input = $container.find(`input[name=color]`);
        if (!$input.length) {
            console.log('❌ COLOURWIDGET: Color input not found');
            return;
        }
        
        console.log('✅ COLOURWIDGET: Setting up event handlers for:', savewidgetname);
        
        $input.on('change input', async() => {
            const colour = $input.val();
            console.log('🎨 COLOURWIDGET: Color changed to:', colour, 'for widget:', savewidgetname);
            
            if (!colour) {
                return;
            }
            if (!/#[0-9a-f]{6}/gi.exec(colour)) {
                console.log('❌ COLOURWIDGET: Invalid color format');
                return;
            }
            revokedefault();
            for (const $element of [...$(selector)].map(e => $(e))) {
                if (!$element.attr(defaultattrname)) {
                    $element.attr(defaultattrname, $element.css(stylename));
                }
                $element.css(stylename, colour);
            }
            await saveWidgetConfig(savewidgetname, colour);
            
            // 🎯 AUTO CONTRAST: Apply automatic text color when background changes
            if (savewidgetname === 'backgroundcolour' && stylename === 'background-color') {
                console.log('🎯 COLOURWIDGET: Background color detected! Triggering auto contrast...');
                await applyAutoTextColor(colour);
            } else {
                console.log('ℹ️ COLOURWIDGET: Not a background color change, no auto contrast applied');
            }
        });

        const $resetbtn = $container.find(`.${widget}-resetbtn`);
        if ($resetbtn.length) {
            $resetbtn.on('click', async() => {
                console.log('🔄 COLOURWIDGET: Reset button clicked for:', savewidgetname);
                $input.val('');
                revokedefault();
                for (const element of [...$(selector)]) {
                    const $element = $(element);
                    const defaultcolour = $element.attr(defaultattrname) ?? '';
                    $element.css(stylename, defaultcolour);
                    $element.removeAttr(defaultattrname);
                }
                await saveWidgetConfig(savewidgetname, null);
                
                // 🎯 AUTO CONTRAST: Reset automatic text color when background is reset
                if (savewidgetname === 'backgroundcolour' && stylename === 'background-color') {
                    console.log('🔄 COLOURWIDGET: Background reset detected! Resetting auto contrast...');
                    await resetAutoTextColor();
                }
            });
        } else {
            console.log('⚠️ COLOURWIDGET: Reset button not found');
        }
        
        console.log('✅ COLOURWIDGET: Widget initialization complete for:', savewidgetname);
    });
};
