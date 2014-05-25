
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var mouseX, mouseY;
var onmove = function(e)
{
	mouseX = e.clientX - 10;
	mouseY = e.clientY - 10;
}
function leftClick()
{
	var projspeed = 0.7;
	var projsize = 5;
	new Projectile(player.charging? projsize * 3 : projsize, '#FFF', player.getCenter(), player.getCenter().vectorTo(player.rough_aim).normalize().scale(projspeed + Math.random() * 0.1), true); 
	if (player.charging)
	{
		player.energy -= 20;
		if (player.energy < 0) player.energy = 0;
		
		var strength = 2;
		var dir = player.getCenter().vectorTo(player.rough_aim).normalize().scale(-strength);
		player.velocity.X += dir.X;
		player.velocity.Y += dir.Y / 2;
		player.move_resist += 10;
		player.falling = true;
	}
}
function rightClick()
{
}


var map;
var player;
var dtime = 20;
var highscore = -1;

function gameloop()
{	
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0, canvas.width, canvas.height);
	
	player.rough_aim.X = player.position.X + (mouseX - player_pos.X); 
	player.rough_aim.Y = player.position.Y + (mouseY - player_pos.Y);
	player.update(dtime, map);
	updateAllProjectiles(dtime, map);
	
	map.draw(player.position);
	player.draw();
	ctx.strokeStyle ='#088';
	ctx.beginPath();
	ctx.moveTo(player_pos.X + player.image.width / 2, player_pos.Y + player.image.height / 2);
	ctx.lineTo(mouseX,mouseY);
	var tvec = new Vector2().init(mouseX - (player_pos.X + player.image.width / 2), mouseY - (player_pos.Y + player.image.height / 2));
	for (var t = 0; t < 50; t++)
	{
		ctx.lineTo(mouseX + t * tvec.X, mouseY + t * tvec.Y);
	}
	ctx.closePath();
	ctx.stroke();
	drawAllProjectiles(ctx, player.position);
	
	if (player.win && (highscore == -1 || player.time < highscore))
	{
		highscore = player.time;
	}
	
	ctx.font="20px Courier";
	ctx.fillStyle="#FFF";
	ctx.fillText("Time: " + (player.time / 1000).toFixed(2) + "s",10,20);
	ctx.fillStyle="#AAA";
	ctx.fillText("Best time: " + ((highscore == -1)? "N/A" :( (highscore / 1000).toFixed(2) + "s")),10,50);
	if (!player.alive)
	{
		ctx.fillStyle="#F00";
		ctx.fillText("Dead. Press R to restart.",10,110);
	}
	if (player.win)
	{
		ctx.fillStyle="#FF8";
		ctx.fillText("Victory!",10,80);
	}
	ctx.fillStyle="#AFF";
	ctx.fillText("Energy: " + (player.energy) + "%",10,140);
	ctx.fillRect(10,170,player.energy*2,25);
	
	assertAll();
}

function init()
{
	map = new Map(ctx, LevelOne);
	player = new Player(ctx, map.spawnX, map.spawnY);
	projectiles = new Array();
}

init();
window.onmousemove = onmove;
gameloop();
window.setInterval(gameloop, dtime);