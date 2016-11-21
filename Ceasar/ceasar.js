function ProcessBar(load){
	WSH.Stdout.Write("["+ new Array(parseInt(load*26)).join("#")+ new Array(parseInt(26-load*26)).join(" ")+"] "+(load*100).toFixed(2).toString()+"%        "+"\r");
}
function GetShiftCode(chr, shift, casesc) {
	// WSH.Echo(casesc);
	if (casesc == "undef") return chr;
	if (casesc == "upper")
		if (chr.charCodeAt(0)+shift>90)
			return String.fromCharCode(chr.charCodeAt(0)+shift - 26);
		else
			if (chr.charCodeAt(0)+shift<65)	return String.fromCharCode(chr.charCodeAt(0)+26+shift);
			else	return String.fromCharCode(chr.charCodeAt(0)+shift);
	else 
		if (chr.charCodeAt(0)+shift>122)
			return String.fromCharCode(chr.charCodeAt(0)+shift - 26);
		else
			if (chr.charCodeAt(0)+shift<97)	return String.fromCharCode(chr.charCodeAt(0)+26+shift);	
			else return String.fromCharCode(chr.charCodeAt(0)+shift);
}
function CheckCase(chr) {
	// WSH.Echo(chr.c);
	if (chr.charCodeAt(0)>64 && chr.charCodeAt(0) <= 90) return "upper";
	if (chr.charCodeAt(0)>96 && chr.charCodeAt(0) <= 122) return "lower";
	return "undef";
}
function CeasarEncrypt(text, shift){
	var cipher = "";
	ip = 0;
	for (var i=0;i<text.length;i++)
	{
		cipher+=GetShiftCode(text.charAt(i),shift %26, CheckCase(text.charAt(i)));
		if (i/text.length > ip*0.1)
		{
			ip++;
			ProcessBar(i/text.length);
		}
	}
	ProcessBar(i/text.length);
	WSH.Echo();	
	return cipher;
}
function Analyse(text) {
	var freq = new Object();
	for (var i = 0; i < text.length;i++)
	{
		if (CheckCase(text.charAt(i)) == "undef") continue;
		var chr = text.charAt(i);
		var f = true;
		for (charElem in freq)
			if (chr == charElem) 
			{
				freq[chr]++;
				f=false;
			}
		if (f) freq[chr]=1;

	}
	var tmax = 1, max='';
	for (var i in freq)
	{
		// WSH.Echo(i, freq[i], i.charCodeAt(0));
		if (freq[i] > tmax) 
		{
			tmax=freq[i]; 
			max=i;
		}
	}
	WSH.Echo("Found shift:",max.charCodeAt(0) - "e".charCodeAt(0));
	return max.charCodeAt(0) - "e".charCodeAt(0); 
	
}

var fso = new ActiveXObject("Scripting.FileSystemObject")
function CeasarDecrypt(text, shift){
	var unciph = "";
	ip=0;
	for (var i=0;i<text.length;i++)
	{
		unciph+=GetShiftCode(text.charAt(i),-shift,CheckCase(text.charAt(i)));
		if (i/text.length > ip*0.1)
		{
			ip++;
			ProcessBar(i/text.length);
		}
	}
	ProcessBar(i/text.length);
	WSH.Echo();	
	return unciph;
}

WSH.Stdout.Write("Enter type of operation (encrypt/decrypt/crack): ");
var operation = WSH.Stdin.ReadLine();
WSH.Stdout.Write("Enter name of input file (default input.txt, must be exist): ");
var inputfile = WSH.Stdin.ReadLine();
WSH.Stdout.Write("Enter name of output file (default output.txt): ");
var outputfile = WSH.Stdin.ReadLine();

try{
	fin = fso.OpenTextFile(inputfile,1);
}
catch(err){
	fin = fso.OpenTextFile("input.txt",1);
}

try{
	fout = fso.OpenTextFile(outputfile,2,1);
	// WSH.Echo("File open");
}
catch(err){
	// WSH.Echo("ee");
	fout = fso.OpenTextFile("output.txt",2,1);
}

try{

	textdata = fin.ReadAll();
}
catch(err)
{
	textdata="";
}
switch (operation){
	case "encrypt":
		WSH.Stdout.Write("Enter shift: ");
		var shift = parseInt(WSH.Stdin.ReadLine());
		fout.write(CeasarEncrypt(textdata,shift));
		WSH.Echo("Success!")
		break;
	case "decrypt":
		WSH.Stdout.Write("Enter shift: ");
		var shift = parseInt(WSH.Stdin.ReadLine());
		fout.write(CeasarDecrypt(textdata,shift));
		WSH.Echo("Success!")
		break;
	case "crack":
		if (textdata.length < 200)
			WSH.Echo("#ATTENTION! Frequency analyse working right at big legngth text!\n#Found shift can be wrong!.");
		WSH.Echo(shift);
		fout.write(CeasarDecrypt(textdata,Analyse(textdata)));
		WSH.Echo("Success!")
		break;
	default:
		WSH.Echo("Wrong type of operation!")
		break;
}