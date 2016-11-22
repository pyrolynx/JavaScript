function getHightestBinaryPart(n){
	var part = 1;
	var pow = 0;
	while (part*2 <= n){
		part*=2;
		pow++;
	}
	return pow*1.0;
}

function getLowestBinaryPart(n){
	var part = 1;
	var pow = -1;
	while (part*0.5 > n){
		part*=0.5;
		pow--;
	}
	return pow*1.0;
}

function getFilledArray(length, filler){
	var array = new Array(length);
	for (i=0;i < length;i++)
		array[i] = filler;
	return array;
}

function binarySplit(powers, number){
	var pow = getHightestBinaryPart(number);
	while (number > 0)
	{
		if (number >= Math.pow(2, pow))
		{
			powers[powers.length - pow -1] = 1;
			number-= Math.pow(2, pow)	
		}
		pow = getHightestBinaryPart(number)
	}
	return powers;
}

function binaryDim(meniund, subtrahend){
	var meniund = meniund.slice();
	if (meniund.length != subtrahend.length)
	{
		WSH.Echo("Different sizes of arrays in dimension!")
		WSH.Quit(1);
	}
	for (i=meniund.length-1;i>=0;i--)
	{
		if (meniund[i] - subtrahend[i] < 0)
		{
			borrow = false;
			for (j=i;j>=0;j--)
				if (meniund[j] > 0)
				{
					meniund[j]--;
					borrow = true;
					break;
				}
			if (!borrow)
				return null;
			for (k=j+1;k<=i;k++)
				meniund[k]++;
			meniund[k-1]++;
		}
		meniund[i]-=subtrahend[i];
	}
	return meniund;
}

function binaryAdd(fpart, spart){
	var sum = getFilledArray(fpart.length, 0);
	if (fpart.length != spart.length)
	{
		WSH.Echo("Different sizes of arrays in addiction!")
		WSH.Quit(1);
	}
	var over = 0;
	for (i=fpart.length-1;i>=0;i--)
	{
		sum[i] = (fpart[i] + spart[i] + over) % 2;
		if (fpart[i] + spart[i] + over > 1)
			over = 1;
		else
			over = 0;
	}
	if (over == 1)
		sum.splice(0, 0, 1); //.slice(0, sum.length-1)
	return sum;
}


function XFloat(number)
	{
	this.extract = function(number, startValue)
	{	
		var buffer = this.mantice.slice();
		var part = Math.pow(2, startValue)/2.0;
		number-= Math.pow(2, startValue);
		for (i=0;i< buffer.length;i++)
		{
			if (number >= part){
				number-=part;
				buffer[i] = 1;
			}
			part/=2.0;
		}
		this.mantice = buffer;
	}


	this.normalize = function(number) {
		this.sign = number < 0 ? 1 : 0;
		this.power = getFilledArray(8, 1);
		this.power[0] = 0;
		this.mantice = getFilledArray(23, 0);
		number = Math.abs(number);
		if (number > 1){
			part = getHightestBinaryPart(number);
			WSH.Echo(part)
			this.power = binaryAdd(this.power, binarySplit(getFilledArray(8, 0), part));
			WSH.Echo(this.power)
			if (this.power.length != 8)
			{
				WSH.Echo('Exponent overflow!');
				WSH.Quit(1);
			}
			this.extract(number, part);
		}
		else
			if (number <= 0.5)
			{
				part = getLowestBinaryPart(number);
				this.power = binaryDim(this.power, binarySplit(getFilledArray(8, 0), Math.abs(part)));
				if (this.power[0] != 0)
				{
					WSH.Echo('Exponent overflow!');
					WSH.Quit(1);
				}
				this.extract(number, part);	
			}
		WSH.Echo(this.sign, this.power, this.mantice);
	}

		this.normalize(number);
}
number = parseFloat(WSH.stdin.readLine().replace(',', '.'))
// number2 = parseFloat(WSH.stdin.readLine().replace(',', '.'))
// a = binarySplit(getFilledArray(4, 0), number)
// b = binarySplit(getFilledArray(4, 0), number2)
// WSH.Echo(binaryAdd(a,b))
// parser = new XFloat(1);
s = new XFloat(number)
// WSH.Echo(binarySplit(getEmptyArray(7), num))