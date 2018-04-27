var goof = "Dangelo";

function correctPlayerName(obj) {
	obj = "Dangelo" ? obj="D'Angelo" : "";
}

console.log(correctPlayerName(goof));
//==========================================================================================
//============================================================================ UI Functions |
//==========================================================================================
function openPlayerSelect(obj) {
	console.log("~~~~~~~~> openPlayerSelect(); Triggered");
	$( ".pspbackground" ).toggle();
	$(obj).parent().parent().toggleClass("selected");
	$(".pspinput").focus();
	window.scrollTo(0, 0);
	console.log("~~~~~~~~> openPlayerSelect(); Finished");
}

function closePlayerSelect(obj) {
	console.log("~~~~~~~~> closePlayerSelect(); Triggered");
	$( ".pspbackground" ).toggle();
	$(".selected").toggleClass("selected");
	$('.typeahead').typeahead('val', '');
	console.log("~~~~~~~~> closePlayerSelect(); Finished");
}

function changePlayerCard(obj) {
	console.log("~~~~~~~~> changePlayerCard(); Triggered");
	$( ".pspbackground" ).toggle();
	$(".selected").html("<div class='playerselectupper'><h2 class='playerselectheader'>"+obj+"</h2><button class='revert'><i class='fa fa-close'></i></button><img src='images/2017_18_Headshots/"+obj.replace(/\s+/g, '_')+".png' class='playerimg' onerror=this.src='/images/2017_18_Headshots/No_Photo.png' alt='No Player Photo'></div><div class='playerselectlower'><i class='fa fa-line-chart fa-fw'></i><select class='statselector'><option value='points'>Points</option><option value='assists'>Assists</option><option value='rebounds'>Rebounds</option><option value='steals'>Steals</option><option value='blocks'>Blocks</option><option value='to'>Turnovers</option><option value='minutes'>Minutes</option><option value='fgm'>FG Made</option><option value='fga'>FG Atempted</option><option value='tpm'>3PT Made</option><option value='tpa'>3PT Attempted</option><option value='ftm'>FT Made</option><option value='fta'>FT Attempted</option><option value='fantasy'>Fantasy Points</option></select><i class='fa fa-chevron-down fa-fw'></i></div>");
	$(".selected").children(".playerselectlower").css('display', 'block');
	$(".pspinput").blur();
	$(".selected").toggleClass("selected");
	$('.typeahead').typeahead('val', '');
	console.log("~~~~~~~~> changePlayerCard(); Finished");
}

function revertPlayerCard(obj) {
	console.log("~~~~~~~~> revertPlayerCard(); Triggered");
	$(obj).parent().parent().html("<div class='playerselectupper'><h2 class='playerselectheader'>Add Player...</h2><button class='pspopen'><i class='fa fa-plus'></i></button></div><div class='playerselectlower'></div>");
	console.log("~~~~~~~~> revertPlayerCard(); Finished");
}

//==========================================================================================
//========================================================================== Data Functions |
//==========================================================================================

function createPlayerObject(obj) {

	console.log("~~~~~~~~> createPlayerObject(); Triggered");
	changePlayerCard(obj);
	var playerName = obj.replace(/\s+/g, '')+'Obj';
	var playerName2 = obj;

	if (typeof window[playerName] == "undefined")	{
		window[playerName] = new Object;
		console.log(playerName+" does not exist.");
		console.log(playerName+" created.");

		var apiQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'date, o:team, team, '+playerName2+':minutes, '+playerName2+':points, '+playerName2+':field goals made, '+playerName2+':field goals attempted,  '+playerName2+':three pointers made, '+playerName2+':three pointers attempted,  '+playerName2+':free throws made, '+playerName2+':free throws attempted, '+playerName2+':assists, '+playerName2+':rebounds, '+playerName2+':steals, '+playerName2+':blocks, '+playerName2+':turnovers @ '+playerName2+':name and season = 2017'};

		$.getJSON('http://api.sportsdatabase.com/nba/query.json?jsoncallback=?', apiQuery, function(result) {
			console.log("Beginning JSON Fetch.");

			var labelStats = [];
			var minStats = [];
			var pointsStats = [];
			var fgmStats = [];
			var fgaStats = [];
			var tpmStats = [];
			var tpaStats = [];
			var ftmStats = [];
			var ftaStats = [];
			var assistsStats = [];
			var reboundsStats = [];
			var stealsStats = [];
			var blocksStats = [];
			var turnoverStats = [];
			var fantasyStats = [];

			console.log("Length of JSON Fetch = "+Object.keys(result.groups[0].columns[0]).length);

			for (var i = Object.keys(result.groups[0].columns[0]).length; i--;)	{
				console.log("Looping...");
				var dateStr = result.groups[0].columns[0][i].toString().replace(/(\d{4})(\d\d)(\d\d)/g, '$1/$2/$3');
				var parts = dateStr.split("/");
				var dt = Date.UTC(parseInt(parts[0], 10),parseInt(parts[1], 10) - 1,parseInt(parts[2], 10));
				console.log(dt);
				labelStats.push(result.groups[0].columns[1][i]);
				minStats.push([dt, result.groups[0].columns[3][i].toFixed(2)]);
				pointsStats.push([dt, result.groups[0].columns[4][i]]);
				fgmStats.push([dt, result.groups[0].columns[5][i]]);
				fgaStats.push([dt, result.groups[0].columns[6][i]]);
				tpmStats.push([dt, result.groups[0].columns[7][i]]);
				tpaStats.push([dt, result.groups[0].columns[8][i]]);
				ftmStats.push([dt, result.groups[0].columns[9][i]]);
				ftaStats.push([dt, result.groups[0].columns[10][i]]);
				assistsStats.push([dt, result.groups[0].columns[11][i]]);
				reboundsStats.push([dt, result.groups[0].columns[12][i]]);
				stealsStats.push([dt, result.groups[0].columns[13][i]]);
				blocksStats.push([dt, result.groups[0].columns[14][i]]);
				turnoverStats.push([dt, result.groups[0].columns[15][i]]);
				fantasyStats.push([dt, Number(((result.groups[0].columns[4][i])+(result.groups[0].columns[5][i])+(result.groups[0].columns[6][i]*-.45)+(result.groups[0].columns[7][i])+(result.groups[0].columns[8][i]*-.35)+(result.groups[0].columns[9][i])+(result.groups[0].columns[10][i]*-.8)+(result.groups[0].columns[11][i]*2)+(result.groups[0].columns[12][i])+(result.groups[0].columns[13][i]*2)+(result.groups[0].columns[14][i]*2)+(result.groups[0].columns[15][i]*-2)).toFixed(2))]);
			}

			console.log("Populating "+playerName+" with data");
			window[playerName].name = playerName2;
			window[playerName].minutes = {
				label2: labelStats,
				name: playerName2,
				data2: minStats,
				term: "MIN"
			};
			window[playerName].points = {
					label2: labelStats,
					name: playerName2,
					data2: pointsStats,
					term: "PTS"
			};
			window[playerName].fgm = {
					label2: labelStats,
					name: playerName2,
					data2: fgmStats,
					term: "FGM"
			};
			window[playerName].fga = {
					label2: labelStats,
					name: playerName2,
					data2: fgaStats,
					term: "FGA"
			};
			window[playerName].tpm = {
					label2: labelStats,
					name: playerName2,
					data2: tpmStats,
					term: "3PM"
			};
			window[playerName].tpa = {
					label2: labelStats,
					name: playerName2,
					data2: tpaStats,
					term: "3PA"
			};
			window[playerName].ftm = {
					label2: labelStats,
					name: playerName2,
					data2: ftmStats,
					term: "FTM"
			};
			window[playerName].fta = {
					label2: labelStats,
					name: playerName2,
					data2: ftaStats,
					term: "FTA"
			};
			window[playerName].assists = {
					label2: labelStats,
					name: playerName2,
					data2: assistsStats,
					term: "AST"
			};
			window[playerName].rebounds = {
					label2: labelStats,
					name: playerName2,
					data2: reboundsStats,
					term: "REB"
			};
			window[playerName].steals = {
					label2: labelStats,
					name: playerName2,
					data2: stealsStats,
					term: "STL"
			};
			window[playerName].blocks = {
					label2: labelStats,
					name: playerName2,
					data2: blocksStats,
					term: "BLK"
			};
			window[playerName].to = {
					label2: labelStats,
					name: playerName2,
					data2: turnoverStats,
					term: "TOV"
			};
			window[playerName].fantasy = {
					label2: labelStats,
					name: playerName2,
					data2: fantasyStats,
					term: "FAN"
			};

			console.log("Finished populating "+playerName+" with data");
			console.log(window[playerName]);

			plotData();

			console.log("~~~~~~~~> createPlayerObject(); Finished");
		});
	}

	else {
		console.log(playerName + " already created");
		console.log("Plotting data.");
		plotData();
		console.log("~~~~~~~~> createPlayerObject(); Finished");
	}
}

//==========================================================================================
//========================================================================= Graph Functions |
//==========================================================================================

function showChartTooltip(x, y, color, borderlight, borderdark, contents) {
	console.log("Displaying Tooltip.");
	console.log(x);

	if (x>window.innerWidth/2)	{
		$('<div class="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			height: 40,
			top: y - 50,
			left: x - 150,
			'font-size': 12,
			'border-radius': 8,
			'background-color': color,
			'border-top': borderlight,
			'border-left': borderlight,
			'border-bottom': borderdark,
			'border-right': borderdark,
			padding: 2
		}).appendTo("body");

		$('.tooltip').css( {
			left: x - ($('.tooltip').width()+10),
			display: 'block'
		});

		$('.tooltip_right').css( {
			'border-bottom': borderlight,
			'border-right': borderlight,
			'border-top': borderdark,
			'border-left': borderdark,
		});
	}

	else {
		$('<div class="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			height: 40,
			top: y - 50,
			left: x + 10,
			'font-size': 12,
			'border-radius': 8,
			'background-color': color,
			'border-top': borderlight,
			'border-left': borderlight,
			'border-bottom': borderdark,
			'border-right': borderdark,
			padding: 2
		}).appendTo("body");

		$('.tooltip_right').css( {
			'border-bottom': borderlight,
			'border-right': borderlight,
			'border-top': borderdark,
			'border-left': borderdark,
		});
	}
}

function plotData()	{
	console.log("~~~~~~~~> plotData(); Triggered");
	var timePeriod = $('.timeselector').val();
	var today = new Date();
	var options = {
		series: {
			lines: {
				show: true,
				fill: false
			},
			points: {
				show: true,
				radius: 5
			}
		},
		xaxis: {
			mode: "time",
			minTickSize: [1, "day"],
			timeformat: "%m/%d",
			tickDecimals: 0
		},
		yaxis: {
			tickDecimals: 0,
			min: 0
		},
		selection: {
			mode: "x"
		},
		grid: {
			hoverable: true,
			clickable: true,
			mouseActiveRadius: 20,
			color: '#3a3a3a',
			markings: [{color: '#ddd', lineWidth: 2, yaxis: {from: 0, to: -20}},{color: '#fff', lineWidth: 2, yaxis: {from: 0, to: 200}}],
			minBorderMargin: 5,
			margin: {
				top: 20,
				left: 4,
				bottom: 0,
				right: 20
			}
		},
		legend: {
			show: false
		}
	};

	var datap = [];

	if ($('.playerwindow').children('div').children('div:nth-child(4)').children('div').children('div').children('.revert').length != 0)	{
		var fourthObjName = $('.playerwindow').children('div').children('div:nth-child(4)').children('div').children('div').children('h2').text().replace(/\s+/g, '')+'Obj';
		var selectedStat = $('.playerwindow').children('div').children('div:nth-child(4)').children('div').children('div').children('.statselector').val();
		window[fourthObjName][selectedStat].color = "#fbbc05";
		window[fourthObjName][selectedStat].borderlight = "1px solid rgba(255, 213, 93, 1)";
		window[fourthObjName][selectedStat].borderdark = "1px solid rgba(233, 175, 33, 1)";
		window[fourthObjName][selectedStat].data = window[fourthObjName][selectedStat].data2.slice(0);
		window[fourthObjName][selectedStat].label = window[fourthObjName][selectedStat].label2.slice(0);
		for (var i = window[fourthObjName][selectedStat].data.length; i--;) {
			//Use This During Season
			if (window[fourthObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - $('.timeselector').val()) {
			// Use This During Off Season
			// if (window[fourthObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), 3, 15) - $('.timeselector').val() || window[fourthObjName][selectedStat].data[i][0] >= Date.UTC(today.getFullYear(), 3, 15))	{
				window[fourthObjName][selectedStat].data.splice(i, 1);
				window[fourthObjName][selectedStat].label.splice(i, 1);
			}
		}

		for (var i = window[fourthObjName][selectedStat].data.length; i--;) {
			if (window[fourthObjName][selectedStat].data[i][1] < 0) {
				delete options.yaxis["min"];
			}
		}

		datap.push (window[fourthObjName][selectedStat]);
	}

	if ($('.playerwindow').children('div').children('div:nth-child(3)').children('div').children('div').children('.revert').length != 0) {
		var thirdObjName = $('.playerwindow').children('div').children('div:nth-child(3)').children('div').children('div').children('h2').text().replace(/\s+/g, '')+'Obj';
		var selectedStat = $('.playerwindow').children('div').children('div:nth-child(3)').children('div').children('div').children('.statselector').val();
		window[thirdObjName][selectedStat].color = "#4285f4";
		window[thirdObjName][selectedStat].borderlight = "1px solid rgba(149, 189, 255, 1)";
		window[thirdObjName][selectedStat].borderdark = "1px solid rgba(56, 117, 217, 1)";
		window[thirdObjName][selectedStat].data = window[thirdObjName][selectedStat].data2.slice(0);
		window[thirdObjName][selectedStat].label = window[thirdObjName][selectedStat].label2.slice(0);

		for (var i = window[thirdObjName][selectedStat].data.length; i--;) {
			//Use This During Season
			if (window[thirdObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - $('.timeselector').val()) {
			// Use This During Off Season
			// if (window[thirdObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), 3, 15) - $('.timeselector').val() || window[fourthObjName][selectedStat].data[i][0] >= Date.UTC(today.getFullYear(), 3, 15))	{
				window[thirdObjName][selectedStat].data.splice(i, 1);
				window[thirdObjName][selectedStat].label.splice(i, 1);
			}
		}

		for (var i = window[thirdObjName][selectedStat].data.length; i--;) {
			if (window[thirdObjName][selectedStat].data[i][1] < 0) {
				delete options.yaxis["min"];
			}
		}

		datap.push (window[thirdObjName][selectedStat]);
	}

	if ($('.playerwindow').children('div').children('div:nth-child(2)').children('div').children('div').children('.revert').length != 0) {
		var secondObjName = $('.playerwindow').children('div').children('div:nth-child(2)').children('div').children('div').children('h2').text().replace(/\s+/g, '')+'Obj';
		var selectedStat = $('.playerwindow').children('div').children('div:nth-child(2)').children('div').children('div').children('.statselector').val();
		window[secondObjName][selectedStat].color = "#34a853";
		window[secondObjName][selectedStat].borderlight = "1px solid rgba(73, 205, 108, 1)";
		window[secondObjName][selectedStat].borderdark = "1px solid rgba(28, 147, 60, 1)";
		window[secondObjName][selectedStat].data = window[secondObjName][selectedStat].data2.slice(0);
		window[secondObjName][selectedStat].label = window[secondObjName][selectedStat].label2.slice(0);

		for (var i = window[secondObjName][selectedStat].data.length; i--;) {
			//Use This During Season
			if (window[secondObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - $('.timeselector').val()) {
			// Use This During Off Season
			// if (window[secondObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), 3, 15) - $('.timeselector').val() || window[fourthObjName][selectedStat].data[i][0] >= Date.UTC(today.getFullYear(), 3, 15))	{
				window[secondObjName][selectedStat].data.splice(i, 1);
				window[secondObjName][selectedStat].label.splice(i, 1);
			}
		}

		for (var i = window[secondObjName][selectedStat].data.length; i--;) {
			if (window[secondObjName][selectedStat].data[i][1] < 0) {
				delete options.yaxis["min"];
			}
		}

		datap.push (window[secondObjName][selectedStat]);
	}

	if ($('.playerwindow').children('div').children('div:nth-child(1)').children('div').children('div').children('.revert').length != 0) {
		var firstObjName = $('.playerwindow').children('div').children('div:nth-child(1)').children('div').children('div').children('h2').text().replace(/\s+/g, '')+'Obj';
		var selectedStat = $('.playerwindow').children('div').children('div:nth-child(1)').children('div').children('div').children('.statselector').val();
		window[firstObjName][selectedStat].color = "#ea4335";
		window[firstObjName][selectedStat].borderlight = "1px solid rgba(255, 121, 110, 1)";
		window[firstObjName][selectedStat].borderdark = "1px solid rgba(205, 48, 35, 1)";
		window[firstObjName][selectedStat].data = window[firstObjName][selectedStat].data2.slice(0);
		window[firstObjName][selectedStat].label = window[firstObjName][selectedStat].label2.slice(0);

		for (var i = window[firstObjName][selectedStat].data.length; i--;) {
			//Use This During Season
			if (window[firstObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - $('.timeselector').val()) {
			// Use This During Off Season
			// if (window[firstObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), 3, 15) - $('.timeselector').val() || window[fourthObjName][selectedStat].data[i][0] >= Date.UTC(today.getFullYear(), 3, 15))	{
				window[firstObjName][selectedStat].data.splice(i, 1);
				window[firstObjName][selectedStat].label.splice(i, 1);
			}
		}

		for (var i = window[firstObjName][selectedStat].data.length; i--;) {
			if (window[firstObjName][selectedStat].data[i][1] < 0) {
				delete options.yaxis["min"];
			}
		}

		datap.push (window[firstObjName][selectedStat]);
	}

	console.log(datap);

	if ($('.playerwindow').children('div').children('div:nth-child(1)').children('div').children('div').children('.revert').length == 0 && $('.playerwindow').children('div').children('div:nth-child(2)').children('div').children('div').children('.revert').length == 0 && $('.playerwindow').children('div').children('div:nth-child(3)').children('div').children('div').children('.revert').length == 0 && $('.playerwindow').children('div').children('div:nth-child(4)').children('div').children('div').children('.revert').length == 0) {
		plot = $.plot($('.graphlower'), [[]], options);
	}

	else {
		plot = $.plot($('.graphlower'), datap, options);
	}

	$(".graphlower").bind("plothover", function (event, pos, item) {
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));

		if (item) {
			$(".tooltip").remove();
			var x = item.datapoint[0];
			var y = item.datapoint[1];
			console.log (x);
			showChartTooltip(item.pageX, item.pageY, item.series.color, item.series.borderlight, item.series.borderdark, "<div class='tooltip_left'><p>"+y+"</p><p>"+item.series.term+"</p></div><div class='tooltip_right'><p>"+item.series.name+"</p><p>"+getFormattedDate(x)+" vs. "+ item.series.label[item.dataIndex] + "</p></div>");
		}

		else {
			$(".tooltip").remove();
		}
	});

	console.log ('~~~~~~~~> plotData(); Finished');

}

//==========================================================================================
//===================================================================== Multi Use Functions |
//==========================================================================================

function minTommss(minutes) {
	var sign = minutes < 0 ? "-" : "";
	var min = Math.floor(Math.abs(minutes));
	var sec = Math.floor((Math.abs(minutes) * 60) % 60);
	return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

function getFormattedDate(q) {
	var date = new Date(q+18000000); //+18000000 is to account for server local time
	console.log (date);
	return (date.getMonth() + 1) + "/" + (date.getDate());
}

//==========================================================================================
//======================================================================= Typeahead Scripts |
//==========================================================================================
//var nameQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'U(name) @ season = 2017'};
//$.getJSON('http://api.sportsdatabase.com/nba/player_query.json?jsoncallback=?', nameQuery, function(result) {
//	$('body').html(result.groups[0].columns[0].sort().join("\",\""));
//});

var players = ["Aaron Brooks","Aaron Gordon","Abdel Nader","Al Farouq Aminu","Al Horford","Al Jefferson","Alec Burks","Alec Peters","Alex Abrines","Alex Caruso","Alex Len","Alex Poythress","Alfonzo McKinnie","Allen Crabbe","Amir Johnson","Andre Drummond","Andre Iguodala","Andre Roberson","Andrew Bogut","Andrew Harrison","Andrew Wiggins","Ante Zizic","Anthony Davis","Anthony Tolliver","Antonio Blakeney","Aron Baynes","Arron Afflalo","Austin Rivers","Avery Bradley","Bam Adebayo","Ben Simmons","Bismack Biyombo","Blake Griffin","Boban Marjanovic","Bobby Brown","Bogdan Bogdanovic","Bojan Bogdanovic","Bradley Beal","Brandan Wright","Brandon Ingram","Brandon Paul","Brice Johnson","Brook Lopez","Bruno Caboclo","Bryn Forbes","Buddy Hield","CJ McCollum","CJ Miles","Caleb Swanigan","Caris Levert","Carmelo Anthony","Cedi Osman","Chandler Parsons","Channing Frye","Charles Cooke","Cheick Diallo","Chris McCullough","Chris Paul","Clint Capela","Cody Zeller","Cole Aldrich","Corey Brewer","Cory Joseph","Courtney Lee","Cristiano Felicio","DJ Augustin","DJ Wilson","Dakari Johnson","Damian Lillard","Damien Wilkins","Damyean Dotson","Dangelo Russell","Daniel Theis","Danilo Gallinari","Danny Green","Dante Cunningham","Dario Saric","Darius Miller","Darrell Arthur","Darren Collison","Darrun Hilliard","David Nwaba","David West","Davis Bertans","Deaaron Fox","Deandre Bembry","Deandre Jordan","Deandre Liggins","Dejounte Murray","Delon Wright","Demar Derozan","Demarcus Cousins","Demarre Carroll","Demetrius Jackson","Dennis Schroder","Dennis Smith Jr","Denzel Valentine","Derrick Favors","Derrick Jones Jr","Derrick Rose","Derrick Walton Jr","Derrick White","Devin Booker","Devin Harris","Dewayne Dedmon","Deyonta Davis","Dillon Brooks","Dion Waiters","Dirk Nowitzki","Domantas Sabonis","Donovan Mitchell","Dorian Finney Smith","Doug McDermott","Dragan Bender","Draymond Green","Dwayne Bacon","Dwight Howard","Dwight Powell","Dwyane Wade","Ed Davis","Ekpe Udoh","Elfrid Payton","Emmanuel Mudiay","Enes Kanter","Eric Bledsoe","Eric Gordon","Eric Moreland","Ersan Ilyasova","Etwaun Moore","Evan Fournier","Evan Turner","Frank Kaminsky","Frank Mason","Frank Ntilikina","Fred Vanvleet","Garrett Temple","Gary Harris","Gary Payton Ii","George Hill","Georgios Papagiannis","Gian Clavell","Giannis Antetokounmpo","Goran Dragic","Gordon Hayward","Gorgui Dieng","Greg Monroe","Guerschon Yabusele","Harrison Barnes","Hassan Whiteside","Henry Ellenson","Ian Clark","Ian Mahinmi","Ike Anigbogu","Iman Shumpert","Isaiah Canaan","Isaiah Taylor","Isaiah Whitehead","Ish Smith","Ivan Rabb","Ivica Zubac","JJ Barea","JJ Redick","JR Smith","Jabari Bird","Jacob Wiley","Jae Crowder","Jahlil Okafor","Jakarr Sampson","Jake Layman","Jakob Poeltl","Jalen Jones","Jamal Crawford","Jamal Murray","Jameer Nelson","James Ennis Iii","James Harden","James Johnson","Jamychal Green","Jared Dudley","Jarell Martin","Jarrett Allen","Jarrett Jack","Jason Smith","Jason Terry","Javale McGee","Jawun Evans","Jaylen Brown","Jayson Tatum","Jeff Green","Jeff Teague","Jeff Withey","Jerami Grant","Jeremy Lamb","Jeremy Lin","Jerian Grant","Jerryd Bayless","Jimmy Butler","Jodie Meeks","Joe Harris","Joe Ingles","Joe Johnson","Joe Young","Joel Embiid","Joffrey Lauvergne","John Collins","John Henson","John Wall","Johnny Obryant Iii","Jon Leuer","Jonas Jerebko","Jonas Valanciunas","Jonathan Isaac","Jonathon Simmons","Jordan Bell","Jordan Clarkson","Jordan Crawford","Jordan Mickey","Jose Calderon","Jose Juan Barea","Josh Hart","Josh Huestis","Josh Jackson","Josh Magette","Josh Richardson","Josh Smith","Jrue Holiday","Juan Hernangomez","Julius Randle","Julyan Stone","Justin Anderson","Justin Holiday","Justin Jackson","Justise Winslow","Jusuf Nurkic","Karl Anthony Towns","Kay Felder","Kelly Olynyk","Kelly Oubre Jr","Kemba Walker","Kenneth Faried","Kent Bazemore","Kentavious Caldwell Pope","Kevin Durant","Kevin Love","Kevon Looney","Khem Birch","Khris Middleton","Klay Thompson","Kosta Koufos","Kris Dunn","Kristaps Porzingis","Kyle Anderson","Kyle Korver","Kyle Kuzma","Kyle Lowry","Kyle Oquinn","Kyrie Irving","Lamarcus Aldridge","Lance Stephenson","Lance Thomas","Langston Galloway","Larry Nance Jr","Lauri Markkanen","Lebron James","Lonzo Ball","Lou Williams","Luc Mbah A Moute","Lucas Nogueira","Luke Babbitt","Luke Kennard","Luol Deng","Malachi Richardson","Malcolm Brogdon","Malcolm Delaney","Malik Beasley","Malik Monk","Mangok Mathiang","Manu Ginobili","Marc Gasol","Marcin Gortat","Marco Belinelli","Marcus Georges Hunt","Marcus Morris","Marcus Paige","Marcus Smart","Mario Chalmers","Mario Hezonja","Markelle Fultz","Markieff Morris","Marquese Chriss","Marreese Speights","Marvin Williams","Mason Plumlee","Matthew Dellavedova","Maurice Harkless","Maxi Kleber","Meyers Leonard","Michael Beasley","Michael Carter Williams","Michael Kidd Gilchrist","Mike Conley","Mike James","Mike Muscala","Mike Scott","Milos Teodosic","Mirza Teletovic","Montrezl Harrell","Myles Turner","Nemanja Bjelica","Nene","Nerlens Noel","Nick Collison","Nick Young","Nicolas Brussino","Nik Stauskas","Nikola Jokic","Nikola Vucevic","Noah Vonleh","Norman Powell","Og Anunoby","Okaro White","Omri Casspi","Otto Porter Jr","PJ Tucker","Pascal Siakam","Pat Connaughton","Patrick Beverley","Patrick McCaw","Patrick Patterson","Patty Mills","Pau Gasol","Paul George","Paul Millsap","Paul Zipser","Quincy Acy","Quincy Pondexter","Quinn Cook","Ramon Sessions","Rashad Vaughn","Raul Neto","Raymond Felton","Reggie Bullock","Reggie Jackson","Richard Jefferson","Richaun Holmes","Ricky Rubio","Robert Covington","Robin Lopez","Rodney Hood","Ron Baker","Rondae Hollis Jefferson","Royce ONeale","Rudy Gay","Rudy Gobert","Russell Westbrook","Ryan Anderson","Ryan Arcidiacono","Salah Mejri","Sam Dekker","Sean Kilpatrick","Semi Ojeleye","Serge Ibaka","Shabazz Muhammad","Shabazz Napier","Shane Larkin","Shaun Livingston","Shelvin Mack","Sindarius Thornwell","Skal Labissiere","Spencer Dinwiddie","Stanley Johnson","Stephen Curry","Sterling Brown","Steven Adams","TJ Leaf","TJ McConnell","TJ Warren","Taj Gibson","Tarik Black","Taurean Prince","Terrance Ferguson","Terrence Ross","Terry Rozier","Thabo Sefolosha","Thaddeus Young","Thon Maker","Tim Frazier","Tim Hardaway Jr","Timofey Mozgov","Timothe Luwawu Cabarrot","Tobias Harris","Tomas Satoransky","Tony Allen","Tony Bradley","Tony Snell","Treveon Graham","Trevor Ariza","Trevor Booker","Trey Lyles","Tristan Thompson","Troy Daniels","Troy Williams","Tyler Cavanaugh","Tyler Dorsey","Tyler Ennis","Tyler Johnson","Tyler Ulis","Tyler Zeller","Tyreke Evans","Tyson Chandler","Tyus Jones","Victor Oladipo","Vince Carter","Wayne Ellington","Wes Iwundu","Wesley Johnson","Wesley Matthews","Will Barton","Willie Cauley Stein","Willie Reed","Willy Hernangomez","Wilson Chandler","Yogi Ferrell","Zach Collins","Zach Randolph","Zaza Pachulia","Zhou Qi"]

var substringMatcher = function(strs) {
	return function findMatches(q, cb) {
	    var matches, substringRegex;
    	matches = [];
    	substrRegex = new RegExp(q, 'i');

		$.each(strs, function(i, str) {
			if (substrRegex.test(str)) {
	        	matches.push(str);
		    }
	    });

    	cb(matches);
	};
};

$('.typeahead').typeahead(
	{
		minLength: 2,
		highlight: true
	},
	{
		name: 'Players',
		source: substringMatcher(players),
		limit: 8
	}
);

//==========================================================================================
//=========================================================================== Event Binding |
//==========================================================================================

$(document).on("click", '.pspopen', function() {
	openPlayerSelect(this);
});

$(document).on("click", '.revert', function()	{
	revertPlayerCard(this);
	plotData();
});

$(document).on("click", '.pspclose', function()	{
	closePlayerSelect(this);
});

$(document).on("change", '.statselector', function()	{
	plotData();
});

$(document).on("change", '.timeselector', function()	{
	plotData();
});

$(document).ready(function() {
	plotData();
});

$(window).resize(function() {
	plotData();
});

$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
  console.log('Selection: ' + suggestion);
	createPlayerObject(suggestion);
});