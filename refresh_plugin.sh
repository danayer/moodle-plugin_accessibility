#!/bin/bash
# Refresh Moodle Accessibility Plugin
# This script will trigger Moodle to reload the plugin with the new automatic contrast features

echo "🔄 Refreshing Moodle Accessibility Plugin..."

# Navigate to Moodle directory
cd /var/www/html/moodle

# Trigger Moodle upgrade process
echo "📦 Triggering plugin upgrade..."
php admin/cli/upgrade.php --non-interactive

# Clear all caches
echo "🧹 Clearing all caches..."
php admin/cli/purge_caches.php

# Set proper permissions
echo "🔒 Setting file permissions..."
chmod -R 755 local/accessibility/
chown -R www-data:www-data local/accessibility/

echo "✅ Plugin refresh complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Open your browser and go to any Moodle page"
echo "2. Hard refresh the page (Ctrl+F5)"
echo "3. Open the accessibility panel"
echo "4. Try changing the background color"
echo "5. Watch the text color change automatically!"
echo ""
echo "🎨 The automatic text color contrast system is now active!"