window.onload = function () {
  $('.loading').addClass('hidden');
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
      $('#subscribeEmail').focus();
      $('#subscribeEmail').after('<span class="subscribe__email-validate-error">Mailbox is empty, please enter! </span>');
    } else if (!isValidEmailAddress(inputValue)) {
      $('#subscribeEmail').focus();
      $('#subscribeEmail').after('<span class="subscribe__email-validate-error">Mailbox format error, please re-enter! </span>');
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
        errorMsg = 'Please enter the name.';
        $('#contactName').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
      }
    }

    // Validate contact phone
    if(_inputs.is('#contactPhone')){
      var _this = $('#contactPhone');

      if(!_this.val() || _this.val() === ''){
        errorMsg = 'Please enter the contact phone.';
      } else if (!isValidPhoneNumber(_this.val())) {
        errorMsg = 'The contact phone should be number.';
      }

      $('#contactPhone').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
    }

    // Validate contact email
    if(_inputs.is('#contactEmail')){
      var _this = $('#contactEmail');

      if(!_this.val() || _this.val() === ''){
        errorMsg = 'Please enter the contact email.';
      } else if (!isValidEmailAddress(_this.val())) {
        errorMsg = 'Please enter correct mailbox.';
      }

      $('#contactEmail').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
    }

     // Validate contact address
     if( _inputs.is('#contactAddress')){
      var _this = $('#contactAddress');

      if(!_this.val() || _this.val() === ''){
        errorMsg = 'Please enter the contact address.';
        $('#contactAddress').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
      }
    }

    // Validate contact message
    var message = $('#contactMessage');
    if(!message.val() || message.val() === ''){
      errorMsg = 'Please enter the contact message.';
      $('#contactMessage').parent().append('<span class="formtips onError">'+errorMsg+'</span>');
    }

    if (errorMsg) {
      return false;
    }
  });
});