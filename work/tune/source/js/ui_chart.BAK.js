/*
    File  : ui_chart.js
    Date  : 2025.10.14
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
var diagram2 = function () {

  // ✅ Sankey 다이어그램 차트
  var gaugeChart = function () {
    document.querySelectorAll("[id^='hc_diagram']").forEach((el) => {
      // let thickness = 20;
      // if (el.id === 'hc_diagram_t1') {
      //   thickness = 30;
      // }

      Highcharts.chart(el.id, {
        chart: {
          type: 'sankey',
          backgroundColor: 'transparent',
          zooming: { type: 'xy' },
          panning: { enabled: true, type: 'xy' },
          panKey: 'shift',
           events: {
          render() {
            this.series[0].points.forEach(p => {
              // p.graphic.attr({
              //   'stroke-linecap': 'round',  // 선 끝 둥글게
              //   'stroke-width': 40,         // 두께 40px
              // });
            if (p.link) {
                  p.link.attr({
                    'stroke-width': 1,    // 링크 두께
                    'stroke-linecap': 'round'
                  });
                }
            });
          }
        }
        },
        title: { text: null},
        subtitle: {
          text: null
        },
        exporting: {
            enabled: false // 메뉴 아이콘 제거
        },
        credits: {
            enabled: false  // 하단 highcharts.com 제거
        },
        accessibility: {
          point: {
            valueDescriptionFormat:
              '{index}. {point.from} to {point.to}, {point.weight}.'
          }
        },
        tooltip: {
          pointFormat:
            '{point.fromNode.name} → {point.toNode.name}: {point.weight:.2f} quads',
          nodeFormat: '{point.name}: {point.sum:.2f} quads'
        },
        series: [{
          keys: ['from', 'to', 'weight'],
          type: 'sankey',
          name: 'Energy Flow',

         // 🔹 연결선 스타일 옵션
          linkOpacity: 0.6,       // 선 투명도
          linkColorMode: 'gradient', // 노드 색상 기반으로 그라데이션 연결
          curveFactor: 0.4,       // 선의 곡률 (0~1, 값이 높을수록 둥글게)
          borderColor: 'transparent',
          // linkColorMode: 'toNode', // 🔹 끝 노드 색상으로 고정

          // 🔹 두께 설정
          // Sankey는 'weight' 값이 선 두께로 반영되지만,
          // 아래처럼 통일된 두께로 덮어씌울 수도 있습니다.
          nodeWidth: 40, // 노드 폭
          minLinkWidth: 20, // 최소 선두께를 강제로 40px로

          borderRadius: 20,      // 노드 모서리 둥글게

          dataLabels: {
          style: {
              color: '#000',
              fontSize: '12px'
            }
          },

          nodes: [
             // offset값이 양수면 아래쪾으로, 음수면 위쪽으로 움직여서 노드 간 간격 조절
             // column 값 : 노드의 세로선(열) 위치를 지정 
             // id값 중복되어서 name추가
            { id: '구매완료', name:'구매완료', color: '#3cc2fd', column: 0, offset: 0 },
            { id: '재방문', color: '#489eff', column: 1, offset: 1 },
            { id: '이탈', color: '#b4b4b4',  column:1, offset: 0 },
            { id: '조회', color: '#7277ff',column:2,  offset: 0 },
            { id: '장바구니', color: '#6c9dfe', column:2, offset: 1 },
            { id: '바로결제', color: '#72beff',column:2,  offset: 2 },
            { id: '결제', color: '#72e7ff',column:2,   offset: 3 },
            { id: '구매완료2', name:'구매완료', color: '#6bfbf1',column:2,   offset: 3 },
          
          ],
          data: [
            // 소수점은 선의 굵기 > 데이터 비중 강조가능
            // 단위가 px이 아닌 상대적 비율 개념
            // ['구매완료', '재방문', 8], 
            // ['구매완료', '이탈', 7],
            // ['재방문', '조회', 3],
            // ['재방문', '장바구니', 4],
            // ['재방문', '바로결제', 3],
            // ['재방문', '결제', 2],
            // ['재방문', '구매완료2', 1],
            { from: '구매완료', to: '재방문', weight: 7, color: '#489eff' },   // 링크 색상 지정
            { from: '구매완료', to: '이탈', weight: 3, color: '#b4b4b4' },
            { from: '재방문', to: '조회', weight: 3, color: '#7277ff' },
            { from: '재방문', to: '장바구니', weight: 2.5, color: '#6c9dfe' },
            { from: '재방문', to: '바로결제', weight: 2.0, color: '#72beff' },
            { from: '재방문', to: '결제', weight: 1.5, color: '#72e7ff' },
            { from: '재방문', to: '구매완료2', weight: 1, color: '#6bfbf1' }
          ],

          
          
          dataLabels: {
            style: {
              color: 'var(--highcharts-neutral-color-100, #000)',
              fontSize: '12px'
            },
            
          },
          plotOptions: {
            sankey: {
              curveFactor: 1,       // 곡선 굴곡 정도
              linkOpacity: 0.6,       // 선 투명도
              borderWidth: 0,          // 테두리 제거
              nodePadding: 50, // 🔹 노드 간 세로 간격(px)
              nodeAlignment: 'center', // 🔹 'left' | 'right' | 'center' | 'justify'
              nodeWidth: 25, // 🔹 노드 폭을 줄이면 가운데 흐름선이 더 돋보임
              
            }
          }
        }]
      });
    });
  };

  $(function () {
    gaugeChart(); // 실행
  });
};
var diagram = function () {

  var gaugeChart = function () {
    document.querySelectorAll("[id^='hc_diagram']").forEach((el) => {

      Highcharts.chart(el.id, {
        chart: {
          type: 'sankey',
          backgroundColor: 'transparent',
          zooming: { type: 'xy' },
          panning: { enabled: true, type: 'xy' },
          panKey: 'shift',
          events: {
            render() {
              this.series[0].points.forEach(p => {
                if (p.link) {
                  // 선 두께를 최대 30px로 제한
                  const linkWidth = Math.min(p.link.strokeWidth(), 30);
                  p.link.attr({
                    'stroke-width': linkWidth,
                    'stroke-linecap': 'round'
                  });
                }
              });
            }
          }
        },
        title: { text: null},
        subtitle: { text: null },
        exporting: { enabled: false },
        credits: { enabled: false },
        accessibility: {
          point: {
            valueDescriptionFormat:
              '{index}. {point.from} to {point.to}, {point.weight}.'
          }
        },
        tooltip: {
          pointFormat:
            '{point.fromNode.name} → {point.toNode.name}: {point.weight:.2f} quads',
          nodeFormat: '{point.name}: {point.sum:.2f} quads'
        },
        series: [{
          keys: ['from', 'to', 'weight'],
          type: 'sankey',
          name: 'Energy Flow',
          linkOpacity: 0.6,
          linkColorMode: 'gradient',
          curveFactor: 0.4,
          borderColor: 'transparent',
          nodeWidth: 40,
          minLinkWidth: 1, // 최소 1px
          borderRadius: 20,
          nodes: [
            { id: '구매완료', name:'구매완료', color: '#3cc2fd', column: 0, offset: 0 },
            { id: '재방문', color: '#489eff', column: 1, offset: 1 },
            { id: '이탈', color: '#b4b4b4',  column:1, offset: 0 },
            { id: '조회', color: '#7277ff',column:2,  offset: 0 },
            { id: '장바구니', color: '#6c9dfe', column:2, offset: 1 },
            { id: '바로결제', color: '#72beff',column:2,  offset: 2 },
            { id: '결제', color: '#72e7ff',column:2,   offset: 3 },
            { id: '구매완료2', name:'구매완료', color: '#6bfbf1',column:2,   offset: 3 },
          ],
          data: [
            { from: '구매완료', to: '재방문', weight: 7, color: '#489eff' },
            { from: '구매완료', to: '이탈', weight: 3, color: '#b4b4b4' },
            { from: '재방문', to: '조회', weight: 3, color: '#7277ff' },
            { from: '재방문', to: '장바구니', weight: 2.5, color: '#6c9dfe' },
            { from: '재방문', to: '바로결제', weight: 2.0, color: '#72beff' },
            { from: '재방문', to: '결제', weight: 1.5, color: '#72e7ff' },
            { from: '재방문', to: '구매완료2', weight: 1, color: '#6bfbf1' }
          ],
          dataLabels: {
            style: {
              color: 'var(--highcharts-neutral-color-100, #000)',
              fontSize: '12px'
            },
          },
          plotOptions: {
            sankey: {
              curveFactor: 1,
              linkOpacity: 0.6,
              borderWidth: 0,
              nodePadding: 50,
              nodeAlignment: 'center',
              nodeWidth: 25
            }
          }
        }]
      });
    });
  };

  $(function () {
    gaugeChart();
  });
};


//* treegraph */
var treegraph = function () {

  // ✅ Sankey 다이어그램 차트
  var gaugeChart = function () {
    document.querySelectorAll("[id^='hc_treegraph']").forEach((el) => {
      Highcharts.chart(el.id, {
        chart: {
            spacingBottom: 30,
            marginRight: 120,
            height: 400,
            backgroundColor: 'transparent' // 배경색 제거
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
        series: [{
          type: 'treegraph',
          keys: ['parent', 'id'],
          data: [
            // 최상위 노드
            [undefined, '구매완료'],

            // 1단계
            ['구매완료', '재방문', { color: '#489eff' }],
            ['구매완료', '이탈', { color: '#b4b4b4' }],

            // 2단계
            ['재방문', '조회', { color: '#7277ff' }],
            ['재방문', '장바구니', { color: '#6c9dfe' }],
            ['재방문', '바로결제', { color: '#72beff' }],
            ['재방문', '결제', { color: '#72e7ff' }],
            ['재방문', '구매완료2', { color: '#6bfbf1' }]
          ],
          marker: {
            symbol: 'square',
            radius: 8,
            fillColor: '#ffffff',
            lineWidth: 3,
            lineColor: '#3cc2fd'
          },
          dataLabels: {
            style: {
              color: '#000',
              fontSize: '12px',
              style: { textOutline: 'none' },
              
              
            }
          },
          levels: [
            { level: 1, marker: { radius: 10 } },
            { level: 2, marker: { radius: 8 } }
          ],
          link: {
            lineWidth: 20,       // 선 두께
            curveFactor: 0.6     // 곡선 정도
          }
        }]
      });
    });
  };

  $(function () {
    gaugeChart(); // 실행
  });
};

var diagram3 = function () {
  function drawGraphLines() {
    const colors = ["#489eff", "#b4b4b4", "#72beff", "#6bfbf1"];

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
        x: parentOffset.left - 30, // 부모 li에서 왼쪽으로 30px
        y: parentOffset.top + $li.outerHeight() / 2,
      };

      $subLis.each(function (i) {
        const $childLi = $(this);
        const $childInfo = $childLi.children(".info");
        
        // 자식 li 왼쪽 중앙 좌표
        const childOffset = $childLi.offset();
        const childCenter = {
          x: childOffset.left, // 자식 li 왼쪽
          y: childOffset.top + $childLi.outerHeight() / 2, // 세로 중앙
        };

        const dx = childCenter.x - parentCenter.x;
        const dy = childCenter.y - parentCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const lineHeight = 30;

        const startX = -30; // 부모 li 안에서 시작
        const startY = $li.outerHeight() / 2 - lineHeight / 2;

        const $lineDiv = $("<div>").css({
          position: "absolute",
          top: `${startY}px`,
          left: `${startX}px`,
          width: `${distance}px`,
          height: `${lineHeight}px`,
          backgroundColor: colors[i % colors.length],
          opacity: 0.4,
          transformOrigin: "0 50%",
          transform: `rotate(${angle}deg)`,
          borderRadius: "15px",
          pointerEvents: "none",
        });

        $line.append($lineDiv);
      });
    });
  }

  // 초기 실행 + 리사이즈 대응
  $(window).on("load", function () {
    requestAnimationFrame(() => setTimeout(drawGraphLines, 100));
  });

  $(window).on("resize", function () {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(drawGraphLines, 200);
  });
};

var diagram4 = function () {
  function drawGraphLines() {
    const colors = ["#489eff", "#b4b4b4", "#72beff", "#6bfbf1"];

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
        x: parentOffset.left - 30, // 부모 li에서 왼쪽으로 30px
        y: parentOffset.top + $li.outerHeight() / 2,
      };

      $subLis.each(function (i) {
        const $childLi = $(this);
        const $childInfo = $childLi.children(".info");
        
        // 자식 li 왼쪽 중앙 좌표
        const childOffset = $childLi.offset();
        const childCenter = {
          x: childOffset.left, // 자식 li 왼쪽
          y: childOffset.top + $childLi.outerHeight() / 2, // 세로 중앙
        };

        const dx = childCenter.x - parentCenter.x;
        const dy = childCenter.y - parentCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const lineHeight = 30;

        const startX = -40; // 부모 li 안에서 시작
        const startY = $li.outerHeight() / 2 - lineHeight / 2;

        const $lineDiv = $("<div>").css({
          position: "absolute",
          top: `${startY}px`,
          left: `${startX}px`,
          width: `${distance}px`,
          height: `${lineHeight}px`,
          backgroundColor: colors[i % colors.length],
          opacity: 0.4,
          transformOrigin: "0 50%",
          transform: `rotate(${angle}deg)`,
          borderRadius: "15px",
          pointerEvents: "none",
        });

        $line.append($lineDiv);
      });
    });
  }

  // 초기 실행 + 리사이즈 대응
  $(window).on("load", function () {
    requestAnimationFrame(() => setTimeout(drawGraphLines, 100));
  });

  $(window).on("resize", function () {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(drawGraphLines, 200);
  });
};

var diagram2 = function () {
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
  diagram2();
});

