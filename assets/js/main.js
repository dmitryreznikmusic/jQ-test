(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

})(jQuery);


// MENU
    $('.slicknav_btn').on('click',function(){
      $('.main-menu').toggle();
    });

    $('#closeMenu').on('click',function(){
      $('.main-menu').hide();
    });




// TABS
$('.nav-item').on('click',function(){
  // console.log(this);
  let currTab = $(this).index();
  // console.log(currTab);


  $('.nav-item').removeClass('active');
  $(this).addClass('active');

  $('.fade-show').removeClass('active');
  $('.fade-show').eq(currTab).addClass('active');
})
 

// PARALLAX 
const scene = $('#scene').get(0);
const parallaxInstance = new Parallax(scene);


// SLIDER
const mySwiper = new Swiper ('.swiper', {
  direction : 'horizontal',
  spaceBetween : 50,
  slidesPerView: 1,
  loop : true,
  stopOnLastSlide : false,
  autoplay : {
      delay: 2000
  }
})


// MODAL
$('.btn-open').on('click', function () {
  $('.wrapper-modal').fadeIn();

});

$('.form-book').on('click', function () {
  $('.wrapper-modal').fadeOut();
});

$('.overlay').on('click', function () {
  $('.wrapper-modal').fadeOut();
});

$('.form-book').children().on('click', function (e) {
  e.stopPropagation();
});


// VALIDATE


$.validator.addMethod("regex", function(value, element, regexp) {
  var regExsp = new RegExp(regexp);
  return regExsp.test(value);
},"Please check your input."
);


$(document).ready(function () {
  $('[data-submit]').on('click', function (e) {
    e.preventDefault();
    $(this).parent('form').submit();
  })
  $.validator.addMethod("regex", function (value, element, regexp) {
    const regExsp = new RegExp(regexp);
    return this.optional(element) || regExsp.test(value);
  }, "Please check your input.");


  function valEl(el) {
    el.validate({
      rules: {
        tel: {
          required: true,
          regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
        },
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        tel: {
          required: 'Must to fill this form',
          regex: 'Use only numbers and symbols + - ()'
        },
        name: {
          required: 'Please fill this form',
        },
        email: {
          required: 'Please fill this form',
          email: 'E-mail is not correct'
        }
      },



      submitHandler: function(form) {
        $('#preloader-active').fadeIn();
        const $form = $(form);
        const $formId = $(form).attr('id');
        switch ($formId) {
          case 'form-cover':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
              .always(function () {
                console.log('Always');
                setTimeout(function () {
                  $form.trigger('reset');
                  $('#preloader-active').fadeIn();
                }, 1100);
                setTimeout(function () {
                  $('#preloader-active').fadeOut();
                }, 1300);
              });
            break;
          case 'form-modal':
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize()
            })
              .always(function () {
                  console.log('Always');
                  setTimeout(function () {
                    $form.trigger('reset');
                    $('#preloader-active').fadeIn();
                  }, 1100);
                  setTimeout(function () {
                    $('#preloader-active').fadeOut();
                    $('.wrapper-modal').fadeOut();
                  }, 1300);
              });
            break;          
        }
        return false;
      }
    });
  }
  $('.js-form').each(function () {
    valEl($(this));
  });
});