// Generated by Haxe 3.4.0
(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = function() {
	this._stage = new PIXI.Container();
	Main.renderer = PIXI.autoDetectRenderer(window.innerWidth?window.innerWidth:window.document.documentElement.clientWidth,window.innerHeight?window.innerHeight:window.document.documentElement.clientHeight,{ backgroundColor : 0, roundPixels : false});
	window.document.body.appendChild(Main.renderer.view);
	window.requestAnimationFrame($bind(this,this.onFrame));
	window.onresize = $bind(this,this.onResize);
	utils_FrameDispatcher.init();
	utils_Keyboard.init();
	utils_GestureRecognizer.init();
	var level = new game_Level();
	this._stage.addChild(level);
};
Main.main = function() {
	new Main();
};
Main.prototype = {
	onFrame: function() {
		window.requestAnimationFrame($bind(this,this.onFrame));
		utils_FrameDispatcher.update();
		Main.renderer.render(this._stage);
	}
	,onResize: function() {
		var width = window.innerWidth?window.innerWidth:window.document.documentElement.clientWidth;
		var height = window.innerHeight?window.innerHeight:window.document.documentElement.clientHeight;
		Main.renderer.resize(width,height);
	}
};
var game_Level = function() {
	PIXI.Container.call(this);
	var floorTex = PIXI.Texture.fromImage("assets/floor.png");
	var tiles = new PIXI.Container();
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < 10) {
			var tile = new PIXI.Sprite(floorTex);
			tile.x = _g1++ * 32;
			tile.y = i * 32;
			tiles.addChild(tile);
		}
	}
	this.addChild(tiles);
	this._player = new game_Player();
	this.addChild(this._player);
	utils_FrameDispatcher.addListener(this,$bind(this,this.onFrame));
};
game_Level.__super__ = PIXI.Container;
game_Level.prototype = $extend(PIXI.Container.prototype,{
	onFrame: function() {
		this.x = Main.renderer.width / 2 - this._player.x;
		this.y = Main.renderer.height / 2 - this._player.y;
	}
});
var game_Player = function() {
	game_Player._instance = this;
	var firstFrameTex = PIXI.Texture.fromImage("assets/player_frame1.png");
	firstFrameTex.baseTexture.scaleMode = 1;
	PIXI.Sprite.call(this,firstFrameTex);
	utils_FrameDispatcher.addListener(this,$bind(this,this.onFrame));
	this.scale.set(2);
	this.anchor.set(.5);
	this.position.set(16);
	this._targetPos = new PIXI.Point(this.x,this.y);
	utils_GestureRecognizer.addListener($bind(this,this.onSwipe));
};
game_Player.Shift = function(direction) {
	game_Player._instance.onSwipe(direction);
};
game_Player.__super__ = PIXI.Sprite;
game_Player.prototype = $extend(PIXI.Sprite.prototype,{
	onFrame: function() {
		this.position.x += (this._targetPos.x - this.position.x) * .3;
		this.position.y += (this._targetPos.y - this.position.y) * .3;
	}
	,onSwipe: function(direction) {
		switch(direction) {
		case "down":
			this._targetPos.y -= 32;
			break;
		case "left":
			this._targetPos.x += 32;
			break;
		case "right":
			this._targetPos.x -= 32;
			break;
		case "up":
			this._targetPos.y += 32;
			break;
		}
	}
});
var haxe_IMap = function() { };
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return HxOverrides.iter(a);
	}
};
var ui_DirectionButtons = function() {
	PIXI.Container.call(this);
	this._leftBtn = this.fillBtn(100);
	this._leftBtn.position.set(100,Main.renderer.height / 2);
	this._leftBtn.on("pointerdown",function() {
		game_Player.Shift("left");
	});
	this.addChild(this._leftBtn);
	this._rightBtn = this.fillBtn(100);
	this._rightBtn.position.set(Main.renderer.width - 100,Main.renderer.height / 2);
	this._rightBtn.on("pointerdown",function() {
		game_Player.Shift("right");
	});
	this.addChild(this._rightBtn);
	this._upBtn = this.fillBtn(100);
	this._upBtn.position.set(Main.renderer.width / 2,100);
	this._upBtn.on("pointerdown",function() {
		game_Player.Shift("up");
	});
	this.addChild(this._upBtn);
	this._downBtn = this.fillBtn(100);
	this._downBtn.position.set(Main.renderer.width / 2,Main.renderer.height - 100);
	this._downBtn.on("pointerdown",function() {
		game_Player.Shift("down");
	});
	this.addChild(this._downBtn);
};
ui_DirectionButtons.__super__ = PIXI.Container;
ui_DirectionButtons.prototype = $extend(PIXI.Container.prototype,{
	fillBtn: function(size) {
		var btn = new PIXI.Graphics();
		btn.beginFill(16777215,.6);
		btn.drawRect(-size / 2,-size / 2,size,size);
		btn.endFill();
		btn.hitArea = new PIXI.Rectangle(-size / 2,-size / 2,size,size);
		btn.interactive = true;
		return btn;
	}
});
var utils_FrameDispatcher = function() {
	this._listeners = new haxe_ds_ObjectMap();
};
utils_FrameDispatcher.init = function() {
	utils_FrameDispatcher._instance = new utils_FrameDispatcher();
};
utils_FrameDispatcher.addListener = function(listener,frameFunc) {
	utils_FrameDispatcher._instance._listeners.set(listener,frameFunc);
};
utils_FrameDispatcher.update = function() {
	var listener = utils_FrameDispatcher._instance._listeners.keys();
	while(listener.hasNext()) {
		var listener1 = listener.next();
		if(listener1.worldVisible) {
			utils_FrameDispatcher._instance._listeners.h[listener1.__id__]();
		}
	}
};
var utils_GestureRecognizer = function() {
	this._actionDistance = 32;
	this._minDistance = .1;
	this._allowedDeviation = .2;
	this._manager = Main.renderer.plugins.interaction;
	this._manager.on("pointerdown",$bind(this,this.onDown));
	this._manager.on("pointermove",$bind(this,this.onMove));
	this._manager.on("pointerup",$bind(this,this.onUp));
	this._manager.on("pointerout",$bind(this,this.onOut));
	this._listeners = [];
};
utils_GestureRecognizer.init = function() {
	utils_GestureRecognizer._instance = new utils_GestureRecognizer();
};
utils_GestureRecognizer.addListener = function(func) {
	utils_GestureRecognizer._instance._listeners.push(func);
};
utils_GestureRecognizer.sign = function(x) {
	if(x > 0) {
		return 1;
	} else if(x < 0) {
		return -1;
	} else {
		return 0;
	}
};
utils_GestureRecognizer.prototype = {
	onDown: function(e) {
		this._start = e.data.global.clone();
		this._maxDeviation = new PIXI.Point();
	}
	,onMove: function(e) {
		if(this._start == null) {
			return;
		}
		this._maxDeviation.x = Math.max(Math.abs(e.data.global.x - this._start.x),this._maxDeviation.x);
		this._maxDeviation.y = Math.max(Math.abs(e.data.global.y - this._start.y),this._maxDeviation.y);
		if(Math.sqrt(this._maxDeviation.x * this._maxDeviation.x + this._maxDeviation.y * this._maxDeviation.y) < this._actionDistance) {
			return;
		}
		this.checkSwipe(e.data.global);
		this._start = e.data.global.clone();
		this._maxDeviation = new PIXI.Point();
	}
	,onUp: function(e) {
		if(this._start == null || this._maxDeviation == null) {
			return;
		}
		this._start = null;
		this._maxDeviation = new PIXI.Point();
	}
	,onOut: function() {
		this._start = null;
		this._maxDeviation = null;
	}
	,checkSwipe: function(currentPos) {
		if(Math.min(this._maxDeviation.x,this._maxDeviation.y) / Math.max(this._maxDeviation.x,this._maxDeviation.y) > this._allowedDeviation) {
			return;
		}
		var delta = new PIXI.Point(currentPos.x - this._start.x,currentPos.y - this._start.y);
		if(this._maxDeviation.x > this._maxDeviation.y) {
			if(delta.x > 0) {
				this.dispatch("right");
			} else {
				this.dispatch("left");
			}
		} else if(delta.y > 0) {
			this.dispatch("down");
		} else {
			this.dispatch("up");
		}
	}
	,dispatch: function(side) {
		var _g = 0;
		var _g1 = this._listeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(side);
		}
	}
};
var utils_Keyboard = function() {
	this._pressedKeys = [];
	window.document.addEventListener("keydown",$bind(this,this.onKeyDown));
	window.document.addEventListener("keyup",$bind(this,this.onKeyUp));
};
utils_Keyboard.init = function() {
	utils_Keyboard._instance = new utils_Keyboard();
};
utils_Keyboard.keyPressed = function(which) {
	return utils_Keyboard._instance._pressedKeys.indexOf(which) != -1;
};
utils_Keyboard.prototype = {
	onKeyDown: function(e) {
		if(this._pressedKeys.indexOf(e.which) == -1) {
			this._pressedKeys.push(e.which);
		}
		utils_Keyboard.currentKey = e.which;
	}
	,onKeyUp: function(e) {
		HxOverrides.remove(this._pressedKeys,e.which);
		utils_Keyboard.currentKey = null;
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
haxe_ds_ObjectMap.count = 0;
Main.main();
})();
