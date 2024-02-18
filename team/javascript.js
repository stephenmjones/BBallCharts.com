function sortByKey(array, key) {
	return array.sort(function(a, b) {
		var x = a[key]; var y = b[key];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

var data = [];
var options = {};


function queryData() {

	var apiQuery = {
		'api_key': 'guest',
		'output': 'json',
		'sdql': '(Max(wins))/(Max(losses)+Max(wins)) as Win%,  ((S(points)) / (S(FGA) + (.44*S(FTA)) - S(ORB) + S(TO)) * 100) as ORTG, ((S(points))/(2*(S(FGA) + (.44*S(FTA))))) as TS%, (A((48 * (((FGA + (0.44 * FTA) - ORB + TO) + (o:FGA + (0.44 * o:FTA) - o:ORB + o:TO)) / (2 * (48 + (5*overtime))))))) as Pace, (S(AST)*100) / (S(FGA) + (0.44*S(FTA)) + S(AST) + S(TO)) as ARatio, ((S(o:points)) / (S(o:FGA) + (.44*S(o:FTA)) - S(o:ORB) + S(o:TO)) * 100) as DRTG, U(team) as Team @ team and season=2018'
	};

	$.getJSON('http://sportsdatabase.com/nba/query.json?jsoncallback=?', apiQuery, function (result) {

		sortByKey(result.groups, 'sdql');

		console.log(result);

		var d0 = [];
		var d1 = [];
		var d2 = [];
		var d3 = [];
		var d4 = [];
		var d5 = [];
		var d6 = [];
		var d7 = [];
		var d8 = [];
		var d9 = [];
		var d10 = [];
		var d11 = [];
		var d12 = [];
		var d13 = [];
		var d14 = [];
		var d15 = [];
		var d16 = [];
		var d17 = [];
		var d18 = [];
		var d19 = [];
		var d20 = [];
		var d21 = [];
		var d22 = [];
		var d23 = [];
		var d24 = [];
		var d25 = [];
		var d26 = [];
		var d27 = [];
		var d28 = [];
		var d29 = [];

		for (var i = 0; i < 6; ++i) {
			d0[i] = [i, result.groups[0].columns[i][0]];
			d1[i] = [i, result.groups[1].columns[i][0]];
			d2[i] = [i, result.groups[2].columns[i][0]];
			d3[i] = [i, result.groups[3].columns[i][0]];
			d4[i] = [i, result.groups[4].columns[i][0]];
			d5[i] = [i, result.groups[5].columns[i][0]];
			d6[i] = [i, result.groups[6].columns[i][0]];
			d7[i] = [i, result.groups[7].columns[i][0]];
			d8[i] = [i, result.groups[8].columns[i][0]];
			d9[i] = [i, result.groups[9].columns[i][0]];
			d10[i] = [i, result.groups[10].columns[i][0]];
			d11[i] = [i, result.groups[11].columns[i][0]];
			d12[i] = [i, result.groups[12].columns[i][0]];
			d13[i] = [i, result.groups[13].columns[i][0]];
			d14[i] = [i, result.groups[14].columns[i][0]];
			d15[i] = [i, result.groups[15].columns[i][0]];
			d16[i] = [i, result.groups[16].columns[i][0]];
			d17[i] = [i, result.groups[17].columns[i][0]];
			d18[i] = [i, result.groups[18].columns[i][0]];
			d19[i] = [i, result.groups[19].columns[i][0]];
			d20[i] = [i, result.groups[20].columns[i][0]];
			d21[i] = [i, result.groups[21].columns[i][0]];
			d22[i] = [i, result.groups[22].columns[i][0]];
			d23[i] = [i, result.groups[23].columns[i][0]];
			d24[i] = [i, result.groups[24].columns[i][0]];
			d25[i] = [i, result.groups[25].columns[i][0]];
			d26[i] = [i, result.groups[26].columns[i][0]];
			d27[i] = [i, result.groups[27].columns[i][0]];
			d28[i] = [i, result.groups[28].columns[i][0]];
			d29[i] = [i, result.groups[29].columns[i][0]];
		}

		teamColors = [
			"rgba(0,71,27,1)",
			"rgba(206,17,65,1)",
			"rgba(111,38,61,1)",
			"rgba(0,122,51,1)",
			"rgba(200,16,46,1)",
			"rgba(93,118,169,1)",
			"rgba(225,68,52,1)",
			"rgba(152,0,46,1)",
			"rgba(0,120,140,1)",
			"rgba(0,43,92,1)",
			"rgba(91,43,130,1)",
			"rgba(245,132,38,1)",
			"rgba(253,185,39,1)",
			"rgba(0,125,197,1)",
			"rgba(0,83,188,1)",
			"rgba(0,0,0,.8)",
			"rgba(13,34,64,1)",
			"rgba(0,45,98,1)",
			"rgba(0,22,65,1)",
			"rgba(29,66,138,1)",
			"rgba(206,17,65,1)",
			"rgba(206,17,65,1)",
			"rgba(0,107,182,1)",
			"rgba(0,0,0,.8)",
			"rgba(229,95,32,1)",
			"rgba(0,125,195,1)",
			"rgba(12,35,64,1)",
			"rgba(224,58,62,1)",
			"rgba(0,107,182,1)",
			"rgba(0,43,92,1)"
  	];

		data = [
			{ label: "Bucks",data: d0},
			{ label: "Bulls",data: d1},
			{ label: "Cavaliers",data: d2},
			{ label: "Celtics",data: d3},
			{ label: "Clippers",data: d4},
			{ label: "Grizzlies",data: d5},
			{ label: "Hawks",data: d6},
			{ label: "Heat",data: d7},
			{ label: "Hornets",data: d8},
			{ label: "Jazz",data: d9},
			{ label: "Kings",data: d10},
			{ label: "Knicks",data: d11},
			{ label: "Lakers",data: d12},
			{ label: "Magic",data: d13},
			{ label: "Mavericks",data: d14},
			{ label: "Nets",data: d15},
			{ label: "Nuggets",data: d16},
			{ label: "Pacers",data: d17},
			{ label: "Pelicans",data: d18},
			{ label: "Pistons",data: d19},
			{ label: "Raptors",data: d20},
			{ label: "Rockets",data: d21},
			{ label: "76ers",data: d22},
			{ label: "Spurs",data: d23},
			{ label: "Suns",data: d24},
			{ label: "Thunder",data: d25},
			{ label: "Timberwolves",data: d26},
			{ label: "Trailblazers",data: d27},
			{ label: "Warriors",data: d28},
			{ label: "Wizards",data: d29}
		];

		for (var i = 0; i < 30; ++i) {
			if (data[i].label == ($("#teamselect").val())) {
				data[i].color = teamColors[i];
			}
			else {
				data[i].color = "rgba(0,0,0,0)";
			}
		}

		var chartLabels = [
			{label: "RECORD"},
			{label: "OFFENSE"},
			{label: "SHOOTING"},
			{label: "PACE"},
			{label: "PASSING"},
			{label: "DEFENSE"}
		];

		options = {
			legend: {
				show: false
			},
			series:{
				spider: {
					active: true,
					fill: true,
					spiderSize: .75,
					lineWidth: 2,
					lineStyle: "rgba(0,0,0,.75)",
					pointSize: 0,
					scaleMode: "leg",
					legMin: null,
					legMax: null,
					legValues: false,
					connection: {	width: 0 },
					highlight: { opacity: 0.5, mode: "area" },
					legs: {
						font: { family: "Arial", weight:700, size: 12 },
						data: chartLabels,
						fillStyle: "black",
						legScaleMin: .95,
						legScaleMax: 1.05,
						legStartAngle: -90,
						labelWidth: 0,
						labelSpace: 120
					}
				}
			},
			grid: {
				hoverable: true,
				clickable: true,
				tickColor: "rgba(0,0,0,0)",
				mode: "spider"
			}
		};

		$.plot($("#div"), data, options);

	});


}


$(document).ready(function() {
	queryData();
});

$(document).on("change", '#teamselect', function()	{
	console.log(data);
	console.log($("#teamselect").val());
	for (var i = 0; i < 30; ++i) {
		if (data[i].label == ($("#teamselect").val())) {
			data[i].color = teamColors[i];
		}
		else {
			data[i].color = "rgba(0,0,0,0)";
		}
	}
	console.log(data);

	$.plot($("#div"), data, options);
});