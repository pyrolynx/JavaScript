WScript.Stdout.Write("Enter mathematical expression: ");
var expr = WScript.Stdin.ReadLine();
var raw = new Array();
var polish = "", ip = 0, countCB = 0, countOB = 0;
var prior = new Array();
prior['(']=0
prior[')']=1
prior['+']=2
prior['-']=2
prior['*']=3
prior['/']=3
for(var i = 0; i < expr.length; i++)
{
    if(prior[expr.charAt(i)] == undefined)
        polish += expr.charAt(i);
    if(prior[expr.charAt(i)] == 0)
    {
        raw.push(expr.charAt(i));
        ip++;
        countOB++
    }
    if(prior[expr.charAt(i)] == 1)
    {
        while(prior[raw[ip-1]] >= 1)
        {
            polish += raw.pop();
            ip--;
        }
        raw.pop();
        ip--;
        countCB++;
    }
    if(prior[expr.charAt(i)] == 2 || prior[expr.charAt(i)] == 3)
    {
        while(prior[raw[ip-1]] >= prior[expr.charAt(i)])
        {
            polish += raw.pop();
            ip--;
        }
        raw.push(expr.charAt(i));
        ip++;
    }
}
if(countOB != countCB)
{
    WSH.echo("Error! Wrong brackets!")
    WSH.Quit()
}
while(ip > 0)
{
    polish += raw.pop();
    ip--;
}
WScript.Echo(polish);
raw=new Array();
for(i=0; i<polish.length; i++)
{
    if(polish.charAt(i) =='+')
        raw.push(parseInt(raw.pop()) + parseInt(raw.pop()));
    else if(polish.charAt(i) == '-')
            raw.push(-parseInt(raw.pop()) + parseInt(raw.pop()));
    else if(polish.charAt(i) == '*')
            raw.push(parseInt(raw.pop()) * parseInt(raw.pop()));
    else if(polish.charAt(i) == '/')
        if(parseInt(raw.pop()) != 0)
            raw.push(1 / parseInt(raw.pop()) * parseInt(raw.pop()));
        else
        {
            WSH.echo("Error! Devision by Zero!");
            WSH.Quit();
        }
    else
            raw.push(polish.charAt(i));  
}
WScript.echo(raw[0]);