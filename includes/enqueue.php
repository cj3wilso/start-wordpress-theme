<?php
add_action( 'wp_enqueue_scripts', 'main_scripts', 100 );
//add_action( 'admin_enqueue_scripts', 'admin_scripts', 100 );

function admin_scripts() {
	global $version;
	wp_enqueue_style( THEME_TEXTDOMAIN, get_stylesheet_directory_uri() . '/assets/admin/css/style.css', '', $version );
	wp_enqueue_script( THEME_TEXTDOMAIN, get_stylesheet_directory_uri() . '/assets/admin/js/script.js', array(), $version, true );
	wp_localize_script( THEME_TEXTDOMAIN, THEME_TEXTDOMAIN, array(
		'theme_url' => get_stylesheet_directory_uri()
	));
	wp_enqueue_script( 'admin', get_stylesheet_directory_uri() . '/assets/js/admin.js', array(), $version, true );
}

/**
 * Enqueue and register theme scripts.
 */
function main_scripts() {
    global $version;
	
	//If you want to load fonts, you can here
	//wp_enqueue_style( 'bigshoulders', 'https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text:wght@100;300;400;500;600;700;800;900&display=swap', array(), '1.0.0' );

	//Need this to target browsers
	//https://rafael.adm.br/css_browser_selector/
	wp_enqueue_script( "browser-sniff",  get_stylesheet_directory_uri() . "/assets/js/css_browser_selector.js", array(), "0.4.0", true );
	
	//Parent styles
	$parenthandle = 'wp-bootstrap-starter-style'; // This is 'twentyfifteen-style' for the Twenty Fifteen theme.
    $theme = wp_get_theme();
	wp_dequeue_style( $parenthandle );
	wp_deregister_style( $parenthandle );
	wp_register_style( 'wp-bootstrap-starter-style', get_template_directory_uri() . '/style.css', false, $theme->parent()->get('Version') ); 
	wp_enqueue_style( 'wp-bootstrap-starter-style' );
	
    wp_enqueue_style( THEME_TEXTDOMAIN, get_stylesheet_directory_uri() . '/assets/css/style.css', $parenthandle, $version );
    wp_enqueue_script( THEME_TEXTDOMAIN, get_stylesheet_directory_uri() . '/assets/js/script-min.js', array(), $version, true );
	
	wp_localize_script( THEME_TEXTDOMAIN, THEME_TEXTDOMAIN, array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
        'redirect_url' => get_permalink(),
		'home_url' => get_home_url(),
        'admin_url' => admin_url(),
		'theme_url' => get_stylesheet_directory_uri()
	));

}

//When you only need plan javascript with no associations
//https://digwp.com/2019/07/better-inline-script/
function site_inline_scripts() {
	global $current_user;
	$property = "UA-179114067-1";
	$property_ga4 = "G-VXJK50TWT1";
	$staging = false;
	if($_SERVER['HTTP_HOST']!="mongooseandmink.com"){
		$property = "UA-179114067-2";
		$property_ga4 = "";
		$staging = true;
	}
    if ( !isset( $current_user->roles[0] ) || $current_user->roles[0] == 'customer' || $staging == true) {
	?>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $property; ?>"></script>
	<?php
	}
	?>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', '<?php echo $property; ?>');
	  gtag('config', '<?php echo $property_ga4; ?>');
	</script>
	<script>
		<!-- Hotjar Heatmaps -->
		<!-- https://insights.hotjar.com/sites/2210880/dashboard -->
		(function(h,o,t,j,a,r){
			h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
			h._hjSettings={hjid:2210880,hjsv:6};
			a=o.getElementsByTagName('head')[0];
			r=o.createElement('script');r.async=1;
			r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
			a.appendChild(r);
		})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
		<?php
		//SEARCH TRACKING
		if(is_search()){
		?>
		gtag('event', 'search', { search_term : <?php echo "'".$_GET['s']."'"; ?> });
		<?php
		}
		//PURCHASE TRACKING
		//https://docs.woocommerce.com/document/conditional-tags/
		if(is_wc_endpoint_url( 'order-received' )){
			$order_id = wc_get_order_id_by_order_key($_GET['key']);
			$order = wc_get_order( $order_id );
			$coupons = $order->get_coupon_codes();
			// Loop through order tax items
			foreach( $order->get_items('tax') as $item ){
				$tax_name        = $item->get_name(); // Get rate code name (item title)
				$tax_rate_code   = $item->get_rate_code(); // Get rate code
				$tax_rate_label  = $item->get_label(); // Get label
				$rate_id     = $item->get_rate_id(); // Get rate Id
				$tax_total   = $item->get_tax_total(); // Get tax total amount (for this rate)
			}
			?>
			//https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce
			gtag('event', 'purchase', {
				"transaction_id": <?php echo $order_id; ?>,
				"affiliation": "Mongoose & Mink",
				"value": <?php echo $order->get_total(); ?>,
				"currency": <?php echo '"'.$order->get_currency().'"'; ?>,
				"tax": <?php echo '"'.$tax_total.'"'; ?>,
				"shipping": <?php echo '"'.$order->get_shipping_total().'"'; ?>,
				"checkout_option": <?php echo '"'.$order->get_payment_method_title().'"'; ?>,
				<?php 
				if(count($coupons)>1){
				?>
				"coupon": <?php echo '"'.$coupon[0].'"'; ?>,
				<?php 
				}
				?>
				"items": [
				<?php
				$order_items = $order->get_items();
				$i = 1;
				foreach( $order_items as $item_id => $item ){
					// order item data as an array
					$item_data = $item->get_data();
					$product_id = $item->get_product_id();
					$variation_id = $item->get_variation_id();
					$variation_name = "";
					if($variation_id!=0){
						$variation = wc_get_product($variation_id);
						$variation_name = $variation->get_formatted_name();
					}
					// Get the product categories for the product
					$categories = wp_get_post_terms( $product_id, 'product_cat', array( 'fields' => 'names' ) );
					$category = reset($categories); // Keep only the first product category
					$brand = get_the_terms( $product_id, 'pwb-brand', '', ', ', '' );
					$brand = $brand[0]->name;
					//"list_name": "Search Results",
				?>
					{
					  "id": <?php echo '"'.$product_id.'"'; ?>,
					  "name": <?php echo '"'.$item_data['name'].'"'; ?>,
					  "brand": <?php echo '"'.$brand.'"'; ?>,
					  "category": <?php echo '"'.$category.'"'; ?>,
					  "variant": <?php echo '"'.$variation_name.'"'; ?>,
					  "list_position": <?php echo $i; ?>,
					  "quantity": <?php echo $item_data['quantity']; ?>,
					  "price": <?php echo '"'.$item_data['total'].'"'; ?>
					},
				<?php
					$i++;
				}
				?>
				]
			});
			<?php
		}
		?>
	</script>
	<?php
}
add_action('wp_footer', 'site_inline_scripts', 17);