// https://developers.facebook.com/docs/javascript/howto/jquery/

$(document).ready(function() {
	$.ajaxSetup({
		cache : true
	});
	$.getScript('//connect.facebook.net/en_UK/all.js', function() {
		FB.init({
			appId : 'YOUR_APP_ID',
		});
		$('#loginbutton,#feedbutton').removeAttr('disabled');
		FB.getLoginStatus(updateStatusCallback);
	});
});
