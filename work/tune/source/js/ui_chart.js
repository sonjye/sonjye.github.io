/*
    File  : ui_chart.js
    Date  : 2025.10.22
    menu  : chart 테스트
*/


//* chart */
var chart = function () {
  
  //* gauge 차트 */
  // 원태그 > 대시보드 (tune_tagDashboard)
  // 원태그, 사이트성능분석 (tune_siteAnalysis)
  var gaugeChart = function () {
    var type = $(".wrap");
    
    type.each(function () {
      document.querySelectorAll("[id^='graphGauge']").forEach((el, idx) => {
        let thickness = 20; // 기본 두께 
        if (el.id === 'graphGauge_t1') {
            thickness = 30; // graphGauge_t1만 30 
        }
        Highcharts.chart(el.id, {
            chart: {
                type: 'gauge',
                backgroundColor: 'transparent',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: '80%',
                events: {
                  load: function () {
                    // 차트 부모 div의 overflow 해제 
                    this.renderTo.style.overflow = 'visible';
                    // 차트 내부 svg 컨테이너도 혹시 모를 경우 대비 
                    this.container.style.overflow = 'visible';
                  }
                }
            },
            title: {
                text: null
            },
            exporting: {
                enabled: false // 메뉴 아이콘 제거
            },
            credits: {
                enabled: false  // 하단 highcharts.com 제거
            },
            pane: el.id === 'graphGauge_t1' ? {
                startAngle: -90,
                endAngle: 90,
                background: null,
                center: ['50%', '75%'], // 🔹 t1만 위쪽
                size: '110%'
            } : {
                startAngle: -90,
                endAngle: 90,
                background: null,
                center: ['50%', '70%'], // 다른 게이지 기본 위치 
                size: '110%'
            },
            yAxis: {
                min: 0,
                max: 200,
                tickPixelInterval: 72,
                tickPosition: 'inside',
                tickColor: 'transparent',
                tickLength: 0,
                tickWidth: 0,
                minorTickInterval: null,
                labels: {
                    enabled: false
                },
                lineWidth: 0,
                plotBands: [{
                    from: 0,
                    to: 200,
                    color: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 1,
                            y2: 0
                        },
                        stops: [
                            [0, '#ff0000'],
                            [0.5, '#fbbe30'],
                            [0.7, '#fbbe30'], // 80% 지점 → 노랑 유지
                            [1, 'var(--pointColor)']
                        ]
                    },
                    thickness: thickness,
                    borderRadius: '50%'
                }]
            },
            series: [{
                name: 'Speed',
                data: [80],
                tooltip: {
                    valueSuffix: null
                },
                dataLabels: {
                    enabled: true, // 🔹 숫자 표시
                    format: '{y}', // y 값 그대로 표시 (0~200)
                    borderWidth: 0,
                    style: el.id === 'graphGauge_t1' ? { // 🔹 t1만 폰트 24px
                        fontSize: '28px',
                        // fontFamily: 'notokr-medium',
                        // fontWeight: 'bold',
                        // color: 'var(--ftColor6)'
                    } : { // 다른 게이지 기본 스타일
                        fontSize: '16px',
                        // fontFamily: 'notokr-medium',
                        // fontWeight: 'bold',
                        // color: 'var(--ftColor6)'
                    },
                    y: 20, // 숫자 세로 위치 조정 
                    x: 0 // 가로 위치 조절
                },
                dial: {
                    radius: '50%', // 🔹 바늘 길이 비율 (100%가 yAxis 최대 반지름)
                    // backgroundColor: 'var(--ftColor6)',
                    baseWidth: 12,
                    baseLength: '0%',
                    rearLength: '0%'
                },
                pivot: {
                    // backgroundColor: 'var(--ftColor6)',
                    radius: 6
                }
            }]
        });
        // 자동 갱신
        setInterval(() => {
            const chart = Highcharts.charts.find(c => c && c.renderTo.id === el
            .id);
            if (chart && !chart.renderer.forExport) {
                const point = chart.series[0].points[0],
                    inc = Math.round((Math.random() - 0.5) * 20);
                let newVal = point.y + inc;
                if (newVal < 0 || newVal > 200) newVal = point.y - inc;
                point.update(newVal);
            }
        }, 3000);
    });
                    
    });
  };


  $(function () {
  gaugeChart();  // 원태그 > 대시보드, 사이트성능분석에 들어가는 게이지 차트
  });
};

//* diagram */
var diagram = function () {
  function drawGraphLines() {
    const colors = ["#489eff", "#b4b4b4", "#7277ff", "#6c9dfe", "#72beff", "#72e7ff", "#6bfbf1"];
    let colorIndex = 0; // 전역 색상 인덱스

    $(".graph li").each(function () {
      const $li = $(this);
      const $info = $li.children(".info");
      const $line = $info.find(".line");
      const $subLis = $li.children("ul").children("li");

      if ($subLis.length === 0) {
        $line.empty();
        return;
      }

      $line.empty();

      // 부모 li 중심 좌표
      const parentOffset = $li.offset();
      const parentCenter = {
        x: parentOffset.left - 30,
        y: parentOffset.top + $li.outerHeight() / 2,
      };

      $subLis.each(function () {
        const $childLi = $(this);
        const childOffset = $childLi.offset();
        const childCenter = {
          x: childOffset.left,
          y: childOffset.top + $childLi.outerHeight() / 2,
        };

        const dx = childCenter.x - parentCenter.x;
        const dy = childCenter.y - parentCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const lineHeight = 30;
        const startX = -40;
        const startY = $li.outerHeight() / 2 - lineHeight / 2;

        const $lineDiv = $("<div>").css({
          position: "absolute",
          top: `${startY}px`,
          left: `${startX}px`,
          width: `${distance}px`,
          height: `${lineHeight}px`,
          backgroundColor: colors[colorIndex % colors.length], // 전역 색상 순서
          opacity: 0.4,
          transformOrigin: "0 50%",
          transform: `rotate(${angle}deg)`,
          borderRadius: "15px",
          pointerEvents: "none",
        });

        $line.append($lineDiv);

        colorIndex++; // 다음 선 색상으로 이동
      });
    });
  }

  $(window).on("load", function () {
    requestAnimationFrame(() => setTimeout(drawGraphLines, 100));
  });

  $(window).on("resize", function () {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(drawGraphLines, 200);
  });
};







/* 공통 */
$(function () {
  chart();
  // diagram();
  // treegraph();
  diagram();
});

