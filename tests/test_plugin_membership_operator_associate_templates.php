<?php

function get_field($key, $id) {
    return $key;
}

class Plugin_MOAT_Test extends WP_UnitTestCase {

    public function test_action_rest_api_init() {
        $this->assertEquals(
            10,
            has_action( 'rest_api_init', 'plugin_moat_add_meta_data' )
        );
    }

    public function test_filter_rest_organisation_query() {
        $this->assertEquals(
            10,
            has_filter( 'rest_organisation_query', 'filter_rest_organisation_query' )
        );
    }

    public function test_filter_rest_endpoints() {
        $this->assertTrue(
            has_filter( 'rest_endpoints' )
        );
    }

    public function test_action_wp_enqueue_scripts() {
        $this->assertEquals(
            10,
            has_action( 'wp_enqueue_scripts', 'plugin_moat_scripts' )
        );
    }

    public function test_action_wp_enqueue_scripts_styles() {
        $this->assertEquals(
            10,
            has_action( 'wp_enqueue_scripts', 'plugin_moat_styles' )
        );
    }

    public function test_get_meta_data() {
        $post = array('id' => 123);
        $expected =  array(
            'country'       => 'country',
            'logo'          => 'logo',
            'member_type'   => 'member_type',
            'website'       => 'website',
            'Website'       => 'Website',
            'twitter'       => 'twitter',
            'facebook'      => 'facebook',
            'linkedin'      => 'linkedin',
            'contact_email' => 'contact_email',
        );

        $this->assertEquals(get_meta_data($post), $expected);
    }
}