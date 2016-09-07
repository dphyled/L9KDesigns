$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    
    if(scroll > 10) {
    	$(".main-menu-item, .logo").css({height:100}, 300);
    }
    else {
		$(".main-menu-item, .logo").css({height:150}, 300);	
    }
});


$(document).ready(function() {
	slide2 = $("#slide1-2");
	slide3 = $("#slide1-3");
	slide4 = $("#slide1-4");
	moveBackground(slide2, 35);
	moveBackground(slide3, 25);
	moveBackground(slide4, 5);
});


function moveBackground (el, strength) {
	var movementStrength = strength;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();
	$("#slide1-1").mousemove(function(e){
	          var pageX = e.pageX - ($(window).width() / 2);
	          var pageY = e.pageY - ($(window).height() / 2);
	          var newvalueX = width * pageX * -1 -50;
	          var newvalueY = height * pageY * -1 -50;
	          el.css("background-position", newvalueX+"px     "+newvalueY+"px");
	});
}



// jQuery( '.slide1-1' ).parallax( options );