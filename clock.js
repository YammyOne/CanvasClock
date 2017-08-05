var dom = document.getElementById("clock");
var ctx = dom.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var rem = width/200;//放大缩小比例
function drawBackground() {
	ctx.save();
	ctx.translate(r,r);//重新定义原点
	ctx.beginPath();
	ctx.lineWidth = 10*rem;
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
	ctx.stroke();
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 18*rem + 'px Arail';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumbers.forEach(function(number,i) {
		var rad = 2*Math.PI/12*i;
		var x = Math.cos(rad)*(r-30*rem);
		var y = Math.sin(rad)*(r-30*rem);
		ctx.fillText(number,x,y);
	});

	for(var i = 0;i < 60;i++) {
		var rad = 2*Math.PI/60*i;
		var x = Math.cos(rad)*(r - 18*rem);
		var y = Math.sin(rad)*(r - 18*rem);
		ctx.beginPath();
		if(i%5 === 0) {
			ctx.fillStyle = "#000";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}else {
			ctx.fillStyle = "#ccc";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}		
		ctx.fill();
	}
}
function drawHour(hour,minute) {//画时钟的位置
	ctx.save();//保存画小时之前的环境
	ctx.beginPath();
	var rad = 2*Math.PI/12*hour;
	var mrad = 2*Math.PI/12/60*minute;
	ctx.rotate(rad + mrad);//drawHour(4); 画出 时钟转向4的指针
	ctx.lineWidth = 6*rem;//时钟 线宽
	ctx.lineCap = 'round';//时钟 端点有弧度
	ctx.moveTo(0,10*rem);//时钟原点位置 向下移动10像素
	//ctx.lineTo(0,r/2);//时钟的长度
	ctx.lineTo(0,-r/2);//负号表示时钟向上 画长度r/2
	ctx.stroke();
	ctx.restore();//状态还原 得到画小时之前的状态

}
function drawMinute(minute) {//画分针的位置
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/60*minute;
	ctx.rotate(rad);	
	ctx.lineWidth = 3*rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r+30*rem);
	ctx.stroke();
	ctx.restore();
}
function drawSecond(second) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#c14543'
	var rad = 2*Math.PI/60*second;
	ctx.rotate(rad);		
	ctx.moveTo(-2*rem,20*rem);
	ctx.lineTo(2*rem,20*rem);
	ctx.lineTo(1,-r+18*rem);
	ctx.lineTo(-1,-r+18*rem);	
	ctx.fill();
	ctx.restore();
}
function drawDot() {
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(0,0,3*rem,0,2*Math.PI,false);
	ctx.fill();	
}




function draw() {
	ctx.clearRect(0,0,width,height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000);
  