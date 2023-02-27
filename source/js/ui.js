
var navigation = function(){
  var lastScroll = 0;
  var scrollPosition = $(window).height();
  $(window).scroll(function(event){
    var scroll = $(this).scrollTop();
    if(scroll > scrollPosition) {
      $(".header").removeClass("headerWht");
    }
    else {
      $(".header").addClass("headerWht");
    }
    lastScroll = scroll;
  });

//  if($(window).scrollTop() > $('.a').height() -51) {
//   $('.b').addClass('c');
//  }
//  else if($(window).scrollTop() < $('#a').height() -51){
//     $('.b').removeClass('c');
//  }
};

var daterangepicker = function () {
  $("#dateInput").daterangepicker(
    {
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
  $("#dateInput2").daterangepicker(
    {
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
  /* 제일 오른쪽 부분 없음 */
  $("#dateInput3").daterangepicker(
      {
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
          ranges: false
      },
      function (start, end, label) {
          // console.log("Choice Date: " + start.format('YYYYMMDD') + ' ~ ' + end.format('YYYYMMDD'));
          $("input[name=sDate]").val(start.format("YYYYMMDD"));
          $("input[name=eDate]").val(end.format("YYYYMMDD"));
          $("#searchForm").submit();
      }
  );
};

var tab = function () {
    $(".tab li").click(function (e) {
    $(this).closest("section").find(".tab li").removeClass("on");
    var tabIndex = $(this).addClass("on").index();
    var tabListIndex = $(this).closest("section").find(".tabView > .tabViewList");
    $(tabListIndex).removeClass("show");
    $(tabListIndex).eq(tabIndex).addClass("show");
    });
};

/* iMark 마우스 오버 & 마우스 아웃시 말풍선 효과 */
var iBubble = function () {
    $('.iMark').on('mouseover', function () {
        $(this).siblings(".iMarkHover").css('display', 'block');
    }).on('mouseout', function () {
        $('.iMarkHover').css('display', 'none');
    });
};


$(function () {
  navigation();
  daterangepicker();
  tab();
  iBubble();
});

