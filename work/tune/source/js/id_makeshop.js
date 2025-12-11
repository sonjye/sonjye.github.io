/*
    File  : id_makeshop.js
    Date  : 2025.09.23
    menu  : 공통 js
*/


//* common  ==================================*/
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

var tune_makeshopComplete = function(){
  var tune_makeshop = $(".tune_makeshop");
  var btn_next = $(".tune_makeshop button.next");

  $(btn_next).click(function(){
    const className = $(this).closest(".tune_makeshop");

    $(this).parents('.tune_makeshop').removeClass('tune_makeshop')
   .addClass('tune_makeshopComplete');  
  });
};

var tune_makeshop = function(){
  const wrap = document.querySelector('.wrap');
  const btn = document.querySelector('.nextMove');

  btn.addEventListener('click', () => {
    wrap.classList.toggle('complete');
  })
};

/* 공통 */
$(function () {
  modalOpen();
});

/* 개별 */
$(function () {
  tune_makeshop(); // container 영역 움직임 (버튼.nextMove 이용)
});

