var jQuery = require('jquery');

// Making jQuery safe?
(function($){
$(document).ready(function() {

	// ----------Initilization for fullPage.js------------
    $('#fullpage').fullpage({
    	scrollBar: true,
    	anchors: ['home', 'about', 'work', 'feed', 'contact'],
    	fitToSectionDelay: 500,
    	navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Top', 'About', 'Work', 'Feed', 'Contact'],
        showActiveTooltip: false,
        bigSectionsDestination: 'top',
        responsiveWidth: 600,
        responsiveHeight: 500,
        normalScrollElements: '#profile-bio-kelly, #profile-bio-eriya',


        afterLoad: function(anchorLink, index){
        	// Set header/logo for first slide transitions
            if(index == 1){
		    	TweenMax.to($(".main-menu-item"), .5, {height: "4em", lineHeight: "4em", fontSize: "2em"});
		    	TweenMax.to($("#main-menu-logo"), .5, {height: "6em"});
		    	TweenMax.to($(".header-filler"), .8, {opacity: 0});
            }
        },

        onLeave: function(index, nextIndex, direction){
        	// Set header/logo sizes depending on whether next slide is top slide or not
            if(nextIndex == 1){
		    	TweenMax.to($(".main-menu-item"), .5, {height: "4em", lineHeight: "4em", fontSize: "2em"});
		    	TweenMax.to($("#main-menu-logo"), .5, {height: "6em"});
		    	TweenMax.to($(".header-filler"), .8, {opacity: 0});
            }
            else{
		    	TweenMax.to($(".main-menu-item"), .5, {height: "3.25em", lineHeight: "3.25em", fontSize: "1.6em"});
		    	TweenMax.to($("#main-menu-logo"), .5, {height: "5.5em"});
		    	TweenMax.to($(".header-filler"), .8, {opacity: 1});	    
            }

            // Reset the slow zoom effect when scrolling to slide 2
            if(nextIndex == 2) {
				slowZoomScene = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
											.setTween(slowZoomIn)
											.addTo(controller);
				//disableFullPage();
            }
            else {
            	//enableFullPage();
            }
        }
    });

    function enableFullPage() {
		$.fn.fullpage.setAutoScrolling(true);
		$.fn.fullpage.setFitToSection(true);
    }

    function disableFullPage() {
		$.fn.fullpage.setAutoScrolling(false);
		$.fn.fullpage.setFitToSection(false);
    }

    // ----------Initilization for parallax.js------------
	var scene = document.getElementById('main-scene');
	var parallax = new Parallax(scene, {
		scalarX: 30,
  		scalarY: 10,
		frictionX: 0.02,
		frictionY: 0.02,
	});



	// ----------Animations with TweenMax and Scroll Magic------------
	// ----------Initial Page load fade in----------
	TweenMax.to($("#fullpage"), .05, {opacity: 1, delay: .1});
	TweenMax.from(".logo", .5, {opacity: 0, scale: 0, ease:Bounce.easeOut, delay: .5});
	TweenMax.from($(".slide1 div:not(#slide1-1), .header"), 2.5, {opacity: 0, delay: .3});
	TweenMax.to($(".main-menu-item"), 1.0, {opacity:1, delay: 1.25});
	TweenMax.to($(".logo"), .5, {transition: ".5s all", delay: 1.25});



	// ----------Birds Flying----------
	//set these to window width/height divided by 100 to make flight path values into percentages
	var bird1 = $("#bird1");
	var bird2 = $("#bird2");
	var bird3 = $("#bird3");
	var bird1XScalar = $(window).width() / 100;
	var bird1YScalar = $(window).height() / 100;

	var bird1Flightpath = {
		soar : {
			curviness: 1.25,
			autoRotate: true,
			values: [
					{x: bird1XScalar * 0,	y: bird1YScalar * 0},
					{x: bird1XScalar * 1,	y: bird1YScalar * 0},
					{x: bird1XScalar * 4,	y: bird1YScalar * 2},
					{x: bird1XScalar * 8,	y: bird1YScalar * 3},
					{x: bird1XScalar * 12,	y: bird1YScalar * 3},
					{x: bird1XScalar * 16,	y: bird1YScalar * 3},
					{x: bird1XScalar * 20,	y: bird1YScalar * 5},
					{x: bird1XScalar * 25,	y: bird1YScalar * 9},
					{x: bird1XScalar * 30,	y: bird1YScalar * 12},
					{x: bird1XScalar * 35,	y: bird1YScalar * 9},
					{x: bird1XScalar * 40,	y: bird1YScalar * 5},
					{x: bird1XScalar * 43,	y: bird1YScalar * 3}
				]
		},
		return : {
			curviness: 1.25,
			autoRotate: true,
			values: [
					{x: bird1XScalar * 39,	y: bird1YScalar * 4},
					{x: bird1XScalar * 35,	y: bird1YScalar * 5},
					{x: bird1XScalar * 32,	y: bird1YScalar * 4},
					{x: bird1XScalar * 29,	y: bird1YScalar * 3},
					{x: bird1XScalar * 26,	y: bird1YScalar * 2},
					{x: bird1XScalar * 23,	y: bird1YScalar * 1},
					{x: bird1XScalar * 20,	y: bird1YScalar * 0},
					{x: bird1XScalar * 17,	y: bird1YScalar * -1},
					{x: bird1XScalar * 12,	y: bird1YScalar * -2},
					{x: bird1XScalar * 8,	y: bird1YScalar * -3},
					{x: bird1XScalar * 5,	y: bird1YScalar * -3},
					{x: bird1XScalar * 2,	y: bird1YScalar * -1},
					{x: bird1XScalar * 0,	y: bird1YScalar * 0}

				]
		}
	};

	var bird1Flight = new TimelineMax({repeat:-1})
		.add(TweenMax.to(bird1, 25, {css:{bezier:bird1Flightpath.soar, scale: .6}, ease:Power1.easeInOut}))
		.add(TweenMax.to(bird1, .01, {rotationX: 180}))
		.add(TweenMax.to(bird1, 30, {css:{bezier:bird1Flightpath.return, scale: 1}, ease:Power1.easeInOut}))
		.add(TweenMax.to(bird1, .01, {rotationX: 0}));
	bird1Flight.play(3);

	var bird2Flight = new TimelineMax({repeat:-1})
		.add(TweenMax.to(bird2, 30, {css:{bezier:bird1Flightpath.soar, scale: 1.3}, ease:Power1.easeInOut}))
		.add(TweenMax.to(bird2, .01, {rotationX: 180}))
		.add(TweenMax.to(bird2, 35, {css:{bezier:bird1Flightpath.return, scale: 1}, ease:Power1.easeInOut}))
		.add(TweenMax.to(bird2, .01, {rotationX: 0}));
	bird2Flight.play(35);

	var bird3Flight = new TimelineMax({repeat:-1})
		.add(TweenMax.to(bird3, 22, {css:{bezier:bird1Flightpath.soar, scale: 1.1}, ease:Power1.easeInOut}))
		.add(TweenMax.to(bird3, .01, {rotationX: 180}))
		.add(TweenMax.to(bird3, 29, {css:{bezier:bird1Flightpath.return, scale: 1}, ease:Power1.easeInOut}))
		.add(TweenMax.to(bird3, .01, {rotationX: 0}));
	bird3Flight.play(37);





	// ----------Initialize ScrollMagic Controller----------
	var controller = new ScrollMagic.Controller();


	// ---------- About/Profile Page animations----------
	// ---------- Pictures and names fly in----------
	var profileTL = new TimelineMax();
	profileTL.from("#kelly-image", .55, {scale: 0, ease:Bounce.easeOut})
			 .from("#eriya-image", .55, {scale: 0, ease:Bounce.easeOut}, 0)
			 .from(".name-label.kelly", .2, {transform: "translateX(-2000px)"}, .40)
			 .from(".name-label.eriya", .2, {transform: "translateX(2000px)"}, .40); //target, duration, props, startTime

	// ---------- Zoom Effect----------
	var slowZoomIn = new TimelineMax()
		.add(TweenMax.to($("#slide2 .in-slide-container"), 15, {scale: 1.1}));

	var profileScene = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
								.setTween(profileTL)
								.addTo(controller);

	// Slow zoom scene also added in onLeave event of FullPage init, so that it resets when entering slide 3
	var slowZoomScene = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
								.setTween(slowZoomIn)
								.addTo(controller);


	// Setup other page elements
	$(".more-arrow").click(function() {
		$.fn.fullpage.moveSectionDown();
	});


	$("#mobile-menu-trigger").click(function() {
		$("#mobile-menu").toggleClass("active");
		$("#mobile-menu-trigger").toggleClass("active");
		if($(this).hasClass("active")) {
			$("body").addClass("noScroll");
		} else {
			$("body").removeClass("noScroll");
		}

	});

	$("#close-mobile-menu, .mobile-menu-item").click(function() {
		$("#mobile-menu").toggleClass("active");
		$("#mobile-menu-trigger").toggleClass("active");
		$("body").removeClass("noScroll");
	});



	$("#kelly-image img").click(function() {
		$("#profile-bio-kelly").addClass("active");
		$("body").addClass("noScroll");
	});

	$("#eriya-image img").click(function() {
		$("#profile-bio-eriya").addClass("active");
		$("body").addClass("noScroll");
	});

	$(".profile-bio .close-x").click(function() {
		$(".profile-bio").removeClass("active");
		$("body").removeClass("noScroll");
	});




	// Code for contact form
	var form = $('#contact-form');
	var submitButton = $('#contact-submit');

	$(form).submit(function(event) {
		submitButton.html('Sending...');

		event.preventDefault();

		// Serialize form data
		var formData = $(form).serialize();

		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
			submitButton.html('Sent!');
		})
		.fail(function(data) {
			submitButton.html('Error... :(');
		});

	});


}); 
})(jQuery); // End of making jQuery safe?