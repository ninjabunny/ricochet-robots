function init(){
	//populate map with empty spaces
	var mapWidth = 16;
	var mapheight = 16;

	var theTable = $('#thetable');
	//empty table
	theTable.empty();
	// $('#thetable').empty()

	var temp = '';
	for (var i = 0; i<mapWidth;i++){
		temp+='<tr>';
		for(var j =0; j<mapheight; j++){
			temp += '<td><div class="cell"></div></td>';
		}
		temp+='</tr>';
	}
	theTable.append(temp);

	if($(window).height() < $(window).width()){
		$('td').each(function(){
			$(this).css('width', $(window).height()/mapWidth  - 9);
			$(this).css('height', $(window).height()/mapWidth - 9);		
		});
		
	} else {
		$('td').each(function(){
			$(this).css('width', $(window).width()/mapWidth  - 9);
			$(this).css('height', $(window).width()/mapWidth - 9);		
		});
	}

	//populate walls
	//top and bottom walls
	var firstWall = Math.floor((Math.random() * (mapWidth - 3) + 1));
	var secondWall = Math.floor((Math.random() * (mapWidth - 3) + 1));;
	while(secondWall === firstWall || secondWall === firstWall + 1 || secondWall === firstWall - 1) {
		secondWall = Math.floor((Math.random() * (mapWidth - 3) + 1));
	}
	$('tr:eq(0) td:eq('+ firstWall + ')').css('border-right', '5px solid').addClass('occupied');
	$('tr:eq(0) td:eq('+ secondWall + ')').css('border-right', '5px solid').addClass('occupied');

	firstWall = Math.floor((Math.random() * (mapWidth - 3) + 1));
	secondWall = Math.floor((Math.random() * (mapWidth - 3) + 1));;
	while(secondWall === firstWall || secondWall === firstWall + 1 || secondWall === firstWall - 1) {
		secondWall = Math.floor((Math.random() * (mapWidth - 3) + 1));
	}
	$('tr:eq('+(mapheight-1)+') td:eq('+ firstWall + ')').css('border-right', '5px solid').addClass('occupied');
	$('tr:eq('+(mapheight-1)+') td:eq('+ secondWall + ')').css('border-right', '5px solid').addClass('occupied');
	//left and right walls
	firstWall = Math.floor((Math.random() * (mapWidth - 3) + 1));
	secondWall = Math.floor((Math.random() * (mapWidth - 3) + 1));;
	while(secondWall === firstWall || secondWall === firstWall + 1 || secondWall === firstWall - 1) {
		secondWall = Math.floor((Math.random() * (mapWidth - 3) + 1));
	}
	$('tr:eq('+firstWall+') td:eq(0)').css('border-bottom', '5px solid').addClass('occupied');
	$('tr:eq('+secondWall+') td:eq(0)').css('border-bottom', '5px solid').addClass('occupied');

	firstWall = Math.floor((Math.random() * (mapWidth - 3) + 1));
	secondWall = Math.floor((Math.random() * (mapWidth - 3) + 1));;
	while(secondWall === firstWall || secondWall === firstWall + 1 || secondWall === firstWall - 1) {
		secondWall = Math.floor((Math.random() * (mapWidth - 3) + 1));
	}
	$('tr:eq('+firstWall+') td:eq('+(mapWidth-1)+')').css('border-bottom', '5px solid').addClass('occupied');
	$('tr:eq('+secondWall+') td:eq('+(mapWidth-1)+')').css('border-bottom', '5px solid').addClass('occupied');

	//populate map with L-shaped walls
	var wallCount = 20;
	for(var i=0;i<wallCount;i++){
		var x = Math.floor((Math.random() * (mapWidth - 2) + 1));
		var y = Math.floor((Math.random() * (mapWidth - 2) + 1));
		if(!$('tr:eq('+x+') td:eq('+y+')').hasClass('occupied')){
			$('tr:eq('+x+') td:eq('+y+')').addClass(getWall()).addClass('lwall');	
		}
		
	}

	function getWall(){
		var walls = ["upright", "upleft", "downright", "downleft"];
		var rando = Math.floor(Math.random() * 4);
		return walls[rando];
	}

	//populate robots
	while($('.circle').length < 4) {
		var temp = $('.cell:eq('+Math.floor(Math.random() * mapWidth * mapheight)+')');
		if(!temp.hasClass('circle')) {
			temp.addClass('circle').addClass('occupied');
		}
	}

	$('.circle:eq(0)').css('background', 'red').css('border', '1px solid grey;');
	$('.circle:eq(1)').css('background', 'green').css('border', '1px solid grey;');
	$('.circle:eq(2)').css('background', 'blue').css('border', '1px solid grey;');
	$('.circle:eq(3)').css('background', 'yellow').css('border', '1px solid grey;');


	while($('.target').length < 4) {
		var temp = $('.lwall:eq('+Math.floor(Math.random() * $('.lwall').length) + ')');
		if(!temp.hasClass('target') && !temp.hasClass('circle')) {
			temp.addClass('target');
		}
	}


	$('.target:eq(0)').css('background', 'red');
	$('.target:eq(1)').css('background', 'green');
	$('.target:eq(2)').css('background', 'blue');
	$('.target:eq(3)').css('background', 'yellow');


	$('.cell').each(function(){
		if(!$(this).hasClass('circle'))
			$(this).addClass('circle');
	});


	var diameter = $('td').width() * .95;
	$('.circle').each(function(){
		$(this).css('width', diameter);	
		$(this).css('height', diameter);
	});	
}
init();
$('#thetable').click(function(){
	init();
});
setInterval(function() { init(); }, 1000 * 60 * 60);
