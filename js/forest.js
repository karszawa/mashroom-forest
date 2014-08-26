$(window).on('load', function() {
  return $('html, body').animate({
    scrollTop: 0
  }, 1);
});

$(function() {
  var mashroom_all, mashroom_num;
  $.ionSound({
    sounds: [
      {
        name: "ghost_1",
        volume: 0.3
      }, {
        name: "line_1",
        volume: 0.3
      }, {
        name: "tsubo_3",
        volume: 0.3
      }
    ],
    path: "audio/",
    multiPlay: true,
    volume: 0.3
  });
  mashroom_num = 0;
  mashroom_all = 0;
  return $(window).scroll(function() {
    var INITIAL_SCALE, SCALE_TRANS_END, margin_bottom, margin_left, mash_width, scale, scrollTop, sound, src;
    scrollTop = $(this).scrollTop();
    INITIAL_SCALE = 300;
    SCALE_TRANS_END = 10000;
    scale = Math.max(100, INITIAL_SCALE - scrollTop / SCALE_TRANS_END * (INITIAL_SCALE - 100));
    $('#field').css('background-size', scale + '% auto');
    if (scrollTop * Math.random() > 1000) {
      $('#mashroom_num').text(++mashroom_num);
      $('#mashroom_all').text(++mashroom_all);
      src = "img/mashroom" + (Math.floor(Math.random() * 8)) + ".png";
      sound = 'ghost_1';
      margin_left = 100 * Math.random();
      margin_bottom = 60 - 60 * Math.cos(Math.random() * Math.PI / 4);
      mash_width = 20 + 20 * Math.random();
      if (Math.random() < 0.05) {
        mash_width = 150;
      }
      if (Math.random() < 0.001) {
        src = 'img/agaricus.png';
        mash_width = 500;
        sound = 'tsubo_3';
      }
      $.ionSound.play(sound);
      return $("<img>").addClass("mashroom").attr('src', src).css({
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
          return $.ionSound.play('line_1');
        });
      }).appendTo(field);
    }
  });
});
