//= require vendor/jquery.placeholder

ready = function() {

  $.fn.fitSlideHeight();
  $('input, textarea').placeholder();

  window.addEventListener('resize', function(event){
    $.fn.fitSlideHeight();
  });
};






$(document).ready(ready);
$.fn.fitSlideHeight = function(){
  $('#home, #contact, #project, #about-me').height($(window).height());
};