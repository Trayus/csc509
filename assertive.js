var ASSERT = function (code, tags)
{
	this.code = code;
	this.tags = tags;
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

//asserts.push(new ASSERT("mouseX < 400", new Array()));
//asserts.push(new ASSERT("i != 2 || (images[i].image.src == 'blue.png' || !images[i].active)", new Array("image")));

function assertAll(___tags)
{
	for (___i = 0; ___i < asserts.length; ___i++)
	{
		if ((___tags === undefined) || asserts[___i].containsOne(___tags))
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






























//