/*
    File  : ui.js
    Date  : 2025.02.06
    menu  : 공통 js 
	discription : 개발에서 ui.js 수정해서 사용하는 파일
*/


//* navigation */ 
var navigation = function(){
	$(".header .menuToggle").on("click", function(){
		$(".wrap").toggleClass("minimization");
		$(this).toggleClass('minimization');
	});

	// nav hover
	$("nav").hover(function(){
		if($('.menuToggle').hasClass('minimization') === true){
			$(".wrap").removeClass("minimization");
		}
	}, function(){
		if($('.menuToggle').hasClass('minimization') === true){
			$(".wrap").addClass("minimization");
		}
	});

	// sideNav > menuMore , nav 클릭시 toggle class
	$('.menuMore').on('click', function(){
		$(this).toggleClass('on');
	});
};

//* navigation */
var navigation2 = function(){
	var nav1 = (".navigation ul.menu_list > li > a");
	var nav2 = (".navigation ul.menu_list > li > ul");
	var nav2_1 = $(".navigation ul.menu_list > li > ul > li > a");

	// 1deps on 클래스 추가
	$(nav1).on('click', function(){
		$(this).closest(".menu_list").find(">li >a").removeClass("on");
		$(this).closest(".menu_list").find(">li >ul").slideUp("fast");
		$(this).addClass('on');

		// 2deps
		var nextEl = $(this).next();  // 클릭한 항목의 바로 다음 요소 (ul)

		if(!nextEl.is("ul")){
			$(nav2).removeClass("active"); // 'ul'이 없으면 모든 'ul'에서 'active' 클래스 제거
			nextEl.slideUp("fast");
		}

		if(nextEl.is("ul") && nextEl.is(":visible")){
			nextEl.slideUp("fast");
		}

		if(nextEl.is("ul") && !nextEl.is(":visible")){
			$(nav2).removeClass("active");
			$(".navigation ul > li > ul:visible").slideUp(300);
			nextEl.slideDown("fast");
		}

		if(nextEl.is("ul")){
			return false;
		}else{
			return true;
		}
	});

	$(nav2_1).on('click', function(){
		$(nav2_1).removeClass("on");
		$(this).addClass("on");
	});
};


//* daterangepicker */ 
var daterangepicker = function(){
	$("[id^='dateInput']").each(function(){
		var _this = this.id;
		$('#' + _this).daterangepicker({
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
			function(start, end, label){
				// console.log("Choice Date: " + start.format('YYYYMMDD') + ' ~ ' + end.format('YYYYMMDD'));
				$("input[name=sDate]").val(start.format("YYYYMMDD"));
				$("input[name=eDate]").val(end.format("YYYYMMDD"));
				$("#searchForm").submit();
			}
		);
	});
};

//* 날짜 하루만 선택 */
var daterangepicker_single = function(){
	$("[id^='datePickerS']").each(function(){
		var _this = this.id;
		// var datePicker = ("#datePickerS1 .calendar");
		// var clickOff = ("#datePickerS1.off .calendar")

		$('#' + _this).daterangepicker(
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
			function(start, end, label){
				// $("input[name=Date]").val(start.format("YYYY-MM-DD"));
			}
		);

		/* input에 yyyy.mm.dd 형태로 날짜 입력 */
		// $("input[name=Date]").val($.datepicker.formatDate($.datepicker.ATOM, new Date()));
	});
};

// 달력고정(datepicker) > 광고등록 메뉴
var datepicker_pix = function(){
	$("[id^='datepickerPix']").each(function(){
		var _this = this.id;
		$('#' + _this).datepicker({
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
var timePicker = function(){
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
var iMark = function(){
	var iMarkBtn = $(".iMark");
	iMarkBtn.each(function(){
		//i_mark 마우스 오버 & 마우스 아웃시 말풍선 효과
		$(this).on('mouseover', function(){
			$(this).siblings(".iMarkHover").css('display', 'block');
		}).on('mouseout', function(){
			$('.iMarkHover').css('display', 'none');
		})
	});
};


var tab = function(){
	$(".tab li").click(function(){
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
		if(typeof $(this).data("popname") == "undefined" && typeof $(this).data("url") != "undefined"){
			magnificPopup = popup.iframeOpen(
				$(this).data("url"),
				$(this).data("width"),
				$(this).data("hegiht"),
				$(this).data("scroll")
			);
		}else{
			$('#' + $(this).data("popname") + '').addClass('modalOn');
			$("html").css("overflow", "hidden");
		}
	});
	$('.modalClose, .modalDim').click(function(){
		$(this).parents('.modalWrap').removeClass('modalOn');
		$("html").css("overflow", "auto");
	});
};

//* click 막기 */
var clickOff = function(){
	var clickOff = ('.clickOff');
	$(clickOff).off("click");
};


/* chechbox all */
/* 아이디 값이 all또는 All이 포함되어 있으면 같은 name값을 가진 체크박스들 제어 가능하게 */
var checkboxAll = function(){
	$('input[type="checkbox"]').click(function(){
		var id = $(this).attr('id');
		if(id.includes('all') || id.includes('All')){
			var name = $(this).attr('name');
			var isChecked = $(this).prop('checked');
			$('input[type="checkbox"][name="' + name + '"]').prop('checked', isChecked);
		}else{
			var name = $(this).attr('name');
			var isChecked = $(this).prop('checked');
			var allCheckbox = $('input[type="checkbox"][name="' + name + '"][id*="all"], input[type="checkbox"][name="' + name + '"][id*="All"]');
			var otherCheckboxes = $('input[type="checkbox"][name="' + name + '"]').not(allCheckbox);
			if(!isChecked && allCheckbox.prop('checked')){
				allCheckbox.prop('checked', false);
			}else if(isChecked && otherCheckboxes.length === otherCheckboxes.filter(':checked').length){
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






//* each 메뉴별 jquery  */

/* 캠페인등록 (mva_adRegister) */
// btnClose클래스가 있는 버튼 클릭시 버튼 삭제
var btnClose = function(){
	var btn = $("button.btnClose");

	$(btn).click(function(){
		$(this).remove();
	});
};

/* 캠페인등록 (mva_adRegister) */
// btnClose클래스가 있는 버튼 클릭시 버튼 삭제
var vedioBtnClose = function(){
	var btn = $(".mva_adRegister .videoSelectBox button.close");

	$(btn).click(function(){
		$(this).closest(".box").remove();
	});
};


/* 캠페인현황 (mva_campaignList) */
var slide = function() {
    $(document).ready(function() {
    // 슬라이더를 감싸는 div
    var slide = $('.mva_campaignList .slide,.mva_dashboard .slide');

    // 슬라이드를 숨기고 보이기 위한 버튼
     $(document).ready(function () {
        $(slide).slick({
          dots: false,
          // variableWidth: true,
          arrows: false,
          vertical: false,
          autoplay: true,
          autoplaySpeed: 3000,
          cssEase: 'linear',
          infinite: true,
        });
    });
  });
}


/* 보고서 
> 일자별 보고서 (mva_reportDay)
> 캠페인별 보고서 (mva_reportKPI)
*/
// optionBox > radio 유형 > CPC/CPV 선택에 따라 하단 TABLE TH,TD 색상 변경 가능하게  SECTION에 T1/T2 클래스 추가 
var mva_report = function () {
  // let radioType = $(".mva_reportDay .optionBox .radioBox:first input[type='radio'][name='rd_type']");
  let radioType = $(".mva_reportDay, .mva_reportKPI, .mva_reportType")
    .find(".optionBox .radioBox input[type='radio'][name='rd_type']");


  $(radioType).change(function () {
      let $section = $(this).closest("section");
      let index = $(this).index("input[type='radio']"); // 전체 라디오 중 몇 번째인지 확인

      if (index === 0) { 
          // 첫 번째 라디오 선택 시
          $section.removeClass("t2").addClass("t1");
      } else if (index === 1) {
          // 두 번째 라디오 선택 시
          $section.removeClass("t1").addClass("t2");
      }
  });
};


/* 보고서 > 상품별 보고서 (mva_reportProduct) */
// 리스트 토글 > 앨범형보기(리스트보기)버튼으로 리스트 형태 변경
var mva_reportProduct = function(){
	var btn = $(".mva_reportProduct .sec_list button.listType");

	btn.click(function(){
		// 버튼의 현재 텍스트 가져오기
		var btnText = $(this).text();

		// 버튼 텍스트가 "앨범형보기"일 경우 "리스트보기"로 변경
		if(btnText === "앨범형보기"){
			$(this).text("리스트보기");
		}else{
			$(this).text("앨범형보기");
		}

		// 버튼 클릭 시 해당 영역의 클래스를 토글
		$(this).closest(".sec_list").find(".tableArea").toggleClass("show");
		$(this).closest(".sec_list").find(".albumArea").toggleClass("show");
	});
};


//* modal */
//* 캠페인등록 > 미리보기 (md_preview)   */
// var md_preview = function() {
//   var slick = $('.md_preview .slide');
//   $(document).ready(function () {
//     $(slick).slick({
//       dots: false,
//     });
//   });

//   var tabButton = $(".md_preview .tabButton input[type='radio']");
//   $(tabButton).click(function () {
//     var tabIndex = $(this).index('input[type="radio"]');
//     // var tabListIndex = $(this).closest("section").find(".previewArea > .previewList");
//     // $(tabListIndex).css('display', 'none');
//     // $(tabListIndex).eq(tabIndex).css('display', 'block');

//     $(slick).slick('slickGoTo', tabListIndex);
//   });

//   // var tabButton = $(".md_preview .tabButton input[type='radio']");
//   // $(tabButton).click(function () {
//   //   var tabIndex = $(this).index('input[type="radio"]');

//     // $(slick).slick('slickGoTo', tabIndex);
//   // });
// };

var md_preview = function(){
	// var slick = $('.md_preview .slide');

	// Slick 슬라이더 초기화
	// $(document).ready(function () {
	//   $(slick).slick({
	//     dots: false,
	//   });
	// });

	$(document).ready(function(){
		// 슬라이더를 감싸는 div
		var $slideContainer = $('.md_preview .slide');

		// 슬라이드를 숨기고 보이기 위한 버튼
		var modalOpen = $('[data-popname="md_preview"]');
		$(modalOpen).click(function(){
			// $('.modalOpen').click(function() {
			// 슬라이더를 보이게 하기
			$slideContainer.fadeIn(500); // 슬라이더가 보이게 됨

			// 슬라이드 초기화 (슬라이드가 보이게 된 후에 초기화)
			if(!$slideContainer.hasClass('slick-initialized')){
				$slideContainer.slick({
					dots: true,
					arrows: true,
					// 다른 옵션들
				});
			}
		});
	});

	// 라디오 버튼 클릭 이벤트
	var tabButton = $(".md_preview .tabButton input[type='radio']");
	$(tabButton).click(function(){
		var tabIndex = $(this).index('input[type="radio"]');
		// 클릭된 라디오 버튼의 인덱스를 가져옵니다
		var tabListIndex = $(this).closest("section").find(".previewArea > .previewList");
		$(tabListIndex).hide();
		$(tabListIndex).eq(tabIndex).show();
	});
};


//* 캠페인등록 미리보기-CPV > 썸네일 업로드 (md_uploadTN) */
var md_uploadTN = function(){
	var fileUpload = $('.md_uploadTN .fileBox #fileUpload');
	var filePreview = $('.md_uploadTN .fileBox .filePreview');
	var filePreviewImage = $('.md_uploadTN .fileBox .filePreview #filePreviewImage');
	var fileDeleteBtn = $('.md_uploadTN .fileBox .filePreview .close');
	$(fileUpload).on("change", function(e){
		const file = e.target.files[0];
		const previewLabel = $(filePreview);
		const previewImage = $(filePreviewImage);

		if(file){
			const reader = new FileReader();

			reader.onload = function(event){
				previewImage.attr("src", event.target.result);
				previewImage.show();
				previewLabel.css("display", "flex");
			};

			reader.readAsDataURL(file);
		}
	});

	$(fileDeleteBtn).on("click", function(){
		const previewLabel = $(filePreview);
		const previewImage = $(filePreviewImage);

		previewImage.hide();
		previewLabel.hide();
		$(fileUpload).val(""); // 파일 초기화
	});
};


//* common */
$(function(){
	modalOpen();
	clickOff();
	checkboxAll();
	navigation();
	navigation2();
	datepicker_pix();
	daterangepicker();
	daterangepicker_single();
	// timePicker();
	iMark();
	tab();
	btnClose(); // 개발에서 제어함
	tableSort();
});

//* each */
$(function(){
	vedioBtnClose(); // 개발에서 제어함
	mva_report();
	mva_reportProduct();
	md_preview();
	md_uploadTN();
	slide();
});


//* modal */
var popup = {};

popup.iframeOpen = function(url, iframeWidth, iframeHeight, scrollFlag, reloadFlag, closeFlag = true){
	scrollFlag = scrollFlag !== "" ? scrollFlag : "no";
	reloadFlag = reloadFlag != null ? "yes" : "no";

	var ww = $(window).width();

	iframeWidth = Math.floor(ww) > 800 ? iframeWidth : Math.floor(ww) - 100;

	var markup = '<div class="iframe-popup white-popup-admin" >' +
		'<iframe class="mfp-iframe" frameborder="0" scrolling="' +
		scrollFlag +
		'" allowtransparency="true" allowfullscreen style="width:' +
		iframeWidth +
		"px;height:" +
		iframeHeight +
		'px;"></iframe>' +
		//'<div class="mfp-close"></div>'+
		"</div>";

	if(typeof url.split('?')[0] != "undefined" && (url.split('?')[0] == "/advertiser/media_script_all" || url.split('?')[0] == "/advertiser/media_script_advance_all")){
		markup = '<div class="iframe-popup white-popup-admin" ><div class="loadingArea"><img src="/content/images/common/loading.gif" alt="로딩중" /></div>' +
			'<iframe class="mfp-iframe" frameborder="0" scrolling="' +
			scrollFlag +
			'" allowtransparency="true" allowfullscreen style="width:' +
			iframeWidth +
			"px;height:" +
			iframeHeight +
			'px;"></iframe>' +
			//'<div class="mfp-close"></div>'+
			"</div>";
	}

	$.magnificPopup.open({
		items: {src: url},
		type: "iframe",
		closeOnBgClick: closeFlag,
		iframe: {
			markup: markup
		},
		callbacks: {
			close: function(){
				if(reloadFlag === "yes"){
					location.reload();
				}

			}
		}
	});

	return $.magnificPopup.instance;
};

$(document).on('click', '.resetNoticeLogCount', function(){
	if($("#layoutNoticeLog").is(":visible") == true){
		$("#layoutNoticeLog").hide();
	}else{
		$("#layoutNoticeLog").show();
	}

	if($(".adverNoticeLogCount").length > 0){
		$.ajax({
			type: "get",
			dataType: "json",
			url: '/advertiser/welcome_alarm_proc',
			beforeSend: function(){
			},
			success: function searchSuccess(result){
				if(result.result == "Success"){
					$(".adverNoticeLogCount").remove();
				}else{
					alert("처리 중에 문제가 발생하였습니다. 관리자에게 문의부탁드립니다.");
				}
			},
			error: function(request, status, error){
				console.log(request, status, error);
			}
		});
	}

	$(".adverNoticeLogCount").remove();
});
