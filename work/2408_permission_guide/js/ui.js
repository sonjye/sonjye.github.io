/*
    File  : ui3.js
    Date  : 2024.07.03
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
  $('.menuMore, .menu_list > li > a').on('click',function(){
    $(this).toggleClass('on');
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
      $("input[name=Date]").val(start.format("YYYY-MM-DD"));
    }
  );

  /* input에 yyyy.mm.dd 형태로 날짜 입력 */
  $("input[name=Date]").val($.datepicker.formatDate($.datepicker.ATOM, new Date()));    
  });
};

// 달력고정(datepicker) > 광고등록 메뉴
var datepicker_pix = function(){
  $("[id^='datepickerPix']").each(function() {
  var _this = this.id;
  $('#'+_this).datepicker({
      dateFormat: "yy",
      monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)', '7월(JUL)',
          '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'
      ],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월',
          '12월'],
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShot: ['일', '월', '화', '수', '목', '금', '토'],
      //dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      // minDate: +3, // disabled 확인용
      // maxDate: 17, // disabled 확인용
  });
 });
}

//* timepicker */ 
var timePicker = function() {
  $("[id^='timePicker'] input").timepicker({
    timeFormat: 'HH:mm',
    interval: 1,
    minTime: '12:00am',
    maxTime: '11:59pm',
    defaultTime: 'now',
    startTime: '10:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
};



//* iMark */ 
var iMark = function () {
  var iMarkBtn = $(".iMark");
  iMarkBtn.each(function () {
    //i_mark 마우스 오버 & 마우스 아웃시 말풍선 효과
    $(this).on('mouseover', function () {
      $(this).siblings(".iMarkHover").css('display', 'block');
    }).on('mouseout', function () {
      $('.iMarkHover').css('display', 'none');
    })
  });
};



//* select div */
var selectDiv = function(){
  var selectDiv = $(".selectDiv");
  var selected = $(".selectDiv .selected");
  var selectList = (".selectDiv ul li")

  /* select toggle */
  $(selected).click(function(){
    $(this).closest(selectDiv).find(".selectList").toggle();    
    $(this).addClass("active");
  });
  
  //* select change */
  $(selectList).click(function(){
     var selectLi = $(this).html();
     /* li active 클래스 붙이기 */
     $(this).closest("ul").find("li").removeClass("active");
     $(this).addClass("active");
     //* selected 내용 선택된 li 내용으로 변경 */
     $(this).closest(selectDiv).find(".selected p").html(selectLi);

     /* ul 닫기 */
     $(this).closest(".selectList").toggle();
     // selected에 active 클래스 제거
    $(selected).removeClass("active");
  });

  //* selectDiv 이외 선택시 select list 닫기 */
  $(document).on("click", function(e){
    if(selectDiv !== event.target && !selectDiv.has(event.target).length){
          $(selectDiv).find(".selectList").hide();
          $(selected).removeClass("active");
     }    
  });
};

var selectChkBox = function(){
  // var selectDiv = $(".selectChkBox");
  var selected = $(".selectChkBox .selected");
    $(selected).click(function(){
      $(this).toggleClass("active");
  });
};


var tab = function () {
  $(".tab li").click(function () {
    $(this).closest("section").find(".tab li").removeClass("on");
    var tabIndex = $(this).addClass("on").index();
    var tabListIndex = $(this).closest("section").find(".tabView > .tabViewList");
    $(tabListIndex).removeClass("show");
    $(tabListIndex).eq(tabIndex).addClass("show");
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



//* each 메뉴별 jquery  */
//* modal */
//* md_payment > 라디오버튼 선택여부에 따라 하단 block 다르게 display */
var md_payment = function () {
  $(".md_payment").each(function () {
    var $md_payment = $(this); // 현재의 .md_payment 요소를 jQuery 객체로 저장
    
    // 기본세팅 > 무통장입금 hide 
    $(".bankbookList").hide();
    
    $md_payment.find(".radioBox input[type='radio']").change(function () {     
      var rdButton1 = $md_payment.find(".radioBox input:eq(0)").is(':checked');
      var rdButton2 = $md_payment.find(".radioBox input:eq(1)").is(':checked');
      var cardList = $md_payment.find(".cardList");
      var bankbookList = $md_payment.find(".bankbookList");
      if (rdButton1) {
        cardList.show();
        bankbookList.hide();
      } else if (rdButton2) {
        cardList.hide();
        bankbookList.show();
      }
    });
  });
};


//* common */
$(function () {
  modalOpen();
  clickOff();
  checkboxAll();
  navigation();
  datepicker_pix();
  daterangepicker();
  daterangepicker_single();
  timePicker();
  iMark();
  selectDiv();
  selectChkBox();
  tab();
});

//* each */
$(function () {
  md_payment();
});