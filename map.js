var EMPTY = 0, LAND = 1, ONEWAY = 2, GRAPPLE = 3, BOX = 4, KILL = 5, VICTORY = 6;

function Map(ctx, construct)
{
	var self = this;
	this.width = 80;
	this.height = 60;
	this.tile_w = 40;
	this.tile_h = 40;
	
	this.mapdata = new Array();
	this.endpointX = 0;
	this.endpointY = 0;
	this.spawnX = 0;
	this.spawnY = 0;
	
	for (var i = 0; i < this.width; i++)
	{
		this.mapdata.push(new Array());
		for (var j = 0; j < this.height; j++)
		{
			this.mapdata[i].push(EMPTY);
		}
	}
	
	var spawn = construct(this.mapdata);
	this.spawnX = spawn.X * this.tile_w;
	this.spawnY = spawn.Y * this.tile_h;
	
	this.draw = function (reference)
	{
		for (var i = 0; i < self.width; i++)
		{
			for (var j = 0; j < self.height; j++)
			{
				switch(self.mapdata[i][j])
				{
					case LAND: ctx.fillStyle = '#0D0'; break;
					case ONEWAY: ctx.fillStyle = '#0DD'; break;
					case GRAPPLE: ctx.fillStyle = '#00A'; break;
					case BOX: ctx.fillStyle = '#842'; break;
					case KILL: ctx.fillStyle = '#F00'; break;
					case VICTORY: ctx.fillStyle = '#FF8'; break;
				}
				if (self.mapdata[i][j] != EMPTY)
				{
					ctx.fillRect(i * self.tile_w - reference.X + player_pos.X,
						j * self.tile_h - reference.Y + player_pos.Y,
						self.tile_w + 1,self.tile_h + 1);
				}
			}
		}
	}
}

function LevelOne(mapdata)
{
	for (var i = 2; i < 8; i++)
	{
		mapdata[i][5] = LAND;
	}
	for (var i = 5; i < 15; i++)
	{
		mapdata[i][10] = LAND;
	}
	for (var i = 6; i < 10; i++)
	{
		mapdata[5][i] = KILL;
	}
	for (var i = 10; i < 17; i++)
	{
		mapdata[i][7] = ONEWAY;
	}
	for (var i = 12; i < 14; i++)
	{
		for (var j = 1; j < 3; j++)
		{
			mapdata[i][j] = GRAPPLE;
		}
	}
	for (var i = 16; i < 18; i++)
	{
		for (var j = 6; j < 9; j++)
		{
			mapdata[i][j] = KILL;
		}
	}
	
	for (var i = 15; i < 20; i++)
	{
		for (var j = 15; j < 20; j++)
		{
			mapdata[i][j] = BOX;
		}
	}
	
	for (var i = 20; i < 35; i++)
	{
		mapdata[i][25] = LAND;
	}
	for (var i = 22; i < 25; i++)
	{
		mapdata[30][i] = LAND;
	}
	mapdata[38][23] = VICTORY;
	
	return new Vector2().init(2, 2);
}