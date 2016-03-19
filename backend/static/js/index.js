var a = [2, 7, 6, 9, 1, 3, 4, 5, 8, 10];
var b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var photos;

$(document).ready(function($) {
	$('.my-slider').unslider({
		autoplay: true,
		arrows: false
	});
	var pop = $('#pop');
	var friend = $('#friend');
	for (var i = 0; i < a.length; i++) {
		var link = $('<a/>', {
			href: 'chat/' + a[i]
		});
		$('<img>', {
			src: 'img/test' + a[i] + '.jpg',
			class: 'photo'
		}).appendTo(link);
		link.appendTo(pop);
		var link = $('<a/>', {
			href: 'chat/' + b[i]
		});
		$('<img>', {
			src: 'img/test' + b[i] + '.jpg',
			class: 'photo'
		}).appendTo(link);
		link.appendTo(friend);
	}
	photos = $('.photo');
	setTimeout(displayPhoto(0), 30);
});

function displayPhoto(i) {
	if(i >= photos.length) {
		if(i % 2 == 0) {
			setTimeout('displayPhoto(1)', 30);
		}
	}
	else {
		photos[i].style.opacity = 1;
		setTimeout('displayPhoto('+(i+2)+')', 30);
	}
}
