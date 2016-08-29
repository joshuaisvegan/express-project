var submit = $("button");
var inputField = $("input");
var menuType = $("select");
var listContainer = $("#listContainer");
var selectType;
var inputFieldVal;

submit.on('click', function(){
    inputFieldVal = inputField.val();
    selectType = menuType.val();

    $.ajax({
      url: "https://api.spotify.com/v1/search",
      data: {
            q: encodeURIComponent(inputFieldVal),
            type: selectType
        },
      success: insertHTML
    });
});

function insertHTML(artistInfo){

    var items;
    if (selectType == "artist"){
        items = artistInfo.artists.items;
    }
    if (selectType == "album"){
        items = artistInfo.albums.items;

    }
    for (var i = 0; i < items.length; i++){
        var artistName = items[i].name;
        var images = items[i].images;
        var outsideURL = items[i].external_urls.spotify;


        if (images.length >= 3){
            var imageURL = items[i].images[2].url;
            listContainer.append('<div class="results"> <img src=' + imageURL + ' >' + '<a href="' + outsideURL + '" class="title">' + artistName + '</a></div>');
        }
    }
    if (!items || !items.length){
        listContainer.prepend('<div id="none">No results</div>');
    }

    {
        listContainer.prepend('<div id="note">Results for '+ inputFieldVal + ' </div>');
    }
}
