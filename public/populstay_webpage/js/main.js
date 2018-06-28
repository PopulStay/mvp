window.onload = function () {
  $('.loading').addClass('hidden');

  $("#submit").click(function(){
  	var Email = $("#Email").val()
  	var subject = $("#Address").val()
    var text = $("#Message").val()
    var name = $("#Name").val()
  	var telephone = $("#Phone").val()
    if(Email != "" && subject != "" && text != "" && name != "" && telephone != ""){
    	$.post("https://server.populstay.com/emailsender",
    	{
    	  from:Email,
    	  to:'walter@populstay.com',
    	  subject:subject,
    	  text:text,
        telephone:telephone,
        name:name
    	});
      $("#prompt").show();
      $("#prompt h3").html("Sent successfully")
      $("#Email").val("")
      $("#Address").val("")
      $("#Message").val("")
      $("#Name").val("")
      $("#Phone").val("")
    }else{
      $("#prompt").show();
      $("#prompt h3").html("Please fill in the information")
    }
    


  })

  $("#subscribeSubmit").click(function(){
    var Email = $("#SIGNUP_email").val()
    if(Email != ""){
      var SIGNUP_json = {'email':Email}
      $.post("https://server.populstay.com/generaldata",
      {
        code:'001',
        generalData:SIGNUP_json
      });
      $("#prompt").show();
      $("#prompt h3").html("Sent successfully")
      $("#SIGNUP_email").val("");
    }else{
      $("#prompt").show();
      $("#prompt h3").html("Please fill in the information")
    }
  })

  $("#prompt button").click(function(){
    $("#prompt").hide()
  })
};