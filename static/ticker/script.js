(function() {
  var ticker = $('#container');
  var n = 0;
  console.log('TICKAAAHHH!');
  $.ajax({
  url: "/tweets",
  success: insertHTML

});

var templates = document.querySelectorAll('script[type="text/handlebars"]');

Handlebars.templates = Handlebars.templates || {};

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

function transform(oldObject){
     var collectionBox = [];
     for(var oldURL in oldObject){
        var headlineObject = {
            link: oldURL,
            headline: oldObject[oldURL]
        }
        collectionBox.push(headlineObject);
     }
     return collectionBox;
}

function insertHTML(stories){
    stories = JSON.parse(stories);
    var headlineArray = transform(stories);
    console.log(headlineArray);
    var readyHTML = Handlebars.templates.links(headlineArray);
    document.getElementById('container').innerHTML = readyHTML;
    startAnimation();
}


function startAnimation(){

    animationFrameID = requestAnimationFrame(function anim() {
      n+= 1;
      if ( n < (ticker.width() - document.body.offsetWidth)) {
            ticker.css("transform", "translateX(" + -n + 'px)');
      } else {
            n =  document.body.offsetWidth;
      }


      animationFrameID = requestAnimationFrame(anim);


    });
}

    ticker.on('mouseenter', function(){
        cancelAnimationFrame(animationFrameID);
        console.log("MOUSE");
    });

    ticker.addEventListener
    ticker.on('mouseleave', startAnimation);

})();
