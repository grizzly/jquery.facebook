/*!
 * jQuery Facebook Plugin Library v0.1.1
 * https://github.com/grizzly/jquery.facebook
 *
 * Official jQuery Facebook Plugin URL:
 * http://plugins.jquery.com/facebook/
 *
 * Copyright 2011-2014 Grizzly GmbH Graz, Austria
 * http://www.grizzly.cc
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Last update: 2014-01-22
 */

(function($) {

	$.facebook = function(options) {

		var facebook = this;

		var defaults = {
			appid : 0,
			locale : "en_EN",
			scope : ""
		};

		facebook.settings = $.extend({}, defaults, options);

		// PUBLIC FUNCTIONS
		// ---------------------------------------------

		facebook.login = function() {
			FB.login(function(response) {
				if (response.authResponse) {
					// connected
					FB.getLoginStatus(updateLoginStatusCallback);
				} else {
					// cancelled
					facebook.onLoginCancelled();
				}
			}, {
				scope : facebook.settings.scope
			});

		};

		facebook.onLoginConnected = function(response) {

		};
		facebook.onLoginNotAuthorized = function() {

		};
		facebook.onLoginNotLoggedIn = function() {

		};
		facebook.onLoginCancelled = function() {

		};

		// PRIVATE FUNCTIONS
		// ---------------------------------------------

		function init() {
			$.ajaxSetup({
				cache : true
			});
			$.getScript('//connect.facebook.net/' + facebook.settings.locale + '/all.js', function() {
				FB.init({
					appId : facebook.settings.appid,
				});
				FB.getLoginStatus(updateLoginStatusCallback);
			});
			// on document ready get all facebook login divs and bind the login function to it.
		};

		function updateLoginStatusCallback(response) {
			if (response.status === 'connected') {
				// the user is logged in and has authenticated your
				// app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed
				// request, and the time the access token
				// and signed request each expire
				facebook.onLoginConnected(response);
			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook,
				// but has not authenticated your app
				facebook.onLoginNotAuthorized();
			} else {
				// the user isn't logged in to Facebook.
				facebook.onLoginNotLoggedIn();
			}
		};

		// init
		// ---------------------------------------------

		init();

		return facebook;

	};

	$.fn.facebook = function(action, options) {

		var facebook = this;

		// Like Button
		// ---------------------------------------------

		facebook.likebutton = function(options) {

			var defaults = {
				share : "true",
				show_faces : "true",
				css_class : "",
				width : 300,
				layout : "standard",
				action : "like",
				url : ""
			};

			var settings = $.extend({}, defaults, options);

			if (settings.url == "") {
				settings.url = window.location.href;
			}

			var height = 80;
			switch (settings.layout) {
				case "standard":
					height = 80;
					break;
				case "box_count":
					height = 65;
					break;
				case "button_count":
					height = 21;
					break;
				case "button":
					height = 80;
					break;
				default:
					break;
			}

			return this.each(function() {
				$(this).html('<iframe class="' + settings.css_class + '" src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent(settings.url) + '&width=' + settings.width + '&layout=' + settings.layout + '&action=' + settings.action + '&show_faces=' + settings.show_faces + '&share=' + settings.share + '&height=' + height + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:80px;" allowTransparency="true"></iframe>');
			});
		};

		// Like Box
		// ---------------------------------------------

		facebook.likebox = function(options) {

		};

		// Share Button
		// ---------------------------------------------

		facebook.sharebutton = function(options) {

		};

		switch (action) {
			case "likebutton":
				facebook.likebutton(options);
				break;
			case "likebox":
				facebook.likebox(options);
				break;
			case "sharebutton":
				facebook.sharebutton(options);
				break;
			default:
				break;
		}

	}
})(jQuery);
