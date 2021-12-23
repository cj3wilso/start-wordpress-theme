<?php 
//Email setup
$admin_email = "contact@aoleoils.com";
$test_email = "rabi@jabbarandcompany.com";
$headers = 'From: AOLE Oils <contact@aoleoils.com>' . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

//User info
$current_user = wp_get_current_user();

//Get a substring between two strings
function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}

//Keep Remember Me Users Logged In for Full Year
function change_cookie_expiration($expiration, $user_id, $remember) {
    if ($remember) {
        $expiration = 365 * 86400; // means 365 days and the default value is 14 days
    }else{
		$expiration = 14 * 86400; // now regular logins are logged in for 14 days
	}
    return $expiration;
}
add_filter('auth_cookie_expiration', 'change_cookie_expiration', 10, 3);