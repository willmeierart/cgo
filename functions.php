<?php 

add_action( 'wp_enqueue_scripts', 'CGO_enqueue_everything');
// add_action( 'wp_enqueue_scripts', 'child_manage_woocommerce_styles', 99);
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
		wp_register_script('cgo_explore', get_stylesheet_directory_uri() . '/dist/explore.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_purpose', get_stylesheet_directory_uri() . '/dist/purpose.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_story', get_stylesheet_directory_uri() . '/dist/story.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_spiritualLineage', get_stylesheet_directory_uri() . '/dist/spiritualLineage.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_teachings', get_stylesheet_directory_uri() . '/dist/teachings.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_spiritualPaths', get_stylesheet_directory_uri() . '/dist/spiritualPaths.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_twoGifts', get_stylesheet_directory_uri() . '/dist/twoGifts.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_giftsSeminars', get_stylesheet_directory_uri() . '/dist/giftsSeminars.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_gmp', get_stylesheet_directory_uri() . '/dist/gmp.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_participate', get_stylesheet_directory_uri() . '/dist/participate.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_meditation', get_stylesheet_directory_uri() . '/dist/meditation.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_seminars', get_stylesheet_directory_uri() . '/dist/seminars.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_introductions', get_stylesheet_directory_uri() . '/dist/introductions.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_calendar', get_stylesheet_directory_uri() . '/dist/calendar.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_otherOpportunities', get_stylesheet_directory_uri() . '/dist/otherOpportunities.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_store', get_stylesheet_directory_uri() . '/dist/store.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_connect', get_stylesheet_directory_uri() . '/dist/connect.bundle.js', array('jquery'), '1.0', false );
		wp_register_script('cgo_userAgreement', get_stylesheet_directory_uri() . '/dist/userAgreement.bundle.js', array('jquery'), '1.0', false );
		
		wp_enqueue_script('cgo_common');		
		wp_enqueue_script('cgo_main');

		if(is_front_page()) {
			wp_enqueue_script('cgo_home');
			wp_enqueue_style('cgo_home_style', get_stylesheet_directory_uri() . '/dist/styles/home.css');
		} else if(is_page( 'Purpose' )) {
			wp_enqueue_script('cgo_purpose');
			wp_enqueue_style('cgo_purpose_style', get_stylesheet_directory_uri() . '/dist/styles/purpose.css');
			wp_enqueue_script('cgo_explore');
			wp_enqueue_style('cgo_explore_style', get_stylesheet_directory_uri() . '/dist/styles/explore.css');
		} else if(is_page( 'Story' )) {
			wp_enqueue_script('cgo_story');
			wp_enqueue_style('cgo_story_style', get_stylesheet_directory_uri() . '/dist/styles/story.css');
			wp_enqueue_script('cgo_explore');
			wp_enqueue_style('cgo_explore_style', get_stylesheet_directory_uri() . '/dist/styles/explore.css');
		} else if(is_page( 'Spiritual Lineage' )) {
			wp_enqueue_script('cgo_spiritualLineage');
			wp_enqueue_style('cgo_spiritualLineage_style', get_stylesheet_directory_uri() . '/dist/styles/spiritualLineage.css');
			wp_enqueue_script('cgo_explore');
			wp_enqueue_style('cgo_explore_style', get_stylesheet_directory_uri() . '/dist/styles/explore.css');
		} else if(is_page( 'Teachings' )) {
			wp_enqueue_script('cgo_teachings');
			wp_enqueue_style('cgo_teachings_style', get_stylesheet_directory_uri() . '/dist/styles/teachings.css');
			wp_enqueue_script('cgo_explore');
			wp_enqueue_style('cgo_explore_style', get_stylesheet_directory_uri() . '/dist/styles/explore.css');
		} else if(is_page( 'Spiritual Paths' )) {
			wp_enqueue_script('cgo_spiritualPaths');
			wp_enqueue_style('cgo_spiritualPaths_style', get_stylesheet_directory_uri() . '/dist/styles/spiritualPaths.css');
			wp_enqueue_script('cgo_explore');
			wp_enqueue_style('cgo_explore_style', get_stylesheet_directory_uri() . '/dist/styles/explore.css');
		} else if(is_page( 'Two Gifts' )) {
			wp_enqueue_script('cgo_twoGifts');
			wp_enqueue_style('cgo_twoGifts_style', get_stylesheet_directory_uri() . '/dist/styles/twoGifts.css');
		} else if(is_page( 'Meditation' )) {
			wp_enqueue_script('cgo_meditation');
			wp_enqueue_script('cgo_participate');
			wp_enqueue_style('cgo_participate_style', get_stylesheet_directory_uri() . '/dist/styles/participate.css');
		} else if(is_page('Seminars')) {
			wp_enqueue_script('cgo_seminars');
			wp_enqueue_script('cgo_participate');
			wp_enqueue_style('cgo_participate_style', get_stylesheet_directory_uri() . '/dist/styles/participate.css');
		} else if(is_page( 'Introductions' )) {
			wp_enqueue_script('cgo_introductions');
			wp_enqueue_script('cgo_participate');
			wp_enqueue_style('cgo_participate_style', get_stylesheet_directory_uri() . '/dist/styles/participate.css');
		} else if(is_page( 'Calendar' )) {
			wp_enqueue_script('cgo_calendar');
			wp_enqueue_script('cgo_participate');
			wp_enqueue_style('cgo_participate_style', get_stylesheet_directory_uri() . '/dist/styles/participate.css');
		} else if(is_page( 'Other Opportunities' )) {
			wp_enqueue_script('cgo_otherOpportunities');
			wp_enqueue_script('cgo_participate');
			wp_enqueue_style('cgo_participate_style', get_stylesheet_directory_uri() . '/dist/styles/participate.css');
		} else if(is_shop()) {
			wp_enqueue_script('cgo_store');
			wp_enqueue_style('cgo_store_style', get_stylesheet_directory_uri() . '/dist/styles/store.css');
		}	else if(is_cart()) {
			wp_enqueue_script('cgo_store');
			wp_enqueue_style('cgo_store_style', get_stylesheet_directory_uri() . '/dist/styles/store.css');
		}	else if(is_checkout()) {
			wp_enqueue_script('cgo_store');
			wp_enqueue_style('cgo_store_style', get_stylesheet_directory_uri() . '/dist/styles/store.css');
		} else if(is_page( 'Connect' )) {
			wp_enqueue_script('cgo_connect');
			wp_enqueue_style('cgo_connect_style', get_stylesheet_directory_uri() . '/dist/styles/connect.css');
		} else if(is_page( 'User Agreement' )) {
			wp_enqueue_script('cgo_userAgreement');
			wp_enqueue_style('cgo_userAgreement_style', get_stylesheet_directory_uri() . '/dist/styles/userAgreement.css');
		}
	endif;
}

add_action( 'wp_enqueue_scripts', 'dequeue_woocommerce_styles_scripts');

function dequeue_woocommerce_styles_scripts() {
    if ( function_exists( 'is_woocommerce' ) ) {
        if ( ! is_woocommerce() && ! is_cart() && ! is_checkout() ) {
						remove_action('wp_enqueue_scripts', [WC_Frontend_Scripts::class, 'load_scripts']);
						remove_action('wp_print_scripts', [WC_Frontend_Scripts::class, 'localize_printed_scripts'], 5);
						remove_action('wp_print_footer_scripts', [WC_Frontend_Scripts::class, 'localize_printed_scripts'], 5);
            # Styles
            wp_dequeue_style( 'woocommerce-general' );
            wp_dequeue_style( 'woocommerce-layout' );
            wp_dequeue_style( 'woocommerce-smallscreen' );
            wp_dequeue_style( 'woocommerce_frontend_styles' );
            wp_dequeue_style( 'woocommerce_fancybox_styles' );
            wp_dequeue_style( 'woocommerce_chosen_styles' );
            wp_dequeue_style( 'woocommerce_prettyPhoto_css' );
            # Scripts
            wp_dequeue_script( 'wc_price_slider' );
            wp_dequeue_script( 'wc-single-product' );
            wp_dequeue_script( 'wc-add-to-cart' );
            wp_dequeue_script( 'wc-cart-fragments' );
            wp_dequeue_script( 'wc-checkout' );
            wp_dequeue_script( 'wc-add-to-cart-variation' );
            wp_dequeue_script( 'wc-single-product' );
            wp_dequeue_script( 'wc-cart' );
            wp_dequeue_script( 'wc-chosen' );
            wp_dequeue_script( 'woocommerce' );
            wp_dequeue_script( 'prettyPhoto' );
            wp_dequeue_script( 'prettyPhoto-init' );
            wp_dequeue_script( 'jquery-blockui' );
            wp_dequeue_script( 'jquery-placeholder' );
            wp_dequeue_script( 'fancybox' );
        }
    }
}


// add custom contact form dynamic recipient plugin
function wpcf7_dynamic_recipient_filter($recipient, $args=array()) {
	$recipient = 'zero@agencyzero.com';
  if (isset($args['select-location'])) {
    if ($args['select-location'] == 'Denver - USA') {
      $recipient = 'michelle@miracle.org';
    } elseif ($args['select-location'] == 'Munich - Europe') {
      $recipient = 'karin.theisen@web.de';
    } elseif ($args['select-location'] == 'Latin America') {
      $recipient = 'rosa@miracle.org';
    } elseif ($args['select-location'] == 'Perth - Australia') {
      $recipient = 'gmpperth@gmail.com';
    } elseif ($args['select-location'] == 'tester') {
      $recipient = 'will@agencyzero.com';
    } elseif ($args['select-location'] == 'tester2') {
      $recipient = 'willmeierart@gmail.com';
    } elseif ($args['select-location'] == 'tester3') {
      $recipient = 'zero@agencyzero.com';
    }
  }
  return $recipient;
} // end function wpcf7-dynamic-email
add_filter('wpcf7-dynamic-recipient-example-filter', 'wpcf7_dynamic_recipient_filter', 10, 2);


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
