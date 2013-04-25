$(function(){
  // Mobile navigation expander
  $(".mobile-navigation .current").click(function(e){
    e.preventDefault();
    $(".mobile-navigation").toggleClass("expanded");
  });

  // Accordion expander
  $(".accordion .item a").click(function(e){
    e.preventDefault();
    $(".accordion .item").removeClass("current");
    $(e.target).closest(".item").addClass("current");
  });
});