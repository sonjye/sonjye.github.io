
/********** modal 가운데 띄우기 & 닫기 클릭시 모달 닫기 ***********/
/* 팝업 Open 버튼 클릭 시 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정 */     
var modalLocation = function () {
    $(".modalWrap").css({
        "top": (($(window).height() - $(".modalWrap").outerHeight()) / 2 + $(
            window).scrollTop()) + "px",
        "left": (($(window).width() - $(".modalWrap").outerWidth()) / 2 + $(
            window).scrollLeft()) + "px"
    });      
};


/* 모달 on & 옵션 */
var modalOn = function () {
  /* modalDim 태그 추가 */
  $(".wrapper").prepend("<div class='modalDim'></div>");
    /* 팝업 display block */
  $(".modalWrap").css("display", "block");
  /* html 스크롤바 없애기 */
  $("html").css("overflow", "hidden");   
}; 


/* 모달 off & 옵션 */
var modalOff = function () {
  var modalCloseBtn = $(".modalWrap .modalTitle button.close"); 
  $(modalCloseBtn).click(function (event) {
  /* 팝업창 뒷배경 display none */
    $(".modalDim").remove();
    /* 팝업창 display none */
    $(".modalWrap").css("display", "none");
    /* html 스크롤바 생성 */
    $("html").css("overflow", "auto");
  }); 
};


var modalTotal = function() {
  var modalOpen = $("#modalOpen");
   $(modalOpen).click(function (e) {
      modalLocation();
      modalOn();
      modalOff();
  });
};

$(function () {
  modalTotal();
});

