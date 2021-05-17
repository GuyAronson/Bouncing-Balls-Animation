var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cx = canvas.getContext('2d');

function Circle(x , y, radius ,color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.dx = Math.random()*4 +1;
	this.dy = Math.random()*4 +1;
	this.randvel = Math.floor(Math.random()*2);
	if(this.randvel == 1){
		this.dx = this.dx*(-1);
		this.dy = this.dy*(-1);
	}
}

function Draw(circle){
	// var c = new Circle(x,y,r,c);
	cx.beginPath();
	cx.fillStyle = circle.color;
	cx.arc(circle.x, circle.y, circle.radius,0,Math.PI *2);
	cx.fill();
}
function AddVelocity(circle){
		circle.x += circle.dx;
		circle.y += circle.dy;
		Draw(circle);
}

var balls =[];
for(let i=0; i<20;i++){
	let r = Math.floor(Math.random()*40)+10;
	let x = Math.random() * (canvas.width - r * 2) +10;
	let y = Math.random() * (canvas.height - r * 2)+10;
	let c = 'red';
	let ball = new Circle(x,y,r,c);
	balls.push(ball);
}

canvas.addEventListener('click', function(e){
 	let r = Math.floor(Math.random()*60)+10;
	balls.push(new Circle(e.clientX, e.clientY, r, 'blue'));
})

document.onkeydown= function(e){
	let r = Math.floor(Math.random()*60)+10;
	let x = Math.random() * canvas.width;
	let y = Math.random() * canvas.height;
	if(e.keyCode == 32)
		balls.push(new Circle(x, y, r, 'green'));
}

function Update(){
	cx.clearRect(0,0,canvas.width,canvas.height);
	for (var i = 0; i < balls.length; i++) {
			if(balls[i].x + balls[i].radius/2 >= canvas.width || balls[i].x + balls[i].radius/2 <= 0)
			{
			 	balls[i].dx = -balls[i].dx
			}
			if(balls[i].y + balls[i].radius/2 >= canvas.height || balls[i].y + balls[i].radius/2 <=0 ){
			 	balls[i].dy = -balls[i].dy
			}
			AddVelocity(balls[i]);
		// }
	}

	requestAnimationFrame(Update);
}

Update();





