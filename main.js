
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
	
	ctx.font="20px Courier";
	ctx.fillStyle="#FFF";
	ctx.fillText("Time: " + (player.time / 1000).toFixed(2) + "s",10,20);
	if (!player.alive)
	{
		ctx.fillStyle="#F00";
		ctx.fillText("Dead. Press R to restart.",10,50);
	}
	if (player.win)
	{
		ctx.fillStyle="#FF8";
		ctx.fillText("Victory!",10,80);
	}
	
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