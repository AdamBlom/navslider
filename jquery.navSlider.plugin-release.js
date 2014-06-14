// Functional Javascript for the navSlider jQuery plugin

	// TO DO: Polish code a bit to make more user friendly.
	// FUTURE DEVELOPMENT: Allow slider to come from top and bottom (left, center, right options) of the page as well. 
;(function($) {
	$.fn.navSlider = function (options) {

		//Handles user activation of plug-in
		function sliderActivation (activator) {
			if (activator == 'click') {	
				activateClick($slideTab);
			} else if (activator == 'hover') {
				activateHover($navSlider);
			} else {
				alert('navSlider: Activation type is invalid. Please check options and try again')
			}
		}

		//Handles determining positioning of the tab. Can adjust offset based on user input and defaults.
		function tabPositioner ($target) {
			if (userOptions.sliderSide == 'left') {
				$slideTab.addClass('navSlider-sliderSide-tabRotateForLeft');
				if (userOptions.tabLocation == 'top') {
					positionTabMySide = 'left top';
					positionTabAtSide = 'right top+'+(userOptions.tabLocationOffset);
				} else if (userOptions.tabLocation == 'center') {
					positionTabMySide = 'left center';
					positionTabAtSide = 'right center+'+(userOptions.tabLocationOffset-((tabWidth-tabOuterHeight)/2));
				} else if (userOptions.tabLocation == 'bottom') {
					positionTabMySide = 'left bottom';
					positionTabAtSide = 'right bottom+'+(userOptions.tabLocationOffset-tabWidth+tabOuterHeight);
				}
			} else if (userOptions.sliderSide == 'right') {
				$slideTab.addClass('navSlider-sliderSide-tabRotateForRight');
				if (userOptions.tabLocation == 'top') {
					positionTabMySide = 'right+'+(tabWidth-tabOuterHeight)+' top';
					positionTabAtSide = 'left top+'+(userOptions.tabLocationOffset);
				} else if (userOptions.tabLocation == 'center') {
					positionTabMySide = 'right+'+(tabWidth-tabOuterHeight)+' center';
					positionTabAtSide = 'left center+'+(userOptions.tabLocationOffset-((tabWidth-tabOuterHeight)/2));
				} else if (userOptions.tabLocation == 'bottom') {
					positionTabMySide = 'right+'+(tabWidth-tabOuterHeight)+' bottom';
					positionTabAtSide = 'left bottom+'+(userOptions.tabLocationOffset-tabWidth+tabOuterHeight);
				}
			}
			tabPlacer($target);
		} 

		//Uses jQuery UI Position to place tab on correct side of slider
		function tabPlacer ($target) {
			$target.position({
				my: positionTabMySide,
				at: positionTabAtSide,
				of: $navSliderTarget,
				collision: 'none'
			});
		}

		//Handles determining the slider position given user/default specified side of the page and adjusting animation accordingly.
		function sliderPositioner ($target) {
			if (userOptions.sliderSide == 'left') {
				positionSliderMySide = 'left-';
				positionSliderAtSide = 'left';
				slideOut = '+='+slideWidth+'px';
				slideIn = '-='+slideWidth+'px';
			} else if (userOptions.sliderSide == 'right') {
				positionSliderMySide = 'right';
				positionSliderAtSide = 'right';
				slideOut = '-='+slideWidth+'px';
				slideIn = '+='+slideWidth+'px';
			}
			sliderPlacer($target);
		}
		
		//Uses jQuery UI Position to place slider on correct side of page. 
		function sliderPlacer ($target) {
			$target.position({
				my: positionSliderMySide + slideWidth + ' top',
				at: positionSliderAtSide + ' top+'+ userOptions.sliderVerticalOffset,
				of: $(window),
				collision: 'none'
			});
		}

		//Handles adding rounded corners based on user/default selection.
		function cornerRounder (userSelection) {
			if (userSelection == 'yes') {
				$slideTab.addClass('navSlider-roundedCorners-tabCorners');
				if (userOptions.sliderSide == 'left') {
					$topListItem.addClass('navSlider-roundedCorners-topListItemLeft');
					$bottomListItem.addClass('navSlider-roundedCorners-bottomListItemLeft');
				} else if (userOptions.sliderSide == 'right') {
					$topListItem.addClass('navSlider-roundedCorners-topListItemRight');
					$bottomListItem.addClass('navSlider-roundedCorners-bottomListItemRight');
				}
			}
		}

		//CLICK: Handles the sliding function of the navigation slider. Speed can be user modified.
		function activateClick ($target) {
			$target.click(function () {
				$navSlider.toggleClass('navSlider-active');
				if ($navSlider.hasClass('navSlider-active')) {
					$navSlider.animate({"left": slideOut}, userOptions.expandSpeed);
					$slideTab.text(userOptions.menuCloseName).css('width', tabWidth); //changes text and keeps width the same as originally set.
				} else {
					$navSlider.animate({"left": slideIn}, userOptions.collapseSpeed);
					$slideTab.text(userOptions.menuName); 
				}
			});
		}

		//HOVER: Handles the sliding function of the navigation slider. Speed can be user modified.
		function activateHover ($target) {
			$target.hover(function () {				
				$navSlider.animate({"left": slideOut}, userOptions.expandSpeed);
			}, function () {
				$navSlider.animate({"left": slideIn}, userOptions.collapseSpeed, function() {
					$target.stop(true); //stops animation from repeating if animation in progress.
				});
			});
		}

		//Pass in user target
		var $navSliderTarget = this;

		//Set default options
		var defaults = {
			'sliderSide': 'left',
			'sliderVerticalOffset': 140,
			'activateType': 'click',
			'expandSpeed': 800,
			'collapseSpeed': 600,
			'roundedCorners': 'no',
			'tabLocation': 'top',
			'tabLocationOffset': '',
			'menuName': 'Menu',
			'menuCloseName': 'Close'
		};

		//Logic for setting default tabLocationOffset if not passed in.
			if (typeof options == 'undefined' || (typeof options.tabLocation == 'undefined' && typeof options.tabLocationOffset == 'undefined')) {
				defaults.tabLocationOffset = 15;
			} else if (typeof options.tabLocationOffset == 'undefined')  {
				if (options.tabLocation == 'top') {
					defaults.tabLocationOffset = 15;
				} else if (options.tabLocation == 'center') {
					defaults.tabLocationOffset = 0;
				} else if (options.tabLocation == 'bottom') {
					defaults.tabLocationOffset = -15;
				}
			}
		//Process option and defaults
		var userOptions = $.extend(defaults, options);	
					
		//Find the first unordered list within the target and wrapping it in a navSlider div and storing it in a variable.
		$navSliderTarget.wrap('<div class="navSlider"></div>');
		var $navSlider = $('.navSlider');
			
		//Add the tab list item and pass it the user/default specified name
		$navSlider.append('<span class="navSlider-title">' + userOptions.menuName + '</span>');
			
		//Variables to be used in positioning and programmed styling.
		var $slideTab = $('.navSlider-title');
		var slideWidth = $navSlider.outerWidth();
		var tabOuterHeight = $slideTab.outerHeight();
		var tabInnerHeight = $slideTab.height();
		var tabWidth = $slideTab.outerWidth()
		var $topListItem = $navSlider.find('li:first-child');
		var $bottomListItem = $navSlider.find('li:last-child');
		var userOptions, positionSliderMySide, positionSliderAtSide, positionTabMySide, positionTabAtSide, positionAtVerticalTabLocation, slideOut, slideIn;

		//Positions the tab and navigation slider on page load, and applies corner rounding if selected.
		$(document).ready(function () {
			sliderActivation(userOptions.activateType);
			cornerRounder(userOptions.roundedCorners);
			tabPositioner($slideTab);
			sliderPositioner($navSlider);
		});
		
		//Repositions the navigation slider if the window is resized.	
		$(window).resize(function () {
			sliderPositioner($navSlider);
		});

		return this;
	}
})(jQuery);