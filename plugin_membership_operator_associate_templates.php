<?php
/*
 * Plugin Name: GSMA templates for operator members and associate members
 * Description: Template pages for Membership including Associate Members and Operator Members.
 * Version: 0.1
 * Author: Jinjin XU (with some codes from plugin_membership_templates)
 * Author URI:
 * License:
 */


/*
 * Page templater allows us to add page templates if needed.
 * Add templates to array on line 75 of page_templater.php
 * template paths should be relative to page_templater.php
 */
include 'page_templater.php';

function plugin_moat_add_meta_data() {
    register_rest_field(
        'organisation',
        'meta',
        array(
            'get_callback' => 'get_meta_data',
        )
    );
}

function get_meta_data( $object ) {
    $country = get_field('country', $object['id']);
    $logo = get_field('logo', $object['id']);
    $member_type = get_field('member_type', $object['id']);
    $website = get_field('website', $object['id']);
    $Website = get_field('Website', $object['id']);
    $twitter = get_field('twitter', $object['id']);
    $facebook = get_field('facebook', $object['id']);
    $linkedin = get_field('linkedin', $object['id']);
    $contact_email = get_field('contact_email', $object['id']);
    return array(
        'country'       => $country,
        'logo'          => $logo,
        'member_type'   => $member_type,
        'website'       => $website,
        'Website'       => $Website,
        'twitter'       => $twitter,
        'facebook'      => $facebook,
        'linkedin'      => $linkedin,
        'contact_email' => $contact_email,
    );
}
add_action( 'rest_api_init', 'plugin_moat_add_meta_data' );

add_filter('rest_endpoints', function ($routes) {
    $routes['/wp/v2/organisation'][0]['args']['orderby']['enum'][] = 'country';

    $routes['/wp/v2/organisation'][0]['args']['meta_key'] = array(
        'description'       => 'The meta key to query.',
        'type'              => 'string',
        'enum'              => ['country'],
        'validate_callback' => 'rest_validate_request_arg',
    );

    return $routes;
});

function filter_rest_organisation_query($query_vars, $request) {
    $orderby = $request->get_param('orderby');
    if (isset($orderby) && $orderby === 'country') {
        $query_vars['orderby'] = 'meta_value title';
        $query_vars['meta_key'] = 'country';
    }
    return $query_vars;
}

add_filter( 'rest_organisation_query', 'filter_rest_organisation_query', 10, 2);

function plugin_moat_scripts() {
    wp_enqueue_script( 'plugin_moat', plugins_url( 'builds/main.js', __FILE__ ), array(), null, true );
     wp_localize_script('plugin_moat', 'php_var', array(
            'full_member_str'      => __($GLOBALS['string_is_gsma_full_member']),
            'associate_member_str' => __($GLOBALS['string_is_gsma_associate_member']),
            'default_logo'         => __(get_template_directory_uri() . '/images/organisation_default.jpg')
        )
    );
}
add_action( 'wp_enqueue_scripts', 'plugin_moat_scripts' );

function plugin_moat_styles(){
    wp_enqueue_style( 'plugin-moat', plugins_url( 'builds/main.css', __FILE__ ) );
}

add_action( 'wp_enqueue_scripts', 'plugin_moat_styles' );
