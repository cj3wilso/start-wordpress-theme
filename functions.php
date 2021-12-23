<?php
/**
 * Versions
 */
$version = '0.001';
if($_SERVER['HTTP_HOST']=="localhost" || strpos($_SERVER['HTTP_HOST'], 'staging') !== false){
	$version = time();
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
}

define( 'THEME_TEXTDOMAIN', 'aoleoils' );
define( 'INCLUDES_DIR', get_stylesheet_directory() . '/includes' );


require INCLUDES_DIR . '/global.php';
require INCLUDES_DIR . '/enqueue.php';