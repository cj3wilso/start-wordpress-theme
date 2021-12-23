//alert($("html").attr("class"));

//Create a cookie
writeCookie = function(cname, cvalue, days) {
	var dt, expires;
	dt = new Date();
	dt.setTime(dt.getTime()+(days*24*60*60*1000));
	expires = "; expires="+dt.toGMTString();
	document.cookie = cname+"="+cvalue+expires+'; domain=.mongooseandmink.com; path=/';
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
//Write a cookie that lasts 6 months
//writeCookie("newsletter","yes","180");


//Get Parameter in URL
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
};
//var shade_depth = getUrlParameter('shade-depth');


//Smooth Scrolling for all hashed links
// Select all links with hashes
$( document ).on('click', 'a[href^="#"]:not([href="#"]):not([href="#0"])', function(event) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
		// Only prevent default if animation is actually gonna happen
        event.preventDefault();
		var new_target = target.offset().top - $('header').outerHeight();
        $('html, body').animate({
			scrollTop: target.offset().top
        }, 1000, function() {
			// Callback after animation
			// Must change focus!
			var $target = $(target);
			$target.focus();
			if ($target.is(":focus")) { // Checking if the target was focused
				return false;
			} else {
				$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
				$target.focus(); // Set focus again
			};
        });
	}
});