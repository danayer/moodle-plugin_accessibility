# Moodle Accessibility Plugin 🎯

A comprehensive accessibility enhancement plugin for Moodle that provides customizable visual accessibility tools through a modular widget system with automatic contrast adjustment.

## 🌟 Features

### Core Functionality
- **Modular Widget System**: Extensible architecture with subplugin support
- **Real-time Accessibility Panel**: Easy-to-use interface with instant visual feedback
- **User Configuration Storage**: Persistent settings for both logged-in and guest users
- **Administrative Management**: Complete control over enabled widgets and their order
- **WCAG Compliance**: Ensures accessibility standards are met

### Available Widgets
- **Background Color**: Change page background with automatic text contrast adjustment
- **Text Color**: Customize text color with intelligent contrast optimization
- **Font Size**: Adjustable text size with range slider
- **Font Face**: Typography selection for better readability
- **Font Kerning**: Character spacing adjustments
- **Letter Spacing**: Custom letter spacing control
- **Line Height**: Text line spacing modification
- **Image Visibility**: Toggle image display for better focus
- **Link Highlighting**: Enhanced link visibility

### 🎨 Automatic Contrast System
Revolutionary automatic text color adjustment that:
- **Calculates optimal contrast** using WCAG 2.1 luminance formulas
- **Ensures 4.5:1 contrast ratio** for AA compliance
- **Applies instantly** when background colors change
- **Preserves UI elements** like buttons and media content
- **Works seamlessly** with both widgets simultaneously

## 🚀 Installation

### Method 1: Git Installation (Recommended)
```bash
# From Moodle root directory
git clone https://github.com/dawillygene/moodle-local_accessibility.git local/accessibility
cd local/accessibility

# Optional: Install with pre-built widgets
git checkout v1.0.1-with-widgets
```

### Method 2: ZIP Upload
1. Download the latest release from [GitHub](https://github.com/dawillygene/moodle-local_accessibility)
2. Go to **Site Administration > Plugins > Install plugins**
3. Upload the ZIP file and follow installation prompts

### Method 3: Manual Installation
1. Extract plugin files to `{moodle-root}/local/accessibility/`
2. Navigate to **Site Administration > Notifications**
3. Complete the installation process

### CLI Installation
```bash
# Complete installation from command line
php admin/cli/upgrade.php
```

## ⚙️ Configuration

### Enable Widgets
1. Go to **Site Administration > Plugins > Accessibility Widgets > Manage Enabled Widgets**
2. Select and enable desired widgets
3. Arrange widgets in preferred order using up/down controls
4. Save configuration

### Widget Requirements
This plugin requires subplugins (widgets) to be installed in the `widgets/` directory. The main plugin provides the framework, while individual widgets provide specific functionality.

## 🎯 Usage

### For Users
1. **Access Panel**: Click the accessibility button (universal access icon) on any page
2. **Customize Settings**: Use sliders, color pickers, and toggles to adjust visual preferences
3. **Reset Options**: Use individual widget reset buttons or "Reset All" for defaults
4. **Automatic Features**: Background color changes automatically adjust text color for optimal contrast

### For Administrators
- **Widget Management**: Enable/disable widgets site-wide
- **Order Control**: Arrange widgets in logical sequence
- **User Monitoring**: Track accessibility feature usage
- **Performance**: Cached styles for optimal loading

## 🧩 Widget Development

### Creating Custom Widgets
```php
// Basic widget structure
namespace accessibility_mywidget;
use local_accessibility\widgets\widgetbase;

class mywidget extends widgetbase {
    public function getcontent() {
        return $this->render_template();
    }
    
    public function init() {
        // Initialize JavaScript and CSS
    }
}
```

### Widget Types Available
- **Range Widgets**: Slider-based controls (font size, spacing)
- **Color Widgets**: Color picker controls (text, background)
- **Toggle Widgets**: On/off functionality (image visibility)
- **Custom Widgets**: Unlimited possibilities with base class

### Development Resources
- [Widget Development Guide](./widgets/README.md)
- [Example Widgets on GitHub](https://github.com/ponlawat-w/)
- PHP Unit tests included for quality assurance

## 🧪 Testing

### Automated Testing
```bash
# Run PHPUnit tests
vendor/bin/phpunit local/accessibility/tests/

# Test specific features
php admin/tool/phpunit/cli/util.php --buildcomponentconfigs
```

### Manual Testing
- Use `/test_autocontrast.html` for standalone contrast testing
- Browser console provides detailed logging with emoji indicators
- Test with various background colors and verify automatic text adjustments

### Browser Compatibility
- ✅ Chrome/Chromium (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)  
- ✅ Edge (all versions)

## 🔧 Technical Specifications

### System Requirements
- **Moodle**: 4.0+ (tested up to 4.5)
- **PHP**: 7.4+ (8.0+ recommended)
- **Database**: MySQL/MariaDB, PostgreSQL
- **JavaScript**: ES6+ support required

### Architecture
- **Plugin Type**: Local Moodle plugin
- **Subplugin Support**: Accessibility widget type
- **Hook System**: Moodle 4.3+ hooks (backward compatible)
- **JavaScript Modules**: AMD/ES6 modules with jQuery
- **Styling**: CSS3 with dynamic injection
- **Storage**: Moodle database with user preferences

### Performance Features
- **Lazy Loading**: JavaScript modules load on demand
- **CSS Caching**: Compiled styles cached for performance
- **Minimal DOM Impact**: Targeted element selection
- **Event Optimization**: Debounced input handlers

## 📊 Advanced Features

### Automatic Contrast Technology
```javascript
// WCAG 2.1 compliant luminance calculation
const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
const optimalColor = luminance > 0.179 ? '#000000' : '#ffffff';
```

### User Experience Enhancements
- **Visual Feedback**: Real-time preview of changes
- **Persistent Settings**: Configurations saved per user
- **Guest Support**: Accessibility for non-logged-in users
- **Mobile Responsive**: Works on all device sizes
- **Keyboard Navigation**: Full keyboard accessibility

### Administrative Features
- **Usage Analytics**: Track which widgets are most used
- **Bulk Configuration**: Import/export accessibility settings
- **Theme Integration**: Works with all Moodle themes
- **Multi-language**: Full translation support

## 🛠️ Troubleshooting

### Common Issues

**Widgets Not Appearing**
- Ensure widgets are enabled in admin settings
- Clear Moodle cache: `php admin/cli/purge_caches.php`
- Check file permissions on plugin directory

**JavaScript Errors**
- Verify browser console for specific errors
- Test with `/test_autocontrast.html` standalone page
- Ensure JavaScript is enabled in browser

**Automatic Contrast Not Working**
- Check if both background and text color widgets are enabled
- Look for console messages with 🎨 emoji indicators
- Verify color format is 6-digit hex (#ffffff)

### Performance Optimization
```bash
# Clear all caches
php admin/cli/purge_caches.php

# Rebuild JavaScript modules
php admin/cli/build_theme_css.php --theme=all
```

### Support Resources
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [GitHub Issues](https://github.com/dawillygene/moodle-local_accessibility/issues)
- [Development Progress](./progress.md)

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly
4. Run automated tests: `vendor/bin/phpunit`
5. Submit pull request with detailed description

### Code Standards
- Follow Moodle coding standards
- Include PHPDoc comments
- Add unit tests for new features
- Use semantic commit messages

### Widget Contributions
New widgets are welcome! Follow the [Widget Development Guide](./widgets/README.md) and submit as separate repositories that can be installed as subplugins.

## 📈 Roadmap

### Upcoming Features
- **AI-Powered Suggestions**: Intelligent accessibility recommendations
- **Advanced Color Palettes**: Pre-defined accessible color schemes
- **Reading Mode**: Focused reading experience with optimized layouts
- **Voice Controls**: Voice-activated accessibility adjustments
- **Analytics Dashboard**: Detailed usage statistics for administrators

### Long-term Goals
- Integration with external accessibility testing tools
- Support for additional disability types
- Machine learning for personalized accessibility
- Integration with assistive technologies

## 📄 License

**GNU General Public License v3.0**

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

## 👨‍💻 Author & Maintainer

**ELIA WILLIAM MARIKI** ([@dawillygene](https://github.com/dawillygene))
- 📧 Email: [Contact via GitHub](https://github.com/dawillygene)
- 🌐 Repository: [https://github.com/dawillygene/moodle-local_accessibility](https://github.com/dawillygene/moodle-local_accessibility)
- 💼 LinkedIn: Connect for professional collaboration
- 🐦 Twitter: Follow for updates and accessibility insights

### Original Concept
Original plugin concept by Ponlawat Weerapanpisit, enhanced and maintained by Elia William Mariki with significant improvements including the automatic contrast system and modern architecture.

## 🙏 Acknowledgments

- **Moodle Community**: For the excellent platform and development resources
- **Accessibility Advocates**: For guidance on WCAG compliance and best practices
- **Beta Testers**: Users who provided valuable feedback and testing
- **Open Source Contributors**: Developers who contributed code, documentation, and ideas

## 📞 Support & Contact

### Get Help
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/dawillygene/moodle-local_accessibility/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/dawillygene/moodle-local_accessibility/discussions)
- 📖 **Documentation**: [Wiki Pages](https://github.com/dawillygene/moodle-local_accessibility/wiki)
- 🗨️ **Community**: [Moodle Forums](https://moodle.org/mod/forum/)

### Professional Services
Available for custom development, consulting, and enterprise support. Contact through GitHub for:
- Custom widget development
- Enterprise deployments
- Accessibility audits
- Training and workshops

---

**Made with ❤️ for digital accessibility • Empowering inclusive education worldwide** 

[![GitHub Stars](https://img.shields.io/github/stars/dawillygene/moodle-local_accessibility?style=social)](https://github.com/dawillygene/moodle-local_accessibility)
[![GitHub Forks](https://img.shields.io/github/forks/dawillygene/moodle-local_accessibility?style=social)](https://github.com/dawillygene/moodle-local_accessibility/fork)
[![GitHub Issues](https://img.shields.io/github/issues/dawillygene/moodle-local_accessibility)](https://github.com/dawillygene/moodle-local_accessibility/issues)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
