$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    
    if(scroll > 10) {
    	$(".main-menu-item, .logo").css({height:100}, 300);
    	$(".main-menu-item").css({lineHeight:"100px"}, 300);
    }
    else {
		$(".main-menu-item, .logo").css({height:125}, 300);
		$(".main-menu-item").css({lineHeight:"125px"}, 300);
    }
});


$(document).ready(function() {
	slide2 = $("#slide1-2");
	slide3 = $("#slide1-3");
	moveBackground(slide2, 35);
	moveBackground(slide3, 10);
});


function moveBackground (el, strength) {
	var movementStrength = strength;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();
	$("#slide1-5").mousemove(function(e){
	          var pageX = e.pageX - ($(window).width() / 2);
	          var pageY = e.pageY - ($(window).height() / 2);
	          var newvalueX = (width * pageX * -1) -50;
	          var newvalueY = (height * pageY * -1) +50;
	          el.css("background-position", newvalueX+"px     "+newvalueY+"px");
	          //el.css("background-position", newvalueX+"px     50%");
	});
}


// jQuery( '.slide1-1' ).parallax( options );

