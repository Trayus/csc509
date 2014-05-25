function Vector2()
{
	this.X = 0;
	this.Y = 0;
	var self = this;
	
	this.init = function(x, y)
	{
		self.X = x;
		self.Y = y;
		return self;
	}
	
	this.length = function()
	{
		return Math.sqrt(self.X * self.X + self.Y * self.Y);
	}
	
	this.normalize = function()
	{
		var len = self.length();
		self.X /= len;
		self.Y /= len;
		return self;
	}
	
	this.vectorTo = function (other)
	{
		return new Vector2().init(other.X - self.X, other.Y - self.Y);
	}
	
	this.scale = function(amount)
	{
		self.X *= amount;
		self.Y *= amount;
		return self;
	}
}

var player_pos = new Vector2().init(600, 285); // screen pos of the player
var gravity = 0.0011;

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);