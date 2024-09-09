/*
File  : ui.js
Date  : 2024.09.05
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



//* common */
$(function () {
  modalOpen();
  clickOff();
});

