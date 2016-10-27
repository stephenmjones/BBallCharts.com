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
	$(".selected").html("<div class='playerselectupper'><h2 class='playerselectheader'>"+obj+"</h2><button class='revert'><i class='fa fa-close'></i></button><img src='images/2016_17_Headshots/"+obj.replace(/\s+/g, '_')+".png' class='playerimg' onerror=this.src='/images/2014_15_Headshots/No_Photo.png' alt='No Player Photo'></div><div class='playerselectlower'><i class='fa fa-line-chart fa-fw'></i><select class='statselector'><option value='points'>Points</option><option value='assists'>Assists</option><option value='rebounds'>Rebounds</option><option value='steals'>Steals</option><option value='blocks'>Blocks</option><option value='to'>Turnovers</option><option value='minutes'>Minutes</option><option value='fgm'>FG Made</option><option value='fga'>FG Atempted</option><option value='tpm'>3PT Made</option><option value='tpa'>3PT Attempted</option><option value='ftm'>FT Made</option><option value='fta'>FT Attempted</option><option value='fantasy'>Fantasy Points</option></select><i class='fa fa-chevron-down fa-fw'></i></div>");
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

		var apiQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'date, o:team, team, '+playerName2+':minutes, '+playerName2+':points, '+playerName2+':field goals made, '+playerName2+':field goals attempted,  '+playerName2+':three pointers made, '+playerName2+':three pointers attempted,  '+playerName2+':free throws made, '+playerName2+':free throws attempted, '+playerName2+':assists, '+playerName2+':rebounds, '+playerName2+':steals, '+playerName2+':blocks, '+playerName2+':turnovers @ '+playerName2+':name and season = 2016'};

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
	console.log ('~~~~~~~~> plotData(); Triggered');
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
//var nameQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'U(name) @ season = 2016'};
//
//$.getJSON('http://api.sportsdatabase.com/nba/player_query.json?jsoncallback=?', nameQuery, function(result) {
//	$('body').html(result.groups[0].columns[0].sort().join("\",\""));});

var players = ["Aaron Gordon","Al Farouq Aminu","Al Horford","Al Jefferson","Alejandro Abrines","Alex Len","Alexis Ajinca","Allen Crabbe","Amir Johnson","Anderson Varejao","Andre Drummond","Andre Iguodala","Andre Roberson","Andrew Bogut","Andrew Harrison","Andrew Wiggins","Anthony Davis","Anthony Tolliver","Aron Baynes","Arron Afflalo","Avery Bradley","Ben McLemore","Beno Udrih","Boban Marjanovic","Bojan Bogdanovic","Boris Diaw","Brandon Ingram","Brandon Jennings","Brandon Knight","Brandon Rush","Brook Lopez","Bryn Forbes","Buddy Hield","CJ McCollum","CJ Miles","Carmelo Anthony","Channing Frye","Chris Andersen","Chris McCullough","Clint Capela","Cody Zeller","Cole Aldrich","Corey Brewer","Cory Joseph","Courtney Lee","DJ Augustin","Damian Lillard","Dangelo Russell","Danilo Gallinari","Dante Cunningham","Dante Exum","Dario Saric","David Lee","David West","Davis Bertans","Deandre Liggins","Demar Derozan","Demarcus Cousins","Demarre Carroll","Deron Williams","Derrick Rose","Devin Booker","Dewayne Dedmon","Deyonta Davis","Dion Waiters","Dirk Nowitzki","Domantas Sabonis","Dorian Finney Smith","Dragan Bender","Draymond Green","Dwight Powell","Ed Davis","Elfrid Payton","Emmanuel Mudiay","Enes Kanter","Eric Bledsoe","Eric Gordon","Ersan Ilyasova","Etwaun Moore","Evan Fournier","Evan Turner","Garrett Temple","George Hill","Gerald Green","Gerald Henderson","Giannis Antetokounmpo","Glenn Robinson Iii","Goran Dragic","Gorgui Dieng","Greg Monroe","Greivis Vasquez","Guillermo Hernangomez","Harrison Barnes","Hassan Whiteside","Henry Ellenson","Hollis Thompson","Ian Clark","Iman Shumpert","Isaiah Thomas","Isaiah Whitehead","Ish Smith","JR Smith","Jabari Parker","Jae Crowder","Jahlil Okafor","Jakob Poeltl","Jamal Murray","Jameer Nelson","James Ennis","James Harden","James Johnson","James Jones","Jamychal Green","Jared Dudley","Jason Terry","Javale McGee","Jaylen Brown","Jeff Green","Jeff Teague","Jeff Withey","Jerami Grant","Jeremy Lamb","Jeremy Lin","Joakim Noah","Joe Harris","Joe Ingles","Joe Johnson","Joe Young","Joel Embiid","John Henson","Jon Leuer","Jonas Jerebko","Jonas Valanciunas","Jonathon Simmons","Jordan Clarkson","Jordan McRae","Jose Juan Barea","Juancho Hernangomez","Julius Randle","Justin Anderson","Justin Hamilton","Justin Holiday","Justise Winslow","Jusuf Nurkic","Karl Anthony Towns","Kawhi Leonard","Kemba Walker","Kenneth Faried","Kentavious Caldwell Pope","Kevin Durant","Kevin Love","Kevon Looney","Kj McDaniels","Klay Thompson","Kosta Koufos","Kris Dunn","Kristaps Porzingis","Kyle Anderson","Kyle Lowry","Kyle Oquinn","Kyle Singler","Kyrie Irving","Lamarcus Aldridge","Lance Stephenson","Lance Thomas","Langston Galloway","Larry Nance Jr","Lavoy Allen","Leandro Barbosa","Lebron James","Louis Williams","Luis Scola","Luke Babbitt","Luol Deng","Malachi Richardson","Malcolm Brogdon","Manu Ginobili","Marc Gasol","Marcelo Huertas","Marco Belinelli","Marcus Morris","Mario Hezonja","Marquese Chriss","Marvin Williams","Mason Plumlee","Matt Barnes","Matthew Dellavedova","Maurice Harkless","Metta World Peace","Meyers Leonard","Michael Beasley","Michael Gbinije","Michael Kidd Gilchrist","Mike Conley","Mike Dunleavy","Miles Plumlee","Mindaugas Kuzminskas","Mirza Teletovic","Monta Ellis","Myles Turner","Nemanja Bjelica","Nene","Nick Young","Nicolas Batum","Nicolas Brussino","Nicolas Laprovittola","Nik Stauskas","Nikola Jokic","Nikola Vucevic","Noah Vonleh","Norman Powell","Omer Asik","Omri Casspi","PJ Tucker","Pascal Siakam","Patrick McCaw","Patrick Patterson","Patty Mills","Pau Gasol","Paul George","Quincy Acy","Ramon Sessions","Rashad Vaughn","Richard Jefferson","Richaun Holmes","Ricky Rubio","Robert Covington","Rodney Hood","Rodney McGruder","Rodney Stuckey","Ron Baker","Rondae Hollis Jefferson","Roy Hibbert","Rudy Gay","Rudy Gobert","Russell Westbrook","Ryan Anderson","Sam Dekker","Sasha Vujacic","Sean Kilpatrick","Semaj Christon","Serge Ibaka","Sergio Rodriguez","Seth Curry","Shabazz Muhammad","Shaun Livingston","Shelvin Mack","Solomon Hill","Spencer Hawes","Stanley Johnson","Stephen Curry","Steven Adams","TJ McConnell","TJ Warren","Tarik Black","Terrence Jones","Terrence Ross","Terry Rozier","Thaddeus Young","Tim Frazier","Timofey Mozgov","Tobias Harris","Tony Parker","Trevor Ariza","Trevor Booker","Trey Lyles","Tristan Thompson","Ty Lawson","Tyler Ennis","Tyler Johnson","Tyler Ulis","Tyler Zeller","Tyson Chandler","Victor Oladipo","Vince Carter","Wade Baldwin","Wesley Matthews","Will Barton","Willie Cauley Stein","Willie Reed","Wilson Chandler","Zach Lavine","Zach Randolph","Zaza Pachulia"]

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