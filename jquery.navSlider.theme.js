// JavaScript for the navSlider demo theme

$(document).ready(function() { 
	$('.page').not('#home').hide();

	$('#onelink').click(function() {
		$('.active').removeClass('active').fadeOut(1500, function() {
			$('#page-one').addClass('active').fadeIn(1500);
		});
	});
		
	$('#twolink').click(function() {
		$('.active').removeClass('active').fadeOut(1500, function() {
			$('#page-two').addClass('active').fadeIn(1500);
		});
	});
	
	$('#threelink').click(function() {
		$('.active').removeClass('active').fadeOut(1500, function() {
			$('#page-three').addClass('active').fadeIn(1500);
		});
	});

	$('#fourlink').click(function() {
		$('.active').removeClass('active').fadeOut(1500, function() {
			$('#page-four').addClass('active').fadeIn(1500);
		});
	});
	
	$('#homelink').click(function() {
		$('.active').removeClass('active').fadeOut(1500, function() {
			$('#home').addClass('active').fadeIn(1500);
		});
	});

	$('nav a').click(function(){
		return false;
	}); 
});