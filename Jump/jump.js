function compress(data)
{
	var border = 128;
	var archive="";
	var index = 0;
	while (index < data.length)
	{
		for (var i=0;data.charAt(index+i)!=data.charAt(index+i+1) && index + i <= data.length;i++)
			if (i + 1 == border) break;
		if (i>1)
		{
			archive+=String.fromCharCode(i+border)+data.substr(index,index + i);
			index += i;
		}	
		else
		{
			for (var i=1;index + i<= data.length && data.charAt(index+i-1)==data.charAt(index+i);i++)
				if (i + 1 == border) break;
			archive+=String.fromCharCode(i)+data.charAt(index);
			index+=i;
		}
		// WSH.Echo(index);
	}
	return archive;

}
function decompress(archive)
{
	var data = "";
	var index = 0;
	var border = 128;
	while (index < archive.length)
	{
		// WSH.Echo(archive.charCodeAt(index)- border);
		if (archive.charCodeAt(index) > border)
		{
			// WSH.Echo(archive.charCodeAt(index) - border)
			data+=archive.substr(index+1,archive.charCodeAt(index) - border);
			index+= archive.charCodeAt(index)+1;
		}
		else
		{
			data+=new Array(archive.charCodeAt(index)+1).join(archive.charAt(index+1));
			index+=2;
		}
	}
	return data;
}
// void Main()
if (WSH.Arguments.length != 3)
{
	WSH.Echo("Error! Wrong args!");
	WSH.Quit(1);
}
if (WSH.Arguments(0) == "compress")
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var fin = fso.OpenTextFile(WSH.Arguments(1), 1);
	var fout = fso.OpenTextFile(WSH.Arguments(2), 2, 1);
	var data = compress(fin.ReadAll());
	fin.close();
	fout.write(data);
	fout.close();
}
if (WSH.Arguments(0) == "extract")
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var fin = fso.OpenTextFile(WSH.Arguments(1), 1);
	var fout = fso.OpenTextFile(WSH.Arguments(2), 2, 1);
	var data = decompress(fin.ReadAll());
	fin.Close();
	fout.Write(data);
	fout.Close();
}