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
}

var player_pos = new Vector2().init(600, 300); // screen pos of the player
var gravity = 0.0011;

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);