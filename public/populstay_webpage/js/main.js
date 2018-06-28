window.onload = function () {
  $('.loading').addClass('hidden');

  $("#submit").click(function(){
  	var Email = $("#Email").val()
  	var subject = $("#Address").val()
    var text = $("#Message").val()
    var name = $("#Name").val()
  	var telephone = $("#Phone").val()
    if(Email != "" && subject != "" && text != "" && name != "" && telephone != ""){
      $("#submit").attr("disabled",false);
    	$.post("https://server.populstay.com/emailsender",
    	{
    	  from:Email,
    	  to:'walter@populstay.com',
    	  subject:subject,
    	  text:text,
        telephone:telephone,
        name:name
    	});
      alert("发送成功");
      $("#Email").val("")
      $("#Address").val("")
      $("#Message").val("")
      $("#Name").val("")
      $("#Phone").val("")
    }else{
      $("#submit").attr("disabled", true);
      alert("请完善信息")
    }
    


  })

  $("#subscribeSubmit").click(function(){
    var Email = $("#SIGNUP_email").val()
    if(Email != ""){
      $("#subscribeSubmit").attr("disabled",false);
      var SIGNUP_json = {'email':Email}
      $.post("https://server.populstay.com/generaldata",
      {
        code:'001',
        generalData:SIGNUP_json
      });
      alert("发送成功");
      $("#SIGNUP_email").val("");
    }else{
      $("#subscribeSubmit").attr("disabled", true);
      alert("请完善信息");
    }

  })
};