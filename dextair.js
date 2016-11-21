var expr = WScript.StdIn.ReadLine();

var res = "";
var num = "";

var result = new Array();
var stack = new Array();
var str = new Array();

var counter = 0;
for (var i = 0; i < expr.length; i++)
{
    if (counter < 0)
    {
        WSH.echo("Wrong arragement of brackets!");
        WSH.quit();
    }
    if(expr.charAt(i) == "(") counter++;
    if(expr.charAt(i) == ")") counter--;
}
if(counter != 0)
{
    WSH.echo("Wrong count of brackets!");
    WSH.quit();
}

for(var i = 0; i <= expr.length; i++) //Разбор на числа и действия
{
	if (/[\d]+/.test(expr.charAt(i)))
	{
		num += expr.charAt(i);		
	}
	else
	{
		//res += num + expr.charAt(i);
		if(num.length > 0)
			str.push(num);
		if(i < expr.length)
			str.push(expr.charAt(i));
		num = "";
	}
}

WSH.echo(str);


while(str.length > 0) //Перевод в польскую нотацию
{
	var element = str.shift();
	if(/[\d]+/.test(element))
		result.push(element);
	else if(stack.length == 0)
		stack.push(element);
	else if(element == "(")
		stack.push(element);
	else
	{
		while(stack.length > 0 && GetPriority(element) <= GetPriority(stack[stack.length - 1]) && (element != "^" || stack[stack.length - 1] != "^"))
		{
			result.push(stack.pop());
			if (result[result.length - 1] == "(" || result[result.length - 1] == ")")
				result.pop();
		}
		stack.push(element);
	}
}

for(var i in stack) //Остатки из стека в результат
{
	if(stack[stack.length - i - 1] != "(" && stack[stack.length - i - 1] != ")")
		result.push(stack[stack.length - i - 1]);
}

WSH.echo(result);
WSH.echo(Count());

function GetPriority(symbol) //Приоритеты
{
	switch(symbol)
	{
		case '(':
			return -1;
		case ')':
			return 0;
		case '+':
			return 1;
		case '-':
			return 1;
		case '*':
			return 2;
		case '/':
			return 2;
		case '^':
			return 3;
		default:
			WSH.echo("Encountered an invalid character \"" + symbol + "\". Quitting");
			WSH.quit();
			break;
	}
}

function Count() //Подсчет
{
	var arr = new Array();
	for (var i in result)
	{
		if(/[\d\.]+/.test(result[i]))
			arr.push(result[i])
		else
		{
			var a = arr.pop();
			var b = arr.pop();
			arr.push(SimpleCount(b, a, result[i]));
		}
	}
	return arr[0];
}

function SimpleCount(a, b, symbol) //Вычисление элементарных операций
{
	switch(symbol)
	{
		case '+':
			return Number(a) + Number(b);
			break;
		case '-':
			return a - b;
			break;
		case '*':
			return a * b;
			break;
		case '/':
			if (b == 0)
			{
				WSH.echo("Division by zero!");
				WSH.quit();
			}
			return a / b;
			break;
		case '^':
			return Math.pow(a, b);
			break;
	}
}