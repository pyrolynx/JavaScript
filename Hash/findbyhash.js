function BruteForce(text, pallete)
{
	var inc = new Array();
	for (i=0;i<text.length-pallete.length+1;i++)
	{
		flag = true;
		for (j=i;j<i+pallete.length;j++)
			if (text.charAt(j) != pallete.charAt(j-i)) 
			{
				flag = false;
				break;
			}
		if (flag) inc.push(i);
	}
	return inc;
}
function FindByCSH(text, pallete)
{
	collisions =0;
	var inc = new Array();
	phash = SimpleHash(pallete);
	thash = 0;
	for (var i=0;i<text.length-pallete.length+1;i++)
	{
		if (i==0) thash = SimpleHash(text.substr(0,pallete.length));
		else thash = thash - text.charCodeAt(i-1) + text.charCodeAt(i+pallete.length-1); 
		// WSH.Echo(i, text.substr(i,pallete.length),thash,pallete,phash,text.charAt(i+pallete.length-1));	
		if (thash == phash)
		{
			var flag = true;
			for (j=i;j<i+pallete.length;j++)
				if (text.charAt(j) != pallete.charAt(j-i)) 
				{
					flag = false;
					break;
				}
			if (flag) inc.push(i);
			else collisions++;
		}
	}
	return inc;
}

function FindBySqCSH(text, pallete)
{
	collisions=0;
	var inc = new Array();
	phash = SquadHash(pallete);
	thash = 0;
	for (i=0;i<text.length-pallete.length+1;i++)
	{
		if (i==0) thash = SquadHash(text.substr(0,pallete.length));
		else thash = thash - Sqr(text.charCodeAt(i-1)) + Sqr(text.charCodeAt(i+pallete.length-1)); 
		// WSH.Echo(i, text.substr(i,pallete.length),thash,pallete,phash,text.charAt(i+pallete.length-1));	
		if (thash == phash)
		{
			var flag = true;
			for (j=i;j<i+pallete.length;j++)
				if (text.charAt(j) != pallete.charAt(j-i)) 
				{
					flag = false;
					break;
				}
			if (flag) inc.push(i);
			else collisions++;
		}
	}
	return inc;
}

function FindByRCH(text,pallete) {
	var inc = new Array();
	collisions=0;
	phash = RCHash(pallete);
	thash = 0;
	var f= true;
	// if (f)
	// {
	// 	WSH.Echo(pallete, phash);
	// 	thash = RCHash(text.substr(0,pallete.length));
	// 	WSH.Echo(text.substr(0,pallete.length),thash, (thash - text.charCodeAt(0))/2 + text.charCodeAt(1+pallete.length-1)*Math.pow(2.0,pallete.length-1) );
	// 	// WSH.Echo(text.substr(0,pallete.length),RCHash(text.substr(0,pallete.length)));
	// 	WSH.quit();
	// }
	for (i=0;i<text.length-pallete.length+1;i++)
	{
		// WSH.Echo(i, text.substr(i,pallete.length),thash,pallete,phash,text.charAt(i+pallete.length-1));	
		if (i==0) thash = RCHash(text.substr(0,pallete.length));
		else thash = (thash - text.charCodeAt(i-1))/2 + text.charCodeAt(i+pallete.length-1)*Math.pow(2.0,pallete.length-1); 
		if (thash == phash)
		{
			var flag = true;
			for (j=i;j<i+pallete.length;j++)
				if (text.charAt(j) != pallete.charAt(j-i)) 
				{
					flag = false;
					break;
				}
			if (flag) inc.push(i);
			else collisions++;
		}
	}
	return inc;	
}

function MourSearch(text, pallete) 
{
	var inc = new Array();
	var shift = 1;
	for (var i = pallete.length -1; i< text.length;i+=shift)
	{
		shift = 1;
		var flag = true;
		for (var j = i; i-j < pallete.length;j--)
		{
			if (text.charAt(j)!=pallete.charAt(j-i+pallete.length-1)) 
			{
				flag=false;
				shift=i-j+1;
				break;
			}
		}
		if (flag) inc.push(i-pallete.length+1);
	}
	return inc;
}


function Sqr(n) {
	return n*n;
}
function SimpleHash(string)
{
	var hash = 0;
	for (k=0;k<string.length;k++)
		hash+=string.charCodeAt(k);
	return hash;	
}
function SquadHash(string)
{
	var hash = 0;
	for (k=0;k<string.length;k++)
		hash+=string.charCodeAt(k)*string.charCodeAt(k);
	return hash;
}
function RCHash(string) 
{
	var hash = 0;
	for (var i=0;i<string.length;i++)
		hash+=string.charCodeAt(i)*Math.pow(2,i);
	return hash;	
}
//sys
fso = new ActiveXObject("Scripting.FileSystemObject");
finpath = WSH.Arguments(0);
fin = fso.OpenTextFile(finpath,1);
foutpath = WSH.Arguments(1);
fout = fso.OpenTextFile(foutpath,2,1);
textdata = fin.ReadAll().toLowerCase();
WSH.Stdout.write("Input query: ");
var string = WSH.Stdin.readLine();
collisions = 0;
//sysend

//bruteforce
timestart = new Date().getTime();
var result = BruteForce(textdata,query);
WSH.Echo("Found includes:",result.length,"Algorithm: BruteForce:", (new Date().getTime()-timestart)/1000.0,"s.");
fout.Write(result);
// end bruteforce

//simplehash
timestart = new Date().getTime();
var result = FindByCSH(textdata,query);
WSH.Echo("Found includes:",result.length,"Algorithm: FindByCSH:", (new Date().getTime()-timestart)/1000.0,"s.", "Collisions:",collisions);
fout.Write(result);
//simplehash

//squarehash
timestart = new Date().getTime();
var result = FindBySqCSH(textdata,query);
WSH.Echo("Found includes:",result.length,"Algorithm: FindByCSH:", (new Date().getTime()-timestart)/1000.0,"s.","Collisions:",collisions);
fout.Write(result);
//squarehash


//rc
timestart = new Date().getTime();
var result = FindByRCH(textdata,query);
WSH.Echo("Found includes:",result.length,"Algorithm: Raben-Carp:", (new Date().getTime()-timestart)/1000.0,"s.","Collisions:",collisions);
fout.Write(result);
// end rc

// bm
timestart = new Date().getTime();
var result = MourSearch(textdata,query);
WSH.Echo("Found includes:",result.length,"Algorithm: Bouer-Mour:", (new Date().getTime()-timestart)/1000.0,"s.");
fout.Write(result);
// end bm