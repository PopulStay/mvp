window.onload = function () {
  $('.loading').addClass('hidden');

  $("#submit").click(function(){
  	var from = $("#from").val()
  	var to = $("#to").val()
  	var subject = $("#subject").val()
  	var text = $("#text").val()
  	
	$.post("https://server.populstay.com/emailsender",
	{
	  from:from,
	  to:to,
	  subject:subject,
	  text:text
	});

  })
};