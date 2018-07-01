window.onload = function () {
  $('.loading').addClass('hidden');
  if(userLanguage == 'zh-CN'){
    
  }
};

function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
}

function isValidPhoneNumber(phoneNumber) {
  var pattern = new RegExp("^[0-9]*$");
  return pattern.test(phoneNumber);
}

$(function() {
  var userLanguage = getCookie("userLanguage");
  // Hide the loading if time exceeds 20 seconds
  var loading = setTimeout(function(){
    if (!$('.loading').hasClass('hidden')) {
      $('.loading').addClass('hidden');
      clearTimeout(loading);
    }
  }, 20000);

  $('#subscribeSubmit').on('click', function() {
    var inputValue = $('#subscribeEmail').val();

    $('.subscribe__email-validate-error').remove();

    if (!inputValue || inputValue === '') {
      if(userLanguage == 'zh-CN'){
        $('#subscribeEmail').after('<span class="subscribe__email-validate-error">邮箱为空，请输入！ </span>');
      }else{
        $('#subscribeEmail').after('<span class="subscribe__email-validate-error">Mailbox is empty, please enter! </span>');
      }
    } else if (!isValidEmailAddress(inputValue)) {
      $('#subscribeEmail').focus();
      $('#subscribeEmail').focus();
      if(userLanguage == 'zh-CN'){
        $('#subscribeEmail').after('<span class="subscribe__email-validate-error">邮箱格式错误，请重新输入！</span>');
      }else{
        $('#subscribeEmail').after('<span class="subscribe__email-validate-error">Mailbox format error, please re-enter! </span>');
      }
    }else{
      $.post("https://server.populstay.com/generaldata",
      {
        code:'001',
        generalData:$('#subscribeEmail').val()
      });
      $("#prompt").show();
      $("#subscribeEmail").val("");
    }
  });

  $('#contactSubmit').on('click', function() {
    var $parent = $(this).parent();
    var _inputs = $('.contact-us :input');

    var errorMsg = '';

    $parent.find(".formtips").remove();


    // Validate contact name
    if( _inputs.is('#contactName')){
      var _this = $('#contactName');

      if(!_this.val() || _this.val() === ''){
        if(userLanguage == 'zh-CN'){
          errorMsg = '请输入名称.';
        }else{
          errorMsg = 'Please enter the name.';
        }
        $('#contactName').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
      }
    }

    // Validate contact phone
    if(_inputs.is('#contactPhone')){
      var _this = $('#contactPhone');

      if(!_this.val() || _this.val() === ''){
        if(userLanguage == 'zh-CN'){
          errorMsg = '请输入联系电话.';
        }else{
          errorMsg = 'Please enter the contact phone.';
        }
      } else if (!isValidPhoneNumber(_this.val())) {
        if(userLanguage == 'zh-CN'){
          errorMsg = '联系电话应该是号码.';
        }else{
          errorMsg = 'The contact phone should be number.';
        }
      }

      $('#contactPhone').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
    }

    // Validate contact email
    if(_inputs.is('#contactEmail')){
      var _this = $('#contactEmail');

      if(!_this.val() || _this.val() === ''){
        if(userLanguage == 'zh-CN'){
          errorMsg = '请输入联系电子邮件.';
        }else{
          errorMsg = 'Please enter the contact email.';
        }
      } else if (!isValidEmailAddress(_this.val())) {
        if(userLanguage == 'zh-CN'){
          errorMsg = '请输入正确的邮箱.';
        }else{
          errorMsg = 'Please enter correct mailbox.';
        }
      }

      $('#contactEmail').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
    }

     // Validate contact address
     if( _inputs.is('#contactAddress')){
      var _this = $('#contactAddress');

      if(!_this.val() || _this.val() === ''){
        if(userLanguage == 'zh-CN'){
          errorMsg = '请输入联系地址.';
        }else{
          errorMsg = 'Please enter the contact address.';
        }
        $('#contactAddress').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
      }
    }

    // Validate contact message
    var message = $('#contactMessage');
    if(!message.val() || message.val() === ''){
      if(userLanguage == 'zh-CN'){
        errorMsg = '请输入联系信息.';
      }else{
        errorMsg = 'Please enter the contact message.';
      }
      $('#contactMessage').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
    }

    if (errorMsg) {
      return false;
    }
    if(!errorMsg){
      $.post("https://server.populstay.com/emailsender",
      {
        from:$("#contactEmail").val(),
        to:'walter@populstay.com',
        subject:$("#contactAddress").val(),
        text:$("#contactMessage").val(),
        telephone:$("#contactPhone").val(),
        name:$("#contactName").val()
      });
      $("#prompt").show();
      $("#contactEmail").val("")
      $("#contactAddress").val("")
      $("#contactMessage").val("")
      $("#contactPhone").val("")
      $("#contactName").val("")
    }
  });
  $("#prompt button").click(function(){
    $("#prompt").hide()
  })
});