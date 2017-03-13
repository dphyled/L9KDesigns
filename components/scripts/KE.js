var jQuery = require('jquery');

// Bind $ to jQuery
(function($){

	// ---------- Once DOM has loaded... ----------
	$(document).ready(function() {
		initializeFullPageJS();
		initializeParallaxJS();
		scrollMagicController = initializeScrollMagicJS();
		setupMobileMenu();
		setupBirds();
		setupProfilePage(scrollMagicController);
		setupContactForm();
		setupOtherPageElements();
	}); //End of $(document).ready
	
	// ---------- Once all images and resources have loaded... ----------
	window.onload = function() {
		// ---------- Hide the loading screen overlay ----------
		loading = $('#loading-container');
		TweenMax.to(loading, .3, {opacity: 0});
		$(loading).css("pointer-events", "none");

		// ---------- Initial Page load fade in ----------
		TweenMax.to($("#fullpage"), .3, {opacity: 1, delay: .1});
		TweenMax.from(".logo", .5, {opacity: 0, scale: 0, ease:Bounce.easeOut, delay: .5});
		TweenMax.from($(".slide1 div:not(#slide1-1), .header"), 2.5, {opacity: 0, delay: .3});
		TweenMax.to($(".main-menu-item"), 1.0, {opacity:1, delay: 1.25});
		TweenMax.to($(".logo"), .5, {transition: ".5s all", delay: 1.25});
	}

	

	// ---------- Initialize fullPage.js ------------
	function initializeFullPageJS() {
		$('#fullpage').fullpage({
			scrollBar: true,
			anchors: ['home', 'about', 'work', 'blog', 'contact'],
			fitToSectionDelay: 500,
			navigation: true,
			navigationPosition: 'right',
			navigationTooltips: ['Top', 'About', 'Work', 'Blog', 'Contact'],
			showActiveTooltip: false,
			bigSectionsDestination: 'top',
			responsiveWidth: 600,
			responsiveHeight: 600,
			normalScrollElements: '#profile-bio-kelly, #profile-bio-eriya, #test-list',

			afterLoad: function(anchorLink, index){
				// Set header/logo for first slide transitions
				if(index == 1){
					expandMainMenu();
				}      
			},

			onLeave: function(index, nextIndex, direction){
				// Set header/logo sizes depending on whether next slide is top slide or not
				if(nextIndex == 1){
					expandMainMenu();
				}
				else{
					shrinkMainMenu();
				}

				// Reset the slow zoom effect when scrolling to slide 2
				// if(nextIndex == 2) {
				// 	slowZoomScene = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
				// 	.setTween(slowZoomIn)
				// 	.addTo(controller);
				// }
			}
		});

		// If any of the sections are taller than the window, 
		// then make sure the site scrolls normally
		// (Disable auto scrolling and fitting window to section with fullPage.js)
		var sections = $(".section");
		$.each(sections, function(i, section) {
			if($(section).height() > $(window).height()) {
				$.fn.fullpage.setFitToSection(false);
				$.fn.fullpage.setAutoScrolling(false);
			}
		});
	}

	// ---------- Initilization for parallax.js ------------
	function initializeParallaxJS() {
		var scene = document.getElementById('main-scene');
		var parallax = new Parallax(scene, {
			scalarX: 30,
			scalarY: 10,
			frictionX: 0.02,
			frictionY: 0.02,
		});
	}

	// ---------- Initialize ScrollMagic Controller ----------
	function initializeScrollMagicJS() {
		var controller = new ScrollMagic.Controller();
		return controller;
	}

	// ---------- Setup Mobile Menu and Mobile Menu Trigger ----------
	function setupMobileMenu() {
		// On Mobile trigger, add "active" class to menu and trigger.
		// Prevent page from scrolling
		$("#mobile-menu-trigger").click(function() {
			$("#mobile-menu").toggleClass("active");
			$("#mobile-menu-trigger").toggleClass("active");
			if($(this).hasClass("active")) {
				$("body").addClass("noScroll");
			} else {
				$("body").removeClass("noScroll");
			}
		});

		// When clicking a mobile menu item, or the close button, remove classes
		$("#close-mobile-menu, .mobile-menu-item").click(function() {
			$("#mobile-menu").toggleClass("active");
			$("#mobile-menu-trigger").toggleClass("active");
			$("body").removeClass("noScroll");
		});
	}

	// ---------- Setup flying birds on top slide ----------
	function setupBirds() {
		// Get birds
		var bird1 = $("#bird1");
		var bird2 = $("#bird2");
		var bird3 = $("#bird3");
		
		// Set these to window width/height divided by 100 to make flight path values into percentages of window
		var birdXScalar = $(window).width() / 100;
		var birdYScalar = $(window).height() / 100;

		// Define curves for flight path
		var birdFlightpath = {
			soar : {
				curviness: 1.25,
				autoRotate: true,
				values: [
						{x: birdXScalar * 0,	y: birdYScalar * 0},
						{x: birdXScalar * 1,	y: birdYScalar * 0},
						{x: birdXScalar * 4,	y: birdYScalar * 2},
						{x: birdXScalar * 8,	y: birdYScalar * 3},
						{x: birdXScalar * 12,	y: birdYScalar * 3},
						{x: birdXScalar * 16,	y: birdYScalar * 3},
						{x: birdXScalar * 20,	y: birdYScalar * 5},
						{x: birdXScalar * 25,	y: birdYScalar * 9},
						{x: birdXScalar * 30,	y: birdYScalar * 12},
						{x: birdXScalar * 35,	y: birdYScalar * 9},
						{x: birdXScalar * 40,	y: birdYScalar * 5},
						{x: birdXScalar * 43,	y: birdYScalar * 3}
					]
			},
			return : {
				curviness: 1.25,
				autoRotate: true,
				values: [
						{x: birdXScalar * 39,	y: birdYScalar * 4},
						{x: birdXScalar * 35,	y: birdYScalar * 5},
						{x: birdXScalar * 32,	y: birdYScalar * 4},
						{x: birdXScalar * 29,	y: birdYScalar * 3},
						{x: birdXScalar * 26,	y: birdYScalar * 2},
						{x: birdXScalar * 23,	y: birdYScalar * 1},
						{x: birdXScalar * 20,	y: birdYScalar * 0},
						{x: birdXScalar * 17,	y: birdYScalar * -1},
						{x: birdXScalar * 12,	y: birdYScalar * -2},
						{x: birdXScalar * 8,	y: birdYScalar * -3},
						{x: birdXScalar * 5,	y: birdYScalar * -3},
						{x: birdXScalar * 2,	y: birdYScalar * -1},
						{x: birdXScalar * 0,	y: birdYScalar * 0}

					]
			}
		};

		// Flight for first bird, repeat forever
		var bird1Flight = new TimelineMax({repeat:-1})
			// Soar to the right for 25 seconds, also shrink to add depth
			.add(TweenMax.to(bird1, 25, {css:{bezier:birdFlightpath.soar, scale: .6}, ease:Power1.easeInOut}))
			// flip around to fly back
			.add(TweenMax.to(bird1, .01, {rotationX: 180}))
			// Return over the course of 30 seconds and return to original height for repeat
			.add(TweenMax.to(bird1, 30, {css:{bezier:birdFlightpath.return, scale: 1}, ease:Power1.easeInOut}))
			// flip back around
			.add(TweenMax.to(bird1, .01, {rotationX: 0}));
		// start 3 seconds into animation (birds are staggered at different points in their animations)			
		bird1Flight.play(3);

		var bird2Flight = new TimelineMax({repeat:-1})
			.add(TweenMax.to(bird2, 30, {css:{bezier:birdFlightpath.soar, scale: 1.3}, ease:Power1.easeInOut}))
			.add(TweenMax.to(bird2, .01, {rotationX: 180}))
			.add(TweenMax.to(bird2, 35, {css:{bezier:birdFlightpath.return, scale: 1}, ease:Power1.easeInOut}))
			.add(TweenMax.to(bird2, .01, {rotationX: 0}));
		bird2Flight.play(35);

		var bird3Flight = new TimelineMax({repeat:-1})
			.add(TweenMax.to(bird3, 22, {css:{bezier:birdFlightpath.soar, scale: 1.1}, ease:Power1.easeInOut}))
			.add(TweenMax.to(bird3, .01, {rotationX: 180}))
			.add(TweenMax.to(bird3, 29, {css:{bezier:birdFlightpath.return, scale: 1}, ease:Power1.easeInOut}))
			.add(TweenMax.to(bird3, .01, {rotationX: 0}));
		bird3Flight.play(37);		
	}	

	// ---------- Setup profile page events ----------
	function setupProfilePage(scrollMagicController) {
		// ---------- About/Profile Page animations----------
		// ---------- Pictures and names fly in----------
		var profileTL = new TimelineMax();
		profileTL.from("#kelly-image", .55, {scale: 0, ease: Power4.easeOut})
				.from("#eriya-image", .55, {scale: 0, ease: Power4.easeOut}, 0)
				.from(".name-label.kelly", .2, {transform: "translateX(-2000px)", opacity: 0}, .40)
				.from(".name-label.eriya", .2, {transform: "translateX(2000px)", opacity: 0}, .40); //target, duration, props, startTime

		var profileScene = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
									.setTween(profileTL)
									.addTo(scrollMagicController);

		// // ---------- Zoom Effect ----------
		// var slowZoomIn = new TimelineMax()
		// 	.add(TweenMax.to($("#slide2 .in-slide-container"), 15, {scale: 1.1}));

		// // Slow zoom scene also added in onLeave event of FullPage init, so that it resets when entering slide 3
		// var slowZoomScene = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
		// 							.setTween(slowZoomIn)
		// 							.addTo(controller);

		// When clicking on profile image or name label, display the bio and prevent page scrolling
		$("#kelly-image img, #kelly-image .name-label").click(function() {
			$("#profile-bio-kelly").addClass("active");
			$("body").addClass("noScroll");
		});

		$("#eriya-image img, #eriya-image .name-label").click(function() {
			$("#profile-bio-eriya").addClass("active");
			$("body").addClass("noScroll");
		});

		// Close bio when the X is clicked
		$(".profile-bio .close-x").click(function() {
			$(".profile-bio").removeClass("active");
			$("body").removeClass("noScroll");
		});
	}


	// ---------- Setup submit action for contact form ----------
	function setupContactForm() {
		var form = $('#contact-form');
		var submitButton = $('#contact-submit');

		$(form).submit(function(event) {
			event.preventDefault();
			submitButton.html('Sending...');

			// Serialize form data
			var formData = $(form).serialize();

			// Send data to contact.php for processing
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			})
			// if successful, clear fields and hide form, then display response
			.done(function(response) {
				$('#name').val('');
				$('#email').val('');
				$('#message').val('');

				$(form).slideUp("fast");
				$('#contact-form-response').html(response).hide().slideDown("fast");
			})
			// if it fails, then display error
			.fail(function(data) {
				submitButton.html('Error... :(');

				if(data.responseText !== '' ) {
					$('#contact-form-response').html(data.responseText);
				} else {
					$('#contact-form-response').html('Woops.. An error has occured.');
				}
			});
		});
	}

	// Make menu items and logo bigger, and hide the black filler 
	// that helps the transition/fade seem smoother than fading the gradient
	function expandMainMenu() {
		TweenMax.to($(".main-menu-item"), .5, {height: "4em", lineHeight: "4em", fontSize: "2em"});
		TweenMax.to($("#main-menu-logo"), .5, {height: "6em"});
		TweenMax.to($(".header-filler"), .8, {opacity: 0});
	}

	// Make menu items and logo smaller, and show the black filler 
	// that helps the transition/fade seem smoother than fading the gradient
	function shrinkMainMenu() {
		TweenMax.to($(".main-menu-item"), .5, {height: "3.25em", lineHeight: "3.25em", fontSize: "1.6em"});
		TweenMax.to($("#main-menu-logo"), .5, {height: "5.5em"});
		TweenMax.to($(".header-filler"), .8, {opacity: 1});	    
	}

	// ----------- Setup other page elements -----------
	function setupOtherPageElements() {
		// Bouncing Arrow on top slide moves to next slide
		$(".more-arrow").click(function() {
			$.fn.fullpage.moveSectionDown();
		});
	}
})(jQuery);