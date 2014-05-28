var projectiles = new Array();

var Projectile = function(size, color, pos, vel, friend)
{
	this.friend = friend;
	this.position = pos;
	this.size = size;
	var self = this;
	
	projectiles.push(self);
	
	this.update = function(dtime, map)
	{
		self.position.X += vel.X * dtime;
		self.position.Y += vel.Y * dtime;
		
	}
	
	this.draw = function(ctx, reference)
	{
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(self.position.X - reference.X + player_pos.X, self.position.Y - reference.Y + player_pos.Y,size,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
	}
}

var drawAllProjectiles = function(ctx, reference)
{
	for (var i = 0; i < projectiles.length; i++)
	{
		projectiles[i].draw(ctx, reference);
	}
}
var updateAllProjectiles = function(dtime, map)
{
	for (var i = 0; i < projectiles.length; i++)
	{
		projectiles[i].update(dtime);
		
		var ints = new Vector2().init(Math.floor(projectiles[i].position.X / map.tile_w), Math.floor(projectiles[i].position.Y / map.tile_h));
		if (ints.X >= 0 && ints.X < map.width && ints.Y >= 0 && ints.Y < map.height)
		{
			if (map.mapdata[ints.X][ints.Y] == LAND)
			{
				projectiles.splice(i--,1);
			}
			if (map.mapdata[ints.X][ints.Y] == LAND && projectiles[i].friend)
			{
				map.mapdata[ints.X][ints.Y] = EMPTY;
				if (projectiles[i].size < 8)
					projectiles.splice(i--,1);
				else
				{
					ints = new Vector2().init(Math.floor((projectiles[i].position.X - projectiles[i].size) / map.tile_w), Math.floor((projectiles[i].position.Y - projectiles[i].size) / map.tile_h));
					if (ints.X >= 0 && ints.X < map.width && ints.Y >= 0 && ints.Y < map.height && map.mapdata[ints.X][ints.Y] == LAND)
						map.mapdata[ints.X][ints.Y] = EMPTY;
						
					ints = new Vector2().init(Math.floor((projectiles[i].position.X - projectiles[i].size) / map.tile_w), Math.floor((projectiles[i].position.Y + projectiles[i].size) / map.tile_h));
					if (ints.X >= 0 && ints.X < map.width && ints.Y >= 0 && ints.Y < map.height && map.mapdata[ints.X][ints.Y] == LAND)
						map.mapdata[ints.X][ints.Y] = EMPTY;
						
					ints = new Vector2().init(Math.floor((projectiles[i].position.X + projectiles[i].size) / map.tile_w), Math.floor((projectiles[i].position.Y - projectiles[i].size) / map.tile_h));
					if (ints.X >= 0 && ints.X < map.width && ints.Y >= 0 && ints.Y < map.height && map.mapdata[ints.X][ints.Y] == LAND)
						map.mapdata[ints.X][ints.Y] = EMPTY;
						
					ints = new Vector2().init(Math.floor((projectiles[i].position.X + projectiles[i].size) / map.tile_w), Math.floor((projectiles[i].position.Y + projectiles[i].size) / map.tile_h));
					if (ints.X >= 0 && ints.X < map.width && ints.Y >= 0 && ints.Y < map.height && map.mapdata[ints.X][ints.Y] == LAND)
						map.mapdata[ints.X][ints.Y] = EMPTY;
					
				}
			}
		}
	}
}