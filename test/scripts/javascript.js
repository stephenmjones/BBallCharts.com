var playerArray = [];

function getQueryDate() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (year) + (month < 10 ? '0' : '') + month + (day < 10 ? '0' : '') + day -1;
	return output;
}

function createPlayerObject(name,points,assists,rebounds,blocks,steals,turnovers,minutes,fgm,fga,tpm,tpa,ftm,fta,fantasy) {
	var playerName = name.replace(/\s+/g, '')+'Obj';
	console.log("Making " + playerName);
	window[playerName] = new Object;
	window[playerName].name = name;
	window[playerName].points = points;
	window[playerName].assists = assists;
	window[playerName].rebounds = rebounds;
	window[playerName].blocks = blocks;
	window[playerName].steals = steals;
	window[playerName].turnovers= turnovers;
	window[playerName].minutes = minutes;
	window[playerName].fgm = fgm;
	window[playerName].fga = fga;
	window[playerName].tpm = tpm;
	window[playerName].tpa = tpa;
	window[playerName].ftm = ftm;
	window[playerName].fta = fta;
	window[playerName].fantasy = fantasy;

	playerArray.push(window[playerName]);
}

function listMvp() {
	playerArray.sort(function(a, b) {
		return b.fantasy - a.fantasy;
	});
	var data = [];
	for (i = 0; i < 5; i++) {
	}
	console.log(data);
}

function plotData() {
	var data1 = [[0, 54], [1, 8], [2, 12], [3, 2], [4, 2], [5, 2]];
	var data2 = [[0, 32], [1, 12], [2, 9], [3, 4], [4, 5], [5, 3]];
	var data3 = [[0, 35], [1, 7], [2, 18], [3, 1], [4, 1], [5, 4]];

	var data = [
		{
			label: "Product 1",
			data: data1,
			bars: {
				show: true,
				fill: true,
				lineWidth: .1,
				order: 1,
				fillColor:  "#AA4643"
			},
			color: "#AA4643"
		},
		{
			label: "Product 2",
			data: data2,
			bars: {
				show: true,
				fill: true,
				lineWidth: .1,
				order: 2,
				fillColor:  "#89A54E"
			},
			color: "#89A54E"
		},
		{
			label: "Product 3",
			data: data3,
			bars: {
				show: true,
				fill: true,
				lineWidth: .1,
				order: 3,
				fillColor:  "#4572A7"
			},
			color: "#4572A7"
		}
	];

	var options = {
		series: {
			bars: {
				show: true,
				barWidth: 0.2
			}
		},
		legend: {
			show: false
		},
		xaxis: {
			ticks: [[0,"PTS"], [1,"AST"],[2,"REB"],[3,"BLK"],[4,"STL"],[5,"TOV"]],
			tickSize: 1,
			allowDecimals: false
		},
		grid: {
			hoverable: true,
			borderWidth: 0
		},
		yAxis: {
			allowDecimals: false
		}
	};

	$.plot("#graphwindow", data, options);
}



function queryData() {
	var apiQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'U(name), points, assists, rebounds, blocks, steals, turnovers, minutes, field goals made, field goals attempted, three pointers made, three pointers attempted, free throws made, free throws attempted @ date = '+getQueryDate()};
	$.getJSON('http://sportsdatabase.com/nba/player_query.json?jsoncallback=?', apiQuery, function(result) {
		for (var i = Object.keys(result.groups[0].columns[0]).length; i--;)	{
			var name = result.groups[0].columns[0][i];
			var pts = result.groups[0].columns[1][i];
			var ast = result.groups[0].columns[2][i];
			var reb = result.groups[0].columns[3][i];
			var blk = result.groups[0].columns[4][i];
			var stl = result.groups[0].columns[5][i];
			var to = result.groups[0].columns[6][i];
			var min = result.groups[0].columns[7][i];
			var fgm = result.groups[0].columns[8][i];
			var fga = result.groups[0].columns[9][i];
			var tpm = result.groups[0].columns[10][i];
			var tpa = result.groups[0].columns[11][i];
			var ftm = result.groups[0].columns[12][i];
			var fta = result.groups[0].columns[13][i];
			var fan = pts+(ast*2)+reb+(blk*2)+(stl*2)+(to*-2)+fgm+(fga*-.45)+tpm+(tpa*-.35)+ftm+(fta*-.8);

			createPlayerObject(name,pts,ast,reb,blk,stl,to,min,fgm,fga,tpm,tpa,ftm,fta,fan);
		}
		console.log(playerArray);
		//listMvp();
		plotData();
	});
}

$(document).ready(function() {
	queryData();
});