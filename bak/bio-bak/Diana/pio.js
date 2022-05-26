/* ----
# Pio Plugin with Pio SDK 2/3/4 support
# Pio Plugin By: Dreamer-Paul
# Pio SDK 2/3/4 support By: jupiterbjy
# Modify: journey-ad, nenekodev
# Last Update: 2021.12.10

Pio Plugin
一个支持更换 Live2D 模型的 Typecho 插件。
本代码为奇趣保罗原创，并遵守 GPL 2.0 开源协议。欢迎访问我的博客：https://paugram.com

Pio SDK 2/3/4 support
To use this, you need to include following sources to your HTML file first.
With this script, you don't have to include `l2d.js`. Testing is done without it.
Basic usage is same with Paul-Pio.
Make sure to call `pio_refresh_style()` upon changing styles on anything related to 'pio-container' and it's children.
To change alignment, modify variable `pio_alignment` to either `left` or `right`, then call `pio_refresh_style()`.
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi.js@5.3.6/dist/pixi.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js"></script>
If you have trouble setting up this, check following example's sources.
https://jupiterbjy.github.io/PaulPio_PIXI_Demo/
---- */

const initConfig = {
	model: [
		"./Diana/Diana.model3.json"
	],
	tips: true, // 时间问好
	onModelLoad: function(model){
		const canvas = document.getElementById("pio")
		playAction({ motion: "Tap抱阿草-左手" })
	}
}

let touchList = [
	{
		text: "嘉心糖屁用没有",
		motion: "Tap生气 -领结"
	},
	{
		text: "有人急了，但我不说是谁~",
		motion: "Tap= =  左蝴蝶结"
	},
	{
		text: "呜呜...呜呜呜....",
		motion: "Tap哭 -眼角"
	},
	{
		text: "想然然了没有呀~",
		motion: "Tap害羞-中间刘海"
	},
	{
		text: "阿草好软呀~",
		motion: "Tap抱阿草-左手"
	},
	{
		text: "不要再戳啦！好痒！",
		motion: "Tap摇头- 身体"
	},
	{
		text: "嗷呜~~~",
		motion: "Tap耳朵-发卡"
	},
	{
		text: "zzZ。。。",
		motion: "Leave"
	},
	{
		text: "哇！好吃的！",
		motion: "Tap右头发"
	},
	{
		text: "别摇啦",
		motion: "Shake"
	},
]

function playAction(action) {
	action.text && pio_reference.modules.render(action.text) // 展示文案
	action.motion && pio_reference.model.motion(action.motion) // 播放动作
}

function loadlive2d(canvas_id, json_object_or_url, on_load) {
	const canvas = document.getElementById(canvas_id)
	if (canvas.width === 0) {
		canvas.removeAttribute("height")
	}
	try {
		pixiApp.stage.removeChildAt(0)
	} catch (error) {
	}
	let model = PIXI.live2d.Live2DModel.fromSync(json_object_or_url)
	model.once("load", () => {
		pixiApp.stage.addChild(model)
		const vertical_factor = canvas.height / model.height
		model.scale.set(vertical_factor)
		canvas.width = model.width
		canvas.height = model.height
		model.x = canvas.width - model.width
		on_load(model)
	})
	return model
}

function _pio_initialize_pixi() {
	pixiApp = new PIXI.Application({
		view: document.getElementById("pio"),
		transparent: true,
		autoStart: true,
	})
}

let pio_alignment = "right"
let pixiApp

window.addEventListener("DOMContentLoaded", _pio_initialize_pixi)

var Paul_Pio = function(prop) {
	var that = this;
	var current = {
		idol: 0,
		canvas: document.getElementById("pio"),
		body: document.querySelector(".pio-container"),
		root: document.location.protocol + '//' + document.location.hostname + '/'
	};
	/* - 方法 */
	var modules = {
		// 创建内容
		create: function(tag, prop) {
			var e = document.createElement(tag);
			if (prop.class) e.className = prop.class;
			return e;
		},
		// 随机内容
		rand: function(arr) {
			return arr[Math.floor(Math.random() * arr.length + 1) - 1];
		},
		// 创建对话框方法
		render: function(text) {
			if (text.constructor === Array) {
				dialog.innerHTML = modules.rand(text);
			} else if (text.constructor === String) {
				dialog.innerHTML = text;
			}
			dialog.classList.add("active");
			clearTimeout(this.t);
			this.t = setTimeout(function() {
				dialog.classList.remove("active");
			}, 3000);
		}
	};
	this.modules = modules;
	var dialog = modules.create("div", {
		class: "pio-dialog"
	});
	current.body.appendChild(dialog);
	/* - 提示操作 */
	var action = {
		// 欢迎
		welcome: function() {		
			var text, hour = new Date().getHours();
			if (hour > 23 || hour <= 5) {
				text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
			} else if (hour > 5 && hour <= 8) {
				text = '早上好！';
			} else if (hour > 8 && hour <= 11) {
				text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
			} else if (hour > 11 && hour <= 14) {
				text = '中午了，工作了一个上午，现在是午餐时间！';
			} else if (hour > 14 && hour <= 17) {
				text = '午后很容易犯困呢，今天的运动目标完成了吗？';
			} else if (hour > 17 && hour <= 19) {
				text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
			} else if (hour > 19 && hour <= 21) {
				text = '晚上好，今天过得怎么样？';
			} else if (hour > 21 && hour <= 23) {
				text = '已经这么晚了呀，早点休息吧，晚安~';
			}
			modules.render(text);
		},
		// 触摸
		touch: function(model) {
			current.canvas.onclick = function() {
				if (model.internalModel.motionManager.state.currentGroup !== "Idle") return

				// 随机选择并播放动作
				const action = pio_reference.modules.rand(touchList)
				playAction(action)
			};
		}
	};
	/* - 运行 */
	var begin = {
		fixed: function(model) {
			action.touch(model);
		}
	};
	// 运行
	this.init = function() {
		action.welcome();
		that.model = loadlive2d("pio", prop.model[0], model => {
			prop.onModelLoad && prop.onModelLoad(model)
		});
		begin.fixed(that.model);
	};

	this.init();
};
// 请保留版权说明
if (window.console && window.console.log) {
	console.log("%c Pio %c https://paugram.com ", "color: #fff; margin: 1em 0; padding: 5px 0; background: #673ab7;", "margin: 1em 0; padding: 5px 0; background: #efefef;");
}