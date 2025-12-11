/*
    File  : ui3.js
    Date  : 2025.12.08
    menu  : 공통 js
*/


//* common */

//* Scroll, calendar Color 추가 */ 
var themeType = function () {
  var type = $(".wrap");
  
  type.each(function () {
    if ($(this).hasClass("typeB")) { 
      $(this).closest('html').addClass("themeB");
      
    } else if ($(this).hasClass("typeC")) {
      $(this).closest('html').addClass("themeC");
    }
  });
};

//* daterangepicker type 추가 */ 
var daterangepicker_type = function () {
  $(".wrap").each(function () {
    if ($(this).hasClass("typeB")) {
      $(this).closest("body").find(".daterangepicker").addClass("typeB");
    } else if ($(this).hasClass("typeC")) {
      $(this).closest("body").find(".daterangepicker").addClass("typeC");
    } 
  });
};

// 테마 변경 (스크롤, 달력)
var themeTypeToggle = function () {
  
  // 체크박스 클릭 하지 않아도 테마 클래스 입력되게 추가해야함 
  $(function () {
    themeType();
    daterangepicker_type();
  });

  // 테마변경 토글 선택시 테마 관련 클래스 교체
  var themeCheckbox = $('header .theme input[type="checkbox"]');
  themeCheckbox.click(function () {
    if ($(this).prop('checked')) {
      // typeB 제거, typeC 추가
      if ($(this).closest('.wrap').hasClass("typeB")) {
        $(this).closest('html').removeClass("themeB");
        $(this).closest('.wrap').removeClass("typeB");
        $(this).closest("body").find(".daterangepicker").removeClass("typeB");
        }
        $(this).closest('html').addClass("themeC");
        $(this).closest('.wrap').addClass("typeC");
        $(this).closest("body").find(".daterangepicker").addClass("typeC");
    } else {
      // typeC 제거, typeB 추가
      if ($(this).closest('.wrap').hasClass("typeC")) {
        $(this).closest('html').removeClass("themeC");
        $(this).closest('.wrap').removeClass("typeC");
        $(this).closest("body").find(".daterangepicker").removeClass("typeC");
      }
      $(this).closest('html').addClass("themeB");
      $(this).closest('.wrap').addClass("typeB");
      $(this).closest("body").find(".daterangepicker").addClass("typeB");
    }
  });
};

//* navigation */
var navigation = function(){
   /* header 유저메뉴 리스트 토글 */
   var userMenuIcon = $("header .userinfo .userMenu .btns");
    $(userMenuIcon).on("click", function () {
        var nextEl = $(this).next("ul");
        $(this).toggleClass("on");
        nextEl.toggle(300);
    });
    $(document).mouseup(function (e) {
        var userMenu = $(".userMenu");
        if (!userMenu.is(e.target) && userMenu.has(e.target).length === 0) {
            $(".userMenu ul").hide(300);
            $(".userMenu .btns").removeClass("on");
        }
    });
    /* 메뉴 버튼 클릭시 toggle */ 
    $(".navigation .hamburger").on("click", function () {
        $(".navigation").toggleClass("closed");
        $(".container").toggleClass("wide-view");
        if ($(".navigation").hasClass("closed")) {
            $(".navigation").animate({
                width: "70px",
            }, 400);

        } else {
            $(".navigation").animate({
                width: "250px",
            }, 400);
        }
        // .navigation.close일때 ul > li > i 에 클래스가 없는 경우 부모 li 숨기기
        $(".navigation.closed ul li i").each(function () {
          if (!$(this).attr("class")) {
              $(this).closest("li").css('display', 'none'); 
          }
        });
        if ($(".navigation").hasClass("closed")) {
        // <i> 태그에 클래스가 없는 경우, 부모 <li> 숨기기
          $(".navigation li i").each(function () {
              if (!$(this).attr("class")) {
                  $(this).closest("li").hide();
              }
          });
      } else {  
          // 다시 보이게 하기
          $(".navigation li").show();
      }
    });
    /* 네비게이션 하위 */
    $(".navigation ul li:has(ul)").addClass("has-list");
    $(".navigation > ul > li > a").on("click", function () {
        var nextEl = $(this).next();
        $(".navigation > ul > li").removeClass("active");
        $(this).closest("li").addClass("active");
        if (nextEl.is("ul") && nextEl.is(":visible")) {
            // $(this).closest("li").removeClass("active");
            nextEl.slideUp("fast");
        }
        if (nextEl.is("ul") && !nextEl.is(":visible")) {
            $(".navigation > ul > li > ul:visible").slideUp(300);
            nextEl.slideDown("fast");
        }
        if (nextEl.is("ul")) {
            return false;
        } else {
            return true;
        }
    });

};

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

// bubbleOpen 클릭시 bubbleWrap 나타나는 말풍선 이벤트
// cdp 대시보드에 추가
// click작업
var bubbleOpen = function () {
  $(document).on("click", ".bubbleOpen", function (e) {
    e.stopPropagation();
    e.preventDefault(); // ← label의 기본 동작(radio 체크)을 막음

    const $btn = $(this);
    const btnName = $btn.data("popbubblename"); // bubbleOpen의 식별자
    const $wrap = $('.bubbleWrap[data-popbubblewrapname="' + btnName + '"]'); // 대응되는 bubbleWrap

    if (!$wrap.length) return;

    // 이미 열려있으면 닫기
    if ($wrap.hasClass("bubbleOn")) {
      $wrap.removeClass("bubbleOn pos-top pos-bottom").hide();
      return;
    }

    // 다른 모든 bubbleWrap 닫기
    $(".bubbleWrap").not($wrap).removeClass("bubbleOn pos-top pos-bottom").hide();

    const winHeight = window.innerHeight;
    const btnOffset = $btn.offset();
    const btnTop = btnOffset.top;
    const scrollTop = $(window).scrollTop();
    const btnCenter = btnTop - scrollTop + ($btn.outerHeight() / 2);

    $wrap.removeClass("pos-top pos-bottom");

    // 위치 계산
    let topPos, leftPos;
    if (btnCenter > winHeight / 2) {
      $wrap.addClass("pos-top");
      topPos = btnOffset.top - $wrap.outerHeight() - 8;
      leftPos = btnOffset.left;
    } else {
      $wrap.addClass("pos-bottom");
      topPos = btnOffset.top + $btn.outerHeight() + 8;
      leftPos = btnOffset.left;
    }

    // // ======================
    // // ⭐ 모바일 중앙 팝업
    // // ======================
    // if (isMobile()) {
    //   $wrap.css({
    //     position: "fixed",
    //     top: "50%",
    //     left: "50%",
    //     transform: "translate(-50%, -50%)",
    //     display: "block",
    //     zIndex: 1000
    //   });

    //   $wrap.addClass("bubbleOn");
    //   return; // 아래 PC 로직 무시
    // }

    // ======================
    // PC만 wrap에 prepend
    // .wrap 아래로 이동
    $(".wrap").prepend($wrap);

    $wrap.css({
      position: "absolute",
      top: topPos,
      left: leftPos,
      display: "block",
      zIndex: 1000
    }).addClass("bubbleOn");
  });

  // 닫기 버튼
  $(document).on("click", ".bubbleClose, .bubbleDim", function () {
    $(this).closest(".bubbleWrap").removeClass("bubbleOn pos-top pos-bottom").hide();
  });

  // 바깥 클릭 시 닫기
  $(document).click(function (e) {
    if (!$(e.target).closest(".bubbleOpen, .bubbleWrap").length) {
      $(".bubbleWrap").removeClass("bubbleOn pos-top pos-bottom").hide();
    }
  });
};
// movehoer시 나타나게.. 
var bubbleOpen_bak = function () {
  // hover 이벤트 (mouseenter 시 열기 / mouseleave 시 닫기)
  $(document).on("mouseenter", ".bubbleOpen", function (e) {
    e.stopPropagation();

    const $btn = $(this);
    const btnName = $btn.data("popbubblename"); // bubbleOpen의 식별자
    const $wrap = $('.bubbleWrap[data-popbubblewrapname="' + btnName + '"]'); // 대응되는 bubbleWrap

    if (!$wrap.length) return;

    // 다른 모든 bubbleWrap 닫기
    $(".bubbleWrap").not($wrap).removeClass("bubbleOn pos-top pos-bottom").hide();

    const winHeight = window.innerHeight;
    const btnOffset = $btn.offset();
    const btnTop = btnOffset.top;
    const scrollTop = $(window).scrollTop();
    const btnCenter = btnTop - scrollTop + ($btn.outerHeight() / 2);

    $wrap.removeClass("pos-top pos-bottom");

    // 위치 계산
    let topPos, leftPos;
    if (btnCenter > winHeight / 2) {
      $wrap.addClass("pos-top");
      topPos = btnOffset.top - $wrap.outerHeight() - 8;
      leftPos = btnOffset.left;
    } else {
      $wrap.addClass("pos-bottom");
      topPos = btnOffset.top + $btn.outerHeight() + 8;
      leftPos = btnOffset.left;
    }

    // .wrap 아래로 이동
    $(".wrap").prepend($wrap);

    $wrap.css({
      position: "absolute",
      top: topPos,
      left: leftPos,
      display: "block",
      zIndex: 1000
    }).addClass("bubbleOn");
  });

  // 마우스가 버튼이나 버블 영역에서 벗어나면 닫기
  $(document).on("mouseleave", ".bubbleOpen, .bubbleWrap", function (e) {
    // 관련된 bubbleWrap만 닫기
    const $target = $(this).hasClass("bubbleOpen")
      ? $('.bubbleWrap[data-popbubblewrapname="' + $(this).data("popbubblename") + '"]')
      : $(this);

    // 마우스가 bubble 내부로 이동한 경우 닫지 않음
    if ($(e.relatedTarget).closest(".bubbleOpen, .bubbleWrap").length) return;

    $target.removeClass("bubbleOn pos-top pos-bottom").hide();
  });
};


//* click 막기 */
var clickOff = function (){
  var clickOff = ('.off');
  $(clickOff).off("click");
};


//* iMark */ 
var iMark = function () {
  var iMarkBtn = $(".i_mark, .iMark");
  iMarkBtn.each(function () {
    //i_mark 마우스 오버 & 마우스 아웃시 말풍선 효과
    $(this).on('mouseover', function () {
      $(this).siblings(".i_mark_hover, .iMarkHover").css('display', 'block');
    }).on('mouseout', function () {
      $('.i_mark_hover, .iMarkHover').css('display', 'none');
    })
  });
};


//* widget */ 
var widget = function () {
   var widget = $(".grid-stack");
    widget.each(function () {
       let option = {
            column: 10,
            minRow: 3,
            cellHeight: '10px',
            placeholderClass: 'placeholder-content',
            removable: '.trash',
            disableOneColumnMode: true, // 한줄 채우기 금지
             
            float: false,
            resizable: {
                handles: 'none'
            }
        };
        let grid = GridStack.init(option);
        let trash = document.querySelector('.trash');
        grid.on('dragstart', function () {
            trash.classList.add('on');
            gridArea.classList.add('ani');
        });
        grid.on('dragstop', function () {
            trash.classList.remove('on');
            gridArea.classList.remove('ani');
        });
        grid.on('removed', function () {
            if ($('.grid-stack-item').length == 1) {
                $('.no_layout').css('display', 'flex');
            }
        });
        let gsSettingBtn = document.querySelector('.gs_btn');
        let gsSettingUl = document.querySelector('.gs_floating');
        gsSettingBtn.addEventListener('click', function () {
            gsSettingUl.classList.toggle('on');
        });
        let gridArea = document.querySelector('.grid-stack');
        let gridTrash = document.querySelector('.trash');
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                $('.trash').css('bottom', '100px')
            } else {
                $('.trash').css('bottom', '0')
            }
        });
    });
};

//* 테이블 내 항목 선 잇기  */ 
var tablePath = function (){
    var startPosition = $("#pathStart1");
    var startL = startPosition.position().left;
    var startT = startPosition.position().top;
    var startLH = startPosition.width() / 2;
    var startTH = startPosition.height() / 2;
    var startX = startL + startLH;
    var startY = startT + startTH;
    var endPosition = $("#pathEnd1");
    var endL = endPosition.position().left;
    var endT = endPosition.position().top;
    var endLH = endPosition.width() / 2;
    var endTH = endPosition.height() / 2;
    var endX = endL + endLH;
    var endY = endT + endTH;
    $('.pathArea').prepend('<svg>' + '<line x1="' + startL + '" y1="' + startY + '" x2="' + endX +
        '"y2="' + endY + '"/>' + '</svg>');
};

//* button > map */ 
var map = function () {
  var mapBtn = $("button.map");
  var mapHover = $("button.map .mapHover");
  mapBtn.each(function () {
    //i_mark 마우스 오버 & 마우스 아웃시 말풍선 효과
    $(this).on('mouseover', function () {
      $(this).children(".mapHover").css('display', 'block');
    }).on('mouseout', function () {
      $(mapHover).css('display', 'none');
    })
  });
};

//* daterangepicker */ 
var daterangepicker = function () {
  $("input[id^='dateInput']").daterangepicker({
      autoApply: true,
      locale: {
        format: "YYYY-MM-DD",
        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
        monthNames: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        customRangeLabel: "사용자 선택",
      },
      ranges: {
        오늘: [moment(), moment()],
        어제: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        이번달: [moment().startOf("month"), moment().endOf("month")],
        전월: [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
        전전월: [
          moment().subtract(2, "month").startOf("month"),
          moment().subtract(2, "month").endOf("month"),
        ],
        "최근 7일": [
          moment().subtract(7, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 30일": [
          moment().subtract(30, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 90일": [
          moment().subtract(90, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 180일": [
          moment().subtract(180, "days"),
          moment().subtract(1, "days"),
        ],
      },
    },
    function (start, end, label) {
      // console.log("Choice Date: " + start.format('YYYYMMDD') + ' ~ ' + end.format('YYYYMMDD'));
      $("input[name=sDate]").val(start.format("YYYYMMDD"));
      $("input[name=eDate]").val(end.format("YYYYMMDD"));
      $("#searchForm").submit();
    }
  );
  $("input[id^='daterangepicker']").each(function() {
    var _this = this.id;
    $('#'+_this).daterangepicker({
      autoApply: true,
      locale: {
        format: "YYYY-MM-DD",
        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
        monthNames: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        customRangeLabel: "사용자 선택",
      },
      ranges: {
        오늘: [moment(), moment()],
        어제: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        이번달: [moment().startOf("month"), moment().endOf("month")],
        전월: [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
        전전월: [
          moment().subtract(2, "month").startOf("month"),
          moment().subtract(2, "month").endOf("month"),
        ],
        "최근 7일": [
          moment().subtract(7, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 30일": [
          moment().subtract(30, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 90일": [
          moment().subtract(90, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 180일": [
          moment().subtract(180, "days"),
          moment().subtract(1, "days"),
        ],
      },
    },
    function (start, end, label) {
      // console.log("Choice Date: " + start.format('YYYYMMDD') + ' ~ ' + end.format('YYYYMMDD'));
      $("input[name=sDate]").val(start.format("YYYYMMDD"));
      $("input[name=eDate]").val(end.format("YYYYMMDD"));
      $("#searchForm").submit();
    }
    );
  });
};

//* 날짜 하루만 선택 */
var daterangepicker_Single = function () {
    var datePicker = ("#datePickerS1 .calendar");
    var clickOff = ("#datePickerS1.off .calendar")

  $(datePicker).daterangepicker(
    {
      singleDatePicker: true,
      // showDropdowns: true,
      autoApply: true,
      locale: {
        format: "YYYY-MM-DD",
        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
        monthNames: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        customRangeLabel: "사용자 선택",
        ranges: false,
      },
    },
    function (start, end, label) {
      $("input[name=Date]").val(start.format("YYYY-MM-DD"));
    }
  );

  /* input에 yyyy.mm.dd 형태로 날짜 입력 */
  $("input[name=Date]").val($.datepicker.formatDate($.datepicker.ATOM, new Date()));    
};

//* 날짜 하루만 선택 & 시간 선택 */
var daterangepickerTime_single = function () {
  $("input[id^='dateTimeS']").each(function() {
    var _this = this.id;
    $('#'+_this).daterangepicker({
        singleDatePicker: true,
        timePicker:true,
        // timePicker24Hour: true, // 24시까지 SELECT 선택, AM/PM 추가
        // timePickerSeconds: true, // 초 선택 SELECT 추가
        // opens: "right",
        // opens: "left",
        autoApply: true,
        locale: {
          format: "YYYY-MM-DD HH:mm:ss",
          daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
          monthNames: ["01","02","03","04","05","06","07","08","09","10","11","12"],
          customRangeLabel: "사용자 선택",
          ranges: false,
          applyLabel: '확인',
          cancelLabel: '취소',
        },
      },
      function (start, end, label) {
        $("input[name=Date]").val(start.format("YYYY-MM-DD hh:mm"));
      }
    );
  });
};

//* timepicker */ 
var timePicker = function(){ 
  var timePicker = (".timepicker input");
  $(timePicker).timepicker({
    timeFormat: 'HH:mm',
    interval: 1,
    minTime: '12:00am',
    maxTime: '11:59pm',
    defaultTime: 'now',
    startTime: '10:00',
    dynamic: false,
    dropdown: false,
    scrollbar: true
  });
};



/* chechbox all */
/* 아이디 값이 all또는 All이 포함되어 있으면 같은 name값을 가진 체크박스들 제어 가능하게 */
var checkboxAll = function(){
  $('input[type="checkbox"]').click(function() {
      var id = $(this).attr('id');
      if (id.includes('all') || id.includes('All')) {
          var name = $(this).attr('name');
          var isChecked = $(this).prop('checked');
          $('input[type="checkbox"][name="' + name + '"]').prop('checked', isChecked);
      } else {
          var name = $(this).attr('name');
          var isChecked = $(this).prop('checked');
          var allCheckbox = $('input[type="checkbox"][name="' + name + '"][id*="all"], input[type="checkbox"][name="' + name + '"][id*="All"]');
          var otherCheckboxes = $('input[type="checkbox"][name="' + name + '"]').not(allCheckbox);
          if (!isChecked && allCheckbox.prop('checked')) {
              allCheckbox.prop('checked', false);
          } else if (isChecked && otherCheckboxes.length === otherCheckboxes.filter(':checked').length) {
              allCheckbox.prop('checked', true);
          }
      }
  });
};


//* select div */
var selectDiv_bak = function () {
  var selectDiv = $(".selectDiv");
  var selected = $(".selectDiv .selected");
  var selectList_li = $(".selectDiv ul li");

  /* select toggle */
  // $(selected).click(function () {
  //   const container = $(this).closest('.selectDiv');
  //   if (container.hasClass('disabled')) return; // 🔒 클릭 차단

  //   const selectList = container.find('.selectList');

  //   if (selectList.length > 0) {
  //     selectList.toggle();
  //   } else {
  //     container.find('ul').toggle();
  //   }
  // });

  /* select toggle */
  $(selected).click(function (e) {
    e.stopPropagation(); // 바깥 click 이벤트랑 충돌 방지

    const container = $(this).closest('.selectDiv');
    if (container.hasClass('disabled')) return; // 🔒 클릭 차단

    // 다른 selectDiv는 닫기
    $(".selectDiv").not(container).find(".selectList, > ul").hide();

    // 내 selectList 토글
    const selectList = container.find('.selectList');
    if (selectList.length > 0) {
      selectList.toggle();
    } else {
      container.find('ul').toggle();
    }
  });

  /* select change */
  $(selectList_li).click(function () {
    const container = $(this).closest('.selectDiv');
    if (container.hasClass('disabled')) return; // 🔒 클릭 차단

    var selectLi = $(this).html();

    // li active 클래스 붙이기
    $(this).closest("ul").find("li").removeClass("active");
    $(this).addClass("active");

    // 선택된 li 텍스트를 .selected > p에 넣기
    container.find(".selected p").html(selectLi);

    // ul 닫기 로직
    const selectList = container.find('.selectList');

    if (selectList.length > 0) {
      selectList.toggle();
    } else {
      container.children('ul').toggle();
    }
  });

  /* selectDiv 이외 클릭 시 select list 닫기 */
  $(document).on("click", function (e) {
    if (!$(e.target).closest('.selectDiv').length) {
      $(".selectDiv .selectList, .selectDiv > ul").hide();
    }
  });
};

// selectDiv의 selectList에 인라인으로 height 값 입력시 list 높이값 계산해서 반영하는 소스
var selectHeight = function() {
  var $selectDivs = $(".selectDiv");

  $selectDivs.each(function() {
    var $container = $(this);
    var $selectList = $container.find(".selectList");

    // selectList에 인라인 height가 있는지 확인
    var inlineHeight = $selectList[0] && $selectList[0].style.height;

    if (inlineHeight) {
      var heightVal = parseFloat(inlineHeight);

      if (!isNaN(heightVal)) {
        // ✅ selectList의 max-height를 인라인 height값으로 변경
        $selectList.css("max-height", heightVal + "px");

        // ✅ selectList 내부의 ul 높이를 (height - 60px)로 설정
        var $innerUl = $selectList.children("ul");
        if ($innerUl.length) {
          $innerUl.css("height", (heightVal - 60) + "px");
        }
      }
    }
  });
};



var selectDiv = function () {
  var selectDiv = $(".selectDiv");
  var selected = $(".selectDiv .selected");
  var selectList_li = $(".selectDiv .selectList > ul > li");
  var listArea_li = $(".selectDiv .listArea > ul > li");
  var btn_openAll = $(".selectDiv button.openAll");

  /* select toggle */
  $(selected).click(function (e) {
    e.stopPropagation(); // 바깥 click 이벤트랑 충돌 방지

    const container = $(this).closest('.selectDiv');
    if (container.hasClass('disabled')) return; // 🔒 클릭 차단

    // 다른 selectDiv는 닫기
    $(".selectDiv").not(container).find(".selected").nextAll().hide();
    // console.log('111');

    // selectList 토글
    const selectList = container.find('.selectList');
    const listArea = container.find('.listArea');
    // 1) selectList > ul 구조인 경우
    if (selectList.length > 0) {
      selectList.toggle();
      selectDiv_selectList();
      
    //2) selectList > .listArea 구조인 경우
    } else if(listArea.length > 0) {
      listArea.toggle();
      selectDiv_listArea();
    }
  });
      
  // listArea의 input:checkbox의 total 갯수를 .chkCount에 보여주기
  var ChkCount = function() {
    function updateChkCount() {
      var count = $(".selectDiv .listArea input[type='checkbox']:checked").length;
    $(".chkCount").text(count);
    }
  
    // 초기 표시
    updateChkCount();
  
  // 체크박스 상태가 바뀔 때마다 갱신
    $(".selectDiv .listArea input[type='checkbox']").on("change", function() {
      updateChkCount();
    });
  }
  // 초기 표시
  ChkCount();

 // selectList jquery 모음
  var selectDiv_selectList = function(){
    selectList_toggle();
  };

  // listArea jquery 모음
  var selectDiv_listArea = function(){
    ChkCount(); // checkbox 카운트
    btnOpenAll();
    listArea_toggle();
  };

  /* select change */
  var selectList_toggle = function() {
    $(selectList_li).click(function () {
      const container = $(this).closest('.selectDiv');
      if (container.hasClass('disabled')) return; // 🔒 클릭 차단

      var selectLi = $(this).html();

      // li active 클래스 붙이기
      $(this).closest("ul").find("li").removeClass("active");
      $(this).addClass("active");

      // 선택된 li 텍스트를 .selected > p에 넣기
      container.find(".selected p").html(selectLi);

      // ul 닫기 로직
      const selectList = container.find('.selectList');

      if (selectList.length > 0) {
        selectList.toggle();
      } else {
        container.children('ul').toggle();
      }
    });
  };

  // listArea 이벤트
  var listArea_toggle = function() {
    $(listArea_li).click(function (e) {
      const container = $(this).closest('.selectDiv');
      if (container.hasClass('disabled')) return; // 🔒 클릭 차단

      // li active 클래스 붙이기
      $(this).closest("ul").find("li").removeClass("active");
      $(this).addClass("active");

      var $li = $(this);
      var $childUl = $li.children("ul");

      if ($childUl.length > 0) {
        // 자식 ul이 있으면 그쪽에 active
        $childUl.toggleClass("active");
        console.log('1=1');
      } else {
        // 없으면 부모 ul에 active
        $li.closest("ul").toggleClass("active");
        console.log('1>1');
      }
    });
  };

  // 버튼 클릭 이벤트
  var btnOpenAll = function() {
    $(btn_openAll).click(function (e) {
      e.stopPropagation(); // 🔒 li 클릭 이벤트로 전파 막기
      $(this).closest(".listArea").find("ul").addClass("active");
      console.log("a");
    });
  };

  /* selectDiv 이외 클릭 시 select list 닫기 */
  $(document).on("click", function (e) {
    if (!$(e.target).closest('.selectDiv').length) {
      $(".selectDiv .selectList, .selectDiv > ul, .selectDiv .listArea").hide();
    }
  });

  // selectHeight();
};


var selectChkDiv = function() {
  var $selectDivs = $(".selectChkDiv");

  /* =========================
     1. selected 클릭 → selectList 토글
  ========================= */
  $selectDivs.find(".selected").click(function(e) {
    e.stopPropagation(); // 외부 클릭 이벤트 방지

    var $container = $(this).closest(".selectChkDiv");
    if ($container.hasClass("disabled")) return; // 클릭 차단

    // 다른 selectChkDiv는 닫기
    $selectDivs.not($container).removeClass("open")
      .find(".selectList").hide();

    // 현재 selectChkDiv 토글
    $container.toggleClass("open");
    $container.find(".selectList").toggle(); // selectList 토글
  });


  /* =========================
     2. 체크박스 선택 시 .selected에 값 표시, 하단 버튼 추가
  ========================= */

  $selectDivs.find(".selectList input[type=checkbox]").change(function () {
    var $container = $(this).closest(".selectChkDiv");
    var $buttonBox = $container.closest(".selectBox").find(".buttonBox");

    // 현재 체크된 체크박스들의 label 텍스트 모으기
    var selectedLabels = $container
      .find(".selectList input[type=checkbox]:checked")
      .map(function () {
        return $(this).next("label").text();
      })
      .get();

    // selected p 영역에 표시
    var displayText =
      selectedLabels.length > 0 ? selectedLabels.join(", ") : "파일을 선택해 주세요.";
    $container.find(".selected p").text(displayText);

    // buttonBox 영역 갱신
    $buttonBox.empty(); // 기존 span들 지움
    selectedLabels.forEach(function (label) {
      var $span = $(`
        <span>
          ${label}
          <button type="button" class="btnClose">닫기</button>
        </span>
      `);
      $buttonBox.append($span);
    });
  });

// 닫기 버튼 동작
$(document).on("click", ".buttonBox .btnClose", function () {
  var $span = $(this).closest("span");
  var text = $span.contents().get(0).nodeValue.trim(); // span 안의 텍스트 추출

  // 해당 label의 체크박스 해제
  $(".selectList label").filter(function () {
    return $(this).text() === text;
  }).prev("input[type=checkbox]").prop("checked", false).trigger("change");

  $span.remove();
});


  /* selectChkDiv 이외 클릭 시 select list 닫기 */
  $(document).on("click", function (e) {
    if (!$(e.target).closest('.selectChkDiv').length) {
      $(".selectChkDiv .selectList, .selectChkDiv > ul").hide();
    }
  });
};

var tab = function () {
  var btn_tab = $(".tab li");
  
  $(btn_tab).click(function (e) {
    $(this).closest("section").find(".tab li").removeClass("on");
   
    var tabIndex = $(this).addClass("on").index();
    var tabListIndex = $(this).closest("section").find(".tabView > .tabViewList");
    $(tabListIndex).removeClass("show");
    $(tabListIndex).eq(tabIndex).addClass("show");
  });
};


//* input label > select 선택시 input값 변경 */
var ipSelect = function () {
  // select 요소를 선택
  var ipSelect = $("input+label *");

  $(ipSelect).click(function (e) {
    // 클릭된 select 요소를 기준으로 가장가까운 위 부모 label
    var label = $(this).closest('label');
    
    // label의 for 속성 값을 가져옵니다.
    var inputId = label.attr('for');
    
    // for 속성과 일치하는 id를 가진 input 요소를 찾습니다.
    var closestInput = $('#' + inputId);
    
    // 찾은 input 요소가 존재할 경우, 해당 요소를 체크 상태로 변경합니다.
    if (closestInput.length) {
      closestInput.prop('checked', true);
    }
  });
};


// 파일 첨부하기
// X버튼 보이지 않다가 파일 첨부시에만 나타나게 하는 기능 추가 
var fileBox = function () {
  // input[file] 
  $('input[type="file"]').on('change', function () {
    var fileInput = $(this);  
    var fileName = fileInput.val().split('\\').pop();  
    var textInput = fileInput.next('input[type="text"]');  
    var btnCancel = fileInput.siblings('button.btnFileCancel');

    if (fileName) {
      textInput.val(fileName);       // 파일명 표시
      btnCancel.show();              // 버튼 보이기
    } else {
      textInput.val('선택된 파일 없음'); // 초기 상태
      btnCancel.hide();              // 버튼 숨기기
    }
  });

  // fileBox .btnFileCancel 클릭시 file, text 초기화 
  var btnFileCancel = $('.fileBox button.btnFileCancel');
  btnFileCancel.click(function () {
    var fileInput = $(this).siblings('input[type="file"]');
    var textInput = $(this).siblings('input[type="text"]');

    fileInput.val(''); 
    textInput.val('선택된 파일 없음');
    $(this).hide(); // 파일 취소하면 버튼 숨기기
  });

  // 초기 상태에서 버튼 숨김
  $('.fileBox button.btnFileCancel').hide();
};






//* MENU 상품분석 */
//* 추천 커버리지 현황 */
var adAnalysis = function () {
  //* 버튼탭 on */
  var tab = $(".tune_adAnalysis .sec_tabButton button")
    $(tab).click(function (e) {
    $(this).closest(".tabButton").find("button").removeClass("on");
    $(this).addClass("on");
  });
    
  //* BOX 마우스 오버시 iBox 나타나기 - sec_adAnalysis  */
  var boxHover = $(".tune_adAnalysis .sec_adAnalysis .box");
    boxHover.each(function () {
    $(this).on('mouseover', function () {
      $(this).children(".tooltipHover").css('display', 'block');
    }).on('mouseout', function () {
      $(this).children(".tooltipHover").css('display', 'none');
    })   
  });

  //* 상품 점유율 RACE  */
  var raceGraphHover = $(".tune_adAnalysis .sec_raceGraph .graphLine");
    raceGraphHover.each(function () {
    $(this).on('mouseover', function () {
      $(this).closest(".graphBox").find(".tooltipHover").css('display', 'block');
    }).on('mouseout', function () {
      $(this).closest(".graphBox").find(".tooltipHover").css('display', 'none');
    })   
  });
  
   //* 테이블 그래프 마우스 오버시 boxHover 나타남 */
   var listHover = $(" .tune_adAnalysis, .sec_list td .imgBox img, .tune_adAnalysis .sec_list .graphBox .graph");
    listHover.each(function () {
    $(this).on('mouseover', function () {
      $(this).siblings(".tooltipHover").css('display', 'block');
    }).on('mouseout', function () {
      $(this).siblings(".tooltipHover").css('display', 'none');
    })
  });
};

//* 상품 분석 */
var productAnalysis = function () {
  //* 상품 점유율 RACE  */
  var raceGraphHover = $(".tune_productAnalysis .sec_raceGraph .graphLine");
    raceGraphHover.each(function () {
    $(this).on('mouseover', function () {
      $(this).closest(".graphBox").find(".tooltipHover").css('display', 'block');
    }).on('mouseout', function () {
      $(this).closest(".graphBox").find(".tooltipHover").css('display', 'none');
    })   
  });
};


//* CDP   ========================= */
// CDP 대시보드 
// 유저퍼널분석 bubbleOpen 이 포함된 box .bg에 on클래스 토글
var cdp_dashboard = function () {
  var bubbleOpenSelector = '.tune_cdpDashboard .sec_analysis .chartArea .box .bg .bubbleOpen';
  var bgSelector = '.tune_cdpDashboard .sec_analysis .chartArea .box .bg';

  // bubbleOpen 클릭
  $(bubbleOpenSelector).click(function (e) {
    // e.stopPropagation(); // 다른 이벤트 충돌 방지

    var $clickedBg = $(this).closest(".bg"); // 클릭한 bubbleOpen의 부모 bg

    // 다른 bg에서는 모두 on 제거
    $(bgSelector).not($clickedBg).removeClass('on');

    // 클릭한 bg만 on 토글
    $clickedBg.toggleClass("on");
  });

  // 바깥 클릭 시 모든 bg의 on 제거
  $(document).click(function (e) {
    if (!$(e.target).closest(bgSelector).length) {
      $(bgSelector).removeClass('on');
    }
  });
};


//* 유저정보 */ 
var tabBoxBtn = function () {
  var tabBoxBtn = $(".tune_userInfo .tabArea li");
  var tabBoxList = $(".tune_userInfo .tabListArea > div");
  tabBoxBtn.each(function () {
    $(this).on("click", function () {
      $(tabBoxBtn).removeClass("on");
      var index = $(this).addClass("on").index();
      $(".show").removeClass("show");
      $(tabBoxList).eq(index).addClass("show")
    });
  });
};

//* 캠페인 리스트 */ 
var campaignList_toggle = function(){
  /* 자세히보기 toggle */
  var listDetail = (".tune_campaignList .listDetail")
  var listDetailOpenBtn = $(".tune_campaignList .toggleBtn button");
  var btnStar = $(".tune_campaignList .listBlock .topBox .iconBox button.bookmark");
         
    $(listDetail).css("display", "none");
    $(listDetailOpenBtn).click(function (e) {
        e.preventDefault();
        $(this).toggleClass("on"); 
        //* 자세히보기 아이콘 클래스 on/off */
        $(this).closest(".list").toggleClass("on");
        $(this).closest(".list").find(".listDetail").slideToggle(10);
    });
    //* star toggle */ 
    $(btnStar).click(function (e) {
        e.preventDefault();
        $(this).toggleClass("on");
    });
  };

//* 캠페인 생성 */ 
var campaignCreate = function(){
    // block_detail X 버튼 클릭시 해당 dl 제거
    $(".tune_campaignCreate .btnLineRemove").on('click', function () {
        $(this).closest('dl').remove();
    });
    // 포함/제외 toggle button
    $(".tune_campaignCreate .searchResult .block_detail .titBox button").click(function () {
        $(this).toggleClass("on");
        $(this).parent("div").siblings(".block_input").slideToggle();
        $(".searchResult .block_detail > div").removeClass("on");
        $(this).closest(".block_detail > div").addClass("on");
    });
    //* 포함, 제외에 내용이 없을 때 알림 나타나게 */
    $(function (event) {
        var blockDetail = $(".tune_campaignCreate .searchResult .block_detail");
        var blockAlarm = $(".tune_campaignCreate .searchResult .block_detail .block_alarm");
        var titBox = $(".tune_campaignCreate .searchResult .block_detail .includeOption .titBox");
        if ($(blockDetail).find("dl").length) {
            $(this).find(blockAlarm).remove();
        } else {
            $(titBox).after(blockAlarm);
        };
    });

    //tab li 클릭시 on 
    $(".tune_campaignCreate .sec_search .tab li").click(function (e) {
      $(this).closest(".tab").find("li").removeClass("on");
      $(this).addClass("on");
    });  

    $(".tune_campaignCreate .sec_search .box_tab li").click(function (e) {
      $(this).closest(".box_tab").find("li").removeClass("on");
      $(this).addClass("on");
    });  

    //script tabArea li 클릭시 하단 내용 바뀜 기능
    $(".tune_campaignCreate .tabArea li").click(function (e) {
        e.preventDefault();
        $(".tabArea li").removeClass("on");
        var index = $(this).addClass("on").index();
        $(".tabListArea > .listArea").removeClass("show");
        $(".tabListArea > .listArea").eq(index).addClass("show");
    });
}

//* RFM분석 */
var rfmGraphToggle = function () {
  var graphBox = $(".rfmAnalysis .box_rfmAnalysis .graphBox .box");
  graphBox.each(function () {
    $(this).on("click", function () {
      $(this).toggleClass("on");
    });
  });
};

//* 고객가치분석 */
var customerValueAnalysis = function () {
  //* 버튼탭 on */
  var tabButton = $(".tune_customerValueAnalysis .sec_customerValueAnalysis .box_button button")
    $(tabButton).click(function (e) {
    $(this).toggleClass("on");
    });
};


//* 스크립트관리 */
//* 스크립트 관리 */ 
//* RFM분석 */
var scriptToggle = function () {
  var click = (".tune_script .ul_body > ul > li > ul")
    $(click).on("click", function () {
      $(this).parent("li").toggleClass("on");
      var target = $(this).siblings(".box_tbl");
      target.slideToggle();
    });
};


//* 키워드센터 */
//* 대시보드 */ 
//* 키워드  TOP 50 버튼 클릭시 좌우로 스크롤 이벤트 */
var keywordDashboard_keywordBoxScroll = function () {
  //* 이전버튼, 다음버튼 스크롤 영역 */
  var beforeButton = (".tune_keywordDashboard .sec_keywordRank .buttonBox button.prev");
  var nextButton = (".tune_keywordDashboard .sec_keywordRank .buttonBox button.next");
  var keywordBox =  (".tune_keywordDashboard .sec_keywordRank .keywordBox");
   
  $(beforeButton).on("click", function () {
      $(keywordBox).stop().animate({scrollLeft: '-=360'});
    });
    $(nextButton).on("click", function () {
      $(keywordBox).stop().animate({scrollLeft: '+=360'});
    });
};

//* 키워드통계 - 키워드 요약 */ 
//* 키워드 클라우드 input:range value 값에 따라 말풍선 위치 조절 */
var keywordSummary_outputPosition = function () {
  //* input range */
  var inputRange = $(".tune_keywordSummary .sec_keywordCloud input[type=range]");
  
  $(inputRange).on("click", function () {
    var inputRangeMax =  $(this).attr('max');
    var inputRangeValue =  $(this).val();
    var inputResult = inputRangeValue/inputRangeMax * 100;
    var outputPosition = $(inputRange).next("label");
    
      $(outputPosition).css("left", inputResult+'%');
    });
};


//* 데이터매니저 - 대시보드 */ 
//* input포함된 div 클릭시 border색 변경 */
var dataManagerStart = function () {
  //* input range */
  var input = $(".tune_dataManagerStart .sec_intro .box_input input[type=text], .tune_dataManagerStart .sec_intro .box_input textarea");
  $(input).on("focus", function () {
    $(this).closest("div").addClass("on");
  });
  $(input).on("focusout", function () {
    $(this).closest("div").removeClass("on");
  });
};


//* 데이터매니저 - 데이터 수집 관리 */ 
//* 리스트 형태 변환 (카드, 테이블) */
var dataCollect = function () {
  //* input range */
  var btn_listChange = $(".tune_dataCollect .sec_list .tableHeader button.listChange");

  $(btn_listChange).on("click", function () {
    $(this).toggleClass("list card");
    $(this).closest(".sec_list").children(".tableArea, .cardArea").toggleClass("show");
    // if ($(this).hasClass("list")){
    // $(this).closest(".sec_list").children(".tableArea").addClass("show");
    // $(this).closest(".sec_list").children(".cardArea").removeClass("show");
    // } else if ($(this).hasClass("card")){
    //   $(this).closest(".sec_list").children(".cardArea").addClass("show");
    //   $(this).closest(".sec_list").children(".tableArea").removeClass("show");
    // }
  });
};

//* 데이터매니저 - 데이터 제공 관리 */ 
//* 테이블 라디오박스 선택되었을 때 해당 tr에 active 클래스 토글 */
var dataProvide = function () {
  //* input range */
  var radio = $(".tune_dataProvide .sec_list .tableArea table td label");
    $(radio).click(function(){
      if($("input[type=radio]:checked").is(':checked')){
        $(this).closest("table").find("tr").removeClass("active");
        $(this).siblings("input[type=radio]").prop('checked',true);
        $(this).closest("tr").addClass("active");
      }
  });
};



// 테이블 하위 자식 toggle
var table_toggle = function () {
  $(".btnToggle").click(function () {
    var $this = $(this);
    var $currentRow = $this.closest("tr");
    var isOpen = $this.hasClass("on");

    // toggle 대상들 담을 배열
    var toggleTarget = [];

    // 1. .haveChild 클릭 시
    if ($currentRow.hasClass("haveChild")) {
      var $nextRows = $currentRow.nextAll();

      for (var i = 0; i < $nextRows.length; i++) {
        var $row = $($nextRows[i]);

        if ($row.hasClass("haveChild") || (!$row.hasClass("child") && !$row.hasClass("grandChild"))) {
          // 다음 haveChild나 아무 클래스 없는 tr 만나면 중단
          break;
        }

        if ($row.hasClass("child")) {
          toggleTarget.push($row);
        }
      }
    }

    // 2. .child 클릭 시 (grandChild 토글)
    else if ($currentRow.hasClass("child")) {
      var $nextRows = $currentRow.nextAll();

      for (var i = 0; i < $nextRows.length; i++) {
        var $row = $($nextRows[i]);

        if (!$row.hasClass("grandChild")) {
          break;
        }

        toggleTarget.push($row);
      }
    }

    // 토글 실행
    $(toggleTarget).each(function () {
      if (isOpen) {
        $(this).hide();
      } else {
        $(this).css("display", "table-row");
      }
    });

    // 버튼 상태 토글
    $this.toggleClass("on");
    // btn_toggleOnOff(); 
    var icon = $(this).children("i");
    if (icon.hasClass("up")) {
      icon.removeClass("up").addClass("down");
    } else {
      icon.removeClass("down").addClass("up");
    }
  });
};



/* CDP - 캠페인 리스트 */
var campaignList = function () {
  var list1 =(".tune_campaignList .sec_list .listArea >.list");
  var listDrop1 =(".tune_campaignList .sec_list .listArea .listDetail .list");

  $(function() {
    // .list 요소를 드래그 가능하게 설정
    $(list1).draggable({
      helper: "original",  // 복사본을 드래그하도록 설정 clone, original
      revert: "invalid",  // 유효하지 않은 곳에 드롭하면 원래 위치로 돌아옴
      containment: "document",  // 드래그할 때 문서 범위 내에서만 이동
      cursor: "move",
      stop: function(event, ui) {
      // 드래그가 끝난 후, 원본 삭제
        $(this).remove();
      }
    });

    $(list1).droppable({
      accept: ".list",  // .list 요소만 드롭하도록 설정
      drop: function(event, ui) {
        var draggedItem = ui.helper[0];  // 드래그한 원본 요소를 가져옴
        var newListDiv = $('<div class="list"></div>');
        var groupAreaDiv = $('<div class="groupArea"></div>'); 
        var newCont = $('<div class="cont"></div>');  
        
        // 그룹이 아닌 list를 그룹으로 만드는 경우
        if ($(this).find('.list').find('.group').length === 0) {
          // .listDetail에 .group 클래스를 추가
          $(this).addClass("group");
           
          // .listDetail 안에 .groupArea 추가
          // $(this).find('.listDetail').prepend(groupAreaDiv);
          // listDetail_1.prepend(newListDiv);

          var includeBox =  $(this).find(".listDetail").children('.includeBox');
          var excludeBox =  $(this).find(".listDetail").children('.excludeBox');
          //  // .list > .cont > .includeBox와 .excludeBox를 newCont 안에 추가
         var listDetail = newCont.append(includeBox).append(excludeBox); // .cont 안에 includeBox와 excludeBox를 추가
        // newListDiv.append(listDetail);  
        // groupAreaDiv.append(newListDiv);  
                // $(this).find('.listBlock').append(groupAreaDiv);

       // 그룹안에 list 추가
       }else {
        // draggedItem 안에서 .listDetail을 찾음
        var listTit = $(draggedItem).find(".titBox");
        var listCont = $(draggedItem).find(".listDetail");

        // listDetail 클래스를 cont로 변경
        listTit.removeClass("titBox").addClass("tit");
        listCont.removeClass("listDetail").addClass("cont");

        // tit > span > .mark를 제거하고 count로 변경
        listTit.children(".mark").removeClass("mark").addClass("count");
        // tit > button.close 추가
        var closeButton = $('<button class="close">X</button>');  // 새로운 button.close 생성
        listTit.append(closeButton);  // .tit의 마지막에 button.close 추가

        newListDiv.append(listTit).append(listCont); 
        
        // 드롭된 위치에서 .groupArea를 찾아서 그 안에 listDetail(이제 cont) 추가
        var targetGroupArea = $(this).children(".listDetail").find(".groupArea");
        
        // 드래그한 .list 항목을 .groupArea 안에 추가
        targetGroupArea.append(newListDiv);// Append the content div

        // 드래그된 요소가 display:none 상태가 되는 문제 해결
        listCont.show();  // display: none 문제 해결을 위해 보이게 설정
        }
      }
    });
  });
};


//* 데이터매니저 - 채널별 규칙관리 */ 
//* 테이블내에 - 버튼 눌렀을 때 해당 tr 삭제 */
var channelRule = function () {
  //* input range */
  var btnRemove = $(".tune_channelRule table button.remove");
    $(btnRemove).click(function(){
      $(this).closest('tr').remove();
  });
};

//* 원태그 > 사이트성능분석 (siteAnalysis)   */
// 잘못수정하면 위젯화면 영향받음
var siteAnalysis = function() {
  // .tune_siteAnalysis 내부의 .slick 요소만 선택
  var slideContainer = $('.tune_siteAnalysis .slick');

  // 슬라이드가 초기화되지 않았다면
  if (slideContainer.length && !slideContainer.hasClass('slick-initialized')) {
    // 슬라이드를 초기화
    slideContainer.slick({
      dots: true
    });
  }
};


//* AI 스튜디오  > 리포트 라운지 (tune_aiReportLounge), AI질문&탐색(tune_aiQuestion)   */
// slide(slick)
var tune_aiSlide = function() {
  // .tune_aiReportLounge 내부의 .slick 요소만 선택
  var slideContainer = $('.tune_aiReportLounge .slick');
  var slideContainer2 = $('.tune_aiQuestion .box_question .slick, .tune_aiExplore .sec_question .slick');
  var slideContainer3 = $('.tune_aiExplore .sec_answer .slick');
  var slideContainer4 = $('.tune_aiConnectHub .slick');
  var slideContainer5 = $('.tune_aiQuestion .box_help .slick');
  // var slideContainer6 = $('.tune_aiQuestion .box_question .slick');
  var slideContainer6 = $('.tune_tagDashboard .slick');

  // 슬라이드가 초기화되지 않았다면
  if (slideContainer.length && !slideContainer.hasClass('slick-initialized')) {
    // 슬라이드를 초기화
    slideContainer.slick({
      dots: true,
      arrows:false,
      // autoplay: true,
      autoplaySpeed: 5000
    });
  }

  // 슬라이드가 초기화되지 않았다면
  if (slideContainer2.length && !slideContainer2.hasClass('slick-initialized')) {
    // 슬라이드를 초기화
    slideContainer2.slick({
    dots: true,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,   // 한 번에 1개씩 넘기기
    // infinite: false,
    pauseOnHover: true, // 마우스 오버 시 슬라이드 멈춤 default=true
    });
  }
  
  if (slideContainer3.length && !slideContainer3.hasClass('slick-initialized')) {
    // 슬라이드를 초기화
    slideContainer3.slick({
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,   // 한 번에 1개씩 넘기기
    // infinite: false,
    pauseOnHover: true, // 마우스 오버 시 슬라이드 멈춤 default=true
    });
  }
  // 슬라이드가 초기화되지 않았다면
  if (slideContainer4.length && !slideContainer4.hasClass('slick-initialized')) {
    // 슬라이드를 초기화
    slideContainer4.slick({
      dots: true,
      arrows:true,
      slidesToShow: 1,
      slidesToScroll: 1,   // 한 번에 1개씩 넘기기
      // autoplay: true,
      autoplaySpeed: 5000
    });
  }
    // 슬라이드가 초기화되지 않았다면
  if (slideContainer5.length && !slideContainer5.hasClass('slick-initialized')) {
    // 슬라이드를 초기화
    slideContainer5.slick({
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,   // 한 번에 1개씩 넘기기
    // infinite: false,
    pauseOnHover: true, // 마우스 오버 시 슬라이드 멈춤 default=true
    });
  }


  // if (slideContainer6.length && !slideContainer6.hasClass('slick-initialized')) {

  //   // 먼저 이벤트 등록
  //   slideContainer6.on('init', function(event, slick){
  //     // ✅ 여기서 .page-count가 존재해야 값이 들어감
  //     $('.page-count .current').text(slick.currentSlide + 1);
  //     $('.page-count .total').text(slick.slideCount);
  //   });

  //   slideContainer6.on('afterChange', function(event, slick, currentSlide){
  //     $('.page-count .current').text(currentSlide + 1);
  //     $('.page-count .total').text(slick.slideCount);
  //   });

  //   // slick 실행
  //   slideContainer6.slick({
  //     dots: false,
  //     arrows: true,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     autoplaySpeed: 5000
  //   });

  //   // ✅ slick 실행 직후 .page-count DOM 추가
  //   slideContainer6.after(`
  //     <div class="page-controls">
  //       <div class="page-count">
  //         <span class="current"></span>/<span class="total"></span>
  //       </div>
  //       <button type="button" class="slick-toggle">⏸</button>
  //     </div>
  //   `);

  //   // ✅ slick 초기화 강제 트리거 (page-count가 생긴 뒤 이벤트 다시 실행)
  //   slideContainer6.trigger('init', [slideContainer6.slick('getSlick')]);

  //   // 토글 버튼 기능
  //   let isPaused = false;
  //   $(document).on('click', '.slick-toggle', function () {
  //     if (isPaused) {
  //       slideContainer6.slick('slickPlay');
  //       $(this).text('⏸ ');
  //     } else {
  //       slideContainer6.slick('slickPause');
  //       $(this).text('▶ 재생');
  //     }
  //     isPaused = !isPaused;
  //   });
  // }
  if (slideContainer6.length && !slideContainer6.hasClass('slick-initialized')) {

  // slick 실행
  slideContainer6.slick({
    dots: false,
    arrows: false,   // 기본 화살표 숨김
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  });

  // 커스텀 컨트롤 추가
  slideContainer6.after(`
    <div class="page-controls">
    <div class="page-count">
    <span class="current">1</span>/<span class="total">3</span>
    </div>
      <button type="button" class="slick-prev">&lt;</button>
      <button type="button" class="slick-toggle pause">⏸</button>
      <button type="button" class="slick-next">&gt;</button>
    </div>
  `);

  // 페이지 총 개수 세팅
  const totalSlides = slideContainer6.slick('getSlick').slideCount;
  $('.page-count .total').text(totalSlides);

  // 슬라이드 변경 시 현재 페이지 업데이트
  slideContainer6.on('afterChange', function(event, slick, currentSlide){
    $('.page-count .current').text(currentSlide + 1);
  });

  // 이전/다음 버튼 클릭
  $(document).on('click', '.slick-prev', function(){
    slideContainer6.slick('slickPrev');
  });
  $(document).on('click', '.slick-next', function(){
    slideContainer6.slick('slickNext');
  });

  // 일시정지/재생 버튼
  let isPaused = false;
  $(document).on('click', '.slick-toggle', function () {
    if (isPaused) {
      slideContainer6.slick('slickPlay');
      $(this).text('⏸').removeClass('play').addClass('pause');
      
    } else {
      slideContainer6.slick('slickPause');
      $(this).text('▶').removeClass('pause').addClass('play');
    }
    isPaused = !isPaused;
  });
  }
};


//* (튠공통) AI 스튜디오  > 내 리포트 보관함 (tune_aiReportStorage   */
// moreBox의 more버튼 클릭시 openBox toggle
var moreBox = function() {
  var btnMore = $('.moreBox button.more');
  var openBox_li = $('.moreBox .openBox ul li');

  // "더보기" 버튼 클릭 시 메뉴 열고 닫기
  btnMore.click(function (e) {
    const container = $(this).closest('.moreBox');
    const menu = container.find('.openBox');

    // 모든 openBox 닫고 aria-expanded false로 초기화 (자신 제외)
    $('.openBox').not(menu).hide();
    $('button.more').not(this).attr('aria-expanded', 'false');

    // 현재 메뉴 toggle
    menu.toggle();

    // 접근성: aria-expanded 값 토글
    const isExpanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !isExpanded);

    // 이벤트 버블링 방지 (외부 클릭 방지용)
    e.stopPropagation();
  });

  // 메뉴 항목(li) 클릭 시 active 클래스 적용
  $(openBox_li).click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  // .moreBox 외부 클릭 시 메뉴 닫기
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.moreBox').length) {
      $('.openBox').hide();
      $('button.more').attr('aria-expanded', 'false');
    }
  });
};

//* 데이터 매니저 > 데이터 통계 (tune_dataManagerDataStats)   */
// moreBox의 more버튼 클릭시 openBox toggle
var tune_dataManagerDataStats = function() {
  var toggle = $('.tune_dataManagerDataStats .sec_date .toggleBox input[type=checkbox]');

  // 초기 상태 설정
  toggle.each(function() {
    var isChecked = $(this).is(':checked');
    var nextCalendar = $(this).closest('.toggleBox').next('.calendarBox');
    var nextCheckBox = $(this).closest('.toggleBox').nextAll('.checkBox').first();

    if (!isChecked) {
      nextCalendar.hide();
      nextCheckBox.hide();
    }
  });

  // 상태 변경 시 동작
  toggle.change(function() {
    var isChecked = $(this).is(':checked');
    var nextCalendar = $(this).closest('.toggleBox').next('.calendarBox');
    var nextCheckBox = $(this).closest('.toggleBox').nextAll('.checkBox').first();

    if (isChecked) {
      nextCalendar.show();
      nextCheckBox.show();
    } else {
      nextCalendar.hide();
      nextCheckBox.hide();
    }
  });
};



//* 공통 > html 스크롤제어 */ 
//* html overflow-y 스크롤 제거 */
var scrollYnone = function () {
  var $target = $(".container.scrollYnone");

  if ($target.length > 0) {
    $("html").css("overflow-y", "hidden");
  } else {
    $("html").css("overflow-y", "auto"); // 조건이 없으면 다시 스크롤 활성화
  }
};

//* AI스튜디오 메뉴 배경 비디오 제어 */
var menu_ai_vedio = function () {
  const tune_ai = document.querySelector('.container [class^="tune_ai"]');

  // .tune_ai 관련 클래스가 없으면 실행하지 않음
  if (!tune_ai) return;

  // tune_ai 하위에 있는 비디오 찾기
  const video = tune_ai.querySelector('.bg_video');
  if (!video) return;

  video.loop = true;
  video.muted = true; // autoplay 보장
  video.playsInline = true;

  const tryPlay = () => {
    if (video.paused) {
      video.play().catch(e => {
        console.warn('비디오 재생 실패:', e);
      });
    }
  };

  // 초기 재생
  tryPlay();

  // resize, scroll, visibilitychange 등 이벤트 대응
  window.addEventListener('resize', tryPlay);
  window.addEventListener('scroll', tryPlay);
  document.addEventListener('visibilitychange', tryPlay);
  video.addEventListener('ended', tryPlay);

  // DOM 구조 변경 감지 (선택 사항)
  const observer = new MutationObserver(tryPlay);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

/* AI스튜디오 메뉴 배경 비디오 제어(2) */
var menu_ai_vedio2 = function (){
  window.addEventListener('DOMContentLoaded', function () {
  const video = document.querySelector('.bg_video');
  if (video) {
      video.loop = true; // 페이지 진입 시 강제 재생 (안전장치)
      if (video.paused) {
          video.play().catch(e => {
              console.warn('초기 재생 실패:', e);
          });
      } // 리사이즈 시 멈췄다면 다시 재생
      window.addEventListener('resize', function () {
          if (video.paused) {
              video.play().catch(e => {
                  console.warn('resize 재생 실패:', e);
              });
          }
      }); // 비디오가 끝났을 때 재생 다시 시도 (loop 보완)
      video.addEventListener('ended', function () {
          video.play().catch(e => {
              console.warn('ended 재생 실패:', e);
          });
      });
    }
});
}


//* MENU - AI튜니   ========================= */
// tune_ai 클래스가 container하위에 있는경우 container에 tune_ai 클래스 추가
// 'tune_aiHome'클래스가 container 하위에 있으면 .container에 tune_ai 클래스 추가하지 않음
var tune_ai = function () {
  var tune_ai = $(".container [class^='tune_ai']");
    // tune_ai 클래스가 container하위에 있는경우 container에 tune_ai 클래스 추가
    $(tune_ai).each(function () {
    var classList = $(this).attr("class").split(/\s+/);
  
  // 'tune_aiHome'클래스가 container 하위에 있으면 .container에 tune_ai 클래스 추가하지 않음
    if (classList.includes("tune_aiHome")) {
      return;
    }

    var container = $(this).closest('.container');
  
    if (!container.hasClass("tune_ai")) {
      container.addClass("tune_ai");
    }
  });
};


// 튜니 HOME
var tune_aiHome = function () {

  // ai튜니 홈, 작성하기 (tune_aiHome, tune_aiAnswer) 모바일 사이즈 될때 navigation 접기
  var tune_aiHome_resizeCheck = function () {
    var resizeTimer = null;

    function setNavWidth($nav, targetWidth, duration) {
      var curW = Math.round(parseFloat($nav.css('width')));
      var tgtW = parseInt(targetWidth, 10);

      if (curW === tgtW) return;

      $nav.stop(true, true).animate({ width: tgtW + "px" }, duration || 300);
    }

    function checkView() {
      var winW = window.innerWidth;  // ← 가로값 기준!
      var $container = $('.container');
      if (
        !$container.hasClass('tune_aiHome') &&
        !$container.hasClass('tune_aiAnswer')
      ) return;
      var $nav = $('.navigation');

      if (winW < 1080) {
        // 닫기
        if (!$nav.hasClass('closed')) $nav.addClass('closed');

        setNavWidth($nav, 70, 250);
        $container.addClass('wide-view');

      } else {
        // 열기
        if ($nav.hasClass('closed')) $nav.removeClass('closed');

        setNavWidth($nav, 250, 300);
        $container.removeClass('wide-view');
      }
    }

    // 최초 1회 실행
    checkView();

    // resize 디바운스
    $(window).on('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkView, 80);
    });
  };

  tune_aiHome_resizeCheck();

  // 버블 페이징 disabled추가 
  var bubbleBtnPaging = function () {
    var bubble_btn_paging = '.bubbleWrap.bw_category .bubbleContent .sec_paging button';
    var bubble_list = '.bubbleWrap.bw_category .bubbleContent .sec_guide .box_guide ul li';

    // 버튼 상태 업데이트 함수
    function updateButtons() {
      var $liList = $(bubble_list);
      var $current = $liList.filter('.on');

      var $prev = $current.prev('li');
      var $next = $current.next('li');

      // prev 버튼
      var $prevBtn = $(' .bubbleWrap.bw_category .sec_paging .prev');
      if ($prev.length) $prevBtn.prop('disabled', false);
      else $prevBtn.prop('disabled', true);

      // next 버튼
      var $nextBtn = $(' .bubbleWrap.bw_category .sec_paging .next');
      if ($next.length) $nextBtn.prop('disabled', false);
      else $nextBtn.prop('disabled', true);
    }

    // 버튼 클릭 이벤트
    $(document).on("click", bubble_btn_paging, function () {
      var $liList = $(bubble_list);
      var $current = $liList.filter('.on');

      if (!$current.length) return;

      if ($(this).hasClass('prev')) {
        var $prev = $current.prev('li');
        if ($prev.length) {
          $current.removeClass('on');
          $prev.addClass('on');
        }
      } else if ($(this).hasClass('next')) {
        var $next = $current.next('li');
        if ($next.length) {
          $current.removeClass('on');
          $next.addClass('on');
        }
      }

      // 이동 후 버튼 상태 갱신
      updateButtons();
    });

    // 초기 상태에서도 버튼 상태 갱신
    updateButtons();
  };

  bubbleBtnPaging();

  // ===============================
  // tune_aiHome 내부 전용
  // PC/모바일 구분 동작
  // ===============================

  function isMobile() {
    return window.matchMedia("(max-width: 1024px)").matches;
  }

  var bubbleOpen_aiHome = function () {

    // PC일 때 hover로 열기
    $(document).on("mouseenter", ".tune_aiHome .bubbleOpen", function () {
      if (isMobile()) return;

      const $btn = $(this);
      const btnName = $btn.data("popbubblename");
      const $wrap = $('.bubbleWrap[data-popbubblewrapname="' + btnName + '"]');

      // 이미 열려있으면 click(=toggle) 실행하지 않음!
      if ($wrap.hasClass("bubbleOn")) return;

      $btn.trigger("click");
    });

      // PC에서 bubbleWrap 영역 벗어나면 닫기
      // $(document).on("mouseleave", ".tune_aiHome .bubbleWrap", function () {
      //   if (isMobile()) return;
      //   $(this).removeClass("bubbleOn pos-top pos-bottom").hide();
      // });

      // 모바일은 click 그대로 → 기존 bubbleOpen 사용하면 됨
  };
  bubbleOpen_aiHome();
};

// 답변 화면 (tune_aiAnswer, .tune_aiExploreAnswer) )
var tune_aiAnswer = function() {
  var aiAnswer1 = $(".container .tune_aiAnswer");
  var aiAnswer2 = $(".container .tune_aiExploreAnswer");
  
  // tune_aiAnswer 클래스가 있으면 html 태그에 스크롤 제외
  if ($(aiAnswer1).length > 0) {
    $('html').css('overflow-y', 'hidden');
    aiAnswer1.closest('.container').addClass("tune_aiAnswer");
  }

  if (aiAnswer2.length > 0) {
    $("html").css("overflow-y", "hidden");
  }

   // 동동이 박스옆에 따라다니는 스크립트
  const $qnaBox = $('.tune_aiAnswer .qnaBox, .tune_aiExploreAnswer .qnaBox');

  function updateFloatingOptionBox() {
      const qnaScrollTop = $qnaBox.scrollTop();

      $('.Abox').each(function () {
          const $abox = $(this);
          const $optionBox = $abox.find('.optionBox');

          const aboxTop = $abox.position().top;
          const aboxHeight = $abox.outerHeight();
          const optionBoxHeight = $optionBox.outerHeight();

          const scrolledInAbox = -aboxTop;

          const maxFloat = aboxHeight - optionBoxHeight;

          if (aboxTop <= 0 && aboxTop + aboxHeight > 0) {
              const floatTop = Math.min(scrolledInAbox, maxFloat);

              $optionBox
                  .addClass('floatingOptionBox')
                  .css({
                      top: floatTop + 'px'
                  });
          } else {
              $optionBox
                  .removeClass('floatingOptionBox')
                  .css({
                      top: '0'
                  });
          }
      });
  }

  $qnaBox.on('scroll', updateFloatingOptionBox);
  updateFloatingOptionBox();
};

// AI 구독 리스트 버튼명 변경
var tune_aiPricePlan = function () {
  var list = $(".tune_aiPricePlan .box_listPrice .list");

    $(list).each(function() {
    const $this = $(this);

    if ($this.hasClass("pick")) {
      // pick 된 요소 → 해지하기
      $this.find("button").text("해지하기");

      // pick 이후 요소들 → 업그레이드
      $this.nextAll(".list").find("button").text("요금제 업그레이드");

      // pick 이전 요소들 → 다운그레이드
      $this.prevAll(".list").find("button").text("다운그레이드");
    }
  });
};


// AI스튜디오 > 체험판 로그인 (trialLogin)
//  input에 active되었을때 부모 .inputBax에 .active클래스 추가
var menu_aiTrialLogin = function () {
  var inputs = $('.tune_aiTrialLogin .sec_input .inputBox input');

  // focus 시 active 추가
  inputs.on('focus', function () {
    $(this).closest('.inputBox').addClass('active');
  });

  // blur 시 active 제거 (값 여부 상관없이)
  inputs.on('blur', function () {
    $(this).closest('.inputBox').removeClass('active');
  });
};

// CDP > RFM분석 (tune_rfmAnalysis)
//  그리드 BOX의 순서에 맞게 우측 LI 를 DISPLAY: BLOCK; 
var menu_tune_rfmAnalysis = function () {
  var box = $('.tune_rfmAnalysis .sec_rfmAnalysis .box_rfmAnalysis .chartBox .box');
  var li = $('.tune_rfmAnalysis .sec_rfmAnalysis .box_rfmAnalysis .detailBox .nowAnalysis li');
  
  // .chartBox 안의 .box 클릭 이벤트
  $(box).on('click', function () {
    const idx = $(this).index(); // 클릭된 box의 순서
    
    // box on 처리
    $(box).removeClass("on");
    $(this).addClass('on');
    
    const $lis = $(li);

    // 모든 li on 제거
    $lis.removeClass("on");

    // 해당 index만 on
    $lis.eq(idx).addClass('on');
  });
};




//* modal */
var modalEtc = function () {
  //* 상품 추천  */
var md_prodRecommend = function() {
  var toggle_btn =  $(".md_prodRecommend .divTblTr button");
    toggle_btn.each(function () {
      $(this).on("click", function () {
          $(this).toggleClass("on");
        });
    });
};

//* 데이터 전송 통계  */
var md_dataStats = function() {
var tabBoxBtn = $(".md_dataStats .tab li");
var tabBoxList = $(".md_dataStats .tabView > .tabViewList ");
$(tabBoxBtn).click(function (e) {
    $(tabBoxBtn).removeClass("on");
    var index = $(this).addClass("on").index();
    $(tabBoxList).removeClass("show");
    $(tabBoxList).eq(index).addClass("show");
});
};

  //* 캠페인 통계  */
var md_campaignStats = function() {
  var tabBoxBtn = $(".md_campaignStats .tab li");
  var tabBoxList = $(".md_campaignStats .tabView > .tabViewList ");
  $(tabBoxBtn).click(function (e) {
      $(tabBoxBtn).removeClass("on");
      var index = $(this).addClass("on").index();
      $(tabBoxList).removeClass("show");
      $(tabBoxList).eq(index).addClass("show");
  });
};

var md_dbUpload = function() {
  var inputFile = $(".md_dbUpload #inputFile");
  $(inputFile).on('change', function () {
      var fileName = $(inputFile).val();
      $(".md_dbUpload .uploadName").val(fileName);
  });
};


var md_eventChange = function(){
  var sortButton = $(".md_eventChange #sortPick, .md_eventChange #sortList");
  //* li 이동 */
    $(sortButton).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
};

//* 데이터매니저 수정 */ 
//* 닫기 버튼 클릭시 버튼 상위박스인 box 제거 */
var md_dataModify = function(){
    var closeButton = $(".md_dataModify button.close");
    var closeBox = $(".md_dataModify .box");
      $(closeButton).on("click", function () {
          $(this).closest(closeBox).remove();
        });
};

//* 데이터매니저 이벤트 생성/수정, 스크립트 추가, 스크립트 수정 */ 
var md_eventCreate = function(){
  //* 닫기 버튼 클릭시 버튼 상위박스인 box 제거 */
  var closeBoxButton = $(".md_eventCreate .box > .buttonBox button.close, .md_eventModify .box > .buttonBox button.close");
  var closeBox = $(".md_eventCreate .box, .md_eventModify .box");
    $(closeBoxButton).on("click", function () {
        $(this).closest(closeBox).remove();
      });
  //* 닫기 버튼 클릭시 버튼 상위박스인 box 제거 */
  var closeChildButton = $(".md_eventCreate li button.close, .md_eventModify li button.close");
  var closeChildBox = $(".md_eventCreate .groupBox, .md_eventCreate .eachBox, .md_eventModify .groupBox, .md_eventModify .eachBox");
    $(closeChildButton).on("click", function () {
        $(this).closest(closeChildBox).remove();
      });

  var removeButton = $(".md_eventCreate button.minus,.md_eventModify button.minus, .md_scriptAdd button.minus, .md_scriptModify button.minus");
  var removeLiButton =$(".md_eventCreate button.remove,.md_eventModify button.remove");
      //* 가까운 div 제거 */ 
  $(removeButton).on("click", function () {
    $(this).closest("div").remove();
  });
  //* 해당 li 제거 */
    $(removeLiButton).on("click", function () {
      $(this).closest("li").remove();
    });
};

//* 데이터매니저 > 데이터 수정 (md_eventModify) */
// drag&drop > 같은 레벨끼리 drag & drop 기능
var md_eventModify2 = function () {
  var moveArea = $("[class^='jq_sortable']");

  $(moveArea).each(function () {
  const children = $(this).children();
  if (children.length === 1) {
    // 자식이 하나일 때만 선택
  $(this).find("i.moveLine").addClass("disabled");  }
});


  moveArea.sortable({
    handle: ".moveLine",     // 핸들은 버튼
    // items: "> div",          // 정렬 대상은 하위 div
    // placeholder: "drag-placeholder",
    containment: "parent",
    tolerance: "pointer",
     cancel: ".moveLine.disabled" // .moveLine에.disabled 클래스가 같이 있는 경우 sortable 안되게
  });
};



/* 데이터매니저 > my도메인 정보 */ 
/* li 토글 */
var md_domainInfo = function(){
  var li = $(".md_domainInfo li");

  li.click(function (event) {
  // li를 클릭한 경우에만 toggle 이벤트 수행
    if ($(event.target).closest('li')[0] === this) {
    $(this).toggleClass("on");
    }
  });

  // li의 자식 요소들에 대한 클릭 이벤트 중단
  li.find('*').click(function(event) {
    event.stopPropagation();
  });
};

/* CDP > 캠페인생성 > 커스텀 트래킹 선택 (md_trackingCustom) */ 
/* 삭제버튼 클릭시 listTit이 없으면 line 삭제 or listTit 이 있으면 box 삭제 */
var md_trackingCustom = function(){
    var btnClose = $(".md_trackingCustom .box_listChild button.btnLineRemove");

    btnClose.click(function () {
        var closestListSub = $(this).closest('.listSub');
        var closestList = $(this).closest('.list');

        if (closestListSub.length) {
            closestListSub.remove();
        } else {
            var closestListTit = closestList.find('p.listTit');
            if (closestListTit.length) {
                closestList.closest('.box_listChild').remove();
            } else {
                closestList.remove();
            }
        }
    });
};

//* 캠페인 상품 선택(md_campaignChoice)   */
var md_campaignChoice = function() {
  var radioButton = $(".md_campaignChoice table input[type='radio']+label");
  var trList = $(".md_campaignChoice table tbody tr");
  var optionButton = $(".md_campaignChoice button.optionChoice");
  
  // td의 radio 클릭시 해당 tr에 on 클래스 토글
  $(radioButton).click(function (e) {
    $(trList).removeClass("on");
    $(this).closest('tr').addClass("on");
  });

  // 버튼(옵션선택) 클릭하면 상품명 td에 optionBox toggle 
  $(optionButton).click(function (e) {
    $(this).closest('tr').find(".optionBox").toggleClass('on');
  });
};

//* 원태그 > 마이태그 분석 (md_mytagAnalysis)   */
var md_mytagAnalysis = function() {
  var tdCheck = $(".md_mytagAnalysis table input[type='checkbox']");
  var scriptDetail = $(".md_mytagAnalysis table td a");

  // td의 checkbox 클릭시 해당 tr에 on 클래스 토글
  $(tdCheck).change(function () {
    if ($(this).prop('checked')) {
      // 체크된 경우 tr에 on 클래스 추가
      $(this).closest('tr').addClass('on');
    } else {
      // 체크 해제된 경우 tr에 on 클래스 제거
      $(this).closest('tr').removeClass('on');
    }
  });
  
  // 스크립트 a 클릭하면 tr.script에 on 클래스 토글
 $(scriptDetail).click(function (e) {
     $(this).closest('tr').next('.script').toggleClass('on');
  });
};

//* AI 스튜디오 > 메일 보내기 (md_sendMail)   */
var md_sendMail = function() {
  var btnToggle = $(".md_sendMail button.addMail");
  
  // 버튼 클릭시 on 클래스 토글
  $(btnToggle).click(function (e) {
    $(this).toggleClass("on");
  });
};


//* AI 스튜디오 > 리포트 빌더 (md_reportBuilder)   */
var md_reportBuilder = function() {
  var btnToggle = $(".md_reportBuilder .chkListBox .listBox > ul > li");

  // li 클릭 시 active 토글
  $(btnToggle).click(function (e) {
    $(this).toggleClass("active");
  });

  // li 안의 input/label 클릭 시 부모 이벤트 막기
  $(btnToggle).find("input, label").click(function (e) {
    e.stopPropagation();
  });

  // 전체보기 버튼 클릭 시 -> 같은 ul 안의 li들에 active 추가
  $(".md_reportBuilder .chkListBox .listBox li.openAll button").click(function (e) {
    e.stopPropagation();
    $(this)
      .closest("ul")     // 같은 ul 안에서
      .find("> li")      // 직계 li 전부 찾고
      .not(".openAll")   // openAll은 제외
      .addClass("active");
  });

  // 지표추가 체크박스 선택되었을 때 하단 지표주가 리스트 active 
  // chkListBox 안에서 두 번째 체크박스(.listOpen)에 반응
  $(".chkListBox .checkBox input.listOpen").on("change", function () {
    const listBox = $(this).closest(".chkListBox").find(".listBox");
    if ($(this).is(":checked")) {
      listBox.addClass("active");
    } else {
      listBox.removeClass("active");
    }
  });
  
    // listArea의 input:checkbox의 total 갯수를 .chkCount에 보여주기
  // listArea의 input:checkbox의 total 갯수를 .chkCount에 보여주기
  var ChkCount = function() {
  function updateChkCount() {
    var count = $(".chkListBox .listBox input[type='checkbox']:checked").length;

    var $countSpan = $(".chkListBox .checkBox .count");

    if (count === 0) {
      $countSpan.hide();   // 숫자 없으면 숨김
    } else {
      $countSpan.show().text(count); // 숫자 있으면 표시
    }
  }

  // 초기 표시
  updateChkCount();

  // 체크박스 상태가 바뀔 때마다 갱신
  $(".chkListBox .listBox input[type='checkbox']").on("change", function() {
    updateChkCount();
  });
  };

  // 초기 표시
  ChkCount();
};




  $(function () {
  md_prodRecommend();
  md_dataStats();
  md_campaignStats();
  md_dbUpload();
  md_eventChange();
  md_dataModify();
  md_eventCreate();
  md_eventModify2(); //데이터매니저 > 데이터수정 >> 같은 레벨끼리 drag&drop기능
  md_domainInfo();
  md_trackingCustom();
  md_campaignChoice();
  md_mytagAnalysis();
  widget();
  md_sendMail(); // AI스튜디오 > 메일 보내기 버튼 ON 클래스 토글
  // tablePath();
  md_reportBuilder();
  });
};



$(function () {
  /* 공통 */
  // themeType();
  // daterangepicker_type();
  themeTypeToggle();
  navigation();
  modalOpen();
  bubbleOpen();
  iMark();
  map();
  daterangepicker();
  daterangepicker_Single();
  daterangepickerTime_single();
  timePicker();
  checkboxAll();
  // clickOff();
  tab();
  ipSelect();
  fileBox();
  selectDiv();
  selectChkDiv(); // 체크박스로 된 셀렉트박스 
  /* 메뉴별 */
  tabBoxBtn();
  adAnalysis();
  productAnalysis();
  campaignList_toggle();
  campaignCreate();
  rfmGraphToggle();
  customerValueAnalysis();  
  modalEtc();
  scriptToggle();
  keywordDashboard_keywordBoxScroll();
  keywordSummary_outputPosition();
  // dataManagerStart();
  dataCollect();
  dataProvide();
  // campaignList();
  channelRule(); // 데이터매니저 > 채널별 규칙관리 (tune_channelRule)
  // btn_toggleOnOff(); // 토글 버튼 클래스 변경 (btnToggle on/off)
  table_toggle(); //데이터매니저  > 트래킹링크 관리 > 트래킹 링크 통계 >> table > td > a.btnToggle 버튼 클릭시 자식 table 보였다 안보이게 (toggle)
  siteAnalysis();
  menu_ai_vedio();
  scrollYnone(); //container 에 scsrollYnone 클래스가 있는경우 html태그의 scroll-y 제거
  tune_aiSlide(); //AI스튜디오 > 리포트라운지, AI질문&탐색 메뉴 > 슬라이드 추가
  moreBox(); // 튠공통 , AI스튜디오 > 리포트 보관함 > button.more클릭시 .moreBox toggle
  tune_dataManagerDataStats(); // 데이터매니저 > 데이터 통계 >> 기간비교 토글 on/off시 calendar, checkbox display
  tune_aiPricePlan(); // AI스튜디오 > AI구독리스트 > pick된 요금제에 따라 버튼명 변경
});

// 페이지별
$(function () {
  tune_ai(); // tune_ai 클래스가 container하위에 있는경우 container에 tune_ai 클래스 추가
  tune_aiHome(); // 모바일사이즈일때 navigation, container 에 closed, wide-view 클래스 제어, bubbleWrap.bw_category 의 페이징, 모바일사이즈일때 버블 클릭이벤트, pc사이즈일때 버블 mouseenter 이벤트로 버블 제어
  tune_aiAnswer(); // tune_aiAnswer, tune_aiExploreAnswer 클래스가 있는경우 html태그에 scroll-y 제거, 동동이 박스옆에 따라다니는 스크립트
  cdp_dashboard(); // 유저퍼널분석에 bubbleOpen 이 포함된 box .bg에 on클래스 토글
  menu_aiTrialLogin(); // input에 active되었을때 부모 .inputBax에 .active클래스 추가
  menu_tune_rfmAnalysis(); // CDP > RFM분석 >> 그리드 BOX의 순서에 맞게 우측 LI 를 DISPLAY: BLOCK;
});