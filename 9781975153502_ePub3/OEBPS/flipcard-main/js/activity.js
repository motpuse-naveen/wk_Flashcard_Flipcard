(function (app) {
  var aSlides = 0;
  var nSlideCounter = 0;
  var nCount = 0;
  var dataObject = [];

  // Variable declarations to hold jquery objects
  var $termRB = '';
  var $definationRB = '';
  var $nextBtn = '';
  var $prevBtn = '';
  var $flipCardBtn = '';
  var $card = '';
  var $shuffleCardsBtn = '';
  var $zoomImg = '';
  var $closeOverlayBtn = '';
  var $read = '';
  var $overlaybg = '';
  var $closeMoreTxtBtn = '';
  var $moreTxtcontainer  = ''; 
  var $sound = '';
  var cardContainer = '';
  var $footer = '';
  var front_back = '';

  // Const
  var DATA_TYPE_TERM = 'Term';
  var DATA_TYPE_DEFINATION = 'Defination';
  var isWin = navigator.platform.toUpperCase().indexOf('WIN')>= 0;
  var isWin = navigator.platform.toUpperCase().indexOf('WIN')>= 0;
  app.init= function(){ 
    dataObject = data;
    nCount = dataObject.length;
    nSlideCounter = 0;
    
    $termRB = $('#TermRB');
    $definationRB = $('#DefinationRB');
    $nextBtn = $('#next');
    $prevBtn = $('#previous');
    $flipCardBtn = $('.flipCardBtn');
    $card = $("#card");
    $totlCards = $('#totalCards');
    $currentCard = $('#currentCard');
    $shuffleCardsBtn = $('#shuffleCardsBtn');
    $zoomImg = $('.zoomImage');
    $zoomFrontBtn = $('#zoomFrontBtn');
    $zoomBackSideBtn = $('#zoomBackSideBtn');
    $closeOverlayBtn = $('#closeOverlayBtn');
    $readMoreLnk = $('.readMore');
    $overlaybg = $('#overlaybg');
    $closeMoreTxtBtn = $('#closeMoreTxtBtn');
    $moreTxtcontainer = $('#learnMoreText');
    $footer = $("#footer");
    $sound = $('.audio');

    $currentCard.text((nSlideCounter + 1));
    $totlCards.text(nCount);
    addEvents();
    mangeTermInfo(0);
    $("#imageHolder .img-Term").css({opacity: 0});
    DisableLeftArrow();
    removeTabIndex();
    setTimeout(function(){
    addTabIndex();        
    },1000)
    MainActivity.setParameters();
    setTimeout(function(){$("#imageHolder .img-Term").removeAttr('style');},50); 

    var IsTouchDevice = is_touch_device();
    if(IsTouchDevice){
      $('#Term_radio').attr('aria-label', 'Question, Selected');
      $('#Defination_radio').attr('aria-label', 'Answer, Selected');
    }else{
      $('#Term_radio').attr('aria-label','Question, to change the selection press up or down arrow.');
      $('#Defination_radio').attr('aria-label','Answer, to change the selection press up or down arrow.');
    }
  }
  function is_touch_device() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function(query) {
      return window.matchMedia(query).matches;
    }
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      return true;
    }
    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }

  function addEvents() {
    $termRB.bind('change', handleRadioButtonEvents);
    $definationRB.bind('change', handleRadioButtonEvents);
    $nextBtn.bind('click', handleNextButtonEvents);
    $prevBtn.bind('click', handlePreviousButtonEvents);
    $flipCardBtn.on('click', handleFlipCardBtnEvents);
    $shuffleCardsBtn.on('click', handleShuffleCardsBtnEvents);
    $zoomImg.on('click', handleZoomImgBtnEvents);
    $closeOverlayBtn.on('click', handlecloseOverlayBtnEvents);
    $readMoreLnk.on('click', handleReadMoreLnkEvents);  
  };

  function handleRadioButtonEvents(e) {
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false;
    var currentObj = $(this);
    var dataType = currentObj.attr('data-type');
    var dataItemid = currentObj.attr('data-itemid');
    
    switch (dataType) {
        case DATA_TYPE_TERM:
            $('#chkView').find('.radio').removeClass('checked');           
            currentObj.find('.radio').addClass('checked');
            $nextBtn.attr('data-type', DATA_TYPE_TERM);
            $prevBtn.attr('data-type', DATA_TYPE_TERM);
            $flipCardBtn.attr('data-type', DATA_TYPE_TERM);
            $readMoreLnk.attr('data-type', DATA_TYPE_TERM);
            mangeTermInfo(dataItemid);
            $card.flip(false);
            $('#flipCardBtnb #flipCardb').removeClass('flipCardFront');
            $('#flipCardBtnb #flipCardb').addClass('flipCardBack');
            $zoomFrontBtn.removeClass('disabled');
            $zoomBackSideBtn.addClass('disabled');
            removeTabIndex();
            addTabIndex();             
        break;
        case DATA_TYPE_DEFINATION:                
            $('#chkView').find('.radio').removeClass('checked');            
            currentObj.find('.radio').addClass('checked');
            $nextBtn.attr('data-type', DATA_TYPE_DEFINATION);
            $prevBtn.attr('data-type', DATA_TYPE_DEFINATION);
            $flipCardBtn.attr('data-type', DATA_TYPE_DEFINATION); 
            $readMoreLnk.attr('data-type', DATA_TYPE_DEFINATION);            
            mangeDefinationInfo(dataItemid);
            $card.flip(true);
            $('#flipCardBtnb #flipCardb').removeClass('flipCardBack');
            $('#flipCardBtnb #flipCardb').addClass('flipCardFront');     
            $zoomFrontBtn.addClass('disabled'); 
            $zoomBackSideBtn.removeClass('disabled');
            removeTabIndex(); 
            addTabIndex();
        break;
    }
  }

  function handleNextButtonEvents(e) {
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false; 
    var dataType = $nextBtn.attr('data-type');
      if(nSlideCounter<(nCount-1)) {
        nSlideCounter++;
        $termRB.attr('data-itemid', nSlideCounter);
        $definationRB.attr('data-itemid', nSlideCounter);
        $flipCardBtn.attr('data-itemid', nSlideCounter);
        $readMoreLnk.attr('data-itemid', nSlideCounter);
        $currentCard.text(nSlideCounter + 1);
        if(dataType == DATA_TYPE_TERM) {
          mangeTermInfo(nSlideCounter);
          $readMoreLnk.attr('data-type', DATA_TYPE_TERM);
          $card.flip(false);
        }
        else {
            mangeDefinationInfo(nSlideCounter);
            $readMoreLnk.attr('data-type', DATA_TYPE_DEFINATION);
            $card.flip(true);
        }        
        if(nSlideCounter == (nCount-1)){
          DisableRightArrow();
        }
      }
      EnableLeftArrow();
      addTabIndex();     
  }
  
  function handlePreviousButtonEvents(e) {
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false;
    var dataType = $nextBtn.attr('data-type');
    if(nSlideCounter>0) {
        nSlideCounter--;
        $termRB.attr('data-itemid', nSlideCounter);
        $definationRB.attr('data-itemid', nSlideCounter);
        $flipCardBtn.attr('data-itemid', nSlideCounter);
        $readMoreLnk.attr('data-itemid', nSlideCounter);
        $currentCard.text(nSlideCounter + 1);
        if(dataType == DATA_TYPE_TERM) {
          mangeTermInfo(nSlideCounter);
          $readMoreLnk.attr('data-type', DATA_TYPE_TERM);
          $card.flip(false);
        }
        else {
            mangeDefinationInfo(nSlideCounter);
            $readMoreLnk.attr('data-type', DATA_TYPE_DEFINATION);
            $card.flip(true);
        }        
        if(nSlideCounter == 0){
          DisableLeftArrow();
        }
      }
      EnableRightArrow();
      addTabIndex();      
  }

  function handleFlipCardBtnEvents(e) {
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false;
    var dataType = $flipCardBtn.attr('data-type');
    var dataItemid = $flipCardBtn.attr('data-itemid');
    if(dataType == DATA_TYPE_TERM){
      mangeDefinationInfo(nSlideCounter);
      $card.flip(true);
      $('#flipCardBtnb #flipCardb').addClass('flipCardFront');
      $('#flipCardBtnb #flipCardb').removeClass('flipCardBack');
      $flipCardBtn.attr('data-type', DATA_TYPE_DEFINATION);
      $readMoreLnk.attr('data-type', DATA_TYPE_DEFINATION);
      $zoomFrontBtn.addClass('disabled');
      $zoomBackSideBtn.removeClass('disabled');
      removeTabIndex(); 
      addTabIndex();     
    }
    else {         
      $card.flip(false);
      $('#flipCardBtnb #flipCardb').addClass('flipCardBack');
      $('#flipCardBtnb #flipCardb').removeClass('flipCardFront');
      $flipCardBtn.attr('data-type', DATA_TYPE_TERM);
      $readMoreLnk.attr('data-type', DATA_TYPE_TERM);
      mangeTermInfo(nSlideCounter);
      $zoomFrontBtn.removeClass('disabled');
      $zoomBackSideBtn.addClass('disabled');
      removeTabIndex(); 
      addTabIndex();
    }
  };
 
  function handleZoomImgBtnEvents(e) {
    var clickedBtn = $(this);
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false;
    if($("#myModal").length == 1) return;
   
    $('body').addClass('stop-scrolling');
    var $modal = $('<section id="myModal" class="modal" role="dialog" aria-modal="true" aria-describedby="modalImage">\
      <section id="modal-content" class="modal-content">\
          <section class="image-wraper"><img id="modalImage" class="modal-img" src="'+ $(this).attr("data-src") +'" alt="" />\
          <button role="button" class="modalClose tabindex" aria-label="To close this pop up dialog, press the Enter or Spacebar key.">X</button></section>\
      </section>\
    </section>\
    ');      
     
    $("#mainConatiner").append($modal);   
    $("button.modalClose").bind("click", function(e) {
        if(e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
        return false;

        $('body').removeClass('stop-scrolling');
        $(this).parents("#myModal").remove();
        addTabIndex();
        $("#root-app, #headerText").removeAttr('aria-hidden');     
        clickedBtn.focus();
    });
    setPopupTabIndex();
    $("#root-app, #headerText").attr('aria-hidden',true);
    $modal.find('.modalClose').focus();
  }

  function handlecloseOverlayBtnEvents (e) {
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false;
    $overlaybg.hide();
    $('#imageOverlay').hide();
    resetPopupTabIndex();
  }

  function handleShuffleCardsBtnEvents(e) {  
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false;  
    for(var j, x, i = dataObject.length; i; j = Math.floor(Math.random() * i), x = dataObject[--i], dataObject[i] = dataObject[j], dataObject[j] = x); 
    var datatype = $flipCardBtn.attr('data-type');
    if(datatype === DATA_TYPE_TERM) {
      mangeTermInfo(nSlideCounter);
    }
    else {
      mangeDefinationInfo(nSlideCounter);  
    }
  };

  function mangeTermInfo(index) {
    var termElm = '';
    var container = $('#termInfo');
    var imageHolder = $('#imageHolder');
    container.html('');
    imageHolder.html('');
    
    var cardInfo = '<p style="position:absolute;opacity:0 !important;font-size:12px;">Flip card front side, '+ $footer.find("#count").text()+'.</p>';
    var imageWraper = $("<div class='imageWraper'></div>");
    front_back = 'front';
    container.append(cardInfo); 
    
    if(dataObject[index].imgurl != '') {     
        imageWraper.append('<img class="img-Term" src="'+dataObject[index].imgurl+'" alt="" /><button role="button" id="zoomFrontBtn" class="zoomImage tabindex" aria-label="To zoom image, press the Enter or Spacebar key." aria-controls="modal-content" data-src="'+dataObject[index].imgurl+'"><img src="images/zoom-icon.svg" alt="" /></button>');     
        container.removeAttr('style');
        imageHolder.show();
        imageHolder.append(imageWraper);        
        imageHolder.attr('aria-hidden',false);
        
        termElm = '<p id="truncateText">'+ dataObject[index].term +'</p>';
        // if(isWin){
          container.attr('aria-hidden',true);          
          setTimeout(function(){
            container.attr('aria-hidden',false);
          },10);
        // }
        $(termElm).appendTo(container);
    }
    else {
      imageHolder.attr('aria-hidden',true);
      imageHolder.hide();
      termElm = '<p id="truncateText">'+ dataObject[index].term +'</p>';
      $(termElm).appendTo(container);
      //var truncateText = $('#truncateText');
      //container.css({'width':'100%','display':'table','position':'absolute','height':'100%'});
      //truncateText.css({'vertical-align':'middle','display':'table-cell','text-align':'center'});
    }
    
    if(dataObject[index].termaudio == ""){
      DisableSoundButton();
    }
    imageHolder.find('.zoomImage').on('click', handleZoomImgBtnEvents);
    setFlipBtnCenter();
  }
  
  function mangeDefinationInfo(index) {
    var container = $('#defnInfo');
    var imageHolder = $('#imageHolderb');
    var cardInfo = '<p style="position:absolute;opacity:0 !important;font-size:12px;">Flip card back side, '+ $footer.find("#count").text()+'.</p>';
    container.html('');    
    imageHolder.html('');
    var imageWraper = $("<div class='imageWraper'></div>");
    front_back = 'back';
    if(dataObject[index].imgurl != '') {
               
        imageWraper.append('<img class="img-Term" src="'+dataObject[index].imgurl+'" alt="" /><button role="button" id ="zoomBackSideBtn" class="zoomImage tabindex disabled" aria-label="To zoom image, press the Enter or Spacebar key." aria-controls="modal-content" data-src="'+dataObject[index].imgurl+'" style="backface-visibility: hidden;"><img src="images/zoom-icon.svg" alt="" style="backface-visibility: hidden;" /></button>');        
        imageHolder.append(imageWraper);
        imageHolder.attr('aria-hidden',false);
        imageHolder.show(); 
        container.removeAttr('style');        
    }
    else {
      container.css({'width':'100%'});
      imageHolder.attr('aria-hidden',true);
      imageHolder.hide();           
    }    
    
    var defnlength = dataObject[index].defination.length;
    if(defnlength > 1){
      var defnElm = $('<div style="margin-top: -20px;"></div>');
      defnElm.append(cardInfo); 
      for (var i = 0; i < defnlength; i++) {
         var ele = '<p><strong>' + dataObject[index].defination[i].title + ' ' +'</strong>' + dataObject[index].defination[i].phase +'</p>';
         defnElm.append(ele);
      }
      defnElm.appendTo(container);
             
    }
    else {
      var defnElm = $('<p id="truncateText">'+ dataObject[index].defination[0].phase +'</p>');
      container.append(cardInfo); 
      defnElm.appendTo(container);
    }
    if(defnlength <= 1){
      container.attr('aria-hidden',true);
      setTimeout(function(){
        container.attr('aria-hidden',false);
      },800);
    }
    if(dataObject[index].defnaudio == ""){
      DisableSoundButton();
    }

    var $defnInfo = $('#defnInfo'); 

    var maxHeight = parseInt($('.cardContentb').css('max-height').split('p')[0]); 
    
    imageHolder.find('.zoomImage').on('click', handleZoomImgBtnEvents);
    setFlipBtnCenter();
  }
 
  function handleReadMoreLnkEvents(e) {
    var clickedBtn = $(this);
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false;
    if($("#myModal").length == 1) return;
    var dataItemid = $readMoreLnk.attr('data-itemid');
    var dataType = $readMoreLnk.attr('data-type');
    var vWidth = $(window).innerWidth();
    var vHeight = $(window).innerHeight();

   
    $('body').addClass('stop-scrolling');
     var $modal = $('<div id="myModal" class="modal">\
         <div class="modal-content">\
            <div class="more-text-container">\
            <img id="modalImage" class="modal-img" src="'+ $(this).attr("data-src") +'" alt="" />\
          <button role="button" class="modalClose" aria-label="To close this pop up dialog, press the Enter or Spacebar key."><img src="images/close-btn.svg" alt="" /></button>\
        </div>\
        </div></div>\
        ');

    $("#mainConatiner").append($modal);
   
    var moreTxtcontainer = $('.more-text-container');
     $("button.modalClose").bind("click", function(e) {
          if(e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
          return false;
          $('body').removeClass('stop-scrolling');
          $(this).parent().parent().remove();
          addTabIndex();
          //$(clickedBtn).focus(); last
      });

    moreTxtcontainer.html('');
    if(dataType == DATA_TYPE_TERM) {
      var termElm = '<div class="margin-med">'+ dataObject[dataItemid].term +'</div>';
      moreTxtcontainer.append($(termElm));
    }
    else {      
      var defnlength = dataObject[dataItemid].defination.length;
      if(defnlength > 1){
      var defnElm = $('<div class="margin-med"></div>');
      for (var i = 0; i < defnlength; i++) {
        var ele = '<p> <strong>' + dataObject[dataItemid].defination[i].title + ' ' +'</strong>' + dataObject[dataItemid].defination[i].phase +'</p>';
        defnElm.append(ele);
      } 
        moreTxtcontainer.append(defnElm);
      }
      else {
        var defnElm = '<div class="margin-med">'+ dataObject[dataItemid].defination[0].phase +'</div>';
        moreTxtcontainer.append($(defnElm));
      } 
    }    
    //$modal.css("display", "block");
    //$modal.find('.modalClose').focus(); last
  }

  function handleCloseMoreTxtBtnEvents(e) {
    if (e.type === 'keyup' && (e.keyCode !== 13 && e.keyCode !== 32))
      return false;
    $overlaybg.hide();
    $moreTxtcontainer.hide();
    //$readMoreLnk.focus();
  }


  function addTabIndex() {
    var tab_index = 1;
    $(".tabindex:visible").each(function (index) {
      if(!$(this).hasClass("disabled")) {
        $(this).attr("tabindex", 0);
        tab_index++;
      }else{
         $(this).attr("tabindex", -1);
      }
    });
    $("#chkView").find('.radio').removeClass('checked');
    if(front_back == 'front'){
      $("#cardBackSide").attr('aria-hidden',true);
      $("#cardFrontSide").attr('aria-hidden',false);
      $("#cardBackSide").find('button,a').attr('tabindex',-1).attr('aria-hidden',true);
      $("#cardFrontSide").find('button,a').attr('tabindex',0).attr('aria-hidden',false);
      $("#flipCardBtnf").attr('tabindex',0);
      $("#flipCardBtnb").attr('tabindex',-1);
      $termRB.find('.radio').addClass('checked');
      $('.flash_RD_btn').attr('checked',false);
      document.getElementById("Term_radio").checked = true;
      $termRB.attr('data-type',DATA_TYPE_TERM);
      $nextBtn.attr('data-type',DATA_TYPE_TERM);
      $prevBtn.attr('data-type',DATA_TYPE_TERM);
      $('#cardFrontSide').find('.flipCardBtn').attr('data-type',DATA_TYPE_TERM);
    }else if(front_back == 'back'){
      $("#cardBackSide").attr('aria-hidden',false);
      $("#cardFrontSide").attr('aria-hidden',true);
      $("#cardFrontSide").find('button,a').attr('tabindex',-1).attr('aria-hidden',true);
      $("#cardBackSide").find('button,a').attr('tabindex',0).attr('aria-hidden',false);
      $("#flipCardBtnb").attr('tabindex',0);
      $("#flipCardBtnf").attr('tabindex',-1);
      $definationRB.find('.radio').addClass('checked');
      $('.flash_RD_btn').attr('checked',false);
      document.getElementById("Defination_radio").checked = true;
      $definationRB.attr('data-type',DATA_TYPE_DEFINATION);
      $nextBtn.attr('data-type',DATA_TYPE_DEFINATION);
      $prevBtn.attr('data-type',DATA_TYPE_DEFINATION);
     $('#cardBackSide').find('.flipCardBtn').attr('data-type',DATA_TYPE_DEFINATION);
    }    
  }

  function removeTabIndex() {
    $(".tabindex:visible").each(function (index) {      
        $(this).attr("tabindex", -1);      
    });
  }
  function setPopupTabIndex() {
    $("[tabindex]").each(function (index) {      
        $(this).attr("data-tabindex", $(this).attr("tabindex"));      
        $(this).attr("tabindex", -1);      
    });
    $('.modalClose:visible').attr('tabindex',0);

  }
  function resetPopupTabIndex() {
    $("[tabindex]").each(function (index) {      
        $(this).attr("tabindex", $(this).attr("data-tabindex"));     
    });
    $('.modal-content:visible').removeAttr('tabindex');
    $('.modalClose:visible').removeAttr('tabindex');
  }

  function EnableLeftArrow() {
      $prevBtn.removeClass("leftArrowDisable disabled").addClass("leftArrowEnable").css({
          "pointer-events": "auto",
          "cursor": "pointer"
      });
      //$('#TermRB').focus();
  }

  function DisableLeftArrow() {
      $prevBtn.removeClass("leftArrowEnable").addClass("leftArrowDisable disabled").css({
          "pointer-events": "none",
          "cursor": "default"
      });
       $prevBtn.removeAttr('tabindex');
  }

  function EnableRightArrow() {
      $nextBtn.removeClass("rightArrowDisable disabled").addClass("rightArrowEnable").css({
          "pointer-events": "auto",
          "cursor": "pointer"
      });
      //$('#TermRB').focus();
  }

  function DisableRightArrow() {
      $nextBtn.removeClass("rightArrowEnable").addClass("rightArrowDisable disabled").css({
          "pointer-events": "none",
          "cursor": "default"
      });
      $nextBtn.removeAttr('tabindex');
  }

  function EnableSoundButton() {
    $sound.removeClass("soundbuttonDisable disabled").addClass("soundButtonEnable").css({
        "pointer-events": "auto",
        "cursor": "pointer"
    });      
  }

  function DisableSoundButton() {
    $sound.removeClass("soundButtonEnable").addClass("soundbuttonDisable disabled").css({
        "pointer-events": "none",
        "cursor": "default"
    });      
  }

  function setFlipBtnCenter(){
    var marginLeft = $flipCardBtn.width()/2;
    $flipCardBtn.css({'margin-left':-marginLeft+'px'});
    setTimeout(function(){
      $flipCardBtn.css({'margin-left':-marginLeft+'px'});
    }, 100);
  }

app.setParameters = function() {
  var containerHeight = $(window).innerHeight() - ($('#footer').height() + $('#headerText').height()+3);
 
   if(containerHeight < 400) {
      $('#contentHolder').css({'height' : '100%'});    
   }
   else{
      $('#contentHolder').css({'height' : (containerHeight)+'px'});
   }
   setFlipBtnCenter();
}

for (var i = 0; i < data.length; i++) {
  if(data[i].imgurl != ''){
    var dataImg = new Image();
    dataImg.src = data[i].imgurl;
  }
}

})(MainActivity = MainActivity || {});
var MainActivity;

$(document).ready(function(){
  $.fn.overflown=function(){var e=this[0];return e.scrollHeight>e.clientHeight}
  // imagePreloaded();  
  MainActivity.init();
   
});

$(window).resize(function(){
    MainActivity.setParameters();
});
