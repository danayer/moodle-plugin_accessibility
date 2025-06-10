<?php
// Force clear Moodle JavaScript cache and reload modules
require_once('../../config.php');

// Clear all caches
purge_all_caches();

// Redirect back to main page
redirect(new moodle_url('/'), 'JavaScript cache cleared! Please refresh your browser.', 3);
?>