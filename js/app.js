$(function() {

	var mlbID = 52762453,
		nbaID = 20824486,
		nflID = 205593849,
		nhlID = 19237590;

	function bioDisplay(idNumber, sportsLeague) {
		var url = "https://api.instagram.com/v1/users/" + idNumber + "/?client_id=3355e6140bc14be9b708aec52de1c331";
		var column = "#" + sportsLeague + " .profile";
		var $profile = $(column);
		$.ajax({
			url: url,
			dataType: "jsonp",
			type: "GET"
		})
		.done(function(result) {
			console.log(result);
			var profile = result.data.profile_picture;
			var insert = '<img src="' + profile + '" alt="thumbnail">';
			var name = result.data.username;
			var bio = result.data.bio;
			$profile.html(insert);
			$('#' + sportsLeague + ' .name').html(name);
			$('#' + sportsLeague + ' .bio').html(bio);
		});
	}

	function mediaDisplay(idNumber, sportsLeague) {
		var url = "https://api.instagram.com/v1/users/" + idNumber + "/media/recent/?client_id=3355e6140bc14be9b708aec52de1c331";
		var column = "#" + sportsLeague + " .frame";
		var $frame = $(column);
		$.ajax({
			url: url,
			dataType: "jsonp",
			type: "GET"
		})
		.done(function(result) {
			console.log(result);
			for (var i=0; i<$frame.length; i++) {
				var thumbnail = result.data[i].images.thumbnail.url;
				var link = result.data[i].link;
				var insert = '<a href="' + link +'" target="_blank">' + 
				'<img src="' + thumbnail + '" alt="thumbnail">' + '</a>';
				$frame.eq(i).html(insert);
			}
		});
	}

	function display(idNumber, sportsLeague) {
		bioDisplay(idNumber, sportsLeague);
		mediaDisplay(idNumber, sportsLeague);
	}

	display(mlbID, "mlb");
	display(nbaID, "nba");
	display(nflID, "nfl");
	display(nhlID, "nhl");

});
