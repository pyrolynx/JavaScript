
function BMHash(string,pallete) {
	var includes = new Array();
	var shift=1;
	for(var i=0;i<string.length - pallete.length;i+=shift)
	{
		shift=1;
		var flag =  true;
		for (j=pallete.length-1;j>=0;j--)
		{
			if (pallete.charAt(j)!=string.charAt(i+j))
			{
				flag = false;
				break;
			}
			shift++;
		}
		if (flag)
			includes.push(i);
	}
	return includes;
}
function PaintBorder(){
	WSH.Echo(new Array(41).join("#"));
	WSH.Echo();
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
var fout = fso.OpenTextFile("output.txt",2,1);
WSH.Stdout.Write("Enter pallete: ")
var pallete = WSH.Stdin.ReadLine();
WSH.Echo("Boouer-Mour")	;

PaintBorder();
WSH.Echo("I tom.");
var fin = fso.OpenTextFile("WnM_1.txt",1);
// var fin = fso.OpenTextFile("input.txt",1);
var textdata = fin.ReadAll().toLowerCase();
var result = BMHash(textdata,pallete);
WSH.Echo("Found includes: ",result.length);
for (var i=0;i<10;i++)
	WSH.Stdout.Write(result[i].toString()+" ");
WSH.Echo("")
fin.close();
PaintBorder();



PaintBorder();
WSH.Echo("I and II tom.");
var fin = fso.OpenTextFile("WnM_1_2.txt",1);
// var fin = fso.OpenTextFile("input.txt",1);
var textdata = fin.ReadAll().toLowerCase();
var result = BMHash(textdata,pallete);
WSH.Echo("Found includes: ",result.length);
WSH.Echo("")
fin.close();
PaintBorder();


PaintBorder();
WSH.Echo("I-III tom.");
var fin = fso.OpenTextFile("WnM_1_2_3.txt",1);
// var fin = fso.OpenTextFile("input.txt",1);
var textdata = fin.ReadAll().toLowerCase();
var result = BMHash(textdata,pallete);
WSH.Echo("Found includes: ",result.length);
WSH.Echo("")
fin.close();
PaintBorder();


PaintBorder();
WSH.Echo("I-IV tom.");
var fin = fso.OpenTextFile("WnM_1_2_3_4.txt",1);
// var fin = fso.OpenTextFile("input.txt",1);
var textdata = fin.ReadAll().toLowerCase();
var result = BMHash(textdata,pallete);
WSH.Echo("Found includes: ",result.length);
WSH.Echo("")
fin.close();
PaintBorder();