'use strict';
(function(root, factory){
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if(typeof exports !== 'undefined' && module.exports) {
		module.exports = factory();
	} else {
		root.Touch = factory();
	}
}(this, function() {

	/**
	 * @private
	 * [type description]
	 * @param  {[Object]} obj [Any Object]
	 * @return {[String]}     [object type in lowercase]
	 */
	function type(obj) {
		var rs = Object.prototype.toString.call(obj),
			rsLength = rs.length;

		return rs.slice(8, rsLength - 1).toLowerCase();
	}

	/**
	 * @private
	 * [errorLog description]
	 * @param  {[type]} err [description]
	 * @return {[type]}     [description]
	 */
	function errorLog(err) {
		if (this.console) {
			console.log(err);
		}
	}

	/**
	 * @private
	 * [each description]
	 * @param  {[type]} obj      [description]
	 * @param  {[type]} iterator [description]
	 * @param  {[type]} context  [description]
	 * @return {[type]}          [description]
	 */
	function each(obj, iterator, context) {
		var i = void 0;
		if (!obj) {
			return ;
		}
		if (obj.forEach) {
			obj.forEach(iterator, context);
		} else if(obj.length !== undefined) {
			i = 0;
			while(i < obj.length) {
				iterator.call(context, obj[i], i, obj);
				i ++;
			}
		} else {
			for(i in obj) {
				obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
			}
		}
	}

	function noop() {};

	function getDistance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}

	function getDirection(x1, y1, x2, y2) {
		return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : ((y1 - y2) > 0 ? 'up' : 'down'); 
	}


	function Touch(el, option) {
		this.element = typeof el === 'string' ? document.querySelector(el) : el;
		this.now = null;
		this.x1 = this.y1 = this.x2 = this.y2 = null;
		this.direction = '';

		this.tap = option.tap || noop;
		this.swipe = option.swipe || noop;
		this.pan = option.pan || noop;

		this.start = this.start.bind(this);
		this.move = this.move.bind(this);
		this.end = this.end.bind(this);
		this.cancel = this.cancel.bind(this);
		this.on('touchstart', this.start, false);
		this.on('touchmove', this.move, false);
		this.on('touchend', this.end, false);
		this.on('touchcancel', this.cancel, false);

		this.tapTimeout = this.swipeTimeout = null;
	};

	Touch.prototype = {
		start: function(e) {
			if (!e.touches) {
				return ;
			}
			this.now = Date.now();
			this.x1 = e.touches[0].pageX;
			this.y1 = e.touches[0].pageY;
		},
		move: function(e) {
			if (!e.touches) {
				return ;
			}
			var currentX = e.touches[0].pageX,
				currentY = e.touches[0].pageY;
			this.x2 = currentX,
			this.y2 = currentY;
		},
		end: function(e) {
			if (!e.touches) {
				return ;
			}

			var self = this;

			this.direction = getDirection(this.x1, this.y1, this.x2, this.y2);

			if (this.x2 && getDistance(this.x1, this.y1, this.x2, this.y2) > 30) {
				this.trigger('swipe');
			} else {
				this.tapTimeout = setTimeout(function() {
					self.trigger('tap');
				}, 0);
			}

			this.x1 = this.y1 = this.x2 = this.y2 = null;
		},
		cancel: function(e) {

		},
		on: function(type, callback) {
			this.element.addEventListener(type, callback, false);
		},
		off: function(type, callback) {
			this.element.removeEventListener(type, callback, false);
		},
		trigger: function(type, data) {
			var event = document.createEvent('Event');
			event.initEvent(type, true, true);
			event.gesture = data;
			this.element.dispatchEvent(event);
		},
		destory: function() {
			this.on('touchstart', this.start);
			this.on('touchmove', this.move);
			this.on('touchend', this.end);
			this.on('touchcancel', this.cancel);
		}
	};

	return Touch;
}));