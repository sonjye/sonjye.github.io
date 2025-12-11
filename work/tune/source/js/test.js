/*
File  : ui3.js
Date  : 2024.11.06
menu  : 공통 js
*/



/* CDP - 캠페인 리스트 */
var campaignList1 = function () {
  var list1 =(".tune_campaignList .sec_list .listArea >.list");
  var listDetailDrop1 =(".tune_campaignList .sec_list .listDetail");

  $(function() {
    // .list 요소를 드래그 가능하게 설정
    $(list1).draggable({
      helper: "original",  // 복사본을 드래그하도록 설정 clone, original
      revert: "invalid",  // 유효하지 않은 곳에 드롭하면 원래 위치로 돌아옴
      containment: "parent",  // 드래그할 때 문서 범위 내에서만 이동 document
      cursor: "move",
      stop: function(event, ui) {
      // 드래그가 끝난 후, 원본 삭제
        $(this).remove();
      }
    });

    // list에 drop
    $(list1).droppable({
      accept: ".list",  // .list 요소만 드롭하도록 설정
      drop: function(event, ui) {
        var draggedItem = ui.helper[0];  // 드래그한 원본 요소를 가져옴
        var listTit = $(draggedItem).find(".titBox");
        var listCont = $(draggedItem).find(".listDetail");
        var newListDiv = $('<div class="list"></div>');
        var newListDiv2 = $('<div class="list"></div>');
        
        var newGroupAreaDiv = $('<div class="groupArea"></div>'); 
        var newContDiv = $('<div class="cont"></div>');  
        
        // .list 요소가 group 클래스를 가지고 있지 않을 경우 실행
       if (!$(this).hasClass('group')) {
         // .listDetail에 .group 클래스를 추가
         $(this).addClass("group");
         // 기존 listDetail > includeBox, .excludeBox 를  groupArea > list > cont 안에 넣기 
         var includeBox =  $(this).find(".listDetail").children('.includeBox');
         var excludeBox =  $(this).find(".listDetail").children('.excludeBox');
        // .cont 안에 includeBox와 excludeBox를 추가
         var contAdd = newContDiv.append(includeBox).append(excludeBox);  
         var listAdd = newListDiv.prepend(contAdd);
          //  alert(this);
         $(this).find('.listDetail').prepend(newGroupAreaDiv);  // listDetail 안에 groupArea 추가
        newGroupAreaDiv.prepend(listAdd);

        // 드래그한 list를 드롭한 list 하위에 추가 
        // listDetail 클래스를 cont로 변경
        listTit.removeClass("titBox").addClass("tit");
        listCont.removeClass("listDetail").addClass("cont");

        // tit > span > .mark를 제거하고 count로 변경
        listTit.children(".mark").removeClass("mark").addClass("count");
        // tit > button.close 추가
        var closeButton = $('<button class="close">X</button>');  // 새로운 button.close 생성
        listTit.append(closeButton);  // .tit의 마지막에 button.close 추가

        newListDiv2.append(listTit).append(listCont); 
        
        // 드롭된 위치에서 .groupArea를 찾아서 그 안에 listDetail(이제 cont) 추가
        var targetGroupArea = $(this).children(".listDetail").find(".groupArea");
        
        // 드래그한 .list 항목을 .groupArea 안에 추가
        targetGroupArea.append(newListDiv2);// Append the content div
        
        listCont.show();
        //  $(listCont).css("display", "block");  // display를 block으로 설정
        $(this).addClass('on').find('.listDetail').show();  

       }else {
        // listDetail 클래스를 cont로 변경
        listTit.removeClass("titBox").addClass("tit");
        listCont.removeClass("listDetail").addClass("cont");

        // tit > span > .mark를 제거하고 count로 변경
        listTit.children(".mark").removeClass("mark").addClass("count");
        // tit > button.close 추가
        var closeButton = $('<button class="close">X</button>');  // 새로운 button.close 생성
        listTit.append(closeButton);  // .tit의 마지막에 button.close 추가

        newListDiv.append(listTit).append(listCont); 
        
        // 드롭된 위치에서 .groupArea를 찾아서 그 안에 listDetail(이제 cont) 추가
        var targetGroupArea = $(this).children(".listDetail").find(".groupArea");
        
        // 드래그한 .list 항목을 .groupArea 안에 추가
        targetGroupArea.append(newListDiv);// Append the content div

        // 드래그된 요소가 display:none 상태가 되는 문제 해결
        listCont.show();
        $(this).addClass('on').find('.listDetail').show(); 
        }      
      }
    });
  });
};
var campaignList = function () {
  var list1 =(".tune_campaignList .sec_list .listArea >.list");
  var listDetailDrop1 =(".tune_campaignList .sec_list .listDetail");

  $(function() {
    // .list 요소를 드래그 가능하게 설정
    $(list1).draggable({
      helper: "original",  // 복사본을 드래그하도록 설정 clone, original
      revert: "invalid",  // 유효하지 않은 곳에 드롭하면 원래 위치로 돌아옴
      containment: "parent",  // 드래그할 때 문서 범위 내에서만 이동 document
      cursor: "move",
      stop: function(event, ui) {
      // 드래그가 끝난 후, 원본 삭제
        $(this).remove();
      }
    });

    // list에 drop
    $(list1).droppable({
      accept: ".list",  // .list 요소만 드롭하도록 설정
      drop: function(event, ui) {
        var draggedItem = ui.helper[0];  // 드래그한 원본 요소를 가져옴
        var listTit = $(draggedItem).find(".titBox");
        var listCont = $(draggedItem).find(".listDetail");
        var newListDiv = $('<div class="list"></div>');
        var newListDiv2 = $('<div class="list"></div>');
        
        var newGroupAreaDiv = $('<div class="groupArea"></div>'); 
        var newContDiv = $('<div class="cont"></div>');  
        
        // .list 요소가 group 클래스를 가지고 있지 않을 경우 실행
        if (!$(this).hasClass('group')) {
         // .listDetail에 .group 클래스를 추가
         $(this).addClass("group");
         // 기존 listDetail > includeBox, .excludeBox 를  groupArea > list > cont 안에 넣기 
         var includeBox =  $(this).find(".listDetail").children('.includeBox');
         var excludeBox =  $(this).find(".listDetail").children('.excludeBox');
        // .cont 안에 includeBox와 excludeBox를 추가
         var contAdd = newContDiv.append(includeBox).append(excludeBox);  
         var listAdd = newListDiv.prepend(contAdd);
          //  alert(this);
         $(this).find('.listDetail').prepend(newGroupAreaDiv);  // listDetail 안에 groupArea 추가
        newGroupAreaDiv.prepend(listAdd);

        // 드래그한 list를 드롭한 list 하위에 추가 
        // listDetail 클래스를 cont로 변경
        listTit.removeClass("titBox").addClass("tit");
        listCont.removeClass("listDetail").addClass("cont");

        // tit > span > .mark를 제거하고 count로 변경
        listTit.children(".mark").removeClass("mark").addClass("count");
        // tit > button.close 추가
        var closeButton = $('<button class="close">X</button>');  // 새로운 button.close 생성
        listTit.append(closeButton);  // .tit의 마지막에 button.close 추가

        newListDiv2.append(listTit).append(listCont); 
        
        // 드롭된 위치에서 .groupArea를 찾아서 그 안에 listDetail(이제 cont) 추가
        var targetGroupArea = $(this).children(".listDetail").find(".groupArea");
        
        // 드래그한 .list 항목을 .groupArea 안에 추가
        targetGroupArea.append(newListDiv2);// Append the content div
        
        listCont.show();
        //  $(listCont).css("display", "block");  // display를 block으로 설정
        $(this).addClass('on').find('.listDetail').show();  

        }else if (!$(this).hasClass('group')) {
        // listDetail 클래스를 cont로 변경
        listTit.removeClass("titBox").addClass("tit");
        listCont.removeClass("listDetail").addClass("cont");

        // tit > span > .mark를 제거하고 count로 변경
        listTit.children(".mark").removeClass("mark").addClass("count");
        // tit > button.close 추가
        var closeButton = $('<button class="close">X</button>');  // 새로운 button.close 생성
        listTit.append(closeButton);  // .tit의 마지막에 button.close 추가

        newListDiv.append(listTit).append(listCont); 
        
        // 드롭된 위치에서 .groupArea를 찾아서 그 안에 listDetail(이제 cont) 추가
        var targetGroupArea = $(this).children(".listDetail").find(".groupArea");
        
        // 드래그한 .list 항목을 .groupArea 안에 추가
        targetGroupArea.append(newListDiv);// Append the content div

        // 드래그된 요소가 display:none 상태가 되는 문제 해결
        listCont.show();
        $(this).addClass('on').find('.listDetail').show(); 
        }else {
            // listDetail 클래스를 cont로 변경
        listTit.removeClass("titBox").addClass("tit");
        listCont.removeClass("listDetail").addClass("cont");

        // tit > span > .mark를 제거하고 count로 변경
        listTit.children(".mark").removeClass("mark").addClass("count");
        // tit > button.close 추가
        var closeButton = $('<button class="close">X</button>');  // 새로운 button.close 생성
        listTit.append(closeButton);  // .tit의 마지막에 button.close 추가

        newListDiv.append(listTit).append(listCont); 
        
        // 드롭된 위치에서 .groupArea를 찾아서 그 안에 listDetail(이제 cont) 추가
        var targetGroupArea = $(this).children(".listDetail").find(".groupArea");
        
        // 드래그한 .list 항목을 .groupArea 안에 추가
        targetGroupArea.append(newListDiv);// Append the content div

        // 드래그된 요소가 display:none 상태가 되는 문제 해결
        listCont.show();
        $(this).addClass('on').find('.listDetail').show(); 
        }
      }
    });
  });
};



$(function () {
  campaignList();
});