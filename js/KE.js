// ----------Initilization for fullPage.js------------
$(document).ready(function() {
    $('#fullpage').fullpage({
    	scrollBar: true,
    	anchors: ['home', 'work', 'about', 'feed', 'contact'],
    	fitToSectionDelay: 300,
    	navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Top', 'Work', 'About', 'Feed', 'Contact'],
        showActiveTooltip: false,

        // onLeave: function(index, nextIndex, direction){
        //     var leavingSection = $(this);
        //     if(nextIndex == 1){
        //         alert("Going to section 1!");
        //     }
        //     else{
        //     	alert("Going somewhere other than 1!");
        //     }
        // }    	
    });





    // ----------Initilization for parallax.js------------
	var scene = document.getElementById('main-scene');
	var parallax = new Parallax(scene, {
		scalarX: 30,
  		scalarY: 10,
		frictionX: 0.05,
		frictionY: 0.05,
	});





	// ----------Code for adjusting header on scroll------------
	$(window).scroll(function (event) {
	    var scroll = $(window).scrollTop();
	    
	    if(scroll > 10) {
	    	$(".main-menu-item, .logo").css("height" , 100);
	    	$(".main-menu-item").css("lineHeight", "100px");
	    	$(".header").css("backgroundColor", "rgba(0,0,0,1)");
	    }
	    else {
			$(".main-menu-item, .logo").css("height", 125);
			$(".main-menu-item").css("lineHeight", "125px");
	    	$(".header").css("backgroundColor", "rgba(0,0,0,.7)");
	    }
	});






	// ----------Animations with TweenMax and Scroll Magic------------
	TweenMax.to($("#fullpage"), .05, {opacity: 1, delay: .1});
	TweenMax.from(".logo", .5, {opacity: 0, scale: 0, ease:Bounce.easeOut, delay: .5});
	TweenMax.from($(".slide1 div:not(#slide1-1), .header"), 2.5, {opacity: 0, delay: .3});
	TweenMax.to($(".main-menu-item"), .75, {opacity:1, delay: 1.25, transition: "all .5s"});



	var controller = new ScrollMagic.Controller();

	var profileTL = new TimelineMax();
	profileTL.from("#kelly-image", .75, {transform: "translateX(-2000px)", scale: 0, ease:Bounce.easeOut})
			 .from("#eriya-image", .75, {transform: "translateX(2000px)", scale: 0, ease:Bounce.easeOut}, 0)
			 .from(".name-label.kelly", .2, {transform: "translateX(-2000px)"})
			 .from(".name-label.eriya", .2, {transform: "translateX(2000px)"}); //target, duration, props, startTime

	var profileScene = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
								.setTween(profileTL)
								.addTo(controller);



	// var tweenKelly = TweenMax.from("#kelly-image", .5, {left: "-100%"});

	// var sceneKelly = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
	// 							.setTween(tweenKelly)
	// 							.addTo(controller);

	// var tweenEriya = TweenMax.from("#eriya-image", .5, {right: "-100%"});

	// var sceneEriya = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
	// 							.setTween(tweenEriya)
	// 							.addTo(controller);	





	// $("#kelly-image").one("load", function() {
	// 	$("#kelly-image").css("left", $(this).width() * .5);
	// }).each(function() {
	// 	if(this.complete) $(this).load;
	// });
	


});





// ----------OLD CODE TO SHIFT LAYERS ON FIRST SLIDE------------
// $(document).ready(function() {
// 	slide2 = $("#slide1-2");
// 	slide3 = $("#slide1-3");
// 	moveBackground(slide2, 45);
// 	moveBackground(slide3, 15);
// });

// function moveBackground (el, strength) {
// 	var movementStrength = strength;
// 	var height = movementStrength / $(window).height();
// 	var width = movementStrength / $(window).width();
// 	$("#slide1-5").on( 'mousemove', _.throttle(function(e){
// 		var pageX = e.pageX - ($(window).width() / 2);
// 		var pageY = e.pageY - ($(window).height() / 2);
// 		var newvalueX = (width * pageX * -1) -50;
// 		var newvalueY = (height * pageY * -1) +50;
// 		el.css("background-position", newvalueX+"px     "+newvalueY+"px");
// 		//el.css("background-position", newvalueX+"px     50%");
// 		//el.css({'transform' : 'translate(' + newvalueX + 'px, ' + newvalueY + 'px)'});
// 	}, 250));
// }