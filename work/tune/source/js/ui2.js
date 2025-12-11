/*---------------------------------
    File  : ui2.js
    Date  : 2024.02.21
    menu  : 공통 js
/*---------------------------------*/


//* common */

//* Scroll Color 추가 */ 
var scrollColor = function () {
  var type = $(".wrap");
  
  type.each(function () {
    if ($(this).hasClass("typeB")) { 
      $(this).closest('html').addClass("scrollB");
      
    } else if ($(this).hasClass("typeC")) {
      $(this).closest('html').addClass("scrollC");
    }
  });

  // var type = $(".wrap");
  // var color = "#07e6ff";
  // var styles = "<style type='text/css'>body::-webkit-scrollbar-thumb{background-color:" + color + ";}</style>";   
  
  // type.each(function () {
  //   if ($(this).hasClass("typeB")) { 
  //     $(styles).appendTo('html');
      
  //   } else if ($(this).hasClass("typeC")) {
  //     color = "#3c71fd";
  //     styles = "<style type='text/css'>body::-webkit-scrollbar-thumb{background-color:" + color + ";}</style>";
  //     $(styles).appendTo('html');
  //   }
  // });
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

//* daterangepicker */ 
var daterangepicker = function () {
  $("#dateInput, #dateInputCrm").daterangepicker({
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


//* daterangepicker type 추가 */ 
var daterangepicker_type = function () {
  var type = $(".wrap");
  type.each(function () {
  if ($(".wrap").hasClass("typeB") === true) {
      $(this).closest("body").find(".daterangepicker").addClass("typeB");
    } else if ($(".wrap").hasClass("typeC") === true) {
       $(this).closest("body").find("daterangepicker").addClass("typeC");
     } else if ($(".wrap").hasClass("typeD") === true) {
       $(this).closest("body").find(".daterangepicker").addClass("typeD");
    }
  });
};

//* select div */
var selectDiv = function(){
  var selectDiv = $(".selectDiv");
  var selected = $(".selectDiv .selected");
  var selectList = (".selectDiv ul li")

  /* select toggle */
  $(selected).click(function(){
    $(this).closest(selectDiv).find("ul").toggle();    
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
     $(this).closest("ul").toggle();
  });

  //* selectDiv 이외 선택시 select list 닫기 */
  $(document).on("click", function(e){
    if(selectDiv !== event.target && !selectDiv.has(event.target).length){
          $(selectDiv).find("ul").hide();
     }    
  });
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


//* CDP */
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
  var tabButton = $(".customerValueAnalysis .sec_customerValueAnalysis .box_button button")
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

    //* 데이터매니저 > my도메인 정보 */ 
  //* 닫기 버튼 클릭시 버튼 상위박스인 box 제거 */
    var md_domainInfo = function(){
      var li = $(".md_domainInfo li");
        $(li).on("click", function () {
          $(this).parent("ul").children("li").removeClass("on");         
          $(this).slideDown(1000).addClass("on");
         });
  };

  
  $(function () {
  md_prodRecommend();
  md_dataStats();
  md_campaignStats();
  md_dbUpload();
  md_eventChange();
  md_dataModify();
  md_eventCreate();
  md_domainInfo();
  });
};



$(function () {
  /* 공통 */
  scrollColor();
  navigation();
  modalOpen();
  iMark();
  daterangepicker();
  daterangepicker_Single();
    daterangepickerTime_single();
  timePicker();
  daterangepicker_type();
  // clickOff();
  tab();
  selectDiv();
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
});