
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var mouseX, mouseY;
var onmove = function(e)
{
	mouseX = e.clientX - 10;
	mouseY = e.clientY - 10;
}

var map;
var player;
var dtime = 20;

function gameloop()
{	
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0, canvas.width, canvas.height);
	
	player.update(dtime, map);
	
	console.log(keysDown);
	
	map.draw(player.position);
	player.draw();
	
	assertAll();
}

function init()
{
	map = new Map(ctx, LevelOne);
	player = new Player(ctx, map.spawnX, map.spawnY);
}

init();
window.onmousemove = onmove;
gameloop();
window.setInterval(gameloop, dtime);