
var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight - 100;
var ctx = c.getContext("2d");
var width = c.width;
var height = c.height;

var spread = 40; // higher = greater angle between branches
var stem_length = 250;
var length_shrink = 0.5;

function draw_vector(start_x, start_y, angle, magnitude) {
	end_x = start_x + (magnitude * Math.cos(angle));
	end_y = start_y - (magnitude * Math.sin(angle));

	ctx.moveTo(start_x, start_y);
	ctx.lineTo(end_x, end_y);
	ctx.stroke();

	return {"new_x": end_x, "new_y": end_y};
}

function draw_branch(start_x, start_y, angle, magnitude) {
	if (magnitude < 10)
		return;

	var v = draw_vector(start_x, start_y, angle, magnitude);

	draw_branch(v.new_x, v.new_y, angle-(0.0001 * spread * magnitude), magnitude*0.01*length_shrink);
	draw_branch(v.new_x, v.new_y, angle+(0.0001 * spread * magnitude), magnitude*0.01*length_shrink);
}

function start() {
	spread = parseInt(document.getElementById("angle").value);
	stem_length = parseInt(document.getElementById("stem_length").value);
	length_shrink = parseInt(document.getElementById("length_shrink").value);
	ctx.beginPath();
	ctx.clearRect(0, 0, width, height);
	draw_branch(width/2, height, Math.PI/2, stem_length);
}

start();




/*
 *  Recursive function to draw branches
 *  with decresasing length.
 */