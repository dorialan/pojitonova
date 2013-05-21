var $checkScroll = true
var $apiKey = '15c7ee8b682dbd8fa9fb3fce13dab3a0'
var $perPage = 15
var $page = 0
var $current_page = 1
var $pages = 2

$(document).ready(function(){				
  getPhotoset();
});

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

$(window).scroll(function () {
    var scrollPos = $(this).scrollTop() + $(window).height();
  if($checkScroll == true) {
    if (scrollPos > ($(document).height()-50)) {
      $checkScroll = false;
      if ($page < $pages) {
        $('#loading').show();
        getPhotoset();
      }
    }
  }
});

function getPhotoset() {
  var fURL = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+$apiKey+"&photoset_id=72157633574199906&per_page="+$perPage+"&page="+$current_page+"&media=photos&format=json&jsoncallback=?"

  $.getJSON(fURL, displayImages);

  	function displayImages(data) {			
      	
      $current_page++;																											   
      var photoset = data.photoset
      var htmlString = ""; 
      $page = parseInt(photoset.page)
      $pages = parseInt(photoset.pages)
    
  
      // Now start cycling through our array of Flickr photo details
      $.each(photoset.photo, function(i, ph){
                            
        var sourceMedium = "http://farm"+ph.farm+".staticflickr.com/"+ph.server+"/"+ph.id+"_"+ph.secret+".jpg"      
        var sourceLarge = "http://farm"+ph.farm+".staticflickr.com/"+ph.server+"/"+ph.id+"_"+ph.secret+"_c.jpg"   

        htmlString += '<div class="photo"><a href="' + sourceLarge + '" rel="lightbox[set]">';
        htmlString += '<img src="' + sourceMedium + '" alt="' + ph.title + '" title="' + ph.title + '"/>';
        htmlString += '</a></div>';
      });        
    
    $('#loading').hide();
    $checkScroll = true;
  
    var $container = $('#gallery');
    
    if ($page > 1) {
      $photos = $(htmlString);
      $container.append($photos);
      
      $container.imagesLoaded(function(){
        $container.masonry('appended', $photos);
      });
    } else {
      $container.append(htmlString);

      $container.imagesLoaded(function(){
        $container.masonry({
          itemSelector : '.photo',
        });
      
      });
    }
    
	// Close down the JSON function call
	}
}