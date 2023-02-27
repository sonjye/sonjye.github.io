/* 로그인 input 아이콘 토글 */
var iconToggle = function () {
  var loginInput = $(".sec_login input");
    $(loginInput).on('focusin', function () {
        $(this).parent(".input").addClass('focus');
    }).on('focusout', function () {
         $(this).parent(".input").removeClass('focus');
    });
};


/* 로그인 input 아이콘 토글 */
var dv_selectBox = function () {
  var selectBox = $("div.selectBox > div");
  var selectBoxPickText = $("div.selectBox > div > p");
  var selectBoxList = $("div.selectBox > ul > li");
    /* selectBox slideToggle */
    $(selectBox).on('click', function () {
        $(this).next("ul").slideToggle(300);
    });
    /* li 선택시 p태그에 text 입력 &, ul태그 slideUp  */
    $(selectBoxList).on('click',function () {
        var selectBoxListPick = $(this).html();
        $(selectBoxPickText).html(selectBoxListPick);
        $(this).parent("ul").slideUp(300);
    });
};



$(function () {
  iconToggle();
  dv_selectBox();
});

