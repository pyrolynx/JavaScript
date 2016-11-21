function Encode(stringIn)
{
	var stringOut="";
	while (stringIn!="")
	{
		if (stringIn.charAt(0)=='\n')
		{
			stringOut+=stringIn.charAt(0);
			stringIn=stringIn.substring(1,stringIn.length);
		}
		for (var i=1;stringIn.charAt(i-1)!=stringIn.charAt(i) && i <= stringIn.length;i++)
			if (i == 127) break;
		i--;
		if (i>1)
		{
			// stringOut+=i.toString()+stringIn.substr(0,i);
			stringOut+=String.fromCharCode(i+128)+stringIn.substr(0,i);
			stringIn=stringIn.substring(i,stringIn.length);
		}	
		else
		{
			for (var i=1;stringIn.charAt(i-1)==stringIn.charAt(i) && i <= stringIn.length;i++)
				if (i == 127) break;
			// stringOut+=i.toString()+stringIn.charAt(0);
			stringOut+=String.fromCharCode(i)+stringIn.charAt(0);
			stringIn=stringIn.substring(i,stringIn.length);
		}
		// WSH.Echo(stringIn,stringOut);
	}
	return stringOut;

}
function Decode(stringIn)
{
	var stringOut=""
	while (stringIn!="")
	{
		// WSH.Echo(stringIn, stringOut);
		if (stringIn.charAt(0)=='\n')
		{
			stringOut+=stringIn.charAt(0);
			stringIn=stringIn.substring(1,stringIn.length);
		}
		if (stringIn.charCodeAt(0)>127)
		{
			stringOut+=stringIn.substr(1,stringIn.charCodeAt(0)-127);
			stringIn=stringIn.substring(stringIn.charCodeAt(0)-126, stringIn.length);
		}
		else
		{
			stringOut+=Array(stringIn.charCodeAt(0)+1).join(stringIn.charAt(1));
			stringIn=stringIn.substring(2,stringIn.length)
		}
	}
	return stringOut;
}
// void Main()
if (WSH.Arguments(0) == "encode")
{
	if (WSH.Arguments.length == 1) 
	{
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var fin = fso.OpenTextFile("input.txt", 1);
		var fout = fso.OpenTextFile("output.txt", 2, 1);
		var Data = Encode(fin.ReadAll());
		WSH.Echo(Data);
		fout.Write(Data);
		fin.Close();
		fout.Close();

	}
	if (WSH.Arguments.length ==2) WSH.Echo(Encode(WSH.Arguments(1)));
	if (WSH.Arguments.length >=3) 
	{
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var fout = fso.OpenTextFile(WSH.Arguments(2), 2, 1);
		var Data = Encode(WSH.Arguments(1));
		WSH.Echo(Data);
		fout.Write(Data);
		fout.Close();
	}
}
if (WSH.Arguments(0) == "decode")
{
	if (WSH.Arguments.length == 1) 
	{
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var fin = fso.OpenTextFile("output.txt", 1);
		var fout = fso.OpenTextFile("decode.txt", 2, 1);
		var Data = Decode(fin.ReadAll());
		WSH.Echo(Data);
		fout.Write(Data);
		fin.Close();
		fout.Close();

	}
	if (WSH.Arguments.length ==2) WSH.Echo(Decode(WSH.Arguments(1)));
	if (WSH.Arguments.length >=3) 
	{
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var fout = fso.OpenTextFile(WSH.Arguments(2), 2, 1);
		var Data = Decode(WSH.Arguments(1));
		WSH.Echo(Data);
		fout.Write(Data);
		fout.Close();
	}
}
else
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var fout = fso.OpenTextFile("output.txt", 2, 1);
	WSH.Echo(Data);
	fout.Write(String.fromCharCode(2));
}