$(window).scroll(function() {
   if($(this).scrollTop()>100){
      $(".siteHeader").addClass("has-fixed");
      $('#header-logo').prop('src', 'assets/images/blueLogo.png');
    }
    else{
      $(".siteHeader").removeClass("has-fixed");
      $('#header-logo').prop('src', 'assets/images/whiteLogo.png');
   }
});
