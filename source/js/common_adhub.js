window.onload = function () {


    var header = document.querySelector('header');
    var menu = document.querySelector('.menu');

    var navigator = document.querySelector('.navigator');
    var navigatorA = document.querySelectorAll('.navigator a');

    for (var i = 0; i < navigatorA.length; i++) {
        (function (idx) {
            navigatorA[idx].onclick = function (e) {
                e.preventDefault();
                mouseEvent(idx);
            }
        })(i);
    }


    let start_y, end_y;
    const box = document.querySelectorAll(".box")
    for (var i = 0; i < box.length; i++) {
        box[i].addEventListener('touchstart', touch_start);
        box[i].addEventListener('touchend', touch_end);
    }

    function touch_start(event) {
        start_y = event.touches[0].pageY;

        console.log("start_y : " + start_y);
    }

    function touch_end(event) {
        end_y = event.changedTouches[0].pageY;
        console.log("end_y : " + end_y);

        var result = start_y - end_y;
        if (result < 0) {
            result = result * -1;
        }
        console.log("result : " + result);
        if (result > 50) {
            if (start_y > end_y) {
                mouseEvent("down");
            } else {
                mouseEvent("up");
            }
        }
    }

    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    var animation = false;
    //현재위치
    var now = "0";

    document.addEventListener("mousewheel", mouseEvent, true);
    //파이어폭스 
    document.addEventListener("DOMMouseScroll", mouseEvent, true);

    var boxList = document.getElementsByClassName("box");

    boxList[now].classList.add("active");
    console.log("boxList.length :: " + boxList.length);
    var animation = true;
    var top = 0;
    var delta = 0;
    var footerHeight = document.getElementById("footer").offsetHeight;
    var idx;
    console.log("footerHeight" + footerHeight);


    function mouseEvent(idx) {

        footerHeight = document.getElementById("footer").offsetHeight;
        if (animation == true) {
            animation = false;


            if (!event) event = window.event;
            if (event.wheelDelta) {

                delta = -event.wheelDelta / 120;
                if (window.opera) delta = -delta;

            } else if (event.detail) {

                delta = event.detail / 3;

            }

            console.log("delta : " + delta);
            console.log("start~~~~~~~now : " + now);
            console.log("idx~~~~~~~now : " + idx);
            if ((now >= 4 && delta == 1) || idx == "down") {

            } else {
                boxList[now].classList.remove("active");
            }

            // 위로 
            if ((delta < 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]")) || idx == "up") {
                console.log("위로");

                if (now >= 0) {

                    if (now != 0) {
                        now--;
                    }

                    var locate = boxList[now].offsetTop;

                    move(locate);

                }
                console.log("now : " + now);

            } else if ((delta > 0 && (idx == "[object WheelEvent]" || idx == "[object MouseWheelEvent]")) || idx == "down") {
                // 아래로 
                console.log("아래로");

                if (now < boxList.length) {

                    if (now < boxList.length - 1) {
                        now++;
                    }

                    var locate = boxList[now].offsetTop;

                    if (now == boxList.length - 1) {
                        locate = boxList[now - 1].offsetTop;
                        locate = locate + footerHeight;
                    }

                    move(locate);
                }
                console.log("now : " + now);

            } else {

                console.log("idx!!!!!!!!!!!!!!!! : " + idx);
                now = idx;
                locate = boxList[idx].offsetTop;

                move(locate);
            }

            for (var i = 0; i < navigatorA.length; i++) {
                navigatorA[i].classList.remove("active");
            }

            if (now != 5) {
                navigatorA[now].classList.add("active");
            }
            if (now == 0) {
                header.classList.add("other");
            } else {
                header.classList.remove("other");
            }

            if (now == 5) {
                header.classList.add("footer");
            } else {
                header.classList.remove("footer");
            }
        }
    }

    function move(locate) {
        console.log("locate : " + locate);
        var locateSum = 0;
        locateSum = locateSum - locate;
        console.log("locateSum : " + locateSum);

        var content = document.querySelector(".content");
        content.style.setProperty("transform", "translate3d(0px, " + locateSum + "px, 0px)");

        boxList[now].classList.add("active");

        setTimeout(function () {
            animation = true;
            console.log('finish!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }, 1000);

    }

}


$(document).ready(function () {
    $(".menu").on("click", function () {
        var _this = $(this);
        if (_this.hasClass("active") == true) {
            _this.removeClass("active");
            $(".menuBox").removeClass("active");
        } else {
            _this.addClass("active");
            $(".menuBox").addClass("active");
        }
    });

    $(".menuBox  .dim").on("click", function () {

        $(".menuBox").removeClass("active");
        $(".menu").removeClass("active");

    });

    $(".site").on("click", function () {
        var _this = $(this);
        if (_this.hasClass("active") == true) {
            _this.removeClass("active");
            $(".site").removeClass("active");
        } else {
            _this.addClass("active");
            $(".site ").addClass("active");
        }
    });

    $(".navigator a").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    $('.step02 .slider > ul').bxSlider({
        mode: "fade",
        pager: true,
        prevSelector: $(".step02 .prev"),
        nextSelector: $(".step02 .next"),
        onSlideBefore: function ($slideElement, oldIndex, newIndex) {
            var current_index = parseInt(newIndex + 1);
            if (current_index > 8) {
                $('.step02 .count em').text(current_index);
            } else {
                $('.step02 .count em').text('0' + current_index);
            };
        },
        onSlideAfter: function () {

            $('.step02 .slider [aria-hidden="false"]').addClass('active');
            $('.step02 .slider [aria-hidden="true"]').removeClass('active');

        },
        onSliderLoad: function () {
            $('.step02 .slider [aria-hidden="false"]').addClass('active');
            $('.step02 .slider [aria-hidden="true"]').removeClass('active');
        }

    });
    $(".quick_btn_wrap").click(function () {
        $(this).toggleClass("active");
        $(".quick_wrap").toggleClass("open");

    });

});