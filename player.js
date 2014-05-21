function Player(ctx, sx, sy)
{
	this.image = new Image();
	this.image.src = 'player.png';
	this.position = new Vector2().init(sx, sy);
	this.velocity = new Vector2();
	this.falling = true;
	var jump = -0.6;
	var maxV = 1.2;
	var self = this;
	var acc = 0.003;
	var maxXV = 0.3;
	
	this.update = function(dtime, map)
	{
		if (self.falling)
			self.velocity.Y += gravity * dtime;
		
		if (self.velocity.Y > maxV)
			self.velocity.Y = maxV;
		
		if (65 in keysDown)
			self.velocity.X -= acc * dtime;
		if (68 in keysDown)
			self.velocity.X += acc * dtime;		
		if ((!(65 in keysDown) && !(68 in keysDown)) ||
			(!(65 in keysDown) && self.velocity.X < 0) ||
			(!(68 in keysDown) && self.velocity.X > 0))
		{
			self.velocity.X /= 1.2;
		}
		if (self.velocity.X > maxXV) 
			self.velocity.X = maxXV;
		if (self.velocity.X < -maxXV) 
			self.velocity.X = -maxXV;
			
		self.position.X += self.velocity.X * dtime;
		self.position.Y += self.velocity.Y * dtime;
		
		var feet = new Vector2().init(Math.floor((self.position.X + self.image.width / 2) / map.tile_w), 
									  Math.floor((self.position.Y + self.image.height) / map.tile_h));
		var head = new Vector2().init(Math.floor((self.position.X + self.image.width / 2) / map.tile_w), 
									  Math.floor((self.position.Y) / map.tile_h));
		var left = new Vector2().init(Math.floor((self.position.X) / map.tile_w), 
		                              Math.floor((self.position.Y + self.image.height / 2) / map.tile_h));
		var right = new Vector2().init(Math.floor((self.position.X + self.image.width) / map.tile_w), 
									   Math.floor((self.position.Y + self.image.height / 2) / map.tile_h));
		
		if (map.mapdata[feet.X][feet.Y] == LAND || (map.mapdata[feet.X][feet.Y] == ONEWAY && self.velocity.Y > 0))
		{
			self.velocity.Y = 0;
			self.position.Y = feet.Y * map.tile_h - self.image.height;
			self.falling = false;
		}
		else
			self.falling = true;
		
		if (!self.falling && 87 in keysDown)
		{
			self.velocity.Y = jump;
			self.falling = true;
		}
		if (self.falling && !(87 in keysDown) && self.velocity.Y < 0)
		{
			self.velocity.Y = 0;
		}
		if (self.falling && map.mapdata[head.X][head.Y] == LAND && self.velocity.Y < 0)
		{
			self.velocity.Y = 0;
		}
		
		if (map.mapdata[left.X][left.Y] == LAND)
		{
			self.velocity.X = 0;
			self.position.X = (left.X + 1) * map.tile_w;
		}
		if (map.mapdata[right.X][right.Y] == LAND)
		{
			self.velocity.X = 0;
			self.position.X = right.X * map.tile_w - self.image.width;
		}
		
		if (map.mapdata[feet.X][feet.Y] == KILL ||
			map.mapdata[head.X][head.Y] == KILL ||
			map.mapdata[left.X][left.Y] == KILL ||
			map.mapdata[right.X][right.Y] == KILL ||
			82 in keysDown /* R */)
		{
			self.position.X = map.spawnX;
			self.position.Y = map.spawnY;
			self.velocity.X = 0;
			self.velocity.Y = 0;
		}
	}
	
	this.draw = function()
	{
		ctx.drawImage(this.image, player_pos.X, player_pos.Y);
	}
}