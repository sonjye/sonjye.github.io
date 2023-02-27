
/* modal 가운데 띄우기 & 닫기 클릭시 모달 닫기 */
var modalTotal = function() {
  // $(document).ready(function () {
    var modalCloseBtn = $(".modalWrap .modalTitle button.close"); 
        /* 팝업 Open 버튼 클릭 시 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정 */     
          $(".modalWrap").css({
              "top": (($(window).height() - $(".modalWrap").outerHeight()) / 2 + $(
                  window).scrollTop()) + "px",
              "left": (($(window).width() - $(".modalWrap").outerWidth()) / 2 + $(
                  window).scrollLeft()) + "px"
             
          });      
          /* modalDim 태그 추가 */
          $(".wrapper").prepend("<div class='modalDim'></div>");
           /* 팝업 display block */
          $(".modalWrap").css("display", "block");
          /* html 스크롤바 없애기 */
          $("html").css("overflow", "hidden"); 
      // });
       /* modalDim 태그 추가 */
      $(modalCloseBtn).click(function (event) {
        /* 팝업창 뒷배경 display none */
         $(".modalDim").remove();
          /* 팝업창 display none */
          $(".modalWrap").css("display", "none");
          /* html 스크롤바 생성 */
          $("html").css("overflow", "auto");
      });

      /* 팝업 Open 버튼 클릭 시 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정 */     
      var modalLocation = function () {
          $(".modalWrap").css({
              "top": (($(window).height() - $(".modalWrap").outerHeight()) / 2 + $(
                  window).scrollTop()) + "px",
              "left": (($(window).width() - $(".modalWrap").outerWidth()) / 2 + $(
                  window).scrollLeft()) + "px"
             
          });      
      };

         var modalLocation = function () {
         /* 팝업 Open 버튼 클릭 시 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정 */     
          $(".modalWrap").css({
              "top": (($(window).height() - $(".modalWrap").outerHeight()) / 2 + $(
                  window).scrollTop()) + "px",
              "left": (($(window).width() - $(".modalWrap").outerWidth()) / 2 + $(
                  window).scrollLeft()) + "px"
             
          });      
      };
};

var modalLocationa = function() {  };

$(function () {
  modalTotal();
});

