//==========================================================================================
//====================================== Fetches Array of Player Names for TypeAhead Plugin |
//==========================================================================================

var nameQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'U(name) @ season = 2018'};

$.getJSON('http://sportsdatabase.com/nba/player_query.json?jsoncallback=?', nameQuery, function(result) {
	$('#playerarray').html('"'+result.groups[0].columns[0].sort().join("\",\"")+'"');
});

//==========================================================================================
//==================================== Fetches Player Name & Current Team to Verify Photos  |
//==========================================================================================

var photoQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'name, team @ name and season=2018'};

$.getJSON('http://sportsdatabase.com/nba/player_query.json?jsoncallback=?', photoQuery, function(result) {
	var nameTeam = [];
	for (var i = result.groups.length; i--;) {
		nameTeam.push([result.groups[i].columns[0][result.groups[i].columns[0].length - 1],result.groups[i].columns[1][result.groups[i].columns[1].length - 1]]);
	}
	cmp = function(a, b) {
		if (a < b) return +1;
		if (a > b) return -1;
		return 0;
	};
	nameTeam.sort(function(a, b) {
		return cmp(a[1],b[1]) || cmp(a[0],b[0])
	});
	for (var i = nameTeam.length; i--;) {
		$('#photocheck').append("<img src='../images/2018_19_Headshots/"+nameTeam[i][0].replace(/\s+/g, '_')+".png' height='100' onerror=this.src='/images/2017_18_Headshots/No_Photo.png' alt='No Player Photo'>"+nameTeam[i][1]+" - "+nameTeam[i][0]+"</br>");
	}
});