// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  //console.log('Keepin\'n it clean with an external script!');
  var input_from_user = $(".flexsearch-input").after("<br><div class='ac-display'></div>");

  var outputdata = new Array();
  $.when(
    $.ajax({
    type: 'GET',
    dataType: 'JSON',
    url: 'http://www.mattbowytz.com/simple_api.json?data=all',
    success: function(data) {
    	$.when(
    		outputdata = outputdata.concat(data.data.interests),
    		outputdata = outputdata.concat(data.data.programming)
    	).then(function() {
		  	console.log(outputdata)
		  	console.log("success.");
		  }); //this closes when/then
		} //this closes success
  })//this closes the ajax call
  ).done(function() {

    $(".ac-display").html("");
    for(var i = 0; i < outputdata.length; i++) {
      $(".ac-display").append(outputdata[i] + "<br>");
    }

    input_from_user.on("keyup", function(event){
      var input = input_from_user.val().toUpperCase();
      var to_display = [];
      for(var i  = 0; i < outputdata.length; i++) {
        if(outputdata[i].toUpperCase().indexOf(input) != -1) {
          to_display.push(outputdata[i]);
        }
      }
      
      $(".ac-display").html("");
        for(i = 0; i < to_display.length; i++) {
          $(".ac-display").append(to_display[i] + "<br>");
        }
    });
  });	//end of when/then
})(); //this is the very last ending thing