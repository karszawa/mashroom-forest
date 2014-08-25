$(window).on 'load', ->
	$('html, body').animate(scrollTop: 0, 1)

$ ->
	# 音声の設定
	# ion.sound.init({
	#   sounds: [
	#       "ghost_1"
	#       "line_1"
	#       "tsubo_3"
	#   ],
	#   path: "sounds/",
	#   multiPlay: true,
	#   volume: "0.3"
	# });
	ghost = new Audio "./audio/ghost_1.mp3"
	line = new Audio "./audio/line_1.mp3"
	tsubo = new Audio "./audio/tsubo_3.mp3"

	ghost.load();
	ghost.addEventListener "ended", (e) ->
		e.target.pause()
		e.target.currentTime = 0

	mashroom_num = 0
	mashroom_all = 0

	$(window).scroll ->
		scrollTop = $(@).scrollTop()

		# 背景画像を動かす
		INITIAL_SCALE = 300
		scale = Math.max(100, INITIAL_SCALE - scrollTop / 3000 * (INITIAL_SCALE - 100))
		$('#field').css 'background-size', scale + '% auto'

		# オブジェクトを登場させる
		margin_left = 100 * Math.random();
		margin_bottom = 60 - 60 * Math.cos(Math.random() * Math.PI / 4);
		mash_width = 20 + 20 * Math.random()

		# 特別に大きいきのこ
		mash_width = 150 if Math.random() < 0.05
		mash_width = 500 if Math.random() < 0.001

		# 確率できのこを生やす
		if scrollTop * Math.random() > 1000
			$("<img>")
				.addClass("mashroom")
				.attr('src', "img/mashroom#{Math.floor(Math.random() * 8)}.png")
				.css({
					width: "0px"
					height: "auto"
					position: "fixed"
					left: margin_left + "%"
					bottom: margin_bottom + "%"
					opacity: 0.0
				})
				.animate({
					width: mash_width
					opacity: 0.8 + 0.2 * Math.random()
				}, 1000, "easeOutElastic")
				.hover ->
					$(@).animate({
						bottom: "+=100px"
						opacity: 0.0
					}, 1000, "easeInOutBack", ->
						$(@).remove()
						$('#mashroom_num').text --mashroom_num
						line.play();
				)
				.appendTo(field)

			$('#mashroom_num').text ++mashroom_num
			$('#mashroom_all').text ++mashroom_all

			ghost.play();

