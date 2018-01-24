<?php 

add_action( 'wp_enqueue_scripts', 'CGO_enqueue_everything');
// add_action( 'wp_enqueue_scripts', 'salient_child_enqueue_styles');

function CGO_enqueue_everything() {
	salient_child_enqueue_styles();
	CGO_enqueue_js();
}

function salient_child_enqueue_styles() {
		wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css', array('font-awesome'));
		// instead: enqueue webpack styles:
		wp_enqueue_style( 'bundled-styles', get_stylesheet_directory_uri() . '/dist/styles/main.css', array(), date("H:i:s"));

    if ( is_rtl() ) 
   		wp_enqueue_style( 'salient-rtl',  get_template_directory_uri(). '/rtl.css', array(), '1', 'screen' );
}

// load child js
function CGO_enqueue_js() {
	if ( !is_admin() ) :
		// original: wp_register_script('zerojs', $template_directory . '/js/child.js', array('jquery'), '1.0' );
		// instead: register WEBPACK scripts:
		wp_register_script('cgo_common', get_stylesheet_directory_uri() . '/dist/common.bundle.js', array('jquery'), '1.0', false );		
		wp_register_script('cgo_main', get_stylesheet_directory_uri() . '/dist/main.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_home', get_stylesheet_directory_uri() . '/dist/home.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_community', get_stylesheet_directory_uri() . '/dist/community.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_learn', get_stylesheet_directory_uri() . '/dist/learn.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_purpose', get_stylesheet_directory_uri() . '/dist/purpose.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_story', get_stylesheet_directory_uri() . '/dist/story.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_founders', get_stylesheet_directory_uri() . '/dist/founders.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_teachings', get_stylesheet_directory_uri() . '/dist/teachings.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_spiritualPaths', get_stylesheet_directory_uri() . '/dist/spiritualPaths.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_spiritualMasters', get_stylesheet_directory_uri() . '/dist/spiritualMasters.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_offerings', get_stylesheet_directory_uri() . '/dist/offerings.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_locations', get_stylesheet_directory_uri() . '/dist/locations.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_store', get_stylesheet_directory_uri() . '/dist/store.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_connect', get_stylesheet_directory_uri() . '/dist/connect.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_meditation', get_stylesheet_directory_uri() . '/dist/meditation.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_seminars', get_stylesheet_directory_uri() . '/dist/seminars.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_introductory', get_stylesheet_directory_uri() . '/dist/introductory.bundle.js', array('jquery'), '1.0', false );


		wp_enqueue_script('cgo_common');		
		wp_enqueue_script('cgo_main');

		if(is_front_page()) {
			wp_enqueue_script('cgo_home');
			wp_enqueue_style('cgo_home_style', get_stylesheet_directory_uri() . '/dist/styles/home.css');
		} else if(is_page( 'Community' )) {
			wp_enqueue_script('cgo_community');
			wp_enqueue_style('cgo_community_style', get_stylesheet_directory_uri() . '/dist/styles/community.css');
		} else if(is_page( 'Learn' )) {
			wp_enqueue_script('cgo_learn');
			wp_enqueue_style('cgo_learn_style', get_stylesheet_directory_uri() . '/dist/styles/learn.css');
		} else if(is_page( 'Purpose' )) {
			wp_enqueue_script('cgo_purpose');
			wp_enqueue_style('cgo_purpose_style', get_stylesheet_directory_uri() . '/dist/styles/purpose.css');
		} else if(is_page( 'Story' )) {
			wp_enqueue_script('cgo_story');
			wp_enqueue_style('cgo_story_style', get_stylesheet_directory_uri() . '/dist/styles/story.css');
		} else if(is_page( 'Founders' )) {
			wp_enqueue_script('cgo_founders');
			wp_enqueue_style('cgo_founders_style', get_stylesheet_directory_uri() . '/dist/styles/founders.css');
		} else if(is_page( 'Teachings' )) {
			wp_enqueue_script('cgo_teachings');
			wp_enqueue_style('cgo_teachings_style', get_stylesheet_directory_uri() . '/dist/styles/teachings.css');
		} else if(is_page( 'Spiritual Paths' )) {
			wp_enqueue_script('cgo_spiritualPaths');
			wp_enqueue_style('cgo_spiritualPaths_style', get_stylesheet_directory_uri() . '/dist/styles/spiritualPaths.css');
		} else if(is_page( 'Spiritual Masters' )) {
			wp_enqueue_script('cgo_spiritualMasters');
			wp_enqueue_style('cgo_spiritualMasters_style', get_stylesheet_directory_uri() . '/dist/styles/spiritualMasters.css');
		} else if(is_page( 'Offerings' )) {
			wp_enqueue_script('cgo_offerings');
			wp_enqueue_style('cgo_offerings_style', get_stylesheet_directory_uri() . '/dist/styles/offerings.css');
		} else if(is_page( 'Locations' )) {
			wp_enqueue_script('cgo_locations');
			wp_enqueue_style('cgo_locations_style', get_stylesheet_directory_uri() . '/dist/styles/locations.css');
		} else if(is_page( 'Store' )) {
			wp_enqueue_script('cgo_store');
			wp_enqueue_style('cgo_store_style', get_stylesheet_directory_uri() . '/dist/styles/store.css');
		} else if(is_page( 'Connect' )) {
			wp_enqueue_script('cgo_connect');
			wp_enqueue_style('cgo_connect_style', get_stylesheet_directory_uri() . '/dist/styles/connect.css');
		} else if(is_page( 'Meditation' )) {
			wp_enqueue_script('cgo_meditation');
			wp_enqueue_style('cgo_meditation_style', get_stylesheet_directory_uri() . '/dist/styles/meditation.css');
		} else if(is_page( 'Seminars' )) {
			wp_enqueue_script('cgo_seminars');
			wp_enqueue_style('cgo_seminars_style', get_stylesheet_directory_uri() . '/dist/styles/seminars.css');
		} else if(is_page( 'Introductory' )) {
			wp_enqueue_script('cgo_introductory');
			wp_enqueue_style('cgo_introductory_style', get_stylesheet_directory_uri() . '/dist/styles/introductory.css');
		} 
	endif;
}


// redirect to home after logout
add_action('wp_logout','auto_redirect_after_logout');
function auto_redirect_after_logout(){
	wp_redirect( home_url() );
	exit();
}

// block non-admin access to dashboard
add_action( 'init', 'blockusers_init' );
function blockusers_init() {
    if ( is_admin() && !current_user_can( 'administrator' ) &&
		!( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
		wp_redirect( home_url() . "/wp-login.php");
		exit;
    }
}

?>
