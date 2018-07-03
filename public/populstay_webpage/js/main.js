window.onload = function () {
  var userLanguage = getCookie("userLanguage");
  $('.loading').addClass('hidden');
  if(userLanguage == 'zh-CN'){
    $(".contact-us__title").attr('src','./img/contact-us-title-zh.png');
    $(".communication .col-5:first-child").addClass("communication__pic_zh");
    $(".contact-us__submit img").attr('src','./img/contact-us-send-zh.png');
    $(".footer__copyright-title").attr('src','./img/footer-title-zh.png');
    $(".footer__copyright-logo").hide()
    $(".product__title-img").attr('src','./img/product-title-zh.png');
    $(".product__subtitle-img").attr('src','./img/product-subtitle-zh.png');
    $(".platform__title").attr('src','./img/platform-title-zh.png');
    $(".machine__title-img").attr('src','./img/machine-title-zh.png');
    $(".intro__team-title").attr('src','./img/team-title-zh.png');
    $(".intro__partner-title").attr('src','./img/parternship-title-zh.png');
    $(".road-map__title").attr('src','./img/road-map-title-zh.png');
    $(".news .container").addClass("new_container");
    $(".organization__title").attr('src','./img/organization-title-zh.png');
    $(".contact-us__title").attr('src','./img/contact-us-title-zh.png');
    $(".header-demo-button").attr('src','./img/header-demo-button-zh.png');
    $(".communication__title-img").attr('src','./img/communication-title-zh.png');
    $(".lock-design__process:even").addClass('lock-design__process_zh_s');
    $(".lock-design__process:odd").addClass('lock-design__process_zh');
    $(".lock-design__intro~.lock-design__intro .lock-design__locker:after").addClass('lock-design__intro_zh');
    $(".lock-design li.lock-design__avatar:odd").append("<p>房客</p>");
    $(".lock-design li.lock-design__avatar:even").append("<p>房东</p>");
    $(".lock-design__locker1").append('<img class="img1" src="img/lock-design-smarter-zh.png" />');
    $(".h3_subtitle").hide()
    if(document.body.clientWidth >= 768){
      $(".road-map__content").addClass("road-map__content_zh");
    }else{
      $(".road-map__content").addClass("road-map__content_zh_s");
    }
    $(".organization__title").attr('src','./img/organization-title-zh.png');
    $(".contact-us__title").attr('src','./img/contact-us-title-zh.png');
  }else{
    $(".contact-us__title").attr('src','./img/contact-us-title.png');
    $(".communication .col-5:first-child").removeClass("communication__pic_zh");
    $(".contact-us__submit img").attr('src','./img/contact-us-send.png');
    $(".footer__copyright-title").attr('src','./img/footer-title.png');
    $(".footer__copyright-logo").show()
    $(".product__title-img").attr('src','./img/product-title.png');
    $(".product__subtitle-img").attr('src','./img/product-subtitle.png');
    $(".platform__title").attr('src','./img/platform-title.png');
    $(".machine__title-img").attr('src','./img/machine-title.png');
    $(".intro__team-title").attr('src','./img/team-title.png');
    $(".intro__partner-title").attr('src','./img/parternship-title.png');
    $(".road-map__title").attr('src','./img/road-map-title.png');
    $(".header-demo-button").attr('src','./img/header-demo-button.png');
    $(".communication__title-img").attr('src','./img/communication-title.png');
    $(".lock-design li.lock-design__avatar:odd").append("<p>Guest</p>");
    $(".lock-design li.lock-design__avatar:even").append("<p>Host</p>");
    $(".lock-design__process:even").removeClass('lock-design__process_zh_s');
    $(".lock-design__process:odd").removeClass('lock-design__process_zh');
    $(".lock-design__intro~.lock-design__intro .lock-design__locker:after").removeClass('lock-design__intro_zh');
    $(".lock-design__locker1").append('<img class="img2" src="img/lock-design-smarter.png" />');
    $(".h3_subtitle").show()
    if(document.body.clientWidth >= 768){
      $(".road-map__content").removeClass("road-map__content_zh");
    }else{
      $(".road-map__content").removeClass("road-map__content_zh_s");
    }
    $(".organization__title").attr('src','./img/organization-title.png');
    $(".contact-us__title").attr('src','./img/contact-us-title.png');
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

    var errorMsgName = '';
    var errorMsgPhone = '';
    var errorMsgEmail = '';
    var errorMsgAddress = '';
    var errorMsgMessage = '';

    $parent.find(".formtips").remove();


    // Validate contact name
    if( _inputs.is('#contactName')){
      var _this = $('#contactName');

      if(!_this.val() || _this.val() === ''){
        if(userLanguage == 'zh-CN'){
          errorMsgName = '请输入名称.';
        }else{
          errorMsgName = 'Please enter the name.';
        }
        $('#contactName').parent().append('<span class="formtips onError">'+errorMsgName+'</span>');
      }
    }

    // Validate contact phone
    if(_inputs.is('#contactPhone')){
      var _this = $('#contactPhone');

      if(!_this.val() || _this.val() === ''){
        if(userLanguage == 'zh-CN'){
          errorMsgPhone = '请输入联系电话.';
        }else{
          errorMsgPhone = 'Please enter the contact phone.';
        }
      } else if (!isValidPhoneNumber(_this.val())) {
        if(userLanguage == 'zh-CN'){
          errorMsgPhone = '联系电话应该是号码.';
        }else{
          errorMsgPhone = 'The contact phone should be number.';
        }
      }

      $('#contactPhone').parent().append('<span class="formtips onError">'+errorMsgPhone+'</span>');
    }

    // Validate contact email
    if(_inputs.is('#contactEmail')){
      var _this = $('#contactEmail');

      if(!_this.val() || _this.val() === ''){
        if(userLanguage == 'zh-CN'){
          errorMsgEmail = '请输入联系电子邮件.';
        }else{
          errorMsgEmail = 'Please enter the contact email.';
        }
      } else if (!isValidEmailAddress(_this.val())) {
        if(userLanguage == 'zh-CN'){
          errorMsgEmail = '请输入正确的邮箱.';
        }else{
          errorMsgEmail = 'Please enter correct mailbox.';
        }
      }

      $('#contactEmail').parent().append('<span class="formtips onError">'+errorMsgEmail+'</span>');
    }

     // Validate contact address
     if( _inputs.is('#contactAddress')){
      var _this = $('#contactAddress');

      if(!_this.val() || _this.val() === ''){
        if(userLanguage == 'zh-CN'){
          errorMsgAddress = '请输入联系地址.';
        }else{
          errorMsgAddress = 'Please enter the contact address.';
        }
        $('#contactAddress').parent().append('<span class="formtips onError">'+errorMsgAddress+'</span>');
      }
    }

    // Validate contact message
    var message = $('#contactMessage');
    if(!message.val() || message.val() === ''){
      if(userLanguage == 'zh-CN'){
        errorMsgMessage = '请输入联系信息.';
      }else{
        errorMsgMessage = 'Please enter the contact message.';
      }
      $('#contactMessage').parent().append('<span class="formtips onError">'+errorMsgMessage+'</span>');
    }

    if (errorMsgName&&errorMsgPhone&&errorMsgEmail&&errorMsgAddress&&errorMsgMessage) {
      return false;
    }
    if(!errorMsgName&&!errorMsgPhone&&!errorMsgEmail&&!errorMsgAddress&&!errorMsgMessage){
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