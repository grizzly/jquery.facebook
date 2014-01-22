/*!
 * jQuery Facebook Plugin Library v0.1.0
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

})(jQuery);
