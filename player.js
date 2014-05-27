function Player(ctx, sx, sy)
{
	this.image = new Image();
	this.image.src = 'player.png';
	this.position = new Vector2().init(sx, sy);
	this.velocity = new Vector2();
	this.falling = true;
	this.alive = true;
	this.win = false;
	this.time = 0;
	this.rough_aim = new Vector2();
	this.snap_aim = new Vector2();
	this.charging = false;
	this.energy = 0;
	this.move_resist = 0;
	var jump = -0.6;
	var maxV = 1.2;
	var self = this;
	var acc = 0.003;
	var maxXV = 0.3;
	var oneway_immune = 0;
	var immune_time = 200;
	var may_jump = true;
	var charge_r = 40;
	
	this.update = function(dtime, map)
	{
		if (self.alive && !self.win)
		{
			self.time += dtime;
			self.charging = (32 in keysDown) && self.energy > 0;
			if (!(32 in keysDown)) 
				self.energy += 1;
			if (self.charging)
				self.energy -= 1;
            if (self.energy > 100)
                self.energy = 100;
			
			if (self.move_resist != 0)
				self.move_resist--;
				
			// movement and collisions from here onward
			if (self.falling)
				self.velocity.Y += gravity * dtime;
			
			if (self.velocity.Y > maxV && self.move_resist == 0)
				self.velocity.Y = maxV;
			if (self.velocity.Y < -maxV && self.move_resist == 0)
				self.velocity.Y = -maxV;
			
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
			if (self.velocity.X > maxXV && self.move_resist == 0) 
				self.velocity.X = maxXV;
			if (self.velocity.X < -maxXV && self.move_resist == 0) 
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
			
			if (feet.X >= 0 && feet.Y >= 0 && feet.X < map.width && feet.Y < map.height &&
				head.X >= 0 && head.Y >= 0 && head.X < map.width && head.Y < map.height &&
				left.X >= 0 && left.Y >= 0 && left.X < map.width && left.Y < map.height &&
				right.X >= 0 && right.Y >= 0 && right.X < map.width && right.Y < map.height)
			{
				if (map.mapdata[feet.X][feet.Y] == LAND || map.mapdata[feet.X][feet.Y] == BOX || (map.mapdata[feet.X][feet.Y] == ONEWAY && self.velocity.Y > 0 && oneway_immune == 0))
				{
					self.velocity.Y = 0;
					self.position.Y = feet.Y * map.tile_h - self.image.height;
					self.falling = false;
				}
				else
					self.falling = true;
				
				if (!self.falling && (87 in keysDown) && may_jump)
				{
					self.velocity.Y = jump;
					self.falling = true;
					may_jump = false;
				}
				if (self.falling && !(87 in keysDown) && self.velocity.Y < 0 && self.move_resist == 0)
				{
					self.velocity.Y = 0;
				}
				if (!(87 in keysDown) && !self.falling)
					may_jump = true;
				if (self.falling && (map.mapdata[head.X][head.Y] == LAND || map.mapdata[head.X][head.Y] == BOX) && self.velocity.Y < 0)
				{
					self.velocity.Y = 0;
					grappling = false;
				}
				
				if (!self.falling && 83 in keysDown)
				{
					self.velocity.Y = -jump / 2;
					self.falling = true;
					oneway_immune = immune_time;
				}
				oneway_immune -= dtime;
				if (oneway_immune < 0) oneway_immune = 0;
				
				if (map.mapdata[left.X][left.Y] == LAND || map.mapdata[left.X][left.Y] == BOX)
				{
					self.velocity.X = 0;
					self.position.X = (left.X + 1) * map.tile_w;
					grappling = false;
				}
				if (map.mapdata[right.X][right.Y] == LAND || map.mapdata[right.X][right.Y] == BOX)
				{
					self.velocity.X = 0;
					self.position.X = right.X * map.tile_w - self.image.width;
					grappling = false;
				}
				
				
				if (map.mapdata[feet.X][feet.Y] == KILL ||
					map.mapdata[head.X][head.Y] == KILL ||
					map.mapdata[left.X][left.Y] == KILL ||
					map.mapdata[right.X][right.Y] == KILL)
				{
					self.alive = false;
				}
				if (map.mapdata[feet.X][feet.Y] == VICTORY ||
					map.mapdata[head.X][head.Y] == VICTORY ||
					map.mapdata[left.X][left.Y] == VICTORY ||
					map.mapdata[right.X][right.Y] == VICTORY)
				{
					self.win = true;
				}
				
				if (self.charging)
				{
					var s1 = new Vector2().init(Math.floor((self.position.X + self.image.width / 2 + charge_r) / map.tile_w), 
												  Math.floor((self.position.Y + self.image.height / 2) / map.tile_h));
					var s2 = new Vector2().init(Math.floor((self.position.X + self.image.width / 2 - charge_r) / map.tile_w), 
												  Math.floor((self.position.Y + self.image.height / 2) / map.tile_h));
					var s3 = new Vector2().init(Math.floor((self.position.X + self.image.width / 2) / map.tile_w), 
												  Math.floor((self.position.Y + self.image.height / 2 + charge_r) / map.tile_h));
					var s4 = new Vector2().init(Math.floor((self.position.X + self.image.width / 2) / map.tile_w), 
												   Math.floor((self.position.Y + self.image.height / 2 - charge_r) / map.tile_h));
												   
					var s5 = new Vector2().init(Math.floor((self.position.X + self.image.width / 2 + charge_r / 2) / map.tile_w), 
												  Math.floor((self.position.Y + self.image.height / 2 + charge_r / 2) / map.tile_h));
					var s6 = new Vector2().init(Math.floor((self.position.X + self.image.width / 2 - charge_r / 2) / map.tile_w), 
												  Math.floor((self.position.Y + self.image.height / 2 + charge_r / 2) / map.tile_h));
					var s7 = new Vector2().init(Math.floor((self.position.X + self.image.width / 2 + charge_r / 2) / map.tile_w), 
												  Math.floor((self.position.Y + self.image.height / 2 - charge_r / 2) / map.tile_h));
					var s8 = new Vector2().init(Math.floor((self.position.X + self.image.width / 2 - charge_r / 2) / map.tile_w), 
												   Math.floor((self.position.Y + self.image.height / 2 - charge_r / 2) / map.tile_h));
												   
					if (map.mapdata[s1.X][s1.Y] == BOX) map.mapdata[s1.X][s1.Y] = EMPTY;
					if (map.mapdata[s2.X][s2.Y] == BOX) map.mapdata[s2.X][s2.Y] = EMPTY;
					if (map.mapdata[s3.X][s3.Y] == BOX) map.mapdata[s3.X][s3.Y] = EMPTY;
					if (map.mapdata[s4.X][s4.Y] == BOX) map.mapdata[s4.X][s4.Y] = EMPTY;
					
					if (map.mapdata[s5.X][s5.Y] == BOX) map.mapdata[s5.X][s5.Y] = EMPTY;
					if (map.mapdata[s6.X][s6.Y] == BOX) map.mapdata[s6.X][s6.Y] = EMPTY;
					if (map.mapdata[s7.X][s7.Y] == BOX) map.mapdata[s7.X][s7.Y] = EMPTY;
					if (map.mapdata[s8.X][s8.Y] == BOX) map.mapdata[s8.X][s8.Y] = EMPTY;
				}	
			}
		}
		if (82 in keysDown /* R */)
		{
			init();
		}
	}
	
	this.getCenter = function()
	{
		return new Vector2().init(self.position.X + self.image.width / 2, self.position.Y + self.image.height / 2);
	}
	
	this.draw = function()
	{
		ctx.drawImage(self.image, player_pos.X, player_pos.Y);
		if (self.charging)
		{
			ctx.beginPath();
			ctx.strokeStyle = "#AFF";
			ctx.arc(player_pos.X + self.image.width / 2, player_pos.Y + self.image.height / 2,charge_r,0,2*Math.PI);
			ctx.stroke();
		}
	}
}