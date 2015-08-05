$.Class({
  namespace: "BCI.scrollTo",
  options: {
    selector: "#menu a[href*=#]"
  },
  initialize: function (options) {
    $(this.options.selector).on('click', function(e){
      var anchor = $(this).attr('href');

      if(anchor.length > 0) {
        if (anchor.match("^#")) {
          e.preventDefault();
        }

        $('html,body').animate({
          scrollTop: $(anchor).position().top
        });
      }
    });
  }
});