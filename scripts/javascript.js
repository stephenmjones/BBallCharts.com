//==========================================================================================
//===================================================================== Multi Use Functions |
//==========================================================================================

function minTommss(minutes) {
	var sign = minutes < 0 ? "-" : "";
	var min = Math.floor(Math.abs(minutes))
	var sec = Math.floor((Math.abs(minutes) * 60) % 60);
	return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
};
	
function getFormattedDate(q) {
	var date = new Date(q);
	var str = (date.getMonth() + 1) + "/" + (date.getDate()+1);
	return str;
};
	
//==========================================================================================
//============================================================================ UI Functions |
//==========================================================================================
	
function openPlayerSelect(obj) {
	console.log("~~~~~~~~> openPlayerSelect(); Triggered");
	$( ".pspbackground" ).toggle();
	$(obj).parent().parent().toggleClass("selected")
	$(".pspinput").focus();
	console.log("~~~~~~~~> openPlayerSelect(); Finished");
};
	
function closePlayerSelect(obj) {
	console.log("~~~~~~~~> closePlayerSelect(); Triggered");
	$( ".pspbackground" ).toggle();
	$(".selected").toggleClass("selected")
	$('.typeahead').typeahead('val', '');
	console.log("~~~~~~~~> closePlayerSelect(); Finished");
};

function changePlayerCard(obj) {
	console.log("~~~~~~~~> changePlayerCard(); Triggered");
	$( ".pspbackground" ).toggle();
	$(".selected").animate({height: "64px"}, 800, function() {});
	$(".selected").html("<div class='playerselectupper'><h2 class='playerselectheader'>"+obj+"</h2><button class='revert'><i class='fa fa-close'></i></button><img src='images/2014_15_Headshots/"+obj.replace(/\s+/g, '_')+".png' class='playerimg' onerror=this.src='/images/2014_15_Headshots/No_Photo.png' alt='Player photo'></div><div class='playerselectlower'><i class='fa fa-line-chart fa-fw'></i><select class='statselector'><option value='fantasy'>Fantasy Points</option><option value='minutes'>Minutes</option><option value='points'>Points</option><option value='fgm'>FGM</option><option value='fga'>FGA</option><option value='tpm'>3PM</option><option value='tpa'>3PA</option><option value='ftm'>FTM</option><option value='fta'>FTA</option><option value='assists'>Assists</option><option value='rebounds'>Rebounds</option><option value='steals'>Steals</option><option value='blocks'>Blocks</option><option value='to'>Turnovers</option></select><i class='fa fa-chevron-down fa-fw'></i></div>");
	$(".pspinput").blur();
	$(".selected").toggleClass("selected")
	$('.typeahead').typeahead('val', '');
	console.log("~~~~~~~~> changePlayerCard(); Finished");
};

function revertPlayerCard(obj) {
	console.log("~~~~~~~~> revertPlayerCard(); Triggered");
	$(obj).parent().parent().animate({height: "35px"}, 600, function() {});
	$(obj).parent().parent().html("<div class='playerselectupper'><h2 class='playerselectheader'>Add Player...</h2><button class='pspopen'><i class='fa fa-plus'></i></button></div>");
	console.log("~~~~~~~~> revertPlayerCard(); Finished");
};

function createPlayerObject(obj) {

	console.log("~~~~~~~~> createPlayerObject(); Triggered");
	changePlayerCard(obj);
	var playerName = obj.replace(/\s+/g, '')+'Obj';
	var playerName2 = obj
		
	if (typeof window[playerName] == "undefined")	{
		window[playerName] = new Object;
		console.log(playerName+" does not exist.");
		console.log(playerName+" created.");
				
		var apiQuery = {'api_key': 'guest', 'output': 'json', 'sdql': 'date, o:team, team, '+playerName2+':minutes, '+playerName2+':points, '+playerName2+':field goals made, '+playerName2+':field goals attempted,  '+playerName2+':three pointers made, '+playerName2+':three pointers attempted,  '+playerName2+':free throws made, '+playerName2+':free throws attempted, '+playerName2+':assists, '+playerName2+':rebounds, '+playerName2+':steals, '+playerName2+':blocks, '+playerName2+':turnovers @ '+playerName2+':name and season = 2014'};
		
		$.getJSON('http://api.sportsdatabase.com/nba/query.json?jsoncallback=?', apiQuery, function(result) {
			console.log("Beginning JSON Fetch.")
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
				dateStr = result.groups[0].columns[0][i].toString().replace(/(\d{4})(\d\d)(\d\d)/g, '$1/$2/$3');
				parts = dateStr.split("/");
				dt = Date.UTC(parseInt(parts[0], 10),parseInt(parts[1], 10) - 1,parseInt(parts[2], 10));
				console.log(dt);
				labelStats.push([result.groups[0].columns[1][i]]) 
				minStats.push([dt, result.groups[0].columns[3][i]]);
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
						
			console.log("Populating "+playerName+" with data")
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
			console.log("Finished populating "+playerName+" with data")
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
	};
};

//==========================================================================================
//========================================================================= Graph Functions |
//==========================================================================================

function showChartTooltip(x, y, color, contents) {
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
			padding: 2
		}).appendTo("body");
		$('.tooltip').css( {
			left: x - ($('.tooltip').width()+10),
			display: 'block'
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
			padding: 2
		}).appendTo("body").fadeIn(200);
	};
};

function plotData()	{
	console.log ('~~~~~~~~> plotData(); Triggered')
	var timePeriod = $('.timeselector').val();
	var today = new Date();
	var options = {
		series: {
			lines: {
				show: true,
				fill: false,
			},
			points: {
				show: true,
				radius: 5,
			},
		},
		xaxis: {
			mode: "time",
			minTickSize: [1, "day"],
			timeformat: "%m/%d",
			tickDecimals: 0,
		},
		yaxis: {
			tickDecimals: 0
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
		},
		legend: {
			show: false
		},
	};		

	var datap = [];
		
	if ($('.playerwindow').children('div').children('div:nth-child(4)').children('div').children('div').children('.revert').length != 0)	{
		var fourthObjName = $('.playerwindow').children('div').children('div:nth-child(4)').children('div').children('div').children('h2').text().replace(/\s+/g, '')+'Obj';
		var selectedStat = $('.playerwindow').children('div').children('div:nth-child(4)').children('div').children('div').children('.statselector').val();
		window[fourthObjName][selectedStat].color = "#713991";
		window[fourthObjName][selectedStat].data = window[fourthObjName][selectedStat].data2.slice(0);
		window[fourthObjName][selectedStat].label = window[fourthObjName][selectedStat].label2.slice(0);
		for (i = window[fourthObjName][selectedStat].data.length - 1; i >= 0; i--) {
			if (window[fourthObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - $('.timeselector').val())	{ 
				window[fourthObjName][selectedStat].data.splice(i, 1);
				window[fourthObjName][selectedStat].label.splice(i, 1);
			}
		}
		datap.push (window[fourthObjName][selectedStat]);
	}
		
	if ($('.playerwindow').children('div').children('div:nth-child(3)').children('div').children('div').children('.revert').length != 0) {
		var thirdObjName = $('.playerwindow').children('div').children('div:nth-child(3)').children('div').children('div').children('h2').text().replace(/\s+/g, '')+'Obj';
		var selectedStat = $('.playerwindow').children('div').children('div:nth-child(3)').children('div').children('div').children('.statselector').val();
		window[thirdObjName][selectedStat].color = "#0076a3";
		window[thirdObjName][selectedStat].data = window[thirdObjName][selectedStat].data2.slice(0);
		window[thirdObjName][selectedStat].label = window[thirdObjName][selectedStat].label2.slice(0);
		for (i = window[thirdObjName][selectedStat].data.length - 1; i >= 0; i--) {
			if (window[thirdObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - $('.timeselector').val())	{ 
				window[thirdObjName][selectedStat].data.splice(i, 1);
				window[thirdObjName][selectedStat].label.splice(i, 1);
			}
		}
		datap.push (window[thirdObjName][selectedStat]);
	}
		
	if ($('.playerwindow').children('div').children('div:nth-child(2)').children('div').children('div').children('.revert').length != 0) {
		var secondObjName = $('.playerwindow').children('div').children('div:nth-child(2)').children('div').children('div').children('h2').text().replace(/\s+/g, '')+'Obj';
		var selectedStat = $('.playerwindow').children('div').children('div:nth-child(2)').children('div').children('div').children('.statselector').val();
		window[secondObjName][selectedStat].color = "#39b54a";
		window[secondObjName][selectedStat].data = window[secondObjName][selectedStat].data2.slice(0);
		window[secondObjName][selectedStat].label = window[secondObjName][selectedStat].label2.slice(0);
		for (i = window[secondObjName][selectedStat].data.length - 1; i >= 0; i--) {
			if (window[secondObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - $('.timeselector').val()) { 
				window[secondObjName][selectedStat].data.splice(i, 1);
				window[secondObjName][selectedStat].label.splice(i, 1);
			}
		}
		datap.push (window[secondObjName][selectedStat]);
	}
		
	if ($('.playerwindow').children('div').children('div:nth-child(1)').children('div').children('div').children('.revert').length != 0) {
		var firstObjName = $('.playerwindow').children('div').children('div:nth-child(1)').children('div').children('div').children('h2').text().replace(/\s+/g, '')+'Obj';
		var selectedStat = $('.playerwindow').children('div').children('div:nth-child(1)').children('div').children('div').children('.statselector').val();
		window[firstObjName][selectedStat].color = "#ef2c3e";
		window[firstObjName][selectedStat].data = window[firstObjName][selectedStat].data2.slice(0);
		window[firstObjName][selectedStat].label = window[firstObjName][selectedStat].label2.slice(0);
		for (i = window[firstObjName][selectedStat].data.length - 1; i >= 0; i--) {
			if (window[firstObjName][selectedStat].data[i][0] <= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - $('.timeselector').val()) { 
				window[firstObjName][selectedStat].data.splice(i, 1);
				window[firstObjName][selectedStat].label.splice(i, 1);
			}
		}
		datap.push (window[firstObjName][selectedStat]);
	}
			
	plot = $.plot($('.graphlower'), datap, options);

	$(".graphlower").bind("plothover", function (event, pos, item) {
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));
				
		if (item) {
			$(".tooltip").remove();
			var x = item.datapoint[0].toFixed(2),
			y = item.datapoint[1];
			showChartTooltip(item.pageX, item.pageY, item.series.color, "<div class='tooltip_left'><p>"+y+"</p><p>"+item.series.term+"</p></div><div class='tooltip_right'><p>"+item.series.name+"</p><p>"+getFormattedDate(Math.round(x))+" vs. "+ item.series.label[item.dataIndex] + "</p></div>");
		}
		else {
			$(".tooltip").remove();
		}
	});
		
	console.log ('~~~~~~~~> plotData(); Finished')
};


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

$( window ).resize(function() {
	plotData();
});

$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
  console.log('Selection: ' + suggestion);
	createPlayerObject(suggestion);
});

//==========================================================================================
//======================================================================= Typeahead Scripts |
//==========================================================================================

var players = ["Wesley Johnson","Carlos Boozer","Jordan Hill","Kobe Bryant","Jeremy Lin","Ronnie Price","Jordan Clarkson","Ed Davis","Xavier Henry","Julius Randle","Robert Sacre","Trevor Ariza","Terrence Jones","Dwight Howard","James Harden","Patrick Beverley","Tarik Black","Jason Terry","Donatas Motiejunas","Kostas Papanikolaou","Troy Daniels","Isaiah Canaan","Tyreke Evans","Anthony Davis","Omer Asik","Eric Gordon","Jrue Holiday","Ryan J Anderson","John Salmons","Jimmer Fredette","Austin Rivers","Jeff Withey","Luke Babbitt","Alexis Ajinca","Tobias Harris","Kyle Oquinn","Nikola Vucevic","Evan Fournier","Elfrid Payton","Aaron Gordon","Ben Gordon","Luke Ridnour","Dewayne Dedmon","Willie Green","Devyn Marble","Marco Belinelli","Tim Duncan","Matt Bonner","Daniel Green","Tony Parker","Manu Ginobili","Boris Diaw","Aron Baynes","Cory Joseph","Chandler Parsons","Dirk Nowitzki","Tyson Chandler","Monta Ellis","Jameer Nelson","Greg Smith","Devin Harris","Brandan Wright","Al","Jae Crowder","Richard Jefferson","Jeff Green","Jared Sullinger","Kelly Olynyk","Avery Bradley","Rajon Rondo","Marcus Smart","Evan Turner","Marcus Thornton","Brandon Bass","Tyler Zeller","Joe Johnson","Kevin Garnett","Mason Plumlee","Bojan Bogdanovic","Deron Williams","Andrei Kirilenko","Mirza Teletovic","Alan Anderson","Jarrett Jack","Jerome Jordan","Cory Jefferson","Sergey Karasev","Tony Allen","Zach Randolph","Marc Gasol","Courtney Lee","Mike Conley","Kosta Koufos","Beno Udrih","Quincy Pondexter","Vince Carter","Jon Leuer","Andrew Wiggins","Thaddeus Young","Nikola Pekovic","Corey Brewer","Ricky Rubio","Gorgui Dieng","Maurice Williams","Shabazz Muhammad","Anthony Bennett","Chase Budinger","Luol Deng","Shawne Williams","Chris Bosh","Dwyane Wade","Norris Cole","Chris Andersen","Mario Chalmers","James Ennis","Shabazz Napier","Paul Pierce","Drew Gooden","Marcin Gortat","Garrett Temple","John Wall","Kris Humphries","Otto Porter","Rasual Butler","Andre Miller","Kevin Seraphin","Michael Kidd","Marvin Williams","Al Jefferson","Lance Stephenson","Kemba Walker","Cody Zeller","Gerald Henderson","Gary Neal","Jason Maxiell","Brian Roberts","Khris Middleton","Jabari Parker","Larry Sanders","Jared Dudley","Brandon Knight","Zaza Pachulia","Giannis Antetokounmpo","OJ Mayo","Ersan Ilyasova","John Henson","Jerryd Bayless","Gordon Hayward","Derrick Favors","Enes Kanter","Alec Burks","Trey Burke","Rodney Hood","Trevor Booker","Rudy Gobert","Dante Exum","Tmp Joe Ingles","Rudy Gay","Jason Thompson","Demarcus Cousins","Ben McLemore","Darren Collison","Nik Stauskas","Carl Landry","Derrick Williams","Ramon Sessions","Reggie Evans","Omri Casspi","Ryan Hollins","Ray McCallum","Harrison Barnes","Draymond Green","Andrew Bogut","Klay Thompson","Stephen Curry","Festus Ezeli","Andre Iguodala","Marreese Speights","Leandro Barbosa","Justin Holiday","Ognjen Kuzmic","Shaun Livingston","Carmelo Anthony","Amare Stoudemire","Samuel Dalembert","Shane Larkin","Iman Shumpert","Pablo Prigioni","JR Smith","Jason Smith","Quincy Acy","Timothy Hardaway","Cole Aldrich","Cleanthony Early","Travis Wear","Mike Dunleavy","Pau Gasol","Joakim Noah","Kirk Hinrich","Derrick Rose","Aaron Brooks","Taj Gibson","Doug McDermott","Nikola Mirotic","Tony Snell","Cameron Bairstow","Etwaun Moore","Danilo Gallinari","Kenneth Faried","Timofey Mozgov","Arron Afflalo","Ty Lawson","Jusuf Nurkic","Wilson Chandler","Randy Foye","Darrell Arthur","Nate Robinson","Javale McGee","Alonzo Gee","Kyle Singler","Josh Smith","Andre Drummond","Kentavious Caldwell","Brandon Jennings","Caron Butler","Spencer Dinwiddie","Joel Anthony","DJ Augustin","Jonas Jerebko","Solomon Hill","Luis Scola","Roy Hibbert","CJ Miles","Donald Sloan","Chris Copeland","Lavoy Allen","Rodney Stuckey","Ian Mahinmi","Damjan Rudez","Christapher Johnson","Nerlens Noel","Henry Sims","Hollis Thompson","Tony Wroten","Brandon Davies","Kj McDaniels","Jakarr Sampson","Malcolm Thomas","Alexey Shved","Terrence Ross","Amir Johnson","Jonas Valanciunas","Demar Derozan","Kyle Lowry","Tyler Hansbrough","James Johnson","Patrick Patterson","Louis Williams","Greivis Vasquez","Demarre Carroll","Paul Millsap","Al Horford","Kyle Korver","Jeff Teague","Elton Brand","Kent Bazemore","Shelvin Mack","Mike Scott","Thabo Sefolosha","Dennis Schroder","Marcus Morris","Markieff Morris","Miles Plumlee","Goran Dragic","Eric Bledsoe","Alex Len","Isaiah Thomas","Gerald Green","Archie Goodwin","Anthony Tolliver","Shavlik Randolph","Tyler Ennis","Wayne Ellington","Nicolas Batum","Lamarcus Aldridge","Robin Lopez","Wesley Matthews","Damian Lillard","Chris Kaman","CJ McCollum","Joel Freeland","Steve Blake","Dorell Wright","Will Barton","Allen Crabbe","Thomas Robinson","Serge Ibaka","Perry Jones","Steven Adams","Andre Roberson","Russell Westbrook","Lance Thomas","Kendrick Perkins","Nick Collison","Sebastian Telfair","Lebron James","Kevin Love","Anderson Varejao","Dion Waiters","Kyrie Irving","Tristan T Thompson","Matthew Dellavedova","Shawn Marion","Mike Miller","Matt Barnes","Blake Griffin","Deandre Jordan","JJ Redick","Chris Paul","Spencer Hawes","Jamal Crawford","Ekpe Udoh","Chris Douglas","Jordan Farmar","Channing Frye","Andrew Nicholson","Nene","Glen Rice Jr","Jose Barea","Charlie Villanueva","Ian Clark","Steve Novak","Kevin Martin","Zach Lavine","Kendall Marshall","Nate Wolters","Luc Mbah A Moute","Joe Harris","Hidayet Turkoglu","Tayshaun Prince","Kawhi Leonard","Austin Daye","Jeff Ayres","Pero Antic","Maurice Harkless","Landry Fields","Greg Monroe","Joey Dorsey","Nick Johnson","James Young","Phil Pressey","Josh McRoberts","Justin Hamilton","Andre Dawkins","Robbie Hummel","Jimmy Butler","Dejuan Blair","Jared Cunningham","Shannon Brown","Chuck Hayes","Reggie Bullock","Joe Ingles","Jordan Adams","Darius Miller","Gerald Wallace","Brook Lopez","Jorge Gutierrez","Reggie Jackson","Ryan Kelly","PJ Tucker","Russ Smith","PJ Hairston","Greg Stiemsma","Meyers Leonard","Brendan Haywood","James Jones","Alex Kirk","Tiago Splitter","David Lee","Brandon Rush","Francisco Garcia","Clint Capela","Kyle Anderson","AJ Price","Jeremy Evans","Erick Green","Will Cherry","Jeremy Lamb","Ish Smith","Glen Davis","Udonis Haslem","Shayne Whittington","Jannero Pargo","Bismack Biyombo","TJ Warren","JJ Hickson","Anthony Morrow","Mike Muscala","Ronny Turiaf","Michael Carter","Drew Gordon","Dwight Powell","Victor Oladipo","Gary Harris","Lou Amundson","John Jenkins","Zoran Dragic","Glenn Robinson Iii","Noah Vonleh","Jarnell Stokes","Danny Granger","Robert Covington","Nick Young","Kalin Lucas","Bradley Beal","Nazr Mohammed","Bruno Caboclo","Lucas Nogueira","Jose Calderon","Markel Brown","Nick Calathes","Cartier Martin","Eric Moreland","David West","CJ Watson","Grant Jerrett","Jerami Grant","Jeff Adrien","Hassan Whiteside","Kevin Durant","Luigi Datome","CJ Wilcox","Dante Cunningham","Gal Mekel","Malcolm Lee","Darius Morris","Jodie Meeks","Mitch McGary","Furkan Aldemir","Johnny Obryant","Jeff Taylor","Ricardo Ledo","Victor Claver","George Hill","Adreian Payne","Patrick Christopher","Raymond Felton","Patrick Mills","Martell Webster","Andrea Bargnani","Toure Murry","Elijah Millsap","Elliot Williams","Langston Galloway","Kenyon Martin","Miroslav Raduljica","Tyler Johnson","Dahntay Jones","Larry Drew","Quincy Miller","Jamychal Green","James Michael McAdoo","Quincy Miller","Tyrus Thomas","Lorenzo Brown","Reggie Williams","Tim Frazier","Toney Douglas","Bernard James","Jason Richardson","David Stockton","Joffrey Lauvergne","Henry Walker","Earl Barron","Jordan Hamilton","Bryce Cotton","Jack Cooley","Michael Beasley","Jerrelle Benimon","Seth Curry","Jabari Brown","Sean Kilpatrick","Earl Clark","Will Bynum","David Wear","Jerel McNeal","Dwight Buycks","Lester Hudson","Paul George","Sim Bhullar","Arinze Onuaku","Jamaal Franklin","Vander Blue"]

players.sort();

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

$('.typeahead').typeahead({
  minLength: 2,
  highlight: true
},
{
  name: 'Players',
  source: substringMatcher(players),
	limit: 8
});