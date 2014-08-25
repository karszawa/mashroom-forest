$(window).on('load', function() {
  return $('html, body').animate({
    scrollTop: 0
  }, 1);
});

$(function() {
  var ghost, line, mashroom_all, mashroom_num, tsubo;
  ghost = new Audio("./audio/ghost_1.mp3");
  line = new Audio("./audio/line_1.mp3");
  tsubo = new Audio("./audio/tsubo_3.mp3");
  ghost.load();
  ghost.addEventListener("ended", function(e) {
    e.target.pause();
    return e.target.currentTime = 0;
  });
  mashroom_num = 0;
  mashroom_all = 0;
  return $(window).scroll(function() {
    var INITIAL_SCALE, margin_bottom, margin_left, mash_width, scale, scrollTop;
    scrollTop = $(this).scrollTop();
    INITIAL_SCALE = 300;
    scale = Math.max(100, INITIAL_SCALE - scrollTop / 3000 * (INITIAL_SCALE - 100));
    $('#field').css('background-size', scale + '% auto');
    margin_left = 100 * Math.random();
    margin_bottom = 60 - 60 * Math.cos(Math.random() * Math.PI / 4);
    mash_width = 20 + 20 * Math.random();
    if (Math.random() < 0.05) {
      mash_width = 150;
    }
    if (Math.random() < 0.001) {
      mash_width = 500;
    }
    if (scrollTop * Math.random() > 1000) {
      $("<img>").addClass("mashroom").attr('src', "img/mashroom" + (Math.floor(Math.random() * 8)) + ".png").css({
        width: "0px",
        height: "auto",
        position: "fixed",
        left: margin_left + "%",
        bottom: margin_bottom + "%",
        opacity: 0.0
      }).animate({
        width: mash_width,
        opacity: 0.8 + 0.2 * Math.random()
      }, 1000, "easeOutElastic").hover(function() {
        return $(this).animate({
          bottom: "+=100px",
          opacity: 0.0
        }, 1000, "easeInOutBack", function() {
          $(this).remove();
          $('#mashroom_num').text(--mashroom_num);
          return line.play();
        });
      }).appendTo(field);
      $('#mashroom_num').text(++mashroom_num);
      $('#mashroom_all').text(++mashroom_all);
      return ghost.play();
    }
  });
});
