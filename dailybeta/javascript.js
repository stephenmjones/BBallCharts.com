var playerArray = [];

var options = {
	series: {
		bars: {
			show: true,
			barWidth:.4,
			align: "center",
			horizontal: true,
			lineWidth:.6,
			fill: .75
		}
	},
	xaxis: {
		tickSize: 2
	},
	yaxis: {
		ticks: 0,
		min: 0,
		max: 16
	}
};


function getQueryDate() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (year) + (month < 10 ? '0' : '') + month + (day < 10 ? '0' : '') + day -1;
	return output;
}

function createPlayerObject(name,points,assists,rebounds,blocks,steals) {
	console.log("createPlayerObject triggered...");
	var playerName = name.replace(/\s+/g, '')+'Obj';
	console.log("Making " + playerName);
	window[playerName] = new Object;
	window[playerName].name = name;
	window[playerName].points = points;
	window[playerName].assists = assists;
	window[playerName].rebounds = rebounds;
	window[playerName].blocks = blocks;
	window[playerName].steals = steals;
	playerArray.push(window[playerName]);
	console.log("createPlayerObject completed...");
}

function plotPoints() {
	playerArray.sort(function(a, b) {
		return b.points - a.points;
	});
	var data = [];
	for (i = 0; i < 15; i++) {
		data.push({data: [[playerArray[i].points,15-i]], label: playerArray[i].name})
	}
	console.log(data);
	plot = $.plot($('#pointsgraph'), data, options);
}

function plotAssists() {
	playerArray.sort(function(a, b) {
		return b.assists - a.assists;
	});
	var data = [];
	for (i = 0; i < 15; i++) {
		data.push({data: [[playerArray[i].assists,15-i]], label: playerArray[i].name})
	}
	console.log(data);
	plot = $.plot($('#assistsgraph'), data, options);
}

function plotRebounds() {
	playerArray.sort(function(a, b) {
		return b.rebounds - a.rebounds;
	});
	var data = [];
	for (i = 0; i < 15; i++) {
		data.push({data: [[playerArray[i].rebounds,15-i]], label: playerArray[i].name})
	}
	console.log(data);
	plot = $.plot($('#reboundsgraph'), data, options);
}

function plotSteals() {
	playerArray.sort(function(a, b) {
		return b.steals - a.steals;
	});
	var data = [];
	for (i = 0; i < 15; i++) {
		data.push({data: [[playerArray[i].steals,15-i]], label: playerArray[i].name})
	}
	console.log(data);
	plot = $.plot($('#stealsgraph'), data, options);
}

function plotBlocks() {
	playerArray.sort(function(a, b) {
		return b.blocks - a.blocks;
	});
	var data = [];
	for (i = 0; i < 15; i++) {
		data.push({data: [[playerArray[i].blocks,15-i]], label: playerArray[i].name})
	}
	console.log(data);
	plot = $.plot($('#blocksgraph'), data, options);
}



function queryData() {
	var apiQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'U(name), points, assists, rebounds, blocks, steals @ date = '+getQueryDate()};
	$.getJSON('http://api.sportsdatabase.com/nba/player_query.json?jsoncallback=?', apiQuery, function(result) {
		for (var i = Object.keys(result.groups[0].columns[0]).length; i--;)	{
			createPlayerObject(result.groups[0].columns[0][i],result.groups[0].columns[1][i],result.groups[0].columns[2][i],result.groups[0].columns[3][i],result.groups[0].columns[4][i],result.groups[0].columns[5][i]);
		}
		console.log(playerArray);
		plotPoints();
		plotAssists();
		plotRebounds();
		plotBlocks();
		plotSteals();
	});
}

$(document).ready(function() {
	queryData();

	//var nameQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'U(name) @ season = 2016'};
	//
	//$.getJSON('http://api.sportsdatabase.com/nba/player_query.json?jsoncallback=?', nameQuery, function(result) {
	//
	//	for (var i = Object.keys(result.groups[0].columns[0]).length; i--;) {
	//		result.groups[0].columns[0].sort();
	//		$('body').append("<img src='../images/2016_17_Headshots/"+result.groups[0].columns[0][i].replace(/\s+/g, '_')+".png' class='playerimg' onerror=this.src='../images/2014_15_Headshots/No_Photo.png' alt='No Player Photo'>&nbsp;"+result.groups[0].columns[0][i]+"<br/>");
	//	}
	//})
});

