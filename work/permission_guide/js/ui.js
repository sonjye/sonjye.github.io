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

var tab = function () {
    var btn_tab = $(".tab li");

    $(btn_tab).click(function (e) {
    $(this).closest("section").find(".tab li").removeClass("on");

    var tabIndex = $(this).addClass("on").index();
    var tabListIndex = $(this).closest("section").find(".tabView > .tabList");
    $(tabListIndex).removeClass("show");
    $(tabListIndex).eq(tabIndex).addClass("show");
    });
};

// 공통 > data-ui="toggleList2" (멀티 토글)
var initToggleList = function () {

  var bindToggle = function (uiName, target, callback) {
    var $wrap = $('[data-ui="' + uiName + '"]');

    $wrap.off('click.toggle.' + uiName)
           .on('click.toggle.' + uiName, '[data-ui="' + target + '"]', function () {

      var $li = $(this).closest('li');

      callback($li, this);

    });
  };

  // .list 클릭하면 하나의 li에 .toggleOn 추가 > li 하나만 열림
  // toggleList3 : li 하나만 열리고 닫힘
  bindToggle('toggleList1', 'list', function ($li) {
    var isOn = $li.hasClass('toggleOn');

    // 전체 닫기
    $li.siblings().removeClass('toggleOn');

    // 자기 자신 토글
    if (isOn) {
      $li.removeClass('toggleOn');
    } else {
      $li.addClass('toggleOn');
    }
  });
};


// input:text 글자수 카운트
// input에  data-ui="countInput1" 글자 수 체크 후 data-ui="countText1" 의 span에 글자 수 입력하고 글자 수 초과시  data-ui="countError1" 태그에 error 클래스 토글
var init_txtCount = function () {
    // 1. 선택자를 input과 textarea 모두 포함하도록 수정
    var targetSelector = 'input[data-ui*="countInput"], textarea[data-ui*="countInput"]';

    $(document).on('input', targetSelector, function() {
        var $this = $(this);
        var uiAttr = $this.attr('data-ui') || "";
        
        var suffix = uiAttr.replace('countInput', '').trim();

        if (suffix !== "") {
            var $wrapper = $('[data-ui="countError' + suffix + '"]');
            var $countBox = $('[data-ui="countText' + suffix + '"]');
            var $spans = $countBox.find('span');

            // .val().length는 textarea에서도 동일하게 작동합니다.
            var currentLength = $this.val().length;
            
            if ($spans.length >= 2) {
                $spans.eq(0).text(currentLength);
                
                var maxLengthText = $spans.eq(1).text().replace(/[^0-9]/g, '');
                var maxLength = parseInt(maxLengthText);

                if (currentLength > maxLength) {
                    $wrapper.addClass('error');
                } else {
                    $wrapper.removeClass('error');
                }
            }
        }
    });

    // 2. 초기 실행 시에도 모든 대상(input, textarea)을 찾도록 수정
    $(targetSelector).each(function() {
        $(this).trigger('input');
    });
};




//* common */
$(function () {
  modalOpen();
  clickOff();
  bubbleBox();
  tab();
  init_txtCount();
  initToggleList();
});

