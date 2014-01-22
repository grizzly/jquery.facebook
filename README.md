jQuery Facebook-Plugin
======================

## Example usage

```js

		var facebook = $.facebook({
			appid : 0,      // <------------------------- PUT YOUR APP ID IN HERE !!!!!!!!!!!!!
			locale : "en_EN",
			scope : "email"
		});
		
		facebook.onLoginConnected = function(response) {
			// the user is logged in and has authenticated your
			// app. it's now time to send the access token to the server to log the user into your app
			// after that you would redirect the user to the member area -> window.location = "http:// ...";
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
			alert("The user " + uid + " is logged in into Facebook AND connected to your app! (access token: " + accessToken + ")");
		};
		
		facebook.onLoginNotAuthorized = facebook.onLoginNotLoggedIn = function() {
			// the user is logged in to Facebook,
			// but has not authenticated your app
		};
		
		facebook.onLoginCancelled = function() {
			// the user has canceled the login dialog or has not granted all permissions
			// best practise is to tell the user why you need the permissions.
			alert("Please grant the permissions in order to have full access to all the good things in the app!");
		};

```

This code will add a QR-Code to the div '#test'.

## Settings

+ `appid` _BigInt_ - the app id which can be found in the developer center of Facebook
+ `locale` _String_ - the country and language code like en_EN or de_DE
+ `scope` _String_ - comma seperated string of Facebook permissions

## Demo

Will be added shortly.

License
=======

http://opensource.org/licenses/MIT
