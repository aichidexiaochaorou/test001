function huan(oId,angel,txt){


	var oCanvas = document.getElementById( oId );
	var ctx = oCanvas.getContext('2d');

	var W = oCanvas.width;
	var H = oCanvas.height;

	var degrees = 20;
	var new_degrees = 0;
	var difference = 0;
	var color = "lightgreen"; //green looks better to me
	var bgcolor = "#222";
	var text;
	var animation_loop, redraw_loop;

	function init(){

		ctx.clearRect(0,0,W,H);

		ctx.beginPath();
		ctx.strokeStyle = bgcolor;
		ctx.lineWidth = 20;
		ctx.arc(W/2,H/2,70,0,Math.PI*2,false);
		ctx.stroke();

		var radians = degrees * Math.PI / 180;
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 20;
		ctx.arc(W/2,H/2,70,0-90*Math.PI/180,radians-90*Math.PI/180,false);
		ctx.stroke();

		// 文字
		ctx.fillStyle = color;
		ctx.font = "20px bebas";
		text = txt;
		text_width = ctx.measureText(text).width;
		ctx.fillText(text, W/2 - text_width/2, H/2 + 15);

	}

	function draw(){
		if(typeof animation_loop != undefined) clearInterval(animation_loop);
		new_degrees = angel;
		difference = new_degrees - degrees;

		// draw里只负责改角度，具体的动画重新定义功能。
		animation_loop = setInterval( animate_to,1000/difference );
	}

	function animate_to(){

		if(degrees == new_degrees) 
			clearInterval(animation_loop);
		
		if(degrees < new_degrees)
			degrees++;
		else
			degrees--;
			
		init();

		//console.log( new_degrees );

	}


	draw();

	// 每过一段时间就重新绘制一次---》就是每过一段时间就改变一次角度
	redraw_loop = setTimeout( draw,2000 );
}