var ctx;
var height = 500, width = 800;

function initCanvas(canvas_id) {
	var canvas = document.getElementById(canvas_id);
	canvas.height = height;
	canvas.width = width;
	ctx = canvas.getContext('2d');

	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			draw(obj.good, obj.fuck);
		}
	};
	req.open("GET", "/statistic", true);
	req.send();
}

function draw(good, fuck) {
	var unit_w = width/600;
	var max_amount = Math.max(good.length, fuck.length);
	var unit_h = height/max_amount;

}
