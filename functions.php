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
	
		wp_enqueue_script('cgo_common');		
		wp_enqueue_script('cgo_main');

		if(is_front_page()) {
			wp_enqueue_style('cgo_home_style', get_stylesheet_directory_uri() . '/dist/styles/home.css');
			wp_enqueue_script('cgo_home');
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
