/*
    File  : ui.js
    Date  : 2025.09.01
    menu  : 공통 js
*/


//* navigation */ 
var navigation = function(){
  $(".header .menuToggle").on("click", function () {
    $(".wrap").toggleClass("minimization");
     $(this).toggleClass('minimization');
  });

  // nav hover 
 $("nav").hover(function() {
  if($('.menuToggle').hasClass('minimization') === true){
      $(".wrap").removeClass("minimization");
  }
  },function() {
      if($('.menuToggle').hasClass('minimization') === true){
          $(".wrap").addClass("minimization");
      }
  });

  // sideNav > menuMore , nav 클릭시 toggle class
  $('.menuMore').on('click',function(){
    $(this).toggleClass('on');
  });
};
    
//* navigation */
var navigation2 = function(){
  var nav1 = (".navigation ul.menu_list > li > a");
  var nav2 = (".navigation ul.menu_list > li > ul");
  var nav2_1 = $(".navigation ul.menu_list > li > ul > li > a");

  // 1deps on 클래스 추가 
  $(nav1).on('click',function(){
    $(this).closest(".menu_list").find(">li >a").removeClass("on");
    $(this).closest(".menu_list").find(">li >ul").slideUp("fast");
    $(this).addClass('on');

  // 2deps 
  var nextEl = $(this).next();  // 클릭한 항목의 바로 다음 요소 (ul)

    if (!nextEl.is("ul")) {
      $(nav2).removeClass("active"); // 'ul'이 없으면 모든 'ul'에서 'active' 클래스 제거
      nextEl.slideUp("fast");
    }

    if (nextEl.is("ul") && nextEl.is(":visible")) {
      nextEl.slideUp("fast");
    }

    if (nextEl.is("ul") && !nextEl.is(":visible")) {
      $(nav2).removeClass("active");
      $(".navigation ul > li > ul:visible").slideUp(300);
      nextEl.slideDown("fast");
    }

    if (nextEl.is("ul")) {
        return false;
    } else {
        return true;
    }
  });

  $(nav2_1).on('click',function(){
    $(nav2_1).removeClass("on"); 
    $(this).addClass("on");
  });
};


//* daterangepicker */ 
var daterangepicker = function () {
  $("[id^='dateInput']").each(function() {
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
var daterangepicker_single = function () {
  $("[id^='datePickerS']").each(function() {
    var _this = this.id;
    // var datePicker = ("#datePickerS1 .calendar");
    // var clickOff = ("#datePickerS1.off .calendar")

  $('#'+_this).daterangepicker(
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
      // $("input[name=Date]").val(start.format("YYYY-MM-DD"));
    }
  );

  /* input에 yyyy.mm.dd 형태로 날짜 입력 */
  // $("input[name=Date]").val($.datepicker.formatDate($.datepicker.ATOM, new Date()));    
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

//* click 막기 */
var clickOff = function (){
  var clickOff = ('.clickOff');
  $(clickOff).off("click");
};


var txtEffect = function(){
  const text = "안녕하세요. 가칭미디어 홍길동입니다.아래 내역으로 제안 요청 드립니다. 글자 이벤트 테스트 입니다.";
  let i = 0;
  const typingEl = document.querySelector(".txtEffect");

  function typing() {
      if (i < text.length) {
          typingEl.innerHTML = text.slice(0, i + 1);
          i++;
          setTimeout(typing, 80);
      }
  }
  typing();
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

/* table sort-sortUp-sortDown 순서대로 변경되게 */
var tableSort = function () {
 const sortOrders = {
        "sort": "sortUp",
        "sortUp": "sortDown",
        "sortDown": "sort"
    };

    $("th.sort, th.sortUp, th.sortDown").click(function () {
        let $this = $(this);

        // 현재 적용된 클래스 찾기
        let currentClass = Object.keys(sortOrders).find(cls => $this.hasClass(cls)) || "sort";

        // 다음 클래스 가져오기
        let nextClass = sortOrders[currentClass];

        // 기존 클래스 제거 후 새로운 클래스 추가
        $this.removeClass("sort sortUp sortDown").addClass(nextClass);
    });
};



//* common */
$(function () {
  modalOpen();
  clickOff();
  checkboxAll();
  navigation();
  navigation2();
  daterangepicker();
  daterangepicker_single();
  tableSort();
});



