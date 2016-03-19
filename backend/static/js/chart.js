function init() {
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
	var max_amount = Math.max(good.length, fuck.length);
	var good_dis = [], fuck_dis = [], labels = [];
	for (var i = 0; i < 15; i++) {
		good_dis[i] = fuck_dis[i] = 0;
		labels[i] = i*4 + "~" + (i+1)*4;
	}
	for (var i = 0; i < good.length; i++) {
		var n = parseInt(good[i] / 40);
		good_dis[n]++;
	};
	for (var i = 0; i < fuck.length; i++) {
		var n = parseInt(fuck[i] / 40);
		fuck_dis[n]++;
	};
	for (var i = 1; i < 15; i++) {
		fuck_dis[i] += fuck_dis[i-1];
		good_dis[i] += good_dis[i-1];
	}
	var data = {
		labels: labels,
		series: [fuck_dis, good_dis]
	}
	new Chartist.Line('.ct-chart', data);
}
