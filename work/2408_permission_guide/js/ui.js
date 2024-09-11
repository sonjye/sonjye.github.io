/*
File  : ui.js
Date  : 2024.09.11
menu  : 공통 js
*/


//* modalOpen */
var modalOpen = function(){
  $('.modalOpen').click(function(){
        $('#'+$(this).data("popname")+'').addClass('modalOn');
        $("html").css("overflow", "hidden"); 
    }); 
    $('.modalClose, .modalDim').click(function(){
        $(this).parents('.modalWrap').removeClass('modalOn');  
        $("html").css("overflow", "auto");
    }); 
};

//* click 막기 */
var clickOff = function (){
  var clickOff = ('.clickOff');
  $(clickOff).off("click");
};



//* bubbleBox */
var bubbleBox = function() {
  var $footer = $('footer'); 
  var $btnClose = $('.bubbleBox button.close');

  // footer 클릭 시 display: block인 bubbleBox를 숨깁니다.
  $footer.on('click', function(event) {
    // footer 내의 모든 .bubbleBox 검사
    $footer.find('.bubbleBox').each(function() {
       var display = $(this).css('display'); // 요소의 display 속성 값을 가져옵니다.
       if (display === 'block' || display === 'flex') {
        $(this).css('display', 'none');
      }
    });
    // 이벤트 전파를 막아, 문서의 다른 클릭 이벤트와 충돌하지 않도록 합니다.
    event.stopPropagation();
  });

  // 닫기 버튼 클릭 시 해당 bubbleBox 요소를 숨깁니다.
  $btnClose.on('click', function(event) {
    $(this).closest('.bubbleBox').css('display', 'none');
    // 이벤트 전파를 막아, 문서의 다른 클릭 이벤트와 충돌하지 않도록 합니다.
    event.stopPropagation();
  });
};


//* common */
$(function () {
  modalOpen();
  clickOff();
  bubbleBox();
});

