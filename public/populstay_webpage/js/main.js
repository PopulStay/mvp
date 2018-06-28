window.onload = function () {
  $('.loading').addClass('hidden');

  $("#submit").click(function(){
  	var Email = $("#Email").val()
  	var subject = $("#Address").val()
    var text = $("#Message").val()
    var name = $("#Name").val()
  	var telephone = $("#Phone").val()
  	
  	$.post("https://server.populstay.com/emailsender",
  	{
  	  from:Email,
  	  to:'walter@populstay.com',
  	  subject:subject,
  	  text:text,
      telephone:telephone,
      name:name
  	});

  })

  $("#subscribeSubmit").click(function(){
    var Email = $("#SIGNUP_email").val()
    var SIGNUP_json = {'email':Email}
    $.post("https://server.populstay.com/generaldata",
    {
      code:'001',
      generalData:SIGNUP_json
    });

  })
};