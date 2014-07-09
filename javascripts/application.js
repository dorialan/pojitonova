var $checkScroll = true
var $apiKey = 'c0e13fd8d5032090750a6356925d6698'
var $perPage = 100
var $page = 0
var $current_page = 1
var $pages = 2
var $photosets = ["72157634865788304", "72157634324909907", "72157634326612852", "72157634319585569"]
var $photoset = "72157634326612852"

$(document).ready(function(){		
  if (location.search) {
      var parts = location.search.substring(1).split('?');
      $photoset = parts[0];
  } 
  
  if ($("a.current").length == 0) {
    $("li#" + $photoset + " a").addClass("current");
    getPhotoset();
  }
  
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
  var fURL = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+$apiKey+"&photoset_id="+$photoset+"&per_page="+$perPage+"&page="+$current_page+"&media=photos&format=json&jsoncallback=?"

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

        htmlString += '<div class="photo photo-'+ $page +' style="display:none;"><a href="' + sourceLarge + '" rel="lightbox[set]">';
        htmlString += '<img src="' + sourceMedium + '" alt="' + ph.title + '" title="' + ph.title + '"/>';
        htmlString += '</a></div>';
      });        
    
    
    $checkScroll = true;
  
    var $container = $('#gallery');
    
    if ($page > 1) {
      $photos = $(htmlString);
      $container.append($photos);
      
      $container.imagesLoaded(function(){
        $('#loading').hide();
        $('.photo-'+ $page).show();
        $container.masonry('appended', $photos);
      });
    } else {
      $container.append(htmlString);

      $container.imagesLoaded(function(){
        $('#loading').hide();
        $('.photo-'+ $page).show();
        $container.masonry({
          itemSelector : '.photo',
        });
      
      });
    }
    
	// Close down the JSON function call
	}
}