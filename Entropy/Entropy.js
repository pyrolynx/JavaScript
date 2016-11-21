if (WSH.Arguments.length > 0)
	var string = WSH.Arguments(0);
else
{
	WSH.Stdout.write("Input string: ");
	var string = WSH.Stdin.readLine();
}
var dictChars = new Object();
var i;

for (i=0; i < string.length; i++)
{
	var symbol = string.charAt(i); 
	var check=false;
	for (charElem in dictChars)
		if (symbol == charElem) 
		{
			dictChars[symbol]+=1;
			check=true;
			break;
		}
	if (!check) dictChars[symbol]=1;
}
var probabilities = new Array();
for (charElem in dictChars)
	probabilities.push(dictChars[charElem] * 1.0 / string.length)
var entropy=0.0;
for (probability in probabilities)
	entropy-=probabilities[probability] * 
		Math.log(probabilities[probability]) / Math.log(2);
WSH.Echo("Entropy:", entropy);