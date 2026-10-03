$(function(){
  
  // 原本的時針邏輯
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
      
  // 原本的分針與秒針邏輯
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

  // 新增：簡體轉正體（繁體）的輔助函數
  function toTraditional(text) {
    // 針對農曆、節氣、生肖與節日常見的簡體字進行精準替換
    var simp = "龙马鸡猪腊闰惊蛰谷满种处节阳农历华诞扫尘头宝妇亲劳动军庆岁辞旧党儿国圣师";
    var trad = "龍馬雞豬臘閏驚蟄穀滿種處節陽農曆華誕掃塵頭寶婦親勞動軍慶歲辭舊黨兒國聖師";
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i);
        var index = simp.indexOf(char);
        result += index !== -1 ? trad.charAt(index) : char;
    }
    return result;
  }

  // 新增：農曆更新函數
  function updateLunar() {
    var now = new Date();
    var lunar = Lunar.fromDate(now);

    var solarYear = now.getFullYear();
    var solarMonth = now.getMonth() + 1;
    var solarDate = now.getDate();

    var ganZhiYear = lunar.getYearInGanZhi();
    var animal = lunar.getYearShengXiao();
    var lunarMonth = lunar.getMonthInChinese();
    var lunarDay = lunar.getDayInChinese();
    var term = lunar.getJieQi();
    var festivals = lunar.getFestivals();
    var festival = festivals.length > 0 ? festivals[0] : "";

    // 組合字串，例如：2026年10月3日 (丙午年-生肖马) 八月廿三
    var text = solarYear + "年" + solarMonth + "月" + solarDate + "日 (" + ganZhiYear + "年-生肖" + animal + ") " + lunarMonth + "月" + lunarDay;

    if (term) {
        text += " 【" + term + "】";
    } else if (festival) {
        text += " 【" + festival + "】";
    }

    // 將組合好的簡體字串，透過 toTraditional 轉換為正體中文後輸出
    $("#lunar-date").text(toTraditional(text));
  }

  // 初始化並設定每秒更新（確保跨夜時農曆也能自動更新）
  updateLunar();
  setInterval(updateLunar, 1000);
  
});