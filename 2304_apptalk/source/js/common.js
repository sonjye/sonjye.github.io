/* navigation */
var navigation = function(){
  var navigation = $("header nav.gnb li")
    $(navigation).click(function (e) {
    $(this).closest(".gnb").find("li").removeClass("on");
    $(this).addClass("on");
    });
};

/* swiper */
var swiper = function () {
     var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 15,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        type:'bullets',
      },
      pagination:false,
      freeMode:false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    var appendNumber = 4;
    var prependNumber = 1;
    document
      .querySelector(".prepend-2-slides")
      .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.prependSlide([
          '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
          '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
        ]);
      });
    document
      .querySelector(".prepend-slide")
      .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.prependSlide(
          '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
        );
      });
    document
      .querySelector(".append-slide")
      .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.appendSlide(
          '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
        );
      });
    document
      .querySelector(".append-2-slides")
      .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.appendSlide([
          '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
          '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
        ]);
      });
};


$(function () {
  navigation();
  tab();
  // swiper();
});

