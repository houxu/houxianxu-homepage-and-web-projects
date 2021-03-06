$(document).ready(function() {
	// globals for user interface
	var level = 1;
	var updateNum;
	var timeRemain;
	var numDigital = 4;
	var time_count = $("#time_count b");
	// define event handlers


	// the timer handler
	var timer = function() {
		timeRemain = level + 4;
		var countClockTimer = function () {
			if (timeRemain <= 0) {
				clearInterval(countClock); // 停止计时
				$("#current_num").css("color", "#ffffff");
				console.log("hou");
				$("#input_form input.text").removeAttr("disabled");
				$("#input_form input.text").focus();
			} else{
				timeRemain -= 1;
				time_count.text(timeRemain);
			}
		};
		// 倒计时
		var	countClock = setInterval(function() {countClockTimer()}, 1000);
	};


	//  指定长度的随机数
	var randomNum = function (n) {
		//  生成 0-9 之间的随机数
		var oneRandomNum = function () {
			return Math.floor(Math.random() * 10);
		};
		var res = "";
		while (n > 0) {
			res += oneRandomNum();
			n--;
		}
		return res;
	};

	var updateCurrentNum = function () {
		numDigital += 2;
		updateNum = randomNum(numDigital);
		$("#current_num").text(updateNum);
	};

	var updateLevel = function () {
		level += 1;
		$("#level").text("Level: " + level);
	};

	$(".start_btn").click(function () {
		$(".start_page").css("display", "none");
		updateCurrentNum();
		timer();

	});

	var preventDefault = function (event) {
		if (typeof event.target !== "undefined") {
			return event.target;
		} else {
			return event.srcElement;
		}
	};

	$(".enter").click(function (event) {
		event.preventDefault();

		var inputNum = $(".text").val();
		if (inputNum === updateNum) {
			updateLevel();
			updateCurrentNum();
			timer();
			$("#time_count b").text(timeRemain);
			$("#current_num").css("color", "#000000");
			
			$(".text").val("");
			$("#input_form input.text").attr("disabled", "");
				
		} else {
			alert("the number you put is not right!");
			$("#container").css("display", "none");
			$(".game_over").css("display", "block");
		}

	});

});
