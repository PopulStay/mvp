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
	  from:'walter@populstay.com',
	  to:Email,
	  subject:subject,
	  text:text,
    telephone:telephone,
    name:name
	});

  })
};