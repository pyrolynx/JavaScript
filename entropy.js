var stringIn = WSH.Arguments(0);
var dictChars = new Object();
var i;

for (i=0; i < stringIn.length; i++)
{
	var symbol = stringIn.charAt(i); 
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
var prob = new Array();
for (charElem in dictChars)
	prob.push(dictChars[charElem]*1.0/stringIn.length)
var entropy=0.0;
for (probElem in prob)
	entropy-=prob[probElem]*Math.log(prob[probElem])/Math.log(2);
WSH.Echo(entropy);