<?php
/**
 * PHPUnit bootstrap file
 *
 * @package Plugin_membership_operator_associate_templates
 */

$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}
if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
	echo "Could not find $_tests_dir/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require dirname( dirname( __FILE__ ) ) . '/plugin_membership_operator_associate_templates.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// putenv('WP_TESTS_SKIP_INSTALL=1');
// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';
