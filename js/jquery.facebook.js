/*!
 * jQuery Facebook Plugin Library v0.2.3
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
 * Last update: 2014-09-23
 */

(function($) {

	$.facebook = function(options) {

		var facebook = this;

		var defaults = {
			appid : 0,
			apiversion : 'v2.0', 
			locale : "en_EN",
			mandatory_permissions : {},
			optional_permissions : {}
		};

		facebook.settings = $.extend({}, defaults, options);

		facebook.response = null;

		// PUBLIC FUNCTIONS
		// ---------------------------------------------

		facebook.login = function() {
			var scopestring = getScope();
			FB.login(function(response) {
				facebook.response = response;
				if (response.authResponse) {
					// connected
					facebook.onLoginSuccess(response);
				} else {
					// cancelled
					facebook.onLoginCancelled();
				}
			}, {
				scope : scopestring
			});
		};

		facebook.logout = function() {
			// FB.logout will log the user out of both your site and Facebook.
			// Calling FB.logout will also invalidate the access token that
			// you have for the user.
			FB.logout(function(response) {
				facebook.onLogout(response);
			});
		};

		facebook.onLoginConnected = function(response) {

		};
		facebook.onLoginNotAuthorized = function() {

		};
		facebook.onLoginNotLoggedIn = function() {

		};
		facebook.onLoginSuccess = function(response) {

		};
		facebook.onLoginCancelled = function() {

		};
		facebook.onLogout = function(respone) {

		};

		// PRIVATE FUNCTIONS
		// ---------------------------------------------

		function init() {
			$.ajaxSetup({
				cache : true
			});
			$.getScript('//connect.facebook.net/' + facebook.settings.locale + '/sdk.js', function() {
				FB.init({
					appId : facebook.settings.appid,
					version : facebook.settings.apiversion
				});
				FB.Event.subscribe('auth.statusChange', function(response) {
					facebook.response = response;
				});
				FB.getLoginStatus(updateLoginStatusCallback);
			});
			// on document ready get all facebook login divs and bind the login function to it.
		};

		function updateLoginStatusCallback(response) {
			facebook.response = response;
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

		function getScope() {
			var scope = "";
			if (facebook.settings.mandatory_permissions.length > 0) {
				scope = facebook.settings.mandatory_permissions.toString();
			}
			if (facebook.settings.optional_permissions.length > 0) {
				if (scope != "") {
					scope = scope + ",";
				}
				scope = scope + facebook.settings.optional_permissions.toString();
			}
			return scope;
		}

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
				url : "",
				locale: "en_EN"
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

		switch (action) {
			case "likebutton":
				facebook.likebutton(options);
				break;
			default:
				break;
		};

	};
})(jQuery);
