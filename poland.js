function Convert(string) {
	var stringout = ""
	if (string.indexOf(')')-string.indexOf('(')>0)
		for (var i = 0; i < string.length; i++)
		{
			if (string.charAt(i)=='(')
				stringout+=Convert(string.substr(string.indexOf('(')+1,string.indexOf(')')-1));
			if stringout

		}
	else	{
		WSH.Echo("Wrong brackets!");
		WSh.Quit();
	}
	return stringout;

}

WSH.Stdout.Write("Enter mathematical expression: "):
var expr = WSH.Stdin.ReadLine();