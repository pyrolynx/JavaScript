// VIRTUAL MACHINE
// !!OPERATORS!!
// BEGIN READ[,] WRITE[,] ADD[,,] REPEAT[] MLT[,,] IFE[..] IF[][..] ENDIF 
var fso = new ActiveXObject("Scripting.FileSystemObject");
var fin = fso.OpenTextFile(WSH.Arguments(0), 1);
var sep = /\s+|\n+/
var code = fin.ReadAll().split(sep);
var beginFlag = false;
var memory = new Array();
function CheckCellIndex(stringIn) 
{
	//if string is a index of cell - true
	if (stringIn.charAt(0) == '0' && stringIn.length != 1)
		return true;
	else return false;
}
function GetCellIndex(stringIndex) 
{
	return parseInt(stringIndex.substring(1))
}

//1kBit stack memory
var stackSize = 8;
for (var i=0;i<stackSize;i++)
	memory[i]=0;

for (var command in code)
{
	if (code[command] == "END") beginFlag=false;
	if (beginFlag)
		memory.push(code[command]);
	if (code[command] == "BEGIN") beginFlag=true;
}

var ip = stackSize;
while (ip < memory.length)
{
	switch (memory[ip])
	{
		case "ERROR":
		{
			switch (memory[ip+1])
			{
				case "00":
				{
					WSH.Echo("Number must be positive!");
					WSH.quit();
					break;	
				}
				case "01":
				{
					WSH.Echo("Number too large!");
					WSH.quit();
					break;
				}
				case "02":
				{
					WSH.Echo("Input data shoud not be a zero!");
					WSH.quit();
					break;	
				}
				default:
				{
					WSH.Echo("Unknown runtime error!");
					WSH.quit();
					break;
				}
			}
			break;
		}
		case "ADD":
		{
			if (CheckCellIndex(memory[ip+3]))
			{
				if (CheckCellIndex(memory[ip+2]))
					memory[GetCellIndex(memory[ip+3])]=parseInt(memory[GetCellIndex(memory[ip+1])])+parseInt(memory[GetCellIndex(memory[ip+2])]);
				else
					memory[GetCellIndex(memory[ip+3])]=parseInt(memory[GetCellIndex(memory[ip+1])])+parseInt(memory[ip+2]);
				ip+=4;
			}
			else
			{
				memory[GetCellIndex(memory[ip+1])]=parseInt(memory[GetCellIndex(memory[ip+1])])+parseInt(memory[ip+2]);
				ip+=3;
			}
			break;
		}
		case "DIF":
		{
			if (CheckCellIndex(memory[ip+3]))
			{
				if (CheckCellIndex(memory[ip+2]))
					memory[GetCellIndex(memory[ip+3])]=parseInt(memory[GetCellIndex(memory[ip+1])])-parseInt(memory[GetCellIndex(memory[ip+2])]);
				else
					memory[GetCellIndex(memory[ip+3])]=parseInt(memory[GetCellIndex(memory[ip+1])])-parseInt(memory[ip+2]);
				ip+=4;
			}
			else
			{
				memory[GetCellIndex(memory[ip+1])]=parseInt(memory[GetCellIndex(memory[ip+1])])-parseInt(memory[ip+2]);
				ip+=3;
			}
			break;
		}
		case "READ":
		{
			var text = WSH.Stdin.ReadLine();
			var data=parseInt(text);
			if (text != data.toString())
			{
				WSH.Echo("Invalid type, must be integer!");
				WSH.quit();
			}
			else
			if (!isNaN(data))
			{
				memory[GetCellIndex(memory[ip+1])]=data;
				ip+=2;
			}
			else
			{
				WSH.Echo("Invalid input data! Must be integer!");
				WSH.quit();
			}
			break;
		}
		case "OUT":
		{
			WSH.Echo(memory[GetCellIndex(memory[ip+1])]);
			ip+=2;
			break;
		}
		case "MLT":
		{
			if (CheckCellIndex(memory[ip+3]))
			{
				if (CheckCellIndex(memory[ip+2]))
					memory[GetCellIndex(memory[ip+3])]=parseInt(memory[GetCellIndex(memory[ip+1])])*parseInt(memory[GetCellIndex(memory[ip+2])]);
				else
					memory[GetCellIndex(memory[ip+3])]=parseInt(memory[GetCellIndex(memory[ip+1])])*parseInt(memory[ip+2]);
				ip+=4;
			}
			else
			{
				memory[GetCellIndex(memory[ip+1])]=parseInt(memory[GetCellIndex(memory[ip+1])])*parseInt(memory[ip+2]);
				ip+=3;
			}
			break;
		}
		case "DVZ":
		{
			if (CheckCellIndex(memory[ip+1]))
				if (CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[GetCellIndex(memory[ip+1])])%parseInt(memory[GetCellIndex(memory[ip+2])])==0)
						{
							memory[GetCellIndex(memory[ip+3])]=1;
							ip+=3;
							break;
						}
						else
						{
							memory[GetCellIndex(memory[ip+3])]=0;
							ip+=3;
							break;
						}
			if (!CheckCellIndex(memory[ip+1]))
				if (CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[ip+1])%parseInt(memory[GetCellIndex(memory[ip+2])])==0)
						{
							memory[GetCellIndex(memory[ip+3])]=1;
							ip+=3;
							break;
						}
						else
						{
							memory[GetCellIndex(memory[ip+3])]=0;
							ip+=3;
							break;
						}
			if (CheckCellIndex(memory[ip+1]))
				if (!CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[GetCellIndex(memory[ip+1])])%parseInt(memory[ip+2])==0)
						{
							memory[GetCellIndex(memory[ip+3])]=1;
							ip+=3;
							break;
						}
						else
						{
							memory[GetCellIndex(memory[ip+3])]=0;
							ip+=3;
							break;
						}	
			break;
		}
		case "REDIR":
		{
			for (ipointer in memory)
				if (memory[ipointer]==memory[ip+1] && memory[ipointer-1]!=memory[ip]) 
				{
					ip=ipointer;
					break;
				}
			break;
		}
		case "IFL":
		{
			if (CheckCellIndex(memory[ip+1]))
				if (CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[GetCellIndex(memory[ip+1])])>=parseInt(memory[GetCellIndex(memory[ip+2])]))
						{
							// WSH.Echo('#',ip,memory[ip+2]);
							for (var i=ip;i<memory.length;i++)
								if (memory[i]=="ENDIF") 
								{
									ip=i;
									break;
								}
							// WSH.Echo(memory[i]);
						}
			if (!CheckCellIndex(memory[ip+1]))
				if (CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[ip+1])>=parseInt(memory[GetCellIndex(memory[ip+2])]))
						{
							// WSH.Echo('$',memory[GetCellIndex(memory[ip+2])]);
							for (var i=ip;i<memory.length;i++)
								if (memory[i]=="ENDIF") 
								{
									ip=i;
									break;
								}
						}
			if (CheckCellIndex(memory[ip+1]))
				if (!CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[GetCellIndex(memory[ip+1])])>=parseInt(memory[ip+2]))
						{
							// WSH.Echo('&&',memory[ip+2]);
							for (var i=ip;i<memory.length;i++)
								if (memory[i]=="ENDIF") 
								{
									ip=i;
									break;
								}
						}
			if (memory[ip]!="ENDIF") ip+=3;
			break;
		}
		case "IFE":
		{
			// WSH.Echo("#");
			if (CheckCellIndex(memory[ip+1]))
				if (CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[GetCellIndex(memory[ip+1])])!=parseInt(memory[GetCellIndex(memory[ip+2])]))
						{
							// WSH.Echo('#',ip,memory[ip+2]);
							for (var i=ip;i<memory.length;i++)
								if (memory[i]=="ENDIF") 
								{
									ip=i;
									break;
								}
							// WSH.Echo(memory[i]);
						}
			if (!CheckCellIndex(memory[ip+1]))
				if (CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[ip+1])!=parseInt(memory[GetCellIndex(memory[ip+2])]))
						{
							// WSH.Echo('$',memory[GetCellIndex(memory[ip+2])]);
							for (var i=ip;i<memory.length;i++)
								if (memory[i]=="ENDIF") 
								{
									ip=i;
									break;
								}
						}
			if (CheckCellIndex(memory[ip+1]))
				if (!CheckCellIndex(memory[ip+2]))
					if (parseInt(memory[GetCellIndex(memory[ip+1])])!=parseInt(memory[ip+2]))
						{
							// WSH.Echo('&&',memory[ip+2]);
							for (var i=ip;i<memory.length;i++)
								if (memory[i]=="ENDIF") 
								{
									ip=i;
									break;
								}
						}
			if (memory[ip]!="ENDIF") ip+=3;
			break;
		}
		default:
		{
			ip++;
			break;
		}
	}
}
//WSH.Echo("Success!");

