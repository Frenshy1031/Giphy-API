
$(document).ready(function() {
  
function clearAll() {
  $("#displayDiv").removeClass("d-none");
  $("#infoBar").empty();
  $("#instText").empty();
  $("#giphyDisplay").empty(); 
  $("#otherButton").empty();
  $("#otherButton").show();
  $("#giphyDisplayMore").empty();
  $("#button").empty();
  $("#button").show();
  $("#giphyToggleButton").empty();
  $("#endButton").empty();
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
function displayFirstRow (obj, userSearchName) {
  for (var i = 0; i < 4; i++) {
      var topDiv = $("<div>").addClass("col-md-3");
      var giphyDiv = $("<div>").addClass("thumbnail");

      var caption = $("<div>").addClass("caption text-white roundfont");
      var rating = obj[i].rating.toUpperCase();
      var ratingText = $("<p>").text("Rating: " + rating);
       var title = obj[i].title;
      var titleText = $("<p>").text("Title: " + title);
      caption.prepend(ratingText);
      caption.prepend(titleText);

      var giphyImage = $("<img>").addClass(".img-fluid rounded gifToggleOne");
      giphyImage.attr("src", obj[i].images.fixed_width_still.url);
      giphyImage.attr("url-moving", obj[i].images.fixed_width.url);
      giphyImage.attr("url-still", obj[i].images.fixed_width_still.url);
      giphyImage.attr("isgiphymoving", "nope");

      giphyDiv.prepend(caption);
      giphyDiv.prepend(giphyImage);

      topDiv.prepend(giphyDiv);
      $("#giphyDisplay").prepend(topDiv);
      }
      console.log("first row of GIFs displayed!");

      // toggle GIF animations....
      $(".gifToggleOne").on("click", function() {
        var motion = $(this).attr("isgiphymoving");
        console.log(`GIF first row clicked, isGifmoving: ${motion}`);
        if (motion === "nope") {
        $(this).attr("src", $(this).attr("url-moving"));
        $(this).attr("isgiphymoving", "Y");
        console.log(`Changed GIPHY to moving`);
        } 
        if (motion === "Y") {
        $(this).attr("src", $(this).attr("url-still"));
        $(this).attr("isgiphymoving", "nope");
        console.log(`Changed GIF to still`);
    }
      });  

      var otherButton = $("<div>").addClass("btn btn-outline-success");
      var moreText = $("<span>").text(`Show more GIFs of "${userSearchName}"!!!`);
      otherButton.prepend(moreText);
      $("#otherButton").prepend(otherButton);
}

function displaySecondRow (thingy, usrSrchNm) {
  $("#otherButton").hide('slow');
  $("#giphyDisplayMore").empty();
  $("#button").empty();
  $("#button").show();
  $("#giphyToggleButton").empty();
  $("#endButton").empty();
    
  for (var i = 4; i < 12; i++) {

    var topDiv = $("<div>").addClass("col-md-3");
    var giphyDiv = $("<div>").addClass("thumbnail");

    var caption = $("<div>").addClass("caption text-white roundfont");

    var rating = thingy[i].rating.toUpperCase();

    var ratingText = $("<p>").text("Rating: " + rating);

    var title = thingy[i].title;

    var titleText = $("<p>").text("Title: " + title);

    caption.prepend(ratingText);
    caption.prepend(titleText);

    var giphyImage = $("<img>").addClass(".img-fluid rounded giphyToggleTwo");
    giphyImage.attr("src", thingy[i].images.fixed_width_still.url);
    giphyImage.attr("url-moving", thingy[i].images.fixed_width.url);
    giphyImage.attr("url-still", thingy[i].images.fixed_width_still.url);
    giphyImage.attr("isgiphymoving", "nope");

    giphyDiv.prepend(caption);
    giphyDiv.prepend(giphyImage);

    topDiv.prepend(giphyDiv);
    $("#giphyDisplayMore").prepend(topDiv);
  }

  $(".giphyToggleTwo").on("click", function() {
    var motion = $(this).attr("isgiphymoving");
    console.log(`GIF row 2 clicked, isGifmoving: ${motion}`);
    if (motion === "nope") {
        $(this).attr("src", $(this).attr("url-moving"));
        $(this).attr("isgiphymoving", "yeah");
        console.log(`Changed GIF to moving`);
        } 
        if (motion === "yeah") {
        $(this).attr("src", $(this).attr("url-still"));
        $(this).attr("isgiphymoving", "nope");
        console.log(`Changed GIF to still`);
    }
  });  

  var button = $("<div>").addClass("btn btn-outline-warning btn-lg btn-block px-4 my-2 my-sm-0 vgfont");
  button.prepend(masText);
  $("#button").prepend(button);
}

function displayThirdRow(theObj, userSubmit) {
  $("#button").hide('slow');
  $("#giphyToggleButton").empty();
  $("#endButton").empty();

  $(".gifToggleTres").on("click", function() {
    var motion = $(this).attr("isgiphymoving");
    console.log(`GIF row 3 clicked, isGifmoving: ${motion}`);
    if (motion === "nope") {
        $(this).attr("src", $(this).attr("url-moving"));
        $(this).attr("isgiphymoving", "yeah");
        console.log(`Changed GIF to moving`);
        } 
        if (motion === "yeah") {
        $(this).attr("src", $(this).attr("url-still"));
        $(this).attr("isgiphymoving", "nope");
        console.log(`Changed GIF to still`);
    }
  });  

  endButton.prepend(endText);
  endButton.append(kitteh);
  $("#endButton").prepend(endButton);
}

$("#userSubmit").on("click", function(e) {
    e.preventDefault();
    var topic = $("#userTopic").val().trim();

    $('#buttonDtext').addClass("d-none");
    var newButton = $("<button>").addClass("btn btn-outline-success vgfont giphybutton my-3 mx-4");
    newButton.attr("type","button");
    newButton.attr("data-topic",topic);
    newButton.text(topic);
    console.log("newButton is: " + newButton);
    $("#buttonDisplay").prepend(newButton);


    $(".giphybutton").on("click", function() {
      var giphyTarget = $(this).attr("data-topic");
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Y4qlZyj6iyGpwyb1dBVgeqPg87J8D8Zd&q=" +
        giphyTarget + "&limit=30&lang=en";
      console.log("queryURL: " + queryURL);
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {

          clearAll();

          var results = response.data;
          var infoText = $("<h2>").addClass("text-white").text(`Here are GIFs of "${giphyTarget}":`);
          var instText = $("<h6>").addClass("text-secondary").text(`Click on each GIF to toggle animations!`);
           var brk = $("<br>");
          $("#infoBar").append(infoText);
          $("#infoBar").append(brk);
          $("#instText").append(instText);

          displayFirstRow(results, giphyTarget);
              
          $("#otherButton").on("click", function() {
            displaySecondRow(results,giphyTarget);        
          });

          $("#button").on("click", function() {
            displayThirdRow(results,giphyTarget);
          });          

          $("#endButton").on("click", function() {
            $("#popz").modal('show');



          });          
      });
    });
});



});