$(function(){
  
  setInterval( function() {
    var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var hdegree = hours * 30 + (mins / 2);
    var hrotate = "rotate(" + hdegree + "deg)";
    
    $(".hand").css("opacity","1");
    
    $("#hour").css({
      "-webkit-transform" : hrotate,
      "-moz-transform" : hrotate,
      "-ms-transform" : hrotate,
      "-o-transform" : hrotate,
      "transform" : hrotate
    });
    
  }, 1000 );
      
  setInterval( function() {
    var mins = new Date().getMinutes();
    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    
    $("#minute").css({
      "-webkit-transform" : mrotate,
      "-moz-transform" : mrotate,
      "-ms-transform" : mrotate,
      "-o-transform" : mrotate,
      "transform" : mrotate
    });
    
  }, 1000 );
  
});