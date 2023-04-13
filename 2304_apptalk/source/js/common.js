/* navigation */
var navigation = function(){
  var navigation = $("header nav.gnb li")
    $(navigation).click(function (e) {
    $(this).closest(".gnb").find("li").removeClass("on");
    $(this).addClass("on");
    });
};


$(function () {
  navigation();
});

