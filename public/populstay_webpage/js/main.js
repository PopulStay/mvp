window.onload = function () {
  $('.loading').addClass('hidden');

  $("#submit").click(function(){
  	var Email = $("#Email").val()
  	var subject = $("#Address").val()
  	var text = $("#Message").val()
  	
	$.post("https://server.populstay.com/emailsender",
	{
	  from:'walter@populstay.com',
	  to:Email,
	  subject:subject,
	  text:text
	});

  })
};