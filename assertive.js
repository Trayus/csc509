var ASSERT = function (code, tags, x, y)
{
	this.code = code;
	this.tags = tags;
    this.x = x;
    this.y = y;
	this.containsOne = function(tags)
	{
		if (this.tags.length == 0) return false;
		
		for (var i = 0; i < tags.length; i++)
			for (var j = 0; j < this.tags.length; j++)
				if (tags[i] == this.tags[j]) return true;
		return false;
	}
}

var asserts = new Array();
var xMinToCheck = 0;
var xMaxToCheck = Number.MAX_VALUE;
var yMinToCheck = 0;
var yMaxToCheck = Number.MAX_VALUE;

//asserts.push(new ASSERT("mouseX < 400", new Array()));
//asserts.push(new ASSERT("i != 2 || (images[i].image.src == 'blue.png' || !images[i].active)", new Array("image")));

function assertAll(___tags)
{
	for (___i = 0; ___i < asserts.length; ___i++)
	{
		if ((asserts[___i].x >= xMinToCheck && asserts[___i].x <= xMaxToCheck)
            && (asserts[___i].y >= yMinToCheck && asserts[___i].y <= yMaxToCheck)
            && ((___tags === undefined) || asserts[___i].containsOne(___tags)))
		{
			try
			{
				if (!eval(asserts[___i].code))
				{
					console.log("Assert failed: " + asserts[___i].code);
				}
			}
			catch (e)
			{
				console.log("Malformed assert: " + e.message);
			}
		}
	}
}

function readAsserts(text)
{
    var lines = text.split("\n");
    
    for (i = 0; i < lines.length; i++)
    {
        var a = lines[i];
        var parts = a.split(";");
        var cond = parts[0].trim();
        var t = parts[1].trim().split(" ");
        var pos = parts[2].trim().split(" ");
        var x = parseInt(pos[0]); if (isNaN(x)) x = 0;
        var y = parseInt(pos[1]); if (isNaN(y)) y = 0;
        
        asserts.push(new ASSERT(cond, t, x, y));
    }
	
	console.log('YES');
}

function areaToCheck()
{
	var ta = document.getElementById('x');
	var check = parseInt(ta.value);
	if (!isNaN(check)) xMinToCheck = check;
	
	ta = document.getElementById('y');
	check = parseInt(ta.value);
	if (!isNaN(check)) yMinToCheck = check;
	
	ta = document.getElementById('w');
	check = parseInt(ta.value);
	if (!isNaN(check)) xMaxToCheck = check;
	
	ta = document.getElementById('h');
	check = parseInt(ta.value);
	if (!isNaN(check)) yMaxToCheck = check;
}