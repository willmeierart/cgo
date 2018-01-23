<?php 

add_action( 'wp_enqueue_scripts', 'salient_child_enqueue_styles');
function salient_child_enqueue_styles() {
	
		wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css', array('font-awesome'));
		/*wp_enqueue_style( 'child-style',
			get_stylesheet_directory_uri() . '/style.css',
		)*/

    if ( is_rtl() ) 
   		wp_enqueue_style(  'salient-rtl',  get_template_directory_uri(). '/rtl.css', array(), '1', 'screen' );
}

// load child js
if ( !is_admin() ) :
	// register script location, dependencies and version
	wp_register_script('zerojs', $template_directory . '/js/child.js', array('jquery'), '1.0' );

	// enqueue the script
	wp_enqueue_script('zerojs');
endif;

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
