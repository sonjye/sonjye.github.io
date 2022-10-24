
var navigation = function(){
   /* header 유저메뉴 리스트 토글 */
   var userMenuIcon = $("header .userinfo .userMenu .btnUserMenu");
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
    });
    $(".navigation ul li:has(ul)").addClass("has-list");
    $(".navigation > ul > li > a").on("click", function () {
        var nextEl = $(this).next();
        $(".navigation > ul > li").removeClass("active");
        $(this).closest("li").addClass("active");
        if (nextEl.is("ul") && nextEl.is(":visible")) {
            $(this).closest("li").removeClass("active");
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

/* tabButton  li로 만든 탭의 형태 */
var tabButton = function () {
    $(".tabButton li").click(function (e) {
    $(this).closest(".tabButton").find("li").removeClass("on");
    $(this).addClass("on");
    });
};

/* iMark 마우스 오버 & 마우스 아웃시 말풍선 효과 */
var iBubble = function () {
  var iBubble = $(".Qmark, .iMark");
  var iBubbleHover = $(".QmarkHover, .iMarkAfter");
    $(iBubble).on('mouseover', function () {
        $(this).siblings(iBubbleHover).css('display', 'block');
    }).on('mouseout', function () {
        $(iBubbleHover).css('display', 'none');
    });
};


$(function () {
  navigation();
  daterangepicker();
  tab();
  tabButton();
  iBubble();
});

