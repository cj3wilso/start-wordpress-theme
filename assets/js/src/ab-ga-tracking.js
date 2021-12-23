/* START GTAG EVENTS */
var currentLink = window.location;
var url = currentLink.href;

/* START PRODUCT TABS */
var description_tab = document.getElementsByClassName("description_tab");
if (description_tab.length > 0) {
	description_tab[0].addEventListener('click', function() {
		var label = $('h1.product_title strong').text();
		gtag('event', 'tab_content', {
			'event_category': 'engagement',
			'event_label': 'Description Tab: '+label
		});
	}, true);
}
var reviews_tab = document.getElementsByClassName("reviews_tab");
if (reviews_tab.length > 0) {
	reviews_tab[0].addEventListener('click', function() {
		var label = $('h1.product_title strong').text();
		gtag('event', 'tab_content', {
			'event_category': 'engagement',
			'event_label': 'Reviews Tab: '+label
		});
	}, true);
}
var additional_information_tab = document.getElementsByClassName("additional_information_tab");
if (additional_information_tab.length > 0) {
	additional_information_tab[0].addEventListener('click', function() {
		var label = $('h1.product_title strong').text();
		gtag('event', 'tab_content', {
			'event_category': 'engagement',
			'event_label': 'Additional Information Tab: '+label
		});
	}, true);
}
/* END PRODUCT TABS */
		

/*START ARCHIVE BUTTONS*/
//Select Options
$( document ).on( 'click', '.product_type_variable.add_to_cart_button:not(.ajax_variation)', function(e) {
	var title = $(this).closest('li.product').find('.woocommerce-loop-product__title a').text();
	var label = "Select Options: "+title;
	gtag('event', 'product_button', {
		'event_category': 'engagement',
		'event_label': label
	});
});
//Out of Stock
$( document ).on( 'click', '.product.outofstock .product_type_simple.add_to_cart_button, .product.outofstock .product_type_variable[data-variation]', function(e) {
	var title = $(this).closest('li.product').find('.woocommerce-loop-product__title a').text();
	var variation = $(this).attr('data-variation');
	var label = "Out of Stock: "+title;
	if(typeof variation !== "undefined" && variation!="") label = label+" in "+variation;
	gtag('event', 'product_button', {
		'event_category': 'engagement',
		'event_label': label
	});
});
/*END ARCHIVE BUTTONS*/


//Add to cart - archive
$( document ).on( 'click', '.product:not(.outofstock) .product_type_simple.add_to_cart_button, .product:not(.outofstock) .product_type_variable.add_to_cart_button.ajax_variation', function(e) {
	var product_container = $(this).closest('li.product');
	var label = product_container.find('.woocommerce-loop-product__title a').text();
	var variation = $(this).attr('data-variation');
	if(typeof variation !== "undefined" && variation!="") label = label+" in "+variation;
	if(product_container.hasClass('onbackorder')){
		label = 'Preorder: '+label;
	}
	gtag('event', 'add_to_cart', {
		'event_category': 'ecommerce',
		'event_label': label
	});
});
//Add to cart - product
$( document ).on( 'click', '.single_add_to_cart_button:not(.disabled)', function(e) {
	var label = $('h1.entry-title strong').text();
	gtag('event', 'add_to_cart', {
		'event_category': 'ecommerce',
		'event_label': label
	});
});
//Calculate shipping
$( document ).on( 'click', '.shipping-calculator-button', function(e) {
	gtag('event', 'calculate_shipping', {
		'event_category': 'ecommerce',
		'event_label': 'Open form'
	});
});
$( document ).on( 'click', '.shipping-calculator-form button', function(e) {
	var country = $( document ).find('#select2-calc_shipping_country-container').text();
	var state = $( document ).find('#select2-calc_shipping_state-container').text();
	if(state==""){
		state = $('#calc_shipping_state').val();
	}
	var city = $('#calc_shipping_city').val();
	var postcode = $('#calc_shipping_postcode').val();
	var label = city+', '+state+', '+country+' '+postcode;
	gtag('event', 'calculate_shipping', {
		'event_category': 'ecommerce',
		'event_label': label
	});
});

$( document ).on( 'click', '.button.checkout, .checkout-button', function(e) {
	var products = '';
	$( ".cart_list li" ).each(function() {
		products += $( this ).find('a:not(.remove)').text()+"|";
	});
	gtag('event', 'begin_checkout', {
		'event_category': 'ecommerce',
		'event_label': products
	});
	ttq.track('InitiateCheckout');
});
$( document ).on( 'click', '.button.wc-forward:not(.checkout)', function(e) {
	var products = '';
	$( ".cart_list li" ).each(function() {
		products += $( this ).find('a:not(.remove)').text()+"|";
	});
	gtag('event', 'view_cart', {
		'event_category': 'ecommerce',
		'event_label': products
	});
});
$( document ).on( 'click', '.woocommerce-form-register__submit,#place_order', function(e) {
	var $thisbutton = $(this);
	if($thisbutton.is( '#place_order' )){
		if($('#createaccount').is(':checked')){
			var email = $(this).closest('form').find('#billing_email').val();
			gtag('event', 'sign_up_on_checkout', {
				'event_category': 'engagement',
				'event_label': email
			});
		}
	}else{
		var email = $(this).closest('form').find('#reg_email').val();
		gtag('event', 'sign_up', { method : email });
	}
});
$( document ).on( 'click', '.woocommerce-form-login__submit', function(e) {
	var email = $(this).closest('form').find('#username').val();
	gtag('event', 'login', { method : email });
});
$( document ).on( 'click', '.lost_reset_password .button', function(e) {
	var email = $(this).closest('form').find('#user_login').val();
	gtag('event', 'forgot_password', {
		'event_category': 'engagement',
		'event_label': email
	});
});
if (url.indexOf("account/view-order") > -1) {
	var label = $("h1").text();
	gtag('event', 'view_order', {
			'event_category': 'engagement',
					'event_label': label
	});
	$( document ).on( 'click', '.my_account_tracking .button', function(e) {
		gtag('event', 'track', {
			'event_category': 'engagement',
			'event_label': label
		});
	});
	$( document ).on( 'click', '.order-again a', function(e) {
		gtag('event', 'order_again', {
			'event_category': 'engagement',
			'event_label': label
		});
	});
}
$( document ).on( 'click', '.save_account_details', function(e) {
	gtag('event', 'edit_account', {
		'event_category': 'engagement',
		'event_label': $('#account_email').val()
	});
});
$( document ).on( 'click', '.woocommerce-edit-address .edit', function(e) {
	gtag('event', 'edit_address', {
		'event_category': 'engagement',
		'event_label': $('.u-column1 address').text()
	});
});
$( document ).on( 'click', '.woocommerce-edit-account .nsl-container-buttons a[data-provider="facebook"]', function(e) {
	gtag('event', 'link_facebook', {
		'event_category': 'engagement',
		'event_label': $('#account_email').val()
	});
});
$( document ).on( 'click', '.woocommerce-edit-account .nsl-container-buttons a[data-provider="google"]', function(e) {
	gtag('event', 'link_google', {
		'event_category': 'engagement',
		'event_label': $('#account_email').val()
	});
});


/*START HEADER*/
$( document ).on( 'click', '.mobile-navigation .menu-item a, .main-navigation .menu-item a', function(e) {
	var label = $(this).text();
	gtag('event', 'link', {
		'event_category': 'engagement',
		'event_label': "Main Menu: "+label
	});
});	
$( document ).on( 'click', '.site-logo a', function(e) {
	gtag('event', 'link', {
		'event_category': 'engagement',
		'event_label': 'Site Logo'
	});
});
/*END HEADER*/

		
$( document ).on( 'click', '.shop_sidebar .widget a', function(e) {
	var label = $(this).closest(".widget").find(".widget-title").text();
	gtag('event', 'link', {
		'event_category': 'engagement',
		'event_label': "Sidebar: "+label
	});
});

$( document ).on( 'click', '#site-footer .widget a', function(e) {
	var label = $(this).text();
	gtag('event', 'link', {
		'event_category': 'engagement',
		'event_label': "Footer: "+label
	});
});

		
		
		
$( document ).on( 'click', '#place_order', function(e) {
	var payment_method = $("input[name='payment_method']:checked").val();
	var billing_email = $("#billing_email").val();
	gtag('event', 'place_order', {
		'event_category': 'ecommerce',
		'event_label': payment_method+" "+billing_email
	});
});


/* END GTAG EVENTS */