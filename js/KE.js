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

        onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);
            if(nextIndex == 1){
		    	TweenMax.to($(".main-menu-item"), .5, {height: "4em", lineHeight: "4em", fontSize: "2em"});
		    	TweenMax.to($(".logo"), .5, {height: "6.5em"});
		    	TweenMax.to($(".header-filler"), .8, {opacity: 0});                
            }
            else{
		    	TweenMax.to($(".main-menu-item"), .5, {height: "3.25em", lineHeight: "3.25em", fontSize: "1.6em"});
		    	TweenMax.to($(".logo"), .5, {height: "5.5em"});
		    	TweenMax.to($(".header-filler"), .8, {opacity: 1});	    
            }
        }    	
    });





    // ----------Initilization for parallax.js------------
	var scene = document.getElementById('main-scene');
	var parallax = new Parallax(scene, {
		scalarX: 30,
  		scalarY: 10,
		frictionX: 0.05,
		frictionY: 0.05,
	});





	// // ----------Code for adjusting header on scroll------------
	// $(window).scroll(function (event) {
	//     var scroll = $(window).scrollTop();
	    
	//     if(scroll > 10) {
	//     	// $(".main-menu-item").css("height" , "3.25em");
	//     	// $(".logo").css("height" , "5em");
	//     	// $(".main-menu-item").css("lineHeight", "3.25em");
	//     	// $(".header").css("");

	//     	TweenMax.to($(".main-menu-item"), .5, {height: "3.25em"});
	//     	TweenMax.to($(".main-menu-item"), .5, {lineHeight: "3.25em"});
	//     	TweenMax.to($(".logo"), .5, {height: "5em"});
	//     	// TweenMax.to($(".header"), .5, {background: "rgba(0,0,0,1)"});
	//     	TweenMax.to($(".header-filler"), .8, {opacity: 1});	    	

	//     }
	//     else {
	// 		// $(".main-menu-item").css("height", "4em");
	// 		// $(".logo").css("height" , "7em");
	// 		// $(".main-menu-item").css("lineHeight", "4em");
	//   //   	// $(".header").css("background", "rgba(0,0,0,.7)");
	//   //   	$(".header").css({background: "-moz-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%);",
	//   //   					  background: "-webkit-linear-gradient(top, rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0) 100%)",
	//   //   					  background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0) 100%)"});

	//     	TweenMax.to($(".main-menu-item"), .5, {height: "4em"});
	//     	TweenMax.to($(".main-menu-item"), .5, {lineHeight: "4em"});
	//     	TweenMax.to($(".logo"), .5, {height: "7em"});
	//     	// TweenMax.to($(".header"), .5, {background: "-moz-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%);",
	//     	// 				  background: "-webkit-linear-gradient(top, rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0) 100%)",
	//     	// 				  background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0) 100%)"});
	//     	TweenMax.to($(".header-filler"), .8, {opacity: 0});
	//     }
	// });






	// ----------Animations with TweenMax and Scroll Magic------------
	// ----------Initial Page load fade in----------
	TweenMax.to($("#fullpage"), .05, {opacity: 1, delay: .1});
	TweenMax.from(".logo", .5, {opacity: 0, scale: 0, ease:Bounce.easeOut, delay: .5});
	TweenMax.from($(".slide1 div:not(#slide1-1), .header"), 2.5, {opacity: 0, delay: .3});
	TweenMax.to($(".main-menu-item"), 1.0, {opacity:1, delay: 1.25});
	TweenMax.to($(".logo"), .5, {transition: ".5s all", delay: 1.25});




	var bird1XScalar = 1;
	var bird1YScalar = 1;

	var bird1Flightpath = {
		soar : {
			curviness: 1.25,
			autoRotate: true,
			values: [
					{x: bird1XScalar * 0,	y: bird1YScalar * 0},
					{x: bird1XScalar * 40,	y: bird1YScalar * 0},
					{x: bird1XScalar * 90,	y: bird1YScalar * 10},
					{x: bird1XScalar * 150,	y: bird1YScalar * 30},
					{x: bird1XScalar * 250,	y: bird1YScalar * 60},
					{x: bird1XScalar * 350,	y: bird1YScalar * 75},
					{x: bird1XScalar * 450,	y: bird1YScalar * 80}
				]
		},
		looping : {
			curviness: 1.25,
			autoRotate: true,
			values: [
					{x: bird1XScalar * 550,	y: bird1YScalar * 80},
					{x: bird1XScalar * 650,	y: bird1YScalar * 0},
					{x: bird1XScalar * 550,	y: bird1YScalar * -80},
					{x: bird1XScalar * 450,	y: bird1YScalar * 0},
					{x: bird1XScalar * 550,	y: bird1YScalar * 30},
					{x: bird1XScalar * 625,	y: bird1YScalar * 25}
				]
		},
		return : {
			curviness: 1.25,
			autoRotate: true,
			values: [
					{x: bird1XScalar * 665,	y: bird1YScalar * 20},
					{x: bird1XScalar * 680,	y: bird1YScalar * 25},
					{x: bird1XScalar * 690,	y: bird1YScalar * 20},
					{x: bird1XScalar * 670,	y: bird1YScalar * 18},
					{x: bird1XScalar * 630,	y: bird1YScalar * 16},
					{x: bird1XScalar * 500,	y: bird1YScalar * 15},
					{x: bird1XScalar * 350,	y: bird1YScalar * 10},
					{x: bird1XScalar * 200,	y: bird1YScalar * 6},
					{x: bird1XScalar * 100,	y: bird1YScalar * 0},
					{x: bird1XScalar * -50,	y: bird1YScalar * 5},
					{x: bird1XScalar * -25,	y: bird1YScalar * 5},
					{x: bird1XScalar * -0,	y: bird1YScalar * 0}

				]
		}
	};



	var bird1Flight = new TimelineMax({repeat:-1})
		.add(TweenMax.to($("#bird1"), 9, {css:{bezier:bird1Flightpath.soar, scale: .9}, ease:Power1.easeIn}))
		.add(TweenMax.to($("#bird1"), 5, {css:{bezier:bird1Flightpath.looping, scale: .7}}))
		.add(TweenMax.to($("#bird1"), 20, {css:{bezier:bird1Flightpath.return, scale: 1}}));
	bird1Flight.play(2);

	var bird2Flight = new TimelineMax({repeat:-1})
		.add(TweenMax.to($("#bird2"), 12, {css:{bezier:bird1Flightpath.soar, scale: 1.1}, ease:Power1.easeIn}))
		.add(TweenMax.to($("#bird2"), 9, {css:{bezier:bird1Flightpath.looping, scale: 1.2}}))
		.add(TweenMax.to($("#bird2"), 28, {css:{bezier:bird1Flightpath.return, scale: 1}}));
	//bird2Flight.play(28);
	bird2Flight.play(8);

	// ----------Initialize ScrollMagic Controller----------
	var controller = new ScrollMagic.Controller();



	// ----------Profile Page animations----------
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