import $ from 'jquery';
import 'fullpage.js';
import { TweenLite, TimelineMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js';
import Parallax from 'parallax-js/dist/parallax.min.js';

(function(){
	// ---------- Once DOM has loaded... ----------
	$(document).ready(() => {
		initializeFullPageJS();
		lockScrolling();
		initializeParallaxJS();
		var scrollMagicController = initializeScrollMagicJS();
		setupMobileMenu();
		setupLanguageChooser();
		setupBirds();
		setupProfilePage(scrollMagicController);
		setupWorkPage(scrollMagicController);
		setupContactPage();
		setupContactForm();
		setupBlogFeed();
		setupOtherPageElements();
	}); //End of $(document).ready
	
	// ---------- Once all images and resources have loaded... ----------
	window.onload = function() {
		var loading = $(".loading-text"),
			continueText = $(".continue-text-block");
		$("body").removeClass("no-js");
		TweenLite.to(loading, .3, {opacity: 0});
		loading.css("display", "none");
		continueText.css("display", "block");
		TweenLite.to(continueText, .3, {opacity: 1});
		var loadingScreenTimeoout = setTimeout(hideLoadingScreen, 8000);
		$(".continue-text-message, .continue-text.eng").on( "click", () => {
			clearTimeout(loadingScreenTimeoout);
			hideLoadingScreen();
		});
		$(".continue-text.jpn").on( "click", () => {
			setLanguageToJapanese();
			clearTimeout(loadingScreenTimeoout);
			hideLoadingScreen();
		});
	}

	function hideLoadingScreen() {
		// ---------- Hide the splash screen overlay ----------
		var splash = $('#splash-container');
		TweenLite.to(splash, .3, {opacity: 0});
		$(splash).css("pointer-events", "none");

		// ---------- Initial Page load fade in ----------
		TweenLite.to($("#fullpage"), .3, {opacity: 1, delay: .1});
		TweenLite.from(".logo", .5, {opacity: 0, scale: 0, ease:Bounce.easeOut, delay: .5});
		TweenLite.from($(".slide1 div:not(#slide1-1), .header"), 2.5, {opacity: 0, delay: .3});
		TweenLite.to($(".main-menu-item"), 1.0, {opacity:1, delay: 1.25});
		TweenLite.to($(".logo"), .5, {transition: ".5s all", delay: 1.25});

		// ---------- Allow scrolling ----------
		unlockScrolling();
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
			normalScrollElements: '#blog-feed-container',

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
			scalarX: $( window ).width() > 600 ? 30 : 60,
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
		// On Mobile trigger click, toggle "active" class on mobile menu and trigger.
		// "active" = mobile menu is open
		$("#mobile-menu-trigger").click(function() {
			$("#mobile-menu").toggleClass("active");
			$("#mobile-menu-trigger").toggleClass("active");

			// If opening ("active" was added in lines above), prevent page from scrolling.
			// Otherwise allow scrolling.
			if($(this).hasClass("active")) {
				$("body").addClass("no-scroll");
				//TweenLite.staggerFrom(".mobile-menu-item", .25, {left:"100vw", opacity:.4, delay:.15, ease:Power4.easeOut, force3D:true}, 0.05);
			} else {
				$("body").removeClass("no-scroll");
			}
		});

		// When clicking a mobile menu item, or the close button, remove classes
		$("#close-mobile-menu, .mobile-menu-item").click(function() {
			$("#mobile-menu").toggleClass("active");
			$("#mobile-menu-trigger").toggleClass("active");
			$("body").removeClass("no-scroll");
		});
	}

	// ---------- Setup Language Chooser ----------
	function setupLanguageChooser() {
		$("#language-chooser").click( function() {
			$(this).hasClass("flipped") ? setLanguageToEnglish() : setLanguageToJapanese();

			hideModalAndFreePage();
			clearModalContent();
		});
		$("#language-chooser-mobile").click( function() {
			$(this).hasClass("flipped") ? setLanguageToEnglish() : setLanguageToJapanese();

			hideModalAndFreePage();
			clearModalContent();			
		});		
	}	

	// ---------- Setup flying birds on top slide ----------
	function setupBirds() {
		// Get birds
		var bird1 = $("#bird1");
		var bird2 = $("#bird2");
		var bird3 = $("#bird3");
		var bird4 = $("#bird4");
		
		// Set these to window width/height divided by 100 to make flight path values into percentages of window
		var birdXScalar = $(window).width() / 100;
		var birdYScalar = $(window).height() / 100;

		// Define curves for flight path
		var birdFlightpath = {
			soar : {
				curviness: 1.15,
				autoRotate: true,
				values: [
						{x: birdXScalar * 0,	y: birdYScalar * 0},
						{x: birdXScalar * 10,	y: birdYScalar * 2},
						{x: birdXScalar * 32,	y: birdYScalar * 4},
						{x: birdXScalar * 56,	y: birdYScalar * 5},
						{x: birdXScalar * 75,	y: birdYScalar * 9},
						{x: birdXScalar * 90,	y: birdYScalar * 12},
						{x: birdXScalar * 115,	y: birdYScalar * 5}
					]
			},
			return : {
				curviness: 1.15,
				autoRotate: true,
				values: [
						{x: birdXScalar * 105,	y: birdYScalar * 4},
						{x: birdXScalar * 70,	y: birdYScalar * 1},
						{x: birdXScalar * 50,	y: birdYScalar * 2},
						{x: birdXScalar * 30,	y: birdYScalar * -1},
						{x: birdXScalar * 10,	y: birdYScalar * -5},
						{x: birdXScalar * -10,	y: birdYScalar * -7},
						{x: birdXScalar * -5,	y: birdYScalar * -4},
						{x: birdXScalar * 0,	y: birdYScalar * -1}

					]
			}
		};

		// Flight for first bird, repeat forever
		var bird1Flight = new TimelineMax({repeat:-1})
			// Soar to the right for 25 seconds, also shrink to add depth
			.add(TweenLite.to(bird1, 45, {css:{bezier:birdFlightpath.soar, scale: .6}, ease:Power1.easeInOut}))
			// flip around to fly back
			.add(TweenLite.to(bird1, .01, {rotationX: 180}))
			// Return over the course of 30 seconds and return to original height for repeat
			.add(TweenLite.to(bird1, 50, {css:{bezier:birdFlightpath.return, scale: 1}, ease:Power1.easeInOut}))
			// flip back around
			.add(TweenLite.to(bird1, .01, {rotationX: 0}));
		// start 3 seconds into animation (birds are staggered at different points in their animations)			
		bird1Flight.play(10);

		var bird2Flight = new TimelineMax({repeat:-1})
			.add(TweenLite.to(bird2, 45, {css:{bezier:birdFlightpath.soar, scale: 1.3}, ease:Power1.easeInOut}))
			.add(TweenLite.to(bird2, .01, {rotationX: 180}))
			.add(TweenLite.to(bird2, 50, {css:{bezier:birdFlightpath.return, scale: 1}, ease:Power1.easeInOut}))
			.add(TweenLite.to(bird2, .01, {rotationX: 0}));
		bird2Flight.play(55);

		var bird3Flight = new TimelineMax({repeat:-1})
			.add(TweenLite.to(bird3, 50, {css:{bezier:birdFlightpath.soar, scale: 1.1}, ease:Power1.easeInOut}))
			.add(TweenLite.to(bird3, .01, {rotationX: 180}))
			.add(TweenLite.to(bird3, 45, {css:{bezier:birdFlightpath.return, scale: 1}, ease:Power1.easeInOut}))
			.add(TweenLite.to(bird3, .01, {rotationX: 0}));
		bird3Flight.play(25);

		var bird4Flight = new TimelineMax({repeat:-1})
			.add(TweenLite.to(bird4, 40, {css:{bezier:birdFlightpath.soar, scale: 1.2}, ease:Power1.easeInOut}))
			.add(TweenLite.to(bird4, .01, {rotationX: 180}))
			.add(TweenLite.to(bird4, 40, {css:{bezier:birdFlightpath.return, scale: 1}, ease:Power1.easeInOut}))
			.add(TweenLite.to(bird4, .01, {rotationX: 0}));
		bird4Flight.play(65);			
	}	

	// ---------- Setup profile page events ----------
	function setupProfilePage(scrollMagicController) {
		// ---------- About/Profile Page animations----------
		// ---------- Pictures and names fly in----------
		var profileTL = new TimelineMax();
		profileTL.from("#kelly-image", .95, {scale: 0, ease: Power4.easeOut}, .15)
				.from("#eriya-image", .95, {scale: 0, ease: Power4.easeOut}, .15)
				.from(".name-label.kelly", .2, {transform: "translateX(-2000px)", opacity: 0}, .40)
				.from(".name-label.eriya", .2, {transform: "translateX(2000px)", opacity: 0}, .40); //target, duration, props, startTime

		var profileScene = new ScrollMagic.Scene({triggerElement: "#profile-trigger", duration: 0})
									.setTween(profileTL)
									.addTo(scrollMagicController);

		$("#about-l9k-link").click(function() {
			showModalAndLockPage();
			loadModalContent("ajax/profile-l9k", attachKleriyaClick);
		});

		$("#kelly-image img, #kelly-image .name-label").click(function() {
			showModalAndLockPage();
			loadModalContent("ajax/profile-kel");
		});

		$("#eriya-image img, #eriya-image .name-label").click(function() {
			showModalAndLockPage();
			loadModalContent("ajax/profile-eriya");
		});
	}

	// ---------- Setup work page events ----------
	function setupWorkPage(scrollMagicController) {
		// ---------- Work Page animations----------
		// ---------- Projects fly in----------
		var workTL = new TimelineMax();
		
		workTL.staggerFrom(".work-link", .65, {scale:0, delay:.35, ease:Power4.easeOut, force3D:true}, 0.45);

		var workScene = new ScrollMagic.Scene({triggerElement: "#work-trigger", duration: 0})
									.setTween(workTL)
									.addTo(scrollMagicController);

		$("#work-fashion-link").click(function() {
			showModalAndLockPage();
			loadModalContent("ajax/sample-fashion");
		});

		$("#work-food-link").click(function() {
			showModalAndLockPage();
			loadModalContent("ajax/sample-food");
		});

		$("#work-gym-link").click(function() {
			showModalAndLockPage();
			loadModalContent("ajax/sample-gym");
		});

		$("#work-services-link").click(function() {
			showModalAndLockPage();
			loadModalContent("ajax/services");
		});					
	}	


	// ---------- Contact Page ----------
	function setupContactPage() {
		$("#contact-mail").click( function() {
			showModalAndLockPage();
			loadModalContent("ajax/contact-form");
		});

		$("#contact-facebook").click( function() {
			window.open("https://www.facebook.com/l9kdesigns/", "_blank");
		});

		$("#contact-twitter").click( function() {
			window.open("https://twitter.com/l9kdesigns", "_blank");
		});				

		$("#contact-OTHER").click( function() {
			alert("RING RING... Sorry, nothing here yet.");
		});	

		// After ajax calls, run setupContactForm just in case the call loaded the contact form
		// Tried putting this in the oncomplete of the load, but wasn't working
		// TODO fix that
		$( document ).ajaxComplete(function() {
			setupContactForm();
			$("#contact-form #name").focus();
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

			// console.log(formData);
			// console.log($(form).attr('action'));

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
				$(".contact.info").slideUp("fast");
				$('#contact-form-response').html(response).hide().slideDown("fast");
			})
			// if it fails, then display error
			.fail(function(data) {
				console.log(data);
				submitButton.html('Error... :(');

				if(data.responseText !== '' ) {
					$('#contact-form-response').html(data.responseText);
				} else {
					$('#contact-form-response').html('Woops.. An error has occured.');
				}
			});
		});
	}

	// ---------- Setup the blog feed ----------
	function setupBlogFeed() {
		$.ajax({
			type: 'GET',
			url: "https://www.l9kdesigns.com/blog/feed/",
			contentType: "text/xml",
			dataType: "xml"
		})
		.done( function(response) {
			// console.log(response);
			var container = $("#blog-feed-container");
			var postCount = 5;

			$(response).find( 'item' ).each( function(index) {
				if( index < postCount ) {
					var title = $(this).find('title').text();
					var url = $(this).find('link').text();
					var pubDate = new Date($(this).find('pubDate').text());
					var description = $(this).find('description').text();
					var content = $(this).find('item content\\:encoded').text();

					// Build the post and append it to the container
					$('<div class="blog-post"></div>').html(
						'<div class="blog-title"><a href="' + url + '">' + title + '</a> <span class="blog-date">on ' + pubDate.toDateString() + '</span></div>' + 
						'<div class="blog-content">' + content + "</div>" ).appendTo(container);
				}
			});

			// Remove the "This post appeared on..." part from each post
			$(".blog-content p:last-child()").remove();
		})
		.fail( function(data) {
			// console.log(data);
			$("#blog-feed-container").html("Sorry! Couldn't load the blog feed.");
		});
	}

	// ----------- Setup other page elements -----------
	function setupOtherPageElements() {
		// Bouncing Arrow on top slide moves to next slide
		$(".more-arrow").click(function() {
			$.fn.fullpage.moveSectionDown();
		});

		// Close modal when the X is clicked
		$(".modal .close-x").click(function() {
			hideModalAndFreePage();
			clearModalContent();
		});

		// Close modal when escape key is pressed
		$(document).keyup(function(e) {
			if (e.keyCode == 27) { // escape key maps to keycode `27`
				hideModalAndFreePage();
				clearModalContent();
			}
		});		
	}


	// ---------------------- HELPER FUNCTIONS ----------------------

	// Make menu items and logo bigger, and hide the black filler 
	// that helps the transition/fade seem smoother than fading the gradient
	function expandMainMenu() {
		TweenLite.to($(".main-menu-item"), .5, {height: "4em", lineHeight: "4em", fontSize: "2em"});
		TweenLite.to($("#main-menu-logo"), .5, {height: "6em"});
		TweenLite.to($(".header-filler"), .8, {opacity: 0});
	}

	// Make menu items and logo smaller, and show the black filler 
	// that helps the transition/fade seem smoother than fading the gradient
	function shrinkMainMenu() {
		TweenLite.to($(".main-menu-item"), .5, {height: "3.25em", lineHeight: "3.25em", fontSize: "1.6em"});
		TweenLite.to($("#main-menu-logo"), .5, {height: "5.5em"});
		TweenLite.to($(".header-filler"), .8, {opacity: 1});	    
	}

	function loadModalContent(url) {
		var fullURL =  url + getLanguageExtension() + ".html";
		$("#modal-inner").load( fullURL );
	}

	function loadModalContent(url, callback) {
		var fullURL =  url + getLanguageExtension() + ".html";
		$("#modal-inner").load( fullURL, callback );
	}	

	function clearModalContent() {
		$("#modal-inner *").empty();
	}

	// Show the modal and prevent main page from scrolling
	function showModalAndLockPage() {
		$("#modal").addClass("active");
		lockScrolling();
	}

	// Hide the modal and allow main page to scroll
	function hideModalAndFreePage() {
		$(".modal").removeClass("active").scrollTop(0);
		unlockScrolling();
	}

	function lockScrolling() {
		$("body").addClass("no-scroll");
		$.fn.fullpage.setAllowScrolling(false);	
		$.fn.fullpage.setKeyboardScrolling(false);
	}

	function unlockScrolling() {
		$("body").removeClass("no-scroll");
		$.fn.fullpage.setAllowScrolling(true);	
		$.fn.fullpage.setKeyboardScrolling(true);
	}

	function getLanguageExtension() {
		var lang = "";
		lang = $("body").hasClass("en-lang") ? "" : "-jp";
		return lang;
	}

	function setLanguageToEnglish() {
		$("html").attr("lang", "en");
		$("body").removeClass("jp-lang");
		$("body").addClass("en-lang");
		$("#language-chooser").removeClass("flipped");
		$("#language-chooser-mobile").removeClass("flipped");		
	}

	function setLanguageToJapanese() {
		$("html").attr("lang", "ja");
		$("body").removeClass("en-lang");
		$("body").addClass("jp-lang");
		$("#language-chooser").addClass("flipped");
		$("#language-chooser-mobile").addClass("flipped");
	}

	function attachKleriyaClick() {
		$("#kleriya-bio").click(function() {
			clearModalContent();
			$("#modal-inner").load( "ajax/profile-kleriya.html" );
		})
	}	
})();