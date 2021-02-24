$('.services__slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1335,
      settings: {
        arrows: false,
      }
    }, {
      breakpoint: 1050,
      settings: {
        arrows: false,
        slidesToShow: 3,
      }
    }, {
      breakpoint: 760,
      settings: {
        arrows: false,
        slidesToShow: 2
      }
    },{
      breakpoint: 520,
      settings: {
        arrows: false,
        slidesToShow: 1
      }
    }
  ]
})


$('.personal__specialist').on('click', function () {
  $(this).toggleClass('block').next().slideToggle(500)
})

$('.burger').on('click', function () {
  $('.burger').toggleClass('active')
  $('.burger__menu').toggleClass('menu__active')
  $('body').toggleClass('lock')
})

