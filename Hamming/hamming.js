function getControls(a,b,c,d)
{
    var control = [];
    control.push((a+b) %2);
    control.push((c+d) %2);
    control.push((a+c) %2);
    control.push((b+d) %2);
    return control;
}
function recover(a,b,c,d,p,q,r,s)
{
    var bits = [];
    if ((a+b)%2 != p && (a+c)%2 != r)
        bits.push((a + 1) % 2);
    else
        bits.push(a);
    if ((a+b)%2 != p && (b+d)%2 != s)
        bits.push((b + 1) % 2);
    else
        bits.push(b);
    if ((c+d)%2 != q && (a+c)%2 != r)
        bits.push((c + 1) % 2);
    else
        bits.push(c);
    if ((c+d)%2 != q && (b+d)%2 != s)
        bits.push((d + 1) % 2);
    else
        bits.push(d);
    return bits;
    

}
function encode(data)
{
    // alert(data);
    var hammingCode = [];
    for (var i=0;i<data.length;i++)
    {
        var bitview = data.charCodeAt(i).toString(2);
        bitview = "00000000".substring(bitview.length) + bitview;
        for (var j=0; j < 2; j++)
        {
            var a = parseInt(bitview[j*4 + 0]);
            var b = parseInt(bitview[j*4 + 1]);
            var c = parseInt(bitview[j*4 + 2]);
            var d = parseInt(bitview[j*4 + 3]);
            var control = getControls(a, b, c, d);
            hammingCode.push(a);
            hammingCode.push(b);
            hammingCode.push(c);
            hammingCode.push(d);
            hammingCode.push(control[0]);
            hammingCode.push(control[1]);
            hammingCode.push(control[2]);
            hammingCode.push(control[3]);
        }
    }
    return hammingCode.join('');
}
function decode(bitdata)
{
    if (bitdata.length % 8 != 0)
        alert("Warning!\nInvalid code length! Data may be corrupt!")
    var data = [];
    for(var i=0;i<bitdata.length;i+=16)
    {
        bitview = "";
        for(j=0;j<2;j++)
        {
            var a = parseInt(bitdata[i+ j*8 + 0]);
            var b = parseInt(bitdata[i + j*8 + 1]);
            var c = parseInt(bitdata[i + j*8 + 2]);
            var d = parseInt(bitdata[i + j*8 + 3]);
            var p = parseInt(bitdata[i + j*8 + 4]);
            var q = parseInt(bitdata[i + j*8 + 5]);
            var r = parseInt(bitdata[i + j*8 + 6]);
            var s = parseInt(bitdata[i + j*8 + 7]);
            var dataBits = recover(a, b, c, d, p, q, r, s);
            bitview+=dataBits.join('');
        }
        data.push(String.fromCharCode(parseInt(bitview, 2)));
    }
    return data.join('');
}

function sayHello() {
   alert("Hello World")
}