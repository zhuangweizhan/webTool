(function(window, undefined) {
	var rootjQuery, readyList, core_strundefined = typeof undefined,
		location = window.location,
		document = window.document,
		docElem = document.documentElement,
		_jQuery = window.jQuery,
		d = window.jQuery,
		_$ = window.$,
		class2type = {},
		core_deletedIds = [],
		core_version = "2.0.0b2",
		core_concat = core_deletedIds.concat,
		core_push = core_deletedIds.push,
		core_slice = core_deletedIds.slice,
		core_indexOf = core_deletedIds.indexOf,
		core_toString = class2type.toString,
		core_hasOwn = class2type.hasOwnProperty,
		core_trim = core_version.trim,
		jQuery = function(selector, context) {
			return new jQuery.fn.init(selector, context, rootjQuery)
		},
		core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		core_rnotwhite = /\S+/g,
		rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(all, letter) {
			return letter.toUpperCase()
		},
		completed = function() {
			document.removeEventListener("DOMContentLoaded", completed, false);
			window.removeEventListener("load", completed, false);
			jQuery.ready()
		};
	jQuery.fn = jQuery.prototype = {
		jquery: core_version,
		constructor: jQuery,
		init: function(selector, context, rootjQuery) {
			var match, elem;
			if (!selector) {
				return this
			}
			if (typeof selector === "string") {
				if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
					match = [null, selector, null]
				} else {
					match = rquickExpr.exec(selector)
				}
				if (match && (match[1] || !context)) {
					if (match[1]) {
						context = context instanceof jQuery ? context[0] : context;
						jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
						if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
							for (match in context) {
								if (jQuery.isFunction(this[match])) {
									this[match](context[match])
								} else {
									this.attr(match, context[match])
								}
							}
						}
						return this
					} else {
						elem = document.getElementById(match[2]);
						if (elem && elem.parentNode) {
							if (elem.id !== match[2]) {
								return rootjQuery.find(selector)
							}
							this.length = 1;
							this[0] = elem
						}
						this.context = document;
						this.selector = selector;
						return this
					}
				} else if (!context || context.jquery) {
					return (context || rootjQuery).find(selector)
				} else {
					return this.constructor(context).find(selector)
				}
			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this
			} else if (jQuery.isFunction(selector)) {
				return rootjQuery.ready(selector)
			}
			if (selector.selector !== undefined) {
				this.selector = selector.selector;
				this.context = selector.context
			}
			return jQuery.makeArray(selector, this)
		},
		selector: "",
		length: 0,
		size: function() {
			return this.length
		},
		toArray: function() {
			return core_slice.call(this)
		},
		get: function(num) {
			return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num])
		},
		pushStack: function(elems) {
			var ret = jQuery.merge(this.constructor(), elems);
			ret.prevObject = this;
			ret.context = this.context;
			return ret
		},
		each: function(callback, args) {
			return jQuery.each(this, callback, args)
		},
		ready: function(fn) {
			jQuery.ready.promise().done(fn);
			return this
		},
		slice: function() {
			return this.pushStack(core_slice.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
		},
		map: function(callback) {
			return this.pushStack(jQuery.map(this, function(elem, i) {
				return callback.call(elem, i, elem)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: core_push,
		sort: [].sort,
		splice: [].splice
	};
	jQuery.fn.init.prototype = jQuery.fn;
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			i = 2
		}
		if (typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {}
		}
		if (length === i) {
			target = this;
			--i
		}
		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue
					}
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : []
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {}
						}
						target[name] = jQuery.extend(deep, clone, copy)
					} else if (copy !== undefined) {
						target[name] = copy
					}
				}
			}
		}
		return target
	};
	jQuery.extend({
		expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
		noConflict: function(deep) {
			if (window.$ === jQuery) {
				window.$ = _$
			}
			if (deep && window.jQuery === jQuery) {
				window.jQuery = _jQuery
			}
			return jQuery
		},
		isReady: false,
		readyWait: 1,
		holdReady: function(hold) {
			if (hold) {
				jQuery.readyWait++
			} else {
				jQuery.ready(true)
			}
		},
		ready: function(wait) {
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return
			}
			jQuery.isReady = true;
			if (wait !== true && --jQuery.readyWait > 0) {
				return
			}
			readyList.resolveWith(document, [jQuery]);
			if (jQuery.fn.trigger) {
				jQuery(document).trigger("ready").off("ready")
			}
		},
		isFunction: function(obj) {
			return jQuery.type(obj) === "function"
		},
		isArray: Array.isArray,
		isWindow: function(obj) {
			return obj != null && obj == obj.window
		},
		isNumeric: function(obj) {
			return !isNaN(parseFloat(obj)) && isFinite(obj)
		},
		type: function(obj) {
			if (obj == null) {
				return String(obj)
			}
			return typeof obj === "object" || typeof obj === "function" ? class2type[core_toString.call(obj)] || "object" : typeof obj
		},
		isPlainObject: function(obj) {
			if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
				return false
			}
			try {
				if (obj.constructor && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false
				}
			} catch (e) {
				return false
			}
			return true
		},
		isEmptyObject: function(obj) {
			var name;
			for (name in obj) {
				return false
			}
			return true
		},
		error: function(msg) {
			throw new Error(msg);
		},
		parseHTML: function(data, context, keepScripts) {
			if (!data || typeof data !== "string") {
				return null
			}
			if (typeof context === "boolean") {
				keepScripts = context;
				context = false
			}
			context = context || document;
			var parsed = rsingleTag.exec(data),
				scripts = !keepScripts && [];
			if (parsed) {
				return [context.createElement(parsed[1])]
			}
			parsed = jQuery.buildFragment([data], context, scripts);
			if (scripts) {
				jQuery(scripts).remove()
			}
			return jQuery.merge([], parsed.childNodes)
		},
		parseJSON: JSON.parse,
		parseXML: function(data) {
			var xml, tmp;
			if (!data || typeof data !== "string") {
				return null
			}
			try {
				tmp = new DOMParser();
				xml = tmp.parseFromString(data, "text/xml")
			} catch (e) {
				xml = undefined
			}
			if (!xml || xml.getElementsByTagName("parsererror").length) {
				jQuery.error("Invalid XML: " + data)
			}
			return xml
		},
		noop: function() {},
		globalEval: function(data) {
			var indirect = eval;
			if (jQuery.trim(data)) {
				indirect(data + ";")
			}
		},
		camelCase: function(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
		},
		nodeName: function(elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
		},
		each: function(obj, callback, args) {
			var value, i = 0,
				length = obj.length,
				isArray = isArraylike(obj);
			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break
						}
					}
				}
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break
						}
					}
				}
			}
			return obj
		},
		trim: function(text) {
			return text == null ? "" : core_trim.call(text)
		},
		makeArray: function(arr, results) {
			var ret = results || [];
			if (arr != null) {
				if (isArraylike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr)
				} else {
					core_push.call(ret, arr)
				}
			}
			return ret
		},
		inArray: function(elem, arr, i) {
			return arr == null ? -1 : core_indexOf.call(arr, elem, i)
		},
		merge: function(first, second) {
			var l = second.length,
				i = first.length,
				j = 0;
			if (typeof l === "number") {
				for (; j < l; j++) {
					first[i++] = second[j]
				}
			} else {
				while (second[j] !== undefined) {
					first[i++] = second[j++]
				}
			}
			first.length = i;
			return first
		},
		grep: function(elems, callback, inv) {
			var retVal, ret = [],
				i = 0,
				length = elems.length;
			inv = !! inv;
			for (; i < length; i++) {
				retVal = !! callback(elems[i], i);
				if (inv !== retVal) {
					ret.push(elems[i])
				}
			}
			return ret
		},
		map: function(elems, callback, arg) {
			var value, i = 0,
				length = elems.length,
				isArray = isArraylike(elems),
				ret = [];
			if (isArray) {
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret[ret.length] = value
					}
				}
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret[ret.length] = value
					}
				}
			}
			return core_concat.apply([], ret)
		},
		guid: 1,
		proxy: function(fn, context) {
			var tmp, args, proxy;
			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp
			}
			if (!jQuery.isFunction(fn)) {
				return undefined
			}
			args = core_slice.call(arguments, 2);
			proxy = function() {
				return fn.apply(context || this, args.concat(core_slice.call(arguments)))
			};
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
			return proxy
		},
		access: function(elems, fn, key, value, chainable, emptyGet, raw) {
			var i = 0,
				length = elems.length,
				bulk = key == null;
			if (jQuery.type(key) === "object") {
				chainable = true;
				for (i in key) {
					jQuery.access(elems, fn, i, key[i], true, emptyGet, raw)
				}
			} else if (value !== undefined) {
				chainable = true;
				if (!jQuery.isFunction(value)) {
					raw = true
				}
				if (bulk) {
					if (raw) {
						fn.call(elems, value);
						fn = null
					} else {
						bulk = fn;
						fn = function(elem, key, value) {
							return bulk.call(jQuery(elem), value)
						}
					}
				}
				if (fn) {
					for (; i < length; i++) {
						fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
					}
				}
			}
			return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
		},
		now: Date.now
	});
	jQuery.ready.promise = function(obj) {
		if (!readyList) {
			readyList = jQuery.Deferred();
			if (document.readyState === "complete") {
				setTimeout(jQuery.ready)
			} else {
				document.addEventListener("DOMContentLoaded", completed, false);
				window.addEventListener("load", completed, false)
			}
		}
		return readyList.promise(obj)
	};
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase()
	});

	function isArraylike(obj) {
		var length = obj.length,
			type = jQuery.type(obj);
		if (jQuery.isWindow(obj)) {
			return false
		}
		if (obj.nodeType === 1 && length) {
			return true
		}
		return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj)
	}
	rootjQuery = jQuery(document);
	var optionsCache = {};

	function createOptions(options) {
		var object = optionsCache[options] = {};
		jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
			object[flag] = true
		});
		return object
	}
	jQuery.Callbacks = function(options) {
		options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
		var memory, fired, firing, firingStart, firingLength, firingIndex, list = [],
			stack = !options.once && [],
			fire = function(data) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for (; list && firingIndex < firingLength; firingIndex++) {
					if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
						memory = false;
						break
					}
				}
				firing = false;
				if (list) {
					if (stack) {
						if (stack.length) {
							fire(stack.shift())
						}
					} else if (memory) {
						list = []
					} else {
						self.disable()
					}
				}
			},
			self = {
				add: function() {
					if (list) {
						var start = list.length;
						(function add(args) {
							jQuery.each(args, function(_, arg) {
								var type = jQuery.type(arg);
								if (type === "function") {
									if (!options.unique || !self.has(arg)) {
										list.push(arg)
									}
								} else if (arg && arg.length && type !== "string") {
									add(arg)
								}
							})
						})(arguments);
						if (firing) {
							firingLength = list.length
						} else if (memory) {
							firingStart = start;
							fire(memory)
						}
					}
					return this
				},
				remove: function() {
					if (list) {
						jQuery.each(arguments, function(_, arg) {
							var index;
							while ((index = jQuery.inArray(arg, list, index)) > -1) {
								list.splice(index, 1);
								if (firing) {
									if (index <= firingLength) {
										firingLength--
									}
									if (index <= firingIndex) {
										firingIndex--
									}
								}
							}
						})
					}
					return this
				},
				has: function(fn) {
					return fn ? jQuery.inArray(fn, list) > -1 : !! (list && list.length)
				},
				empty: function() {
					list = [];
					firingLength = 0;
					return this
				},
				disable: function() {
					list = stack = memory = undefined;
					return this
				},
				disabled: function() {
					return !list
				},
				lock: function() {
					stack = undefined;
					if (!memory) {
						self.disable()
					}
					return this
				},
				locked: function() {
					return !stack
				},
				fireWith: function(context, args) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					if (list && (!fired || stack)) {
						if (firing) {
							stack.push(args)
						} else {
							fire(args)
						}
					}
					return this
				},
				fire: function() {
					self.fireWith(this, arguments);
					return this
				},
				fired: function() {
					return !!fired
				}
			};
		return self
	};
	jQuery.extend({
		Deferred: function(func) {
			var tuples = [
				["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
				["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
				["notify", "progress", jQuery.Callbacks("memory")]
			],
				state = "pending",
				promise = {
					state: function() {
						return state
					},
					always: function() {
						deferred.done(arguments).fail(arguments);
						return this
					},
					then: function() {
						var fns = arguments;
						return jQuery.Deferred(function(newDefer) {
							jQuery.each(tuples, function(i, tuple) {
								var action = tuple[0],
									fn = jQuery.isFunction(fns[i]) && fns[i];
								deferred[tuple[1]](function() {
									var returned = fn && fn.apply(this, arguments);
									if (returned && jQuery.isFunction(returned.promise)) {
										returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
									} else {
										newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
									}
								})
							});
							fns = null
						}).promise()
					},
					promise: function(obj) {
						return obj != null ? jQuery.extend(obj, promise) : promise
					}
				},
				deferred = {};
			promise.pipe = promise.then;
			jQuery.each(tuples, function(i, tuple) {
				var list = tuple[2],
					stateString = tuple[3];
				promise[tuple[1]] = list.add;
				if (stateString) {
					list.add(function() {
						state = stateString
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock)
				}
				deferred[tuple[0]] = function() {
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this
				};
				deferred[tuple[0] + "With"] = list.fireWith
			});
			promise.promise(deferred);
			if (func) {
				func.call(deferred, deferred)
			}
			return deferred
		},
		when: function(subordinate) {
			var i = 0,
				resolveValues = core_slice.call(arguments),
				length = resolveValues.length,
				remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
				updateFunc = function(i, contexts, values) {
					return function(value) {
						contexts[i] = this;
						values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
						if (values === progressValues) {
							deferred.notifyWith(contexts, values)
						} else if (!(--remaining)) {
							deferred.resolveWith(contexts, values)
						}
					}
				},
				progressValues, progressContexts, resolveContexts;
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues))
					} else {
						--remaining
					}
				}
			}
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues)
			}
			return deferred.promise()
		}
	});
	jQuery.support = (function(support) {
		var input = document.createElement("input"),
			fragment = document.createDocumentFragment(),
			div = document.createElement("div"),
			select = document.createElement("select"),
			opt = select.appendChild(document.createElement("option"));
		if (!input.type) {
			return support
		}
		input.type = "checkbox";
		support.checkOn = input.value === "";
		support.optSelected = opt.selected;
		support.boxModel = document.compatMode === "CSS1Compat";
		support.reliableMarginRight = true;
		support.boxSizingReliable = true;
		support.pixelPosition = false;
		input.checked = true;
		support.noCloneChecked = input.cloneNode(true).checked;
		select.disabled = true;
		support.optDisabled = !opt.disabled;
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
		input.setAttribute("checked", "t");
		input.setAttribute("name", "t");
		fragment.appendChild(input);
		support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
		support.focusinBubbles = "onfocusin" in window;
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
		jQuery(function() {
			var container, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				body = document.getElementsByTagName("body")[0];
			if (!body) {
				return
			}
			container = document.createElement("div");
			container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
			body.appendChild(container).appendChild(div);
			div.innerHTML = "";
			div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
			support.boxSizing = div.offsetWidth === 4;
			support.doesNotIncludeMarginInBodyOffset = body.offsetTop !== 1;
			if (window.getComputedStyle) {
				support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
				support.boxSizingReliable = (window.getComputedStyle(div, null) || {
					width: "4px"
				}).width === "4px";
				marginDiv = div.appendChild(document.createElement("div"));
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)
			}
			body.removeChild(container)
		});
		return support
	})({});
	var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		rmultiDash = /([A-Z])/g;

	function Data() {
		this.cache = {};
		this.expando = jQuery.expando + Math.random()
	}
	Data.uid = 1;
	Data.prototype = {
		key: function(owner) {
			var descriptor = {},
				unlock = owner[this.expando];
			if (!unlock) {
				unlock = Data.uid++;
				descriptor[this.expando] = {
					value: unlock
				};
				try {
					Object.defineProperties(owner, descriptor)
				} catch (e) {
					descriptor[this.expando] = unlock;
					jQuery.extend(owner, descriptor)
				}
			}
			if (!this.cache[unlock]) {
				this.cache[unlock] = {}
			}
			return unlock
		},
		set: function(owner, data, value) {
			var prop, unlock = this.key(owner),
				cache = this.cache[unlock];
			if (typeof data === "string") {
				cache[data] = value
			} else {
				if (jQuery.isEmptyObject(cache)) {
					this.cache[unlock] = data
				} else {
					for (prop in data) {
						cache[prop] = data[prop]
					}
				}
			}
			return this
		},
		get: function(owner, key) {
			var cache = this.cache[this.key(owner)];
			return key === undefined ? cache : cache[key]
		},
		access: function(owner, key, value) {
			if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
				return this.get(owner, key)
			}
			this.set(owner, key, value);
			return value !== undefined ? value : key
		},
		remove: function(owner, key) {
			var i, name, unlock = this.key(owner),
				cache = this.cache[unlock];
			if (key === undefined) {
				this.cache[unlock] = {}
			} else {
				if (jQuery.isArray(key)) {
					name = key.concat(key.map(jQuery.camelCase))
				} else {
					if (key in cache) {
						name = [key]
					} else {
						name = jQuery.camelCase(key);
						name = name in cache ? [name] : (name.match(core_rnotwhite) || [])
					}
				}
				i = name.length;
				while (i--) {
					delete cache[name[i]]
				}
			}
		},
		hasData: function(owner) {
			return !jQuery.isEmptyObject(this.cache[this.key(owner)])
		},
		discard: function(owner) {
			delete this.cache[this.key(owner)]
		}
	};

	function data_discard(owner) {
		data_user.discard(owner);
		data_priv.discard(owner)
	}
	data_user = new Data();
	data_priv = new Data();
	jQuery.extend({
		acceptData: function() {
			return true
		},
		hasData: function(elem) {
			return data_user.hasData(elem) || data_priv.hasData(elem)
		},
		data: function(elem, name, data) {
			return data_user.access(elem, name, data)
		},
		removeData: function(elem, name) {
			return data_user.remove(elem, name)
		},
		_data: function(elem, name, data) {
			return data_priv.access(elem, name, data)
		},
		_removeData: function(elem, name) {
			return data_priv.remove(elem, name)
		}
	});
	jQuery.fn.extend({
		data: function(key, value) {
			var attrs, name, elem = this[0],
				i = 0,
				data = null;
			if (key === undefined) {
				if (this.length) {
					data = data_user.get(elem);
					if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
						attrs = elem.attributes;
						for (; i < attrs.length; i++) {
							name = attrs[i].name;
							if (name.indexOf("data-") === 0) {
								name = jQuery.camelCase(name.substring(5));
								dataAttr(elem, name, data[name])
							}
						}
						data_priv.set(elem, "hasDataAttrs", true)
					}
				}
				return data
			}
			if (typeof key === "object") {
				return this.each(function() {
					data_user.set(this, key)
				})
			}
			return jQuery.access(this, function(value) {
				var data, camelKey = jQuery.camelCase(key);
				if (value === undefined) {
					data = data_user.get(elem, key);
					if (data !== undefined) {
						return data
					}
					data = dataAttr(elem, key, undefined);
					if (data !== undefined) {
						return data
					}
					data = data_user.get(elem, camelKey);
					if (data !== undefined) {
						return data
					}
					return undefined
				}
				this.each(function() {
					var data = data_user.get(this, camelKey);
					data_user.set(this, camelKey, value);
					if (/-/.test(key) && data !== undefined) {
						data_user.set(this, key, value)
					}
				})
			}, null, value, arguments.length > 1, null, true)
		},
		removeData: function(key) {
			return this.each(function() {
				data_user.remove(this, key)
			})
		}
	});

	function dataAttr(elem, key, data) {
		var name;
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
			data = elem.getAttribute(name);
			if (typeof data === "string") {
				try {
					data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? JSON.parse(data) : data
				} catch (e) {}
				data_user.set(elem, key, data)
			} else {
				data = undefined
			}
		}
		return data
	}
	jQuery.extend({
		queue: function(elem, type, data) {
			var queue;
			if (elem) {
				type = (type || "fx") + "queue";
				queue = jQuery._data(elem, type);
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = jQuery._data(elem, type, jQuery.makeArray(data))
					} else {
						queue.push(data)
					}
				}
				return queue || []
			}
		},
		dequeue: function(elem, type) {
			type = type || "fx";
			var queue = jQuery.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks(elem, type),
				next = function() {
					jQuery.dequeue(elem, type)
				};
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--
			}
			hooks.cur = fn;
			if (fn) {
				if (type === "fx") {
					queue.unshift("inprogress")
				}
				delete hooks.stop;
				fn.call(elem, next, hooks)
			}
			if (!startLength && hooks) {
				hooks.empty.fire()
			}
		},
		_queueHooks: function(elem, type) {
			var key = type + "queueHooks";
			return jQuery._data(elem, key) || jQuery._data(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					jQuery._removeData(elem, type + "queue");
					jQuery._removeData(elem, key)
				})
			})
		}
	});
	jQuery.fn.extend({
		queue: function(type, data) {
			var setter = 2;
			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--
			}
			if (arguments.length < setter) {
				return jQuery.queue(this[0], type)
			}
			return data === undefined ? this : this.each(function() {
				var queue = jQuery.queue(this, type, data);
				jQuery._queueHooks(this, type);
				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type)
				}
			})
		},
		dequeue: function(type) {
			return this.each(function() {
				jQuery.dequeue(this, type)
			})
		},
		delay: function(time, type) {
			time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
			type = type || "fx";
			return this.queue(type, function(next, hooks) {
				var timeout = setTimeout(next, time);
				hooks.stop = function() {
					clearTimeout(timeout)
				}
			})
		},
		clearQueue: function(type) {
			return this.queue(type || "fx", [])
		},
		promise: function(type, obj) {
			var tmp, count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if (!(--count)) {
						defer.resolveWith(elements, [elements])
					}
				};
			if (typeof type !== "string") {
				obj = type;
				type = undefined
			}
			type = type || "fx";
			while (i--) {
				tmp = jQuery._data(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve)
				}
			}
			resolve();
			return defer.promise(obj)
		}
	});
	var nodeHook, boolHook, rclass = /[\t\r\n]/g,
		rreturn = /\r/g,
		rfocusable = /^(?:input|select|textarea|button|object)$/i,
		rclickable = /^(?:a|area)$/i,
		rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i;
	jQuery.fn.extend({
		attr: function(name, value) {
			return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
		},
		removeAttr: function(name) {
			return this.each(function() {
				jQuery.removeAttr(this, name)
			})
		},
		prop: function(name, value) {
			return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
		},
		removeProp: function(name) {
			name = jQuery.propFix[name] || name;
			return this.each(function() {
				try {
					this[name] = undefined;
					delete this[name]
				} catch (e) {}
			})
		},
		addClass: function(value) {
			var classes, elem, cur, clazz, j, i = 0,
				len = this.length,
				proceed = typeof value === "string" && value;
			if (jQuery.isFunction(value)) {
				return this.each(function(j) {
					jQuery(this).addClass(value.call(this, j, this.className))
				})
			}
			if (proceed) {
				classes = (value || "").match(core_rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " "
							}
						}
						elem.className = jQuery.trim(cur)
					}
				}
			}
			return this
		},
		removeClass: function(value) {
			var classes, elem, cur, clazz, j, i = 0,
				len = this.length,
				proceed = arguments.length === 0 || typeof value === "string" && value;
			if (jQuery.isFunction(value)) {
				return this.each(function(j) {
					jQuery(this).removeClass(value.call(this, j, this.className))
				})
			}
			if (proceed) {
				classes = (value || "").match(core_rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							while (cur.indexOf(" " + clazz + " ") >= 0) {
								cur = cur.replace(" " + clazz + " ", " ")
							}
						}
						elem.className = value ? jQuery.trim(cur) : ""
					}
				}
			}
			return this
		},
		toggleClass: function(value, stateVal) {
			var type = typeof value,
				isBool = typeof stateVal === "boolean";
			if (jQuery.isFunction(value)) {
				return this.each(function(i) {
					jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
				})
			}
			return this.each(function() {
				if (type === "string") {
					var className, i = 0,
						self = jQuery(this),
						state = stateVal,
						classNames = value.match(core_rnotwhite) || [];
					while ((className = classNames[i++])) {
						state = isBool ? state : !self.hasClass(className);
						self[state ? "addClass" : "removeClass"](className)
					}
				} else if (type === core_strundefined || type === "boolean") {
					if (this.className) {
						jQuery._data(this, "__className__", this.className)
					}
					this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || ""
				}
			})
		},
		hasClass: function(selector) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for (; i < l; i++) {
				if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
					return true
				}
			}
			return false
		},
		val: function(value) {
			var hooks, ret, isFunction, elem = this[0];
			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret
					}
					ret = elem.value;
					return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
				}
				return
			}
			isFunction = jQuery.isFunction(value);
			return this.each(function(i) {
				var val, self = jQuery(this);
				if (this.nodeType !== 1) {
					return
				}
				if (isFunction) {
					val = value.call(this, i, self.val())
				} else {
					val = value
				}
				if (val == null) {
					val = ""
				} else if (typeof val === "number") {
					val += ""
				} else if (jQuery.isArray(val)) {
					val = jQuery.map(val, function(value) {
						return value == null ? "" : value + ""
					})
				}
				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val
				}
			})
		}
	});
	jQuery.extend({
		valHooks: {
			option: {
				get: function(elem) {
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value : elem.text
				}
			},
			select: {
				get: function(elem) {
					var value, option, options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ? max : one ? index : 0;
					for (; i < max; i++) {
						option = options[i];
						if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
							value = jQuery(option).val();
							if (one) {
								return value
							}
							values.push(value)
						}
					}
					return values
				},
				set: function(elem, value) {
					var values = jQuery.makeArray(value);
					jQuery(elem).find("option").each(function() {
						this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0
					});
					if (!values.length) {
						elem.selectedIndex = -1
					}
					return values
				}
			}
		},
		attr: function(elem, name, value) {
			var ret, hooks, notxml, nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) {
				return
			}
			if (typeof elem.getAttribute === core_strundefined) {
				return jQuery.prop(elem, name, value)
			}
			notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
			if (notxml) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)
			}
			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name)
				} else if (hooks && notxml && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret
				} else {
					elem.setAttribute(name, value + "");
					return value
				}
			} else if (hooks && notxml && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret
			} else {
				if (typeof elem.getAttribute !== core_strundefined) {
					ret = elem.getAttribute(name)
				}
				return ret == null ? undefined : ret
			}
		},
		removeAttr: function(elem, value) {
			var name, propName, i = 0,
				attrNames = value && value.match(core_rnotwhite);
			if (attrNames && elem.nodeType === 1) {
				while ((name = attrNames[i++])) {
					propName = jQuery.propFix[name] || name;
					if (rboolean.test(name)) {
						elem[propName] = false
					}
					elem.removeAttribute(name)
				}
			}
		},
		attrHooks: {
			type: {
				set: function(elem, value) {
					if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val
						}
						return value
					}
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(elem, name, value) {
			var ret, hooks, notxml, nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) {
				return
			}
			notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
			if (notxml) {
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name]
			}
			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret
				} else {
					return (elem[name] = value)
				}
			} else {
				if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
					return ret
				} else {
					return elem[name]
				}
			}
		},
		propHooks: {
			tabIndex: {
				get: function(elem) {
					var attributeNode = elem.getAttributeNode("tabindex");
					return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined
				}
			}
		}
	});
	boolHook = {
		get: function(elem, name) {
			return elem.getAttribute(name) !== null ? name.toLowerCase() : undefined
		},
		set: function(elem, value, name) {
			if (value === false) {
				jQuery.removeAttr(elem, name)
			} else {
				elem.setAttribute(name, name)
			}
			return name
		}
	};
	if (!jQuery.support.checkOn) {
		jQuery.each(["radio", "checkbox"], function() {
			jQuery.valHooks[this] = {
				get: function(elem) {
					return elem.getAttribute("value") === null ? "on" : elem.value
				}
			}
		})
	}
	jQuery.each(["radio", "checkbox"], function() {
		jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
			set: function(elem, value) {
				if (jQuery.isArray(value)) {
					return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
				}
			}
		})
	});
	if (!jQuery.support.optSelected) {
		jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
			get: function(elem) {
				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex
				}
				return null
			}
		})
	}
	var rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true
	}
	function returnFalse() {
		return false
	}
	jQuery.event = {
		global: {},
		add: function(elem, types, handler, data, selector) {
			var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
			if (!elemData) {
				return
			}
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector
			}
			if (!handler.guid) {
				handler.guid = jQuery.guid++
			}
			if (!(events = elemData.events)) {
				events = elemData.events = {}
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function(e) {
					return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined
				};
				eventHandle.elem = elem
			}
			types = (types || "").match(core_rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) {
					continue
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				special = jQuery.event.special[type] || {};
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle, false)
						}
					}
				}
				if (special.add) {
					special.add.call(elem, handleObj);
					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid
					}
				}
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj)
				} else {
					handlers.push(handleObj)
				}
				jQuery.event.global[type] = true
			}
			elem = null
		},
		remove: function(elem, types, handler, selector, mappedTypes) {
			var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
			if (!elemData || !(events = elemData.events)) {
				return
			}
			types = (types || "").match(core_rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true)
					}
					continue
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];
					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);
						if (handleObj.selector) {
							handlers.delegateCount--
						}
						if (special.remove) {
							special.remove.call(elem, handleObj)
						}
					}
				}
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
						jQuery.removeEvent(elem, type, elemData.handle)
					}
					delete events[type]
				}
			}
			if (jQuery.isEmptyObject(events)) {
				delete elemData.handle;
				jQuery._removeData(elem, "events")
			}
		},
		trigger: function(event, data, elem, onlyHandlers) {
			var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
				type = core_hasOwn.call(event, "type") ? event.type : event,
				namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
			cur = tmp = elem = elem || document;
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return
			}
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return
			}
			if (type.indexOf(".") >= 0) {
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort()
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
			event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
			event.result = undefined;
			if (!event.target) {
				event.target = elem
			}
			data = data == null ? [event] : jQuery.makeArray(data, [event]);
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return
			}
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur
				}
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window)
				}
			}
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
				event.type = i > 1 ? bubbleType : special.bindType || type;
				handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
				if (handle) {
					handle.apply(cur, data)
				}
				handle = ontype && cur[ontype];
				if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
					event.preventDefault()
				}
			}
			event.type = type;
			if (!onlyHandlers && !event.isDefaultPrevented()) {
				if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
						tmp = elem[ontype];
						if (tmp) {
							elem[ontype] = null
						}
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;
						if (tmp) {
							elem[ontype] = tmp
						}
					}
				}
			}
			return event.result
		},
		dispatch: function(event) {
			event = jQuery.event.fix(event);
			var i, j, ret, matched, handleObj, handlerQueue = [],
				args = core_slice.call(arguments),
				handlers = (jQuery._data(this, "events") || {})[event.type] || [],
				special = jQuery.event.special[event.type] || {};
			args[0] = event;
			event.delegateTarget = this;
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return
			}
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;
				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
					if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
						event.handleObj = handleObj;
						event.data = handleObj.data;
						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation()
							}
						}
					}
				}
			}
			if (special.postDispatch) {
				special.postDispatch.call(this, event)
			}
			return event.result
		},
		handlers: function(event, handlers) {
			var i, matches, sel, handleObj, handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
			if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
				for (; cur != this; cur = cur.parentNode || this) {
					if (cur.disabled !== true || event.type !== "click") {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];
							sel = handleObj.selector + " ";
							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length
							}
							if (matches[sel]) {
								matches.push(handleObj)
							}
						}
						if (matches.length) {
							handlerQueue.push({
								elem: cur,
								handlers: matches
							})
						}
					}
				}
			}
			if (delegateCount < handlers.length) {
				handlerQueue.push({
					elem: this,
					handlers: handlers.slice(delegateCount)
				})
			}
			return handlerQueue
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(event, original) {
				if (event.which == null) {
					event.which = original.charCode != null ? original.charCode : original.keyCode
				}
				return event
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(event, original) {
				var eventDoc, doc, body, button = original.button;
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
				}
				if (!event.which && button !== undefined) {
					event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)))
				}
				return event
			}
		},
		fix: function(event) {
			if (event[jQuery.expando]) {
				return event
			}
			var i, prop, copy, type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[type];
			if (!fixHook) {
				this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
			event = new jQuery.Event(originalEvent);
			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop]
			}
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode
			}
			return fixHook.filter ? fixHook.filter(event, originalEvent) : event
		},
		special: {
			load: {
				noBubble: true
			},
			click: {
				trigger: function() {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false
					}
				}
			},
			focus: {
				trigger: function() {
					if (this !== document.activeElement && this.focus) {
						this.focus();
						return false
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if (this === document.activeElement && this.blur) {
						this.blur();
						return false
					}
				},
				delegateType: "focusout"
			},
			beforeunload: {
				postDispatch: function(event) {
					if (event.result !== undefined) {
						event.originalEvent.returnValue = event.result
					}
				}
			}
		},
		simulate: function(type, elem, event, bubble) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true,
				originalEvent: {}
			});
			if (bubble) {
				jQuery.event.trigger(e, null, elem)
			} else {
				jQuery.event.dispatch.call(elem, e)
			}
			if (e.isDefaultPrevented()) {
				event.preventDefault()
			}
		}
	};
	jQuery.removeEvent = function(elem, type, handle) {
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle, false)
		}
	};
	jQuery.Event = function(src, props) {
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props)
		}
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;
			this.isDefaultPrevented = (src.defaultPrevented || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse
		} else {
			this.type = src
		}
		if (props) {
			jQuery.extend(this, props)
		}
		this.timeStamp = src && src.timeStamp || jQuery.now();
		this[jQuery.expando] = true
	};
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = returnTrue;
			if (e && e.preventDefault) {
				e.preventDefault()
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = returnTrue;
			if (e && e.stopPropagation) {
				e.stopPropagation()
			}
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation()
		}
	};
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,
			handle: function(event) {
				var ret, target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
				if (!related || (related !== target && !jQuery.contains(target, related))) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix
				}
				return ret
			}
		}
	});
	if (!jQuery.support.focusinBubbles) {
		jQuery.each({
			focus: "focusin",
			blur: "focusout"
		}, function(orig, fix) {
			var attaches = 0,
				handler = function(event) {
					jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
				};
			jQuery.event.special[fix] = {
				setup: function() {
					if (attaches++ === 0) {
						document.addEventListener(orig, handler, true)
					}
				},
				teardown: function() {
					if (--attaches === 0) {
						document.removeEventListener(orig, handler, true)
					}
				}
			}
		})
	}
	jQuery.fn.extend({
		on: function(types, selector, data, fn, one) {
			var origFn, type;
			if (typeof types === "object") {
				if (typeof selector !== "string") {
					data = data || selector;
					selector = undefined
				}
				for (type in types) {
					this.on(type, selector, data, types[type], one)
				}
				return this
			}
			if (data == null && fn == null) {
				fn = selector;
				data = selector = undefined
			} else if (fn == null) {
				if (typeof selector === "string") {
					fn = data;
					data = undefined
				} else {
					fn = data;
					data = selector;
					selector = undefined
				}
			}
			if (fn === false) {
				fn = returnFalse
			} else if (!fn) {
				return this
			}
			if (one === 1) {
				origFn = fn;
				fn = function(event) {
					jQuery().off(event);
					return origFn.apply(this, arguments)
				};
				fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
			}
			return this.each(function() {
				jQuery.event.add(this, types, fn, data, selector)
			})
		},
		one: function(types, selector, data, fn) {
			return this.on(types, selector, data, fn, 1)
		},
		off: function(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this
			}
			if (typeof types === "object") {
				for (type in types) {
					this.off(type, selector, types[type])
				}
				return this
			}
			if (selector === false || typeof selector === "function") {
				fn = selector;
				selector = undefined
			}
			if (fn === false) {
				fn = returnFalse
			}
			return this.each(function() {
				jQuery.event.remove(this, types, fn, selector)
			})
		},
		bind: function(types, data, fn) {
			return this.on(types, null, data, fn)
		},
		unbind: function(types, fn) {
			return this.off(types, null, fn)
		},
		delegate: function(selector, types, data, fn) {
			return this.on(types, selector, data, fn)
		},
		undelegate: function(selector, types, fn) {
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
		},
		trigger: function(type, data) {
			return this.each(function() {
				jQuery.event.trigger(type, data, this)
			})
		},
		triggerHandler: function(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true)
			}
		}
	});
	(function(window, undefined) {
		var i, cachedruns, Expr, getText, isXML, compile, outermostContext, recompare, sortInput, setDocument, document, docElem, documentIsXML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -(new Date()),
			preferredDoc = window.document,
			support = {},
			dirruns = 0,
			done = 0,
			classCache = createCache(),
			tokenCache = createCache(),
			compilerCache = createCache(),
			hasDuplicate = false,
			sortOrder = function() {
				return 0
			},
			strundefined = typeof undefined,
			MAX_NEGATIVE = 1 << 31,
			arr = [],
			pop = arr.pop,
			push_native = arr.push,
			push = arr.push,
			slice = arr.slice,
			indexOf = arr.indexOf ||
		function(elem) {
			var i = 0,
				len = this.length;
			for (; i < len; i++) {
				if (this[i] === elem) {
					return i
				}
			}
			return -1
		}, whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), operators = "([*^$|!~]?=)", attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
			"ID": new RegExp("^#(" + characterEncoding + ")"),
			"CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
			"NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
			"TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		}, rsibling = /[\x20\t\r\n\f]*[+~]/, rnative = /^[^{]+\{\s*\[native code/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, funescape = function(_, escaped) {
			var high = "0x" + escaped - 0x10000;
			return high !== high ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00)
		};
		try {
			push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
			arr[preferredDoc.childNodes.length].nodeType
		} catch (e) {
			push = {
				apply: arr.length ?
				function(target, els) {
					push_native.apply(target, slice.call(els))
				} : function(target, els) {
					var j = target.length,
						i = 0;
					while ((target[j++] = els[i++])) {}
					target.length = j - 1
				}
			}
		}
		function isNative(fn) {
			return rnative.test(fn + "")
		}
		function createCache() {
			var cache, keys = [];
			return (cache = function(key, value) {
				if (keys.push(key += " ") > Expr.cacheLength) {
					delete cache[keys.shift()]
				}
				return (cache[key] = value)
			})
		}
		function markFunction(fn) {
			fn[expando] = true;
			return fn
		}
		function assert(fn) {
			var div = document.createElement("div");
			try {
				return !!fn(div)
			} catch (e) {
				return false
			} finally {
				div = null
			}
		}
		function Sizzle(selector, context, results, seed) {
			var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
			if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
				setDocument(context)
			}
			context = context || document;
			results = results || [];
			if (!selector || typeof selector !== "string") {
				return results
			}
			if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
				return []
			}
			if (!documentIsXML && !seed) {
				if ((match = rquickExpr.exec(selector))) {
					if ((m = match[1])) {
						if (nodeType === 9) {
							elem = context.getElementById(m);
							if (elem && elem.parentNode) {
								if (elem.id === m) {
									results.push(elem);
									return results
								}
							} else {
								return results
							}
						} else {
							if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
								results.push(elem);
								return results
							}
						}
					} else if (match[2]) {
						push.apply(results, context.getElementsByTagName(selector));
						return results
					} else if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) {
						push.apply(results, context.getElementsByClassName(m));
						return results
					}
				}
				if (support.qsa && !rbuggyQSA.test(selector)) {
					old = true;
					nid = expando;
					newContext = context;
					newSelector = nodeType === 9 && selector;
					if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
						groups = tokenize(selector);
						if ((old = context.getAttribute("id"))) {
							nid = old.replace(rescape, "\\$&")
						} else {
							context.setAttribute("id", nid)
						}
						nid = "[id='" + nid + "'] ";
						i = groups.length;
						while (i--) {
							groups[i] = nid + toSelector(groups[i])
						}
						newContext = rsibling.test(selector) && context.parentNode || context;
						newSelector = groups.join(",")
					}
					if (newSelector) {
						try {
							push.apply(results, newContext.querySelectorAll(newSelector));
							return results
						} catch (qsaError) {} finally {
							if (!old) {
								context.removeAttribute("id")
							}
						}
					}
				}
			}
			return select(selector.replace(rtrim, "$1"), context, results, seed)
		}
		isXML = Sizzle.isXML = function(elem) {
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false
		};
		setDocument = Sizzle.setDocument = function(node) {
			var doc = node ? node.ownerDocument || node : preferredDoc;
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document
			}
			document = doc;
			docElem = doc.documentElement;
			documentIsXML = isXML(doc);
			support.tagNameNoComments = assert(function(div) {
				div.appendChild(doc.createComment(""));
				return !div.getElementsByTagName("*").length
			});
			support.attributes = assert(function(div) {
				div.innerHTML = "<select></select>";
				var type = typeof div.lastChild.getAttribute("multiple");
				return type !== "boolean" && type !== "string"
			});
			support.getByClassName = assert(function(div) {
				div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
				if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
					return false
				}
				div.lastChild.className = "e";
				return div.getElementsByClassName("e").length === 2
			});
			support.getByName = assert(function(div) {
				div.id = expando + 0;
				div.appendChild(document.createElement("a")).setAttribute("name", expando);
				div.appendChild(document.createElement("i")).setAttribute("name", expando);
				docElem.appendChild(div);
				var pass = doc.getElementsByName && doc.getElementsByName(expando).length === 2 + doc.getElementsByName(expando + 0).length;
				docElem.removeChild(div);
				return pass
			});
			support.sortDetached = assert(function(div1) {
				return div1.compareDocumentPosition && (div1.compareDocumentPosition(document.createElement("div")) & 1)
			});
			Expr.attrHandle = assert(function(div) {
				div.innerHTML = "<a href='#'></a>";
				return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#"
			}) ? {} : {
				"href": function(elem) {
					return elem.getAttribute("href", 2)
				},
				"type": function(elem) {
					return elem.getAttribute("type")
				}
			};
			if (support.getByName) {
				Expr.find["ID"] = function(id, context) {
					if (typeof context.getElementById !== strundefined && !documentIsXML) {
						var m = context.getElementById(id);
						return m && m.parentNode ? [m] : []
					}
				};
				Expr.filter["ID"] = function(id) {
					var attrId = id.replace(runescape, funescape);
					return function(elem) {
						return elem.getAttribute("id") === attrId
					}
				}
			} else {
				Expr.find["ID"] = function(id, context) {
					if (typeof context.getElementById !== strundefined && !documentIsXML) {
						var m = context.getElementById(id);
						return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : []
					}
				};
				Expr.filter["ID"] = function(id) {
					var attrId = id.replace(runescape, funescape);
					return function(elem) {
						var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
						return node && node.value === attrId
					}
				}
			}
			Expr.find["TAG"] = support.tagNameNoComments ?
			function(tag, context) {
				if (typeof context.getElementsByTagName !== strundefined) {
					return context.getElementsByTagName(tag)
				}
			} : function(tag, context) {
				var elem, tmp = [],
					i = 0,
					results = context.getElementsByTagName(tag);
				if (tag === "*") {
					while ((elem = results[i++])) {
						if (elem.nodeType === 1) {
							tmp.push(elem)
						}
					}
					return tmp
				}
				return results
			};
			Expr.find["NAME"] = support.getByName &&
			function(tag, context) {
				if (typeof context.getElementsByName !== strundefined) {
					return context.getElementsByName(name)
				}
			};
			Expr.find["CLASS"] = support.getByClassName &&
			function(className, context) {
				if (typeof context.getElementsByClassName !== strundefined && !documentIsXML) {
					return context.getElementsByClassName(className)
				}
			};
			rbuggyMatches = [];
			rbuggyQSA = [":focus"];
			if ((support.qsa = isNative(doc.querySelectorAll))) {
				assert(function(div) {
					div.innerHTML = "<select><option selected=''></option></select>";
					if (!div.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
					}
					if (!div.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked")
					}
				});
				assert(function(div) {
					div.innerHTML = "<input type='hidden' i=''/>";
					if (div.querySelectorAll("[i^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')")
					}
					if (!div.querySelectorAll(":enabled").length) {
						rbuggyQSA.push(":enabled", ":disabled")
					}
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:")
				})
			}
			if ((support.matchesSelector = isNative((matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
				assert(function(div) {
					support.disconnectedMatch = matches.call(div, "div");
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos)
				})
			}
			rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
			contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
			function(a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !! (bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
			} : function(a, b) {
				if (b) {
					while ((b = b.parentNode)) {
						if (b === a) {
							return true
						}
					}
				}
				return false
			};
			sortOrder = docElem.compareDocumentPosition ?
			function(a, b) {
				if (a === b) {
					hasDuplicate = true;
					return 0
				}
				var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
				if (compare) {
					if (compare & 1 || (recompare && b.compareDocumentPosition(a) === compare)) {
						if (a === doc || contains(preferredDoc, a)) {
							return -1
						}
						if (b === doc || contains(preferredDoc, b)) {
							return 1
						}
						return sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0
					}
					return compare & 4 ? -1 : 1
				}
				return a.compareDocumentPosition ? -1 : 1
			} : function(a, b) {
				var cur, i = 0,
					aup = a.parentNode,
					bup = b.parentNode,
					ap = [a],
					bp = [b];
				if (a === b) {
					hasDuplicate = true;
					return 0
				} else if (!aup || !bup) {
					return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : 0
				} else if (aup === bup) {
					return siblingCheck(a, b)
				}
				cur = a;
				while ((cur = cur.parentNode)) {
					ap.unshift(cur)
				}
				cur = b;
				while ((cur = cur.parentNode)) {
					bp.unshift(cur)
				}
				while (ap[i] === bp[i]) {
					i++
				}
				return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
			};
			return document
		};
		Sizzle.matches = function(expr, elements) {
			return Sizzle(expr, null, null, elements)
		};
		Sizzle.matchesSelector = function(elem, expr) {
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem)
			}
			expr = expr.replace(rattributeQuotes, "='$1']");
			if (support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr)) {
				try {
					var ret = matches.call(elem, expr);
					if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
						return ret
					}
				} catch (e) {}
			}
			return Sizzle(expr, document, null, [elem]).length > 0
		};
		Sizzle.contains = function(context, elem) {
			if ((context.ownerDocument || context) !== document) {
				setDocument(context)
			}
			return contains(context, elem)
		};
		Sizzle.attr = function(elem, name) {
			var val;
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem)
			}
			if (!documentIsXML) {
				name = name.toLowerCase()
			}
			if ((val = Expr.attrHandle[name])) {
				return val(elem)
			}
			if (documentIsXML || support.attributes) {
				return elem.getAttribute(name)
			}
			return ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === true ? name : val && val.specified ? val.value : null
		};
		Sizzle.error = function(msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};
		Sizzle.uniqueSort = function(results) {
			var elem, duplicates = [],
				j = 0,
				i = 0;
			hasDuplicate = !support.detectDuplicates;
			recompare = !support.sortDetached;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);
			if (hasDuplicate) {
				while ((elem = results[i++])) {
					if (elem === results[i]) {
						j = duplicates.push(i)
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1)
				}
			}
			return results
		};

		function siblingCheck(a, b) {
			var cur = b && a,
				diff = cur && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
			if (diff) {
				return diff
			}
			if (cur) {
				while ((cur = cur.nextSibling)) {
					if (cur === b) {
						return -1
					}
				}
			}
			return a ? 1 : -1
		}
		function createInputPseudo(type) {
			return function(elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type
			}
		}
		function createButtonPseudo(type) {
			return function(elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type
			}
		}
		function createPositionalPseudo(fn) {
			return markFunction(function(argument) {
				argument = +argument;
				return markFunction(function(seed, matches) {
					var j, matchIndexes = fn([], seed.length, argument),
						i = matchIndexes.length;
					while (i--) {
						if (seed[(j = matchIndexes[i])]) {
							seed[j] = !(matches[j] = seed[j])
						}
					}
				})
			})
		}
		getText = Sizzle.getText = function(elem) {
			var node, ret = "",
				i = 0,
				nodeType = elem.nodeType;
			if (!nodeType) {
				for (;
				(node = elem[i]); i++) {
					ret += getText(node)
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				if (typeof elem.textContent === "string") {
					return elem.textContent
				} else {
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem)
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue
			}
			return ret
		};
		Expr = Sizzle.selectors = {
			cacheLength: 50,
			createPseudo: markFunction,
			match: matchExpr,
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: true
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: true
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				"ATTR": function(match) {
					match[1] = match[1].replace(runescape, funescape);
					match[3] = (match[4] || match[5] || "").replace(runescape, funescape);
					if (match[2] === "~=") {
						match[3] = " " + match[3] + " "
					}
					return match.slice(0, 4)
				},
				"CHILD": function(match) {
					match[1] = match[1].toLowerCase();
					if (match[1].slice(0, 3) === "nth") {
						if (!match[3]) {
							Sizzle.error(match[0])
						}
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +((match[7] + match[8]) || match[3] === "odd")
					} else if (match[3]) {
						Sizzle.error(match[0])
					}
					return match
				},
				"PSEUDO": function(match) {
					var excess, unquoted = !match[5] && match[2];
					if (matchExpr["CHILD"].test(match[0])) {
						return null
					}
					if (match[4]) {
						match[2] = match[4]
					} else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess)
					}
					return match.slice(0, 3)
				}
			},
			filter: {
				"TAG": function(nodeName) {
					if (nodeName === "*") {
						return function() {
							return true
						}
					}
					nodeName = nodeName.replace(runescape, funescape).toLowerCase();
					return function(elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
					}
				},
				"CLASS": function(className) {
					var pattern = classCache[className + " "];
					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
						return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "")
					})
				},
				"ATTR": function(name, operator, check) {
					return function(elem) {
						var result = Sizzle.attr(elem, name);
						if (result == null) {
							return operator === "!="
						}
						if (!operator) {
							return true
						}
						result += "";
						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false
					}
				},
				"CHILD": function(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
						forward = type.slice(-4) !== "last",
						ofType = what === "of-type";
					return first === 1 && last === 0 ?
					function(elem) {
						return !!elem.parentNode
					} : function(elem, context, xml) {
						var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;
						if (parent) {
							if (simple) {
								while (dir) {
									node = elem;
									while ((node = node[dir])) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
											return false
										}
									}
									start = dir = type === "only" && !start && "nextSibling"
								}
								return true
							}
							start = [forward ? parent.firstChild : parent.lastChild];
							if (forward && useCache) {
								outerCache = parent[expando] || (parent[expando] = {});
								cache = outerCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];
								while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
									if (node.nodeType === 1 && ++diff && node === elem) {
										outerCache[type] = [dirruns, nodeIndex, diff];
										break
									}
								}
							} else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
								diff = cache[1]
							} else {
								while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
									if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
										if (useCache) {
											(node[expando] || (node[expando] = {}))[type] = [dirruns, diff]
										}
										if (node === elem) {
											break
										}
									}
								}
							}
							diff -= last;
							return diff === first || (diff % first === 0 && diff / first >= 0)
						}
					}
				},
				"PSEUDO": function(pseudo, argument) {
					var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
					if (fn[expando]) {
						return fn(argument)
					}
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
							var idx, matched = fn(seed, argument),
								i = matched.length;
							while (i--) {
								idx = indexOf.call(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i])
							}
						}) : function(elem) {
							return fn(elem, 0, args)
						}
					}
					return fn
				}
			},
			pseudos: {
				"not": markFunction(function(selector) {
					var input = [],
						results = [],
						matcher = compile(selector.replace(rtrim, "$1"));
					return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
						var elem, unmatched = matcher(seed, null, xml, []),
							i = seed.length;
						while (i--) {
							if ((elem = unmatched[i])) {
								seed[i] = !(matches[i] = elem)
							}
						}
					}) : function(elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						return !results.pop()
					}
				}),
				"has": markFunction(function(selector) {
					return function(elem) {
						return Sizzle(selector, elem).length > 0
					}
				}),
				"contains": markFunction(function(text) {
					return function(elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
					}
				}),
				"lang": markFunction(function(lang) {
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang)
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function(elem) {
						var elemLang;
						do {
							if ((elemLang = documentIsXML ? elem.getAttribute("xml:lang") || elem.getAttribute("lang") : elem.lang)) {
								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false
					}
				}),
				"target": function(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id
				},
				"root": function(elem) {
					return elem === docElem
				},
				"focus": function(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex)
				},
				"enabled": function(elem) {
					return elem.disabled === false
				},
				"disabled": function(elem) {
					return elem.disabled === true
				},
				"checked": function(elem) {
					var nodeName = elem.nodeName.toLowerCase();
					return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected)
				},
				"selected": function(elem) {
					if (elem.parentNode) {
						elem.parentNode.selectedIndex
					}
					return elem.selected === true
				},
				"empty": function(elem) {
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) {
							return false
						}
					}
					return true
				},
				"parent": function(elem) {
					return !Expr.pseudos["empty"](elem)
				},
				"header": function(elem) {
					return rheader.test(elem.nodeName)
				},
				"input": function(elem) {
					return rinputs.test(elem.nodeName)
				},
				"button": function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button"
				},
				"text": function(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type)
				},
				"first": createPositionalPseudo(function() {
					return [0]
				}),
				"last": createPositionalPseudo(function(matchIndexes, length) {
					return [length - 1]
				}),
				"eq": createPositionalPseudo(function(matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument]
				}),
				"even": createPositionalPseudo(function(matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i)
					}
					return matchIndexes
				}),
				"odd": createPositionalPseudo(function(matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i)
					}
					return matchIndexes
				}),
				"lt": createPositionalPseudo(function(matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i)
					}
					return matchIndexes
				}),
				"gt": createPositionalPseudo(function(matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i)
					}
					return matchIndexes
				})
			}
		};
		for (i in {
			radio: true,
			checkbox: true,
			file: true,
			password: true,
			image: true
		}) {
			Expr.pseudos[i] = createInputPseudo(i)
		}
		for (i in {
			submit: true,
			reset: true
		}) {
			Expr.pseudos[i] = createButtonPseudo(i)
		}
		function tokenize(selector, parseOnly) {
			var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
			if (cached) {
				return parseOnly ? 0 : cached.slice(0)
			}
			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;
			while (soFar) {
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						soFar = soFar.slice(match[0].length) || soFar
					}
					groups.push(tokens = [])
				}
				matched = false;
				if ((match = rcombinators.exec(soFar))) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length)
				}
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length)
					}
				}
				if (!matched) {
					break
				}
			}
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
		}
		function toSelector(tokens) {
			var i = 0,
				len = tokens.length,
				selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value
			}
			return selector
		}
		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
				checkNonElements = base && dir === "parentNode",
				doneName = done++;
			return combinator.first ?
			function(elem, context, xml) {
				while ((elem = elem[dir])) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml)
					}
				}
			} : function(elem, context, xml) {
				var data, cache, outerCache, dirkey = dirruns + " " + doneName;
				if (xml) {
					while ((elem = elem[dir])) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true
							}
						}
					}
				} else {
					while ((elem = elem[dir])) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});
							if ((cache = outerCache[dir]) && cache[0] === dirkey) {
								if ((data = cache[1]) === true || data === cachedruns) {
									return data === true
								}
							} else {
								cache = outerCache[dir] = [dirkey];
								cache[1] = matcher(elem, context, xml) || cachedruns;
								if (cache[1] === true) {
									return true
								}
							}
						}
					}
				}
			}
		}
		function elementMatcher(matchers) {
			return matchers.length > 1 ?
			function(elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false
					}
				}
				return true
			} : matchers[0]
		}
		function condense(unmatched, map, filter, context, xml) {
			var elem, newUnmatched = [],
				i = 0,
				len = unmatched.length,
				mapped = map != null;
			for (; i < len; i++) {
				if ((elem = unmatched[i])) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i)
						}
					}
				}
			}
			return newUnmatched
		}
		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter)
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector)
			}
			return markFunction(function(seed, results, context, xml) {
				var temp, i, elem, preMap = [],
					postMap = [],
					preexisting = results.length,
					elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
					matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
					matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml)
				}
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);
					i = temp.length;
					while (i--) {
						if ((elem = temp[i])) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
						}
					}
				}
				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if ((elem = matcherOut[i])) {
									temp.push((matcherIn[i] = elem))
								}
							}
							postFinder(null, (matcherOut = []), temp, xml)
						}
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
								seed[temp] = !(results[temp] = elem)
							}
						}
					}
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml)
					} else {
						push.apply(results, matcherOut)
					}
				}
			})
		}
		function matcherFromTokens(tokens) {
			var checkContext, matcher, j, len = tokens.length,
				leadingRelative = Expr.relative[tokens[0].type],
				implicitRelative = leadingRelative || Expr.relative[" "],
				i = leadingRelative ? 1 : 0,
				matchContext = addCombinator(function(elem) {
					return elem === checkContext
				}, implicitRelative, true),
				matchAnyContext = addCombinator(function(elem) {
					return indexOf.call(checkContext, elem) > -1
				}, implicitRelative, true),
				matchers = [function(elem, context, xml) {
					return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
				}];
			for (; i < len; i++) {
				if ((matcher = Expr.relative[tokens[i].type])) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)]
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
					if (matcher[expando]) {
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens))
					}
					matchers.push(matcher)
				}
			}
			return elementMatcher(matchers)
		}
		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var matcherCachedRuns = 0,
				bySet = setMatchers.length > 0,
				byElement = elementMatchers.length > 0,
				superMatcher = function(seed, context, xml, results, expandContext) {
					var elem, j, matcher, setMatched = [],
						matchedCount = 0,
						i = "0",
						unmatched = seed && [],
						outermost = expandContext != null,
						contextBackup = outermostContext,
						elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
						dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
					if (outermost) {
						outermostContext = context !== document && context;
						cachedruns = matcherCachedRuns
					}
					for (;
					(elem = elems[i]) != null; i++) {
						if (byElement && elem) {
							j = 0;
							while ((matcher = elementMatchers[j++])) {
								if (matcher(elem, context, xml)) {
									results.push(elem);
									break
								}
							}
							if (outermost) {
								dirruns = dirrunsUnique;
								cachedruns = ++matcherCachedRuns
							}
						}
						if (bySet) {
							if ((elem = !matcher && elem)) {
								matchedCount--
							}
							if (seed) {
								unmatched.push(elem)
							}
						}
					}
					matchedCount += i;
					if (bySet && i !== matchedCount) {
						j = 0;
						while ((matcher = setMatchers[j++])) {
							matcher(unmatched, setMatched, context, xml)
						}
						if (seed) {
							if (matchedCount > 0) {
								while (i--) {
									if (!(unmatched[i] || setMatched[i])) {
										setMatched[i] = pop.call(results)
									}
								}
							}
							setMatched = condense(setMatched)
						}
						push.apply(results, setMatched);
						if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
							Sizzle.uniqueSort(results)
						}
					}
					if (outermost) {
						dirruns = dirrunsUnique;
						outermostContext = contextBackup
					}
					return unmatched
				};
			return bySet ? markFunction(superMatcher) : superMatcher
		}
		compile = Sizzle.compile = function(selector, group) {
			var i, setMatchers = [],
				elementMatchers = [],
				cached = compilerCache[selector + " "];
			if (!cached) {
				if (!group) {
					group = tokenize(selector)
				}
				i = group.length;
				while (i--) {
					cached = matcherFromTokens(group[i]);
					if (cached[expando]) {
						setMatchers.push(cached)
					} else {
						elementMatchers.push(cached)
					}
				}
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
			}
			return cached
		};

		function multipleContexts(selector, contexts, results) {
			var i = 0,
				len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results)
			}
			return results
		}
		function select(selector, context, results, seed) {
			var i, tokens, token, type, find, match = tokenize(selector);
			if (!seed) {
				if (match.length === 1) {
					tokens = match[0] = match[0].slice(0);
					if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !documentIsXML && Expr.relative[tokens[1].type]) {
						context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
						if (!context) {
							return results
						}
						selector = selector.slice(tokens.shift().value.length)
					}
					i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
					while (i--) {
						token = tokens[i];
						if (Expr.relative[(type = token.type)]) {
							break
						}
						if ((find = Expr.find[type])) {
							if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
								tokens.splice(i, 1);
								selector = seed.length && toSelector(tokens);
								if (!selector) {
									push.apply(results, seed);
									return results
								}
								break
							}
						}
					}
				}
			}
			compile(selector, match)(seed, context, documentIsXML, results, rsibling.test(selector));
			return results
		}
		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
		setDocument();
		[0, 0].sort(sortOrder);
		support.detectDuplicates = hasDuplicate;
		Sizzle.attr = jQuery.attr;
		jQuery.find = Sizzle;
		jQuery.expr = Sizzle.selectors;
		jQuery.expr[":"] = jQuery.expr.pseudos;
		jQuery.unique = Sizzle.uniqueSort;
		jQuery.text = Sizzle.getText;
		jQuery.isXMLDoc = Sizzle.isXML;
		jQuery.contains = Sizzle.contains
	})(window);
	var runtil = /Until$/,
		rparentsprev = /^(?:parents|prev(?:Until|All))/,
		isSimple = /^.[^:#\[\.,]*$/,
		rneedsContext = jQuery.expr.match.needsContext,
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	jQuery.fn.extend({
		find: function(selector) {
			var self, matched, i, l = this.length;
			if (typeof selector !== "string") {
				self = this;
				return this.pushStack(jQuery(selector).filter(function() {
					for (i = 0; i < l; i++) {
						if (jQuery.contains(self[i], this)) {
							return true
						}
					}
				}))
			}
			matched = [];
			for (i = 0; i < l; i++) {
				jQuery.find(selector, this[i], matched)
			}
			matched = this.pushStack(l > 1 ? jQuery.unique(matched) : matched);
			matched.selector = (this.selector ? this.selector + " " : "") + selector;
			return matched
		},
		has: function(target) {
			var targets = jQuery(target, this),
				l = targets.length;
			return this.filter(function() {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true
					}
				}
			})
		},
		not: function(selector) {
			return this.pushStack(winnow(this, selector, false))
		},
		filter: function(selector) {
			return this.pushStack(winnow(this, selector, true))
		},
		is: function(selector) {
			return !!selector && (typeof selector === "string" ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0)
		},
		closest: function(selectors, context) {
			var cur, i = 0,
				l = this.length,
				matched = [],
				pos = (rneedsContext.test(selectors) || typeof selectors !== "string") ? jQuery(selectors, context || this.context) : 0;
			for (; i < l; i++) {
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
					if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
						cur = matched.push(cur);
						break
					}
				}
			}
			return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
		},
		index: function(elem) {
			if (!elem) {
				return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
			}
			if (typeof elem === "string") {
				return core_indexOf.call(jQuery(elem), this[0])
			}
			return core_indexOf.call(this, elem.jquery ? elem[0] : elem)
		},
		add: function(selector, context) {
			var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
				all = jQuery.merge(this.get(), set);
			return this.pushStack(jQuery.unique(all))
		},
		addBack: function(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur
	}
	jQuery.each({
		parent: function(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null
		},
		parents: function(elem) {
			return jQuery.dir(elem, "parentNode")
		},
		parentsUntil: function(elem, i, until) {
			return jQuery.dir(elem, "parentNode", until)
		},
		next: function(elem) {
			return sibling(elem, "nextSibling")
		},
		prev: function(elem) {
			return sibling(elem, "previousSibling")
		},
		nextAll: function(elem) {
			return jQuery.dir(elem, "nextSibling")
		},
		prevAll: function(elem) {
			return jQuery.dir(elem, "previousSibling")
		},
		nextUntil: function(elem, i, until) {
			return jQuery.dir(elem, "nextSibling", until)
		},
		prevUntil: function(elem, i, until) {
			return jQuery.dir(elem, "previousSibling", until)
		},
		siblings: function(elem) {
			return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
		},
		children: function(elem) {
			return jQuery.sibling(elem.firstChild)
		},
		contents: function(elem) {
			return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
		}
	}, function(name, fn) {
		jQuery.fn[name] = function(until, selector) {
			var matched = jQuery.map(this, fn, until);
			if (!runtil.test(name)) {
				selector = until
			}
			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched)
			}
			if (this.length > 1) {
				if (!guaranteedUnique[name]) {
					jQuery.unique(matched)
				}
				if (rparentsprev.test(name)) {
					matched.reverse()
				}
			}
			return this.pushStack(matched)
		}
	});
	jQuery.extend({
		filter: function(expr, elems, not) {
			if (not) {
				expr = ":not(" + expr + ")"
			}
			return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems)
		},
		dir: function(elem, dir, until) {
			var matched = [],
				truncate = until !== undefined;
			while ((elem = elem[dir]) && elem.nodeType !== 9) {
				if (elem.nodeType === 1) {
					if (truncate && jQuery(elem).is(until)) {
						break
					}
					matched.push(elem)
				}
			}
			return matched
		},
		sibling: function(n, elem) {
			var matched = [];
			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== elem) {
					matched.push(n)
				}
			}
			return matched
		}
	});

	function winnow(elements, qualifier, keep) {
		qualifier = qualifier || 0;
		var filtered;
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function(elem, i) {
				var retVal = !! qualifier.call(elem, i, elem);
				return retVal === keep
			})
		}
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function(elem) {
				return (elem === qualifier) === keep
			})
		}
		if (typeof qualifier === "string") {
			filtered = jQuery.grep(elements, function(elem) {
				return elem.nodeType === 1
			});
			if (isSimple.test(qualifier)) {
				return jQuery.filter(qualifier, filtered, !keep)
			}
			qualifier = jQuery.filter(qualifier, filtered)
		}
		return jQuery.grep(elements, function(elem) {
			return (core_indexOf.call(qualifier, elem) >= 0) === keep
		})
	}
	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.col = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	jQuery.fn.extend({
		text: function(value) {
			return jQuery.access(this, function(value) {
				return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
			}, null, value, arguments.length)
		},
		wrapAll: function(html) {
			var wrap;
			if (jQuery.isFunction(html)) {
				return this.each(function(i) {
					jQuery(this).wrapAll(html.call(this, i))
				})
			}
			if (this[0]) {
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
				if (this[0].parentNode) {
					wrap.insertBefore(this[0])
				}
				wrap.map(function() {
					var elem = this;
					while (elem.firstElementChild) {
						elem = elem.firstElementChild
					}
					return elem
				}).append(this)
			}
			return this
		},
		wrapInner: function(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function(i) {
					jQuery(this).wrapInner(html.call(this, i))
				})
			}
			return this.each(function() {
				var self = jQuery(this),
					contents = self.contents();
				if (contents.length) {
					contents.wrapAll(html)
				} else {
					self.append(html)
				}
			})
		},
		wrap: function(html) {
			var isFunction = jQuery.isFunction(html);
			return this.each(function(i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				if (!jQuery.nodeName(this, "body")) {
					jQuery(this).replaceWith(this.childNodes)
				}
			}).end()
		},
		append: function() {
			return this.domManip(arguments, true, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					this.appendChild(elem)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, true, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					this.insertBefore(elem, this.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, false, function(elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this)
				}
			})
		},
		after: function() {
			return this.domManip(arguments, false, function(elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling)
				}
			})
		},
		remove: function(selector, keepData) {
			var elem, i = 0,
				l = this.length;
			for (; i < l; i++) {
				elem = this[i];
				if (!selector || jQuery.filter(selector, [elem]).length > 0) {
					if (!keepData && elem.nodeType === 1) {
						jQuery.cleanData(getAll(elem))
					}
					if (elem.parentNode) {
						if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
							setGlobalEval(getAll(elem, "script"))
						}
						elem.parentNode.removeChild(elem)
					}
				}
			}
			return this
		},
		empty: function() {
			var elem, i = 0,
				l = this.length;
			for (; i < l; i++) {
				elem = this[i];
				if (elem.nodeType === 1) {
					jQuery.cleanData(getAll(elem, false));
					elem.textContent = ""
				}
			}
			return this
		},
		clone: function(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
			return this.map(function() {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
			})
		},
		html: function(value) {
			return jQuery.access(this, function(value) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;
				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML
				}
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
					value = value.replace(rxhtmlTag, "<$1></$2>");
					try {
						for (; i < l; i++) {
							elem = this[i] || {};
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value
							}
						}
						elem = 0
					} catch (e) {}
				}
				if (elem) {
					this.empty().append(value)
				}
			}, null, value, arguments.length)
		},
		replaceWith: function(value) {
			var isFunction = jQuery.isFunction(value);
			if (!isFunction && typeof value !== "string") {
				value = jQuery(value).not(this).detach()
			}
			return value !== "" ? this.domManip([value], true, function(elem) {
				var next = this.nextSibling,
					parent = this.parentNode;
				if (parent) {
					jQuery(this).remove();
					parent.insertBefore(elem, next)
				}
			}) : this.remove()
		},
		detach: function(selector) {
			return this.remove(selector, true)
		},
		domManip: function(args, table, callback) {
			args = core_concat.apply([], args);
			var fragment, first, scripts, hasScripts, node, doc, i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[0],
				isFunction = jQuery.isFunction(value);
			if (isFunction || !(l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test(value))) {
				return this.each(function(index) {
					var self = set.eq(index);
					if (isFunction) {
						args[0] = value.call(this, index, table ? self.html() : undefined)
					}
					self.domManip(args, table, callback)
				})
			}
			if (l) {
				fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
				first = fragment.firstChild;
				if (fragment.childNodes.length === 1) {
					fragment = first
				}
				if (first) {
					table = table && jQuery.nodeName(first, "tr");
					scripts = jQuery.map(getAll(fragment, "script"), disableScript);
					hasScripts = scripts.length;
					for (; i < l; i++) {
						node = fragment;
						if (i !== iNoClone) {
							node = jQuery.clone(node, true, true);
							if (hasScripts) {
								jQuery.merge(scripts, getAll(node, "script"))
							}
						}
						callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], node, i)
					}
					if (hasScripts) {
						doc = scripts[scripts.length - 1].ownerDocument;
						jQuery.map(scripts, restoreScript);
						for (i = 0; i < hasScripts; i++) {
							node = scripts[i];
							if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
								if (node.src) {
									jQuery.ajax({
										url: node.src,
										type: "GET",
										dataType: "script",
										async: false,
										global: false,
										"throws": true
									})
								} else {
									jQuery.globalEval(node.textContent.replace(rcleanScript, ""))
								}
							}
						}
					}
				}
			}
			return this
		}
	});
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(name, original) {
		jQuery.fn[name] = function(selector) {
			var elems, ret = [],
				insert = jQuery(selector),
				last = insert.length - 1,
				i = 0;
			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);
				core_push.apply(ret, elems.get())
			}
			return this.pushStack(ret)
		}
	});
	jQuery.extend({
		clone: function(elem, dataAndEvents, deepDataAndEvents) {
			var i, l, srcElements, destElements, clone = elem.cloneNode(true),
				inPage = jQuery.contains(elem.ownerDocument, elem);
			if (!jQuery.support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
				destElements = getAll(clone);
				srcElements = getAll(elem);
				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i])
				}
			}
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);
					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i])
					}
				} else {
					cloneCopyEvent(elem, clone)
				}
			}
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"))
			}
			return clone
		},
		buildFragment: function(elems, context, scripts, selection) {
			var elem, tmp, tag, wrap, contains, j, i = 0,
				l = elems.length,
				fragment = context.createDocumentFragment(),
				nodes = [];
			for (; i < l; i++) {
				elem = elems[i];
				if (elem || elem === 0) {
					if (jQuery.type(elem) === "object") {
						jQuery.merge(nodes, elem.nodeType ? [elem] : elem)
					} else if (!rhtml.test(elem)) {
						nodes.push(context.createTextNode(elem))
					} else {
						tmp = tmp || fragment.appendChild(context.createElement("div"));
						tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
						wrap = wrapMap[tag] || wrapMap._default;
						tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
						j = wrap[0];
						while (j--) {
							tmp = tmp.firstChild
						}
						jQuery.merge(nodes, tmp.childNodes);
						tmp = fragment.firstChild;
						tmp.textContent = ""
					}
				}
			}
			fragment.textContent = "";
			i = 0;
			while ((elem = nodes[i++])) {
				if (selection && jQuery.inArray(elem, selection) !== -1) {
					continue
				}
				contains = jQuery.contains(elem.ownerDocument, elem);
				tmp = getAll(fragment.appendChild(elem), "script");
				if (contains) {
					setGlobalEval(tmp)
				}
				if (scripts) {
					j = 0;
					while ((elem = tmp[j++])) {
						if (rscriptType.test(elem.type || "")) {
							scripts.push(elem)
						}
					}
				}
			}
			return fragment
		},
		cleanData: function(elems, acceptData) {
			var data, elem, type, l = elems.length,
				i = 0,
				special = jQuery.event.special;
			for (; i < l; i++) {
				elem = elems[i];
				if (acceptData || jQuery.acceptData(elem)) {
					data = data_priv.access(elem);
					if (data) {
						for (type in data.events) {
							if (special[type]) {
								jQuery.event.remove(elem, type)
							} else {
								jQuery.removeEvent(elem, type, data.handle)
							}
						}
					}
				}
				data_discard(elem)
			}
		}
	});

	function findOrAppend(elem, tag) {
		return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag))
	}
	function disableScript(elem) {
		var attr = elem.getAttributeNode("type");
		elem.type = (attr && attr.specified) + "/" + elem.type;
		return elem
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);
		if (match) {
			elem.type = match[1]
		} else {
			elem.removeAttribute("type")
		}
		return elem
	}
	function setGlobalEval(elems, refElements) {
		var l = elems.length,
			i = 0;
		for (; i < l; i++) {
			data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"))
		}
	}
	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
		if (dest.nodeType !== 1) {
			return
		}
		if (data_priv.hasData(src)) {
			pdataOld = data_priv.access(src);
			pdataCur = jQuery.extend({}, pdataOld);
			events = pdataOld.events;
			data_priv.set(dest, pdataCur);
			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};
				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i])
					}
				}
			}
		}
		if (data_user.hasData(src)) {
			udataOld = data_user.access(src);
			udataCur = jQuery.extend({}, udataOld);
			data_user.set(dest, udataCur)
		}
	}
	function getAll(context, tag) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
		return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
	}
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();
		if (nodeName === "input" && manipulation_rcheckableType.test(src.type)) {
			dest.checked = src.checked
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue
		}
	}
	var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rmargin = /^margin/,
		rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
		rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
		rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
		elemdisplay = {
			BODY: "block"
		},
		cssShow = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		cssNormalTransform = {
			letterSpacing: 0,
			fontWeight: 400
		},
		cssExpand = ["Top", "Right", "Bottom", "Left"],
		cssPrefixes = ["Webkit", "O", "Moz", "ms"];

	function vendorPropName(style, name) {
		if (name in style) {
			return name
		}
		var capName = name.charAt(0).toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in style) {
				return name
			}
		}
		return origName
	}
	function isHidden(elem, el) {
		elem = el || elem;
		return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
	}
	function getStyles(elem) {
		return window.getComputedStyle(elem, null)
	}
	function showHide(elements, show) {
		var display, elem, hidden, values = [],
			index = 0,
			length = elements.length;
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue
			}
			values[index] = jQuery._data(elem, "olddisplay");
			display = elem.style.display;
			if (show) {
				if (!values[index] && display === "none") {
					elem.style.display = ""
				}
				if (elem.style.display === "" && isHidden(elem)) {
					values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName))
				}
			} else {
				if (!values[index]) {
					hidden = isHidden(elem);
					if (display && display !== "none" || !hidden) {
						jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))
					}
				}
			}
		}
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") {
				elem.style.display = show ? values[index] || "" : "none"
			}
		}
		return elements
	}
	jQuery.fn.extend({
		css: function(name, value) {
			return jQuery.access(this, function(elem, name, value) {
				var styles, len, map = {},
					i = 0;
				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;
					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles)
					}
					return map
				}
				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
			}, name, value, arguments.length > 1)
		},
		show: function() {
			return showHide(this, true)
		},
		hide: function() {
			return showHide(this)
		},
		toggle: function(state) {
			var bool = typeof state === "boolean";
			return this.each(function() {
				if (bool ? state : isHidden(this)) {
					jQuery(this).show()
				} else {
					jQuery(this).hide()
				}
			})
		}
	});
	jQuery.extend({
		cssHooks: {
			opacity: {
				get: function(elem, computed) {
					if (computed) {
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret
					}
				}
			}
		},
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
		cssProps: {
			"float": "cssFloat"
		},
		style: function(elem, name, value, extra) {
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return
			}
			var ret, type, hooks, origName = jQuery.camelCase(name),
				style = elem.style;
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			if (value !== undefined) {
				type = typeof value;
				if (type === "string" && (ret = rrelNum.exec(value))) {
					value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
					type = "number"
				}
				if (value == null || type === "number" && isNaN(value)) {
					return
				}
				if (type === "number" && !jQuery.cssNumber[origName]) {
					value += "px"
				}
				if (!jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit"
				}
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
					style[name] = value
				}
			} else {
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
					return ret
				}
				return style[name]
			}
		},
		css: function(elem, name, extra, styles) {
			var val, num, hooks, origName = jQuery.camelCase(name);
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra)
			}
			if (val === undefined) {
				val = curCSS(elem, name, styles)
			}
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name]
			}
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || jQuery.isNumeric(num) ? num || 0 : val
			}
			return val
		},
		swap: function(elem, options, callback, args) {
			var ret, name, old = {};
			for (name in options) {
				old[name] = elem.style[name];
				elem.style[name] = options[name]
			}
			ret = callback.apply(elem, args || []);
			for (name in options) {
				elem.style[name] = old[name]
			}
			return ret
		}
	});
	curCSS = function(elem, name, _computed) {
		var width, minWidth, maxWidth, computed = _computed || getStyles(elem),
			ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
			style = elem.style;
		if (computed) {
			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name)
			}
			if (rnumnonpx.test(ret) && rmargin.test(name)) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth
			}
		}
		return ret
	};

	function setPositiveNumber(elem, value, subtract) {
		var matches = rnumsplit.exec(value);
		return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
	}
	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
			val = 0;
		for (; i < 4; i += 2) {
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles)
			}
			if (isBorderBox) {
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles)
				}
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
				}
			} else {
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
				}
			}
		}
		return val
	}
	function getWidthOrHeight(elem, name, extra) {
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles(elem),
			isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
		if (val <= 0 || val == null) {
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name]
			}
			if (rnumnonpx.test(val)) {
				return val
			}
			valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
			val = parseFloat(val) || 0
		}
		return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px"
	}
	function css_defaultDisplay(nodeName) {
		var doc = document,
			display = elemdisplay[nodeName];
		if (!display) {
			display = actualDisplay(nodeName, doc);
			if (display === "none" || !display) {
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement);
				doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
				doc.write("<!doctype html><html><body>");
				doc.close();
				display = actualDisplay(nodeName, doc);
				iframe.detach()
			}
			elemdisplay[nodeName] = display
		}
		return display
	}
	function actualDisplay(name, doc) {
		var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
			display = jQuery.css(elem[0], "display");
		elem.remove();
		return display
	}
	jQuery.each(["height", "width"], function(i, name) {
		jQuery.cssHooks[name] = {
			get: function(elem, computed, extra) {
				if (computed) {
					return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
						return getWidthOrHeight(elem, name, extra)
					}) : getWidthOrHeight(elem, name, extra)
				}
			},
			set: function(elem, value, extra) {
				var styles = extra && getStyles(elem);
				return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0)
			}
		}
	});
	jQuery(function() {
		if (!jQuery.support.reliableMarginRight) {
			jQuery.cssHooks.marginRight = {
				get: function(elem, computed) {
					if (computed) {
						return jQuery.swap(elem, {
							"display": "inline-block"
						}, curCSS, [elem, "marginRight"])
					}
				}
			}
		}
		if (!jQuery.support.pixelPosition && jQuery.fn.position) {
			jQuery.each(["top", "left"], function(i, prop) {
				jQuery.cssHooks[prop] = {
					get: function(elem, computed) {
						if (computed) {
							computed = curCSS(elem, prop);
							return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
						}
					}
				}
			})
		}
	});
	if (jQuery.expr && jQuery.expr.filters) {
		jQuery.expr.filters.hidden = function(elem) {
			return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
		};
		jQuery.expr.filters.visible = function(elem) {
			return !jQuery.expr.filters.hidden(elem)
		}
	}
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function(value) {
				var i = 0,
					expanded = {},
					parts = typeof value === "string" ? value.split(" ") : [value];
				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
				}
				return expanded
			}
		};
		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
		}
	});
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this
			}).filter(function() {
				var type = this.type;
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type))
			}).map(function(i, elem) {
				var val = jQuery(this).val();
				return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
					return {
						name: elem.name,
						value: val.replace(rCRLF, "\r\n")
					}
				}) : {
					name: elem.name,
					value: val.replace(rCRLF, "\r\n")
				}
			}).get()
		}
	});
	jQuery.param = function(a, traditional) {
		var prefix, s = [],
			add = function(key, value) {
				value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
			};
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
		}
		if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
			jQuery.each(a, function() {
				add(this.name, this.value)
			})
		} else {
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add)
			}
		}
		return s.join("&").replace(r20, "+")
	};

	function buildParams(prefix, obj, traditional, add) {
		var name;
		if (jQuery.isArray(obj)) {
			jQuery.each(obj, function(i, v) {
				if (traditional || rbracket.test(prefix)) {
					add(prefix, v)
				} else {
					buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
				}
			})
		} else if (!traditional && jQuery.type(obj) === "object") {
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
			}
		} else {
			add(prefix, obj)
		}
	}
	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
		jQuery.fn[name] = function(data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
		}
	});
	jQuery.fn.hover = function(fnOver, fnOut) {
		return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
	};
	var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
		ajax_rquery = /\?/,
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		_load = jQuery.fn.load,
		prefilters = {},
		transports = {},
		allTypes = "*/".concat("*");
	try {
		ajaxLocation = location.href
	} catch (e) {
		ajaxLocation = document.createElement("a");
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href
	}
	ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

	function addToPrefiltersOrTransports(structure) {
		return function(dataTypeExpression, func) {
			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*"
			}
			var dataType, i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
			if (jQuery.isFunction(func)) {
				while ((dataType = dataTypes[i++])) {
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func)
					} else {
						(structure[dataType] = structure[dataType] || []).push(func)
					}
				}
			}
		}
	}
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
		var inspected = {},
			seekingTransport = (structure === transports);

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport)
				}
			});
			return selected
		}
		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
	}
	function ajaxExtend(target, src) {
		var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep)
		}
		return target
	}
	jQuery.fn.load = function(url, params, callback) {
		if (typeof url !== "string" && _load) {
			return _load.apply(this, arguments)
		}
		var selector, type, response, self = this,
			off = url.indexOf(" ");
		if (off >= 0) {
			selector = url.slice(off, url.length);
			url = url.slice(0, off)
		}
		if (jQuery.isFunction(params)) {
			callback = params;
			params = undefined
		} else if (params && typeof params === "object") {
			type = "POST"
		}
		if (self.length > 0) {
			jQuery.ajax({
				url: url,
				type: type,
				dataType: "html",
				data: params
			}).done(function(responseText) {
				response = arguments;
				self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
			}).complete(callback &&
			function(jqXHR, status) {
				self.each(callback, response || [jqXHR.responseText, status, jqXHR])
			})
		}
		return this
	};
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
		jQuery.fn[type] = function(fn) {
			return this.on(type, fn)
		}
	});
	jQuery.each(["get", "post"], function(i, method) {
		jQuery[method] = function(url, data, callback, type) {
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined
			}
			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			})
		}
	});
	jQuery.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test(ajaxLocParts[1]),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": true,
				"text json": jQuery.parseJSON,
				"text xml": jQuery.parseXML
			},
			flatOptions: {
				url: true,
				context: true
			}
		},
		ajaxSetup: function(target, settings) {
			return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
		},
		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),
		ajax: function(url, options) {
			if (typeof url === "object") {
				options = url;
				url = undefined
			}
			options = options || {};
			var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
				callbackContext = s.context || s,
				globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				statusCode = s.statusCode || {},
				requestHeaders = {},
				requestHeadersNames = {},
				state = 0,
				strAbort = "canceled",
				jqXHR = {
					readyState: 0,
					getResponseHeader: function(key) {
						var match;
						if (state === 2) {
							if (!responseHeaders) {
								responseHeaders = {};
								while ((match = rheaders.exec(responseHeadersString))) {
									responseHeaders[match[1].toLowerCase()] = match[2]
								}
							}
							match = responseHeaders[key.toLowerCase()]
						}
						return match == null ? null : match
					},
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null
					},
					setRequestHeader: function(name, value) {
						var lname = name.toLowerCase();
						if (!state) {
							name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
							requestHeaders[name] = value
						}
						return this
					},
					overrideMimeType: function(type) {
						if (!state) {
							s.mimeType = type
						}
						return this
					},
					statusCode: function(map) {
						var code;
						if (map) {
							if (state < 2) {
								for (code in map) {
									statusCode[code] = [statusCode[code], map[code]]
								}
							} else {
								jqXHR.always(map[jqXHR.status])
							}
						}
						return this
					},
					abort: function(statusText) {
						var finalText = statusText || strAbort;
						if (transport) {
							transport.abort(finalText)
						}
						done(0, finalText);
						return this
					}
				};
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
			s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
			s.type = options.method || options.type || s.method || s.type;
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];
			if (s.crossDomain == null) {
				parts = rurl.exec(s.url.toLowerCase());
				s.crossDomain = !! (parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))))
			}
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional)
			}
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
			if (state === 2) {
				return jqXHR
			}
			fireGlobals = s.global;
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart")
			}
			s.type = s.type.toUpperCase();
			s.hasContent = !rnoContent.test(s.type);
			cacheURL = s.url;
			if (!s.hasContent) {
				if (s.data) {
					cacheURL = (s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data);
					delete s.data
				}
				if (s.cache === false) {
					s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++
				}
			}
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL])
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
				}
			}
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType)
			}
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i])
			}
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
				return jqXHR.abort()
			}
			strAbort = "abort";
			for (i in {
				success: 1,
				error: 1,
				complete: 1
			}) {
				jqXHR[i](s[i])
			}
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
			if (!transport) {
				done(-1, "No Transport")
			} else {
				jqXHR.readyState = 1;
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s])
				}
				if (s.async && s.timeout > 0) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout")
					}, s.timeout)
				}
				try {
					state = 1;
					transport.send(requestHeaders, done)
				} catch (e) {
					if (state < 2) {
						done(-1, e)
					} else {
						throw e;
					}
				}
			}
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess, success, error, response, modified, statusText = nativeStatusText;
				if (state === 2) {
					return
				}
				state = 2;
				if (timeoutTimer) {
					clearTimeout(timeoutTimer)
				}
				transport = undefined;
				responseHeadersString = headers || "";
				jqXHR.readyState = status > 0 ? 4 : 0;
				isSuccess = status >= 200 && status < 300 || status === 304;
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses)
				}
				response = ajaxConvert(s, response, jqXHR, isSuccess);
				if (isSuccess) {
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified
						}
					}
					if (status === 204) {
						statusText = "nocontent"
					} else if (status === 304) {
						statusText = "notmodified"
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error
					}
				} else {
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0
						}
					}
				}
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
				}
				jqXHR.statusCode(statusCode);
				statusCode = undefined;
				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error])
				}
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
					if (!(--jQuery.active)) {
						jQuery.event.trigger("ajaxStop")
					}
				}
			}
			return jqXHR
		},
		getScript: function(url, callback) {
			return jQuery.get(url, undefined, callback, "script")
		},
		getJSON: function(url, data, callback) {
			return jQuery.get(url, data, callback, "json")
		}
	});

	function ajaxHandleResponses(s, jqXHR, responses) {
		var ct, type, finalDataType, firstDataType, contents = s.contents,
			dataTypes = s.dataTypes;
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
			}
		}
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break
				}
			}
		}
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0]
		} else {
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break
				}
				if (!firstDataType) {
					firstDataType = type
				}
			}
			finalDataType = finalDataType || firstDataType
		}
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType)
			}
			return responses[finalDataType]
		}
	}
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2, current, conv, tmp, prev, converters = {},
			dataTypes = s.dataTypes.slice();
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv]
			}
		}
		current = dataTypes.shift();
		while (current) {
			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response
			}
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType)
			}
			prev = current;
			current = dataTypes.shift();
			if (current) {
				if (current === "*") {
					current = prev
				} else if (prev !== "*" && prev !== current) {
					conv = converters[prev + " " + current] || converters["* " + current];
					if (!conv) {
						for (conv2 in converters) {
							tmp = conv2.split(" ");
							if (tmp[1] === current) {
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {
									if (conv === true) {
										conv = converters[conv2]
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1])
									}
									break
								}
							}
						}
					}
					if (conv !== true) {
						if (conv && s["throws"]) {
							response = conv(response)
						} else {
							try {
								response = conv(response)
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								}
							}
						}
					}
				}
			}
		}
		return {
			state: "success",
			data: response
		}
	}
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(text) {
				jQuery.globalEval(text);
				return text
			}
		}
	});
	jQuery.ajaxPrefilter("script", function(s) {
		if (s.cache === undefined) {
			s.cache = false
		}
		if (s.crossDomain) {
			s.type = "GET"
		}
	});
	jQuery.ajaxTransport("script", function(s) {
		if (s.crossDomain) {
			var script, callback;
			return {
				send: function(_, complete) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", callback = function(evt) {
						script.remove();
						callback = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type)
						}
					});
					document.head.appendChild(script[0])
				},
				abort: function() {
					if (callback) {
						callback()
					}
				}
			}
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (ajax_nonce++));
			this[callback] = true;
			return callback
		}
	});
	jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
		var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
		if (jsonProp || s.dataTypes[0] === "jsonp") {
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName)
			} else if (s.jsonp !== false) {
				s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName
			}
			s.converters["script json"] = function() {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called")
				}
				return responseContainer[0]
			};
			s.dataTypes[0] = "json";
			overwritten = window[callbackName];
			window[callbackName] = function() {
				responseContainer = arguments
			};
			jqXHR.always(function() {
				window[callbackName] = overwritten;
				if (s[callbackName]) {
					s.jsonpCallback = originalSettings.jsonpCallback;
					oldCallbacks.push(callbackName)
				}
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0])
				}
				responseContainer = overwritten = undefined
			});
			return "script"
		}
	});
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest()
		} catch (e) {}
	};
	var xhrSupported = jQuery.ajaxSettings.xhr(),
		xhrSuccessStatus = {
			0: 200,
			1223: 204
		},
		xhrId = 0,
		xhrCallbacks = {};
	if (window.ActiveXObject) {
		jQuery(window).on("unload", function() {
			for (var key in xhrCallbacks) {
				xhrCallbacks[key]()
			}
			xhrCallbacks = undefined
		})
	}
	jQuery.support.cors = !! xhrSupported && ("withCredentials" in xhrSupported);
	jQuery.support.ajax = xhrSupported = !! xhrSupported;
	jQuery.ajaxTransport(function(options) {
		var callback;
		if (jQuery.support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function(headers, complete) {
					var i, id, xhr = options.xhr();
					xhr.open(options.type, options.url, options.async, options.username, options.password);
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i]
						}
					}
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType)
					}
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest"
					}
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i])
					}
					callback = function(type) {
						return function() {
							if (callback) {
								delete xhrCallbacks[id];
								callback = xhr.onload = xhr.onerror = null;
								if (type === "abort") {
									xhr.abort()
								} else if (type === "error") {
									complete(xhr.status || 404, xhr.statusText)
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined, xhr.getAllResponseHeaders())
								}
							}
						}
					};
					xhr.onload = callback();
					xhr.onerror = callback("error");
					callback = xhrCallbacks[(id = xhrId++)] = callback("abort");
					xhr.send(options.hasContent && options.data || null)
				},
				abort: function() {
					if (callback) {
						callback()
					}
				}
			}
		}
	});
	var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
		rrun = /queueHooks$/,
		animationPrefilters = [defaultPrefilter],
		tweeners = {
			"*": [function(prop, value) {
				var end, unit, tween = this.createTween(prop, value),
					parts = rfxnum.exec(value),
					target = tween.cur(),
					start = +target || 0,
					scale = 1,
					maxIterations = 20;
				if (parts) {
					end = +parts[2];
					unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
					if (unit !== "px" && start) {
						start = jQuery.css(tween.elem, prop, true) || end || 1;
						do {
							scale = scale || ".5";
							start = start / scale;
							jQuery.style(tween.elem, prop, start + unit)
						} while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations)
					}
					tween.unit = unit;
					tween.start = start;
					tween.end = parts[1] ? start + (parts[1] + 1) * end : end
				}
				return tween
			}]
		};

	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined
		});
		return (fxNow = jQuery.now())
	}
	function createTweens(animation, props) {
		jQuery.each(props, function(prop, value) {
			var collection = (tweeners[prop] || []).concat(tweeners["*"]),
				index = 0,
				length = collection.length;
			for (; index < length; index++) {
				if (collection[index].call(animation, prop, value)) {
					return
				}
			}
		})
	}
	function Animation(elem, properties, options) {
		var result, stopped, index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always(function() {
				delete tick.elem
			}),
			tick = function() {
				if (stopped) {
					return false
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
				for (; index < length; index++) {
					animation.tweens[index].run(percent)
				}
				deferred.notifyWith(elem, [animation, percent, remaining]);
				if (percent < 1 && length) {
					return remaining
				} else {
					deferred.resolveWith(elem, [animation]);
					return false
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend({}, properties),
				opts: jQuery.extend(true, {
					specialEasing: {}
				}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function(prop, end) {
					var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
					animation.tweens.push(tween);
					return tween
				},
				stop: function(gotoEnd) {
					var index = 0,
						length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) {
						return this
					}
					stopped = true;
					for (; index < length; index++) {
						animation.tweens[index].run(1)
					}
					if (gotoEnd) {
						deferred.resolveWith(elem, [animation, gotoEnd])
					} else {
						deferred.rejectWith(elem, [animation, gotoEnd])
					}
					return this
				}
			}),
			props = animation.props;
		propFilter(props, animation.opts.specialEasing);
		for (; index < length; index++) {
			result = animationPrefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				return result
			}
		}
		createTweens(animation, props);
		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation)
		}
		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
	}
	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0]
			}
			if (index !== name) {
				props[name] = value;
				delete props[index]
			}
			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing
					}
				}
			} else {
				specialEasing[name] = easing
			}
		}
	}
	jQuery.Animation = jQuery.extend(Animation, {
		tweener: function(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"]
			} else {
				props = props.split(" ")
			}
			var prop, index = 0,
				length = props.length;
			for (; index < length; index++) {
				prop = props[index];
				tweeners[prop] = tweeners[prop] || [];
				tweeners[prop].unshift(callback)
			}
		},
		prefilter: function(callback, prepend) {
			if (prepend) {
				animationPrefilters.unshift(callback)
			} else {
				animationPrefilters.push(callback)
			}
		}
	});

	function defaultPrefilter(elem, props, opts) {
		var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire, anim = this,
			style = elem.style,
			orig = {},
			handled = [],
			hidden = elem.nodeType && isHidden(elem);
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if (!hooks.unqueued) {
						oldfire()
					}
				}
			}
			hooks.unqueued++;
			anim.always(function() {
				anim.always(function() {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire()
					}
				})
			})
		}
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];
			if (jQuery.css(elem, "display") === "inline" && jQuery.css(elem, "float") === "none") {
				style.display = "inline-block"
			}
		}
		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2]
			})
		}
		for (index in props) {
			value = props[index];
			if (rfxtypes.exec(value)) {
				delete props[index];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {
					continue
				}
				handled.push(index)
			}
		}
		length = handled.length;
		if (length) {
			dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
			if ("hidden" in dataShow) {
				hidden = dataShow.hidden
			}
			if (toggle) {
				dataShow.hidden = !hidden
			}
			if (hidden) {
				jQuery(elem).show()
			} else {
				anim.done(function() {
					jQuery(elem).hide()
				})
			}
			anim.done(function() {
				var prop;
				jQuery._removeData(elem, "fxshow");
				for (prop in orig) {
					jQuery.style(elem, prop, orig[prop])
				}
			});
			for (index = 0; index < length; index++) {
				prop = handled[index];
				tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
				orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0
					}
				}
			}
		}
	}
	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing)
	}
	jQuery.Tween = Tween;
	Tween.prototype = {
		constructor: Tween,
		init: function(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
		},
		cur: function() {
			var hooks = Tween.propHooks[this.prop];
			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
		},
		run: function(percent) {
			var eased, hooks = Tween.propHooks[this.prop];
			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
			} else {
				this.pos = eased = percent
			}
			this.now = (this.end - this.start) * eased + this.start;
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this)
			}
			if (hooks && hooks.set) {
				hooks.set(this)
			} else {
				Tween.propHooks._default.set(this)
			}
			return this
		}
	};
	Tween.prototype.init.prototype = Tween.prototype;
	Tween.propHooks = {
		_default: {
			get: function(tween) {
				var result;
				if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
					return tween.elem[tween.prop]
				}
				result = jQuery.css(tween.elem, tween.prop, "");
				return !result || result === "auto" ? 0 : result
			},
			set: function(tween) {
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween)
				} else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
				} else {
					tween.elem[tween.prop] = tween.now
				}
			}
		}
	};
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now
			}
		}
	};
	jQuery.each(["toggle", "show", "hide"], function(i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function(speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
		}
	});
	jQuery.fn.extend({
		fadeTo: function(speed, to, easing, callback) {
			return this.filter(isHidden).css("opacity", 0).show().end().animate({
				opacity: to
			}, speed, easing, callback)
		},
		animate: function(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
				optall = jQuery.speed(speed, easing, callback),
				doAnimation = function() {
					var anim = Animation(this, jQuery.extend({}, prop), optall);
					doAnimation.finish = function() {
						anim.stop(true)
					};
					if (empty || jQuery._data(this, "finish")) {
						anim.stop(true)
					}
				};
			doAnimation.finish = doAnimation;
			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
		},
		stop: function(type, clearQueue, gotoEnd) {
			var stopQueue = function(hooks) {
					var stop = hooks.stop;
					delete hooks.stop;
					stop(gotoEnd)
				};
			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", [])
			}
			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = jQuery._data(this);
				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index])
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index])
						}
					}
				}
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1)
					}
				}
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type)
				}
			})
		},
		finish: function(type) {
			if (type !== false) {
				type = type || "fx"
			}
			return this.each(function() {
				var index, data = jQuery._data(this),
					queue = data[type + "queue"],
					hooks = data[type + "queueHooks"],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
				data.finish = true;
				jQuery.queue(this, type, []);
				if (hooks && hooks.cur && hooks.cur.finish) {
					hooks.cur.finish.call(this)
				}
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1)
					}
				}
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this)
					}
				}
				delete data.finish
			})
		}
	});

	function genFx(type, includeWidth) {
		var which, attrs = {
			height: type
		},
			i = 0;
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type
		}
		if (includeWidth) {
			attrs.opacity = attrs.width = type
		}
		return attrs
	}
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(name, props) {
		jQuery.fn[name] = function(speed, easing, callback) {
			return this.animate(props, speed, easing, callback)
		}
	});
	jQuery.speed = function(speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx"
		}
		opt.old = opt.complete;
		opt.complete = function() {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this)
			}
			if (opt.queue) {
				jQuery.dequeue(this, opt.queue)
			}
		};
		return opt
	};
	jQuery.easing = {
		linear: function(p) {
			return p
		},
		swing: function(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2
		}
	};
	jQuery.timers = [];
	jQuery.fx = Tween.prototype.init;
	jQuery.fx.tick = function() {
		var timer, timers = jQuery.timers,
			i = 0;
		fxNow = jQuery.now();
		for (; i < timers.length; i++) {
			timer = timers[i];
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1)
			}
		}
		if (!timers.length) {
			jQuery.fx.stop()
		}
		fxNow = undefined
	};
	jQuery.fx.timer = function(timer) {
		if (timer() && jQuery.timers.push(timer)) {
			jQuery.fx.start()
		}
	};
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if (!timerId) {
			timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
		}
	};
	jQuery.fx.stop = function() {
		clearInterval(timerId);
		timerId = null
	};
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	jQuery.fx.step = {};
	if (jQuery.expr && jQuery.expr.filters) {
		jQuery.expr.filters.animated = function(elem) {
			return jQuery.grep(jQuery.timers, function(fn) {
				return elem === fn.elem
			}).length
		}
	}
	jQuery.fn.offset = function(options) {
		if (arguments.length) {
			return options === undefined ? this : this.each(function(i) {
				jQuery.offset.setOffset(this, options, i)
			})
		}
		var docElem, win, elem = this[0],
			box = {
				top: 0,
				left: 0
			},
			doc = elem && elem.ownerDocument;
		if (!doc) {
			return
		}
		docElem = doc.documentElement;
		if (!jQuery.contains(docElem, elem)) {
			return box
		}
		if (typeof elem.getBoundingClientRect !== core_strundefined) {
			box = elem.getBoundingClientRect()
		}
		win = getWindow(doc);
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		}
	};
	jQuery.offset = {
		setOffset: function(elem, options, i) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
				curElem = jQuery(elem),
				props = {};
			if (position === "static") {
				elem.style.position = "relative"
			}
			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0
			}
			if (jQuery.isFunction(options)) {
				options = options.call(elem, i, curOffset)
			}
			if (options.top != null) {
				props.top = (options.top - curOffset.top) + curTop
			}
			if (options.left != null) {
				props.left = (options.left - curOffset.left) + curLeft
			}
			if ("using" in options) {
				options.using.call(elem, props)
			} else {
				curElem.css(props)
			}
		}
	};
	jQuery.fn.extend({
		position: function() {
			if (!this[0]) {
				return
			}
			var offsetParent, offset, elem = this[0],
				parentOffset = {
					top: 0,
					left: 0
				};
			if (jQuery.css(elem, "position") === "fixed") {
				offset = elem.getBoundingClientRect()
			} else {
				offsetParent = this.offsetParent();
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset()
				}
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)
			}
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;
				while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
					offsetParent = offsetParent.offsetParent
				}
				return offsetParent || docElem
			})
		}
	});
	jQuery.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(method, prop) {
		var top = "pageYOffset" === prop;
		jQuery.fn[method] = function(val) {
			return jQuery.access(this, function(elem, method, val) {
				var win = getWindow(elem);
				if (val === undefined) {
					return win ? win[prop] : elem[method]
				}
				if (win) {
					win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset)
				} else {
					elem[method] = val
				}
			}, method, val, arguments.length, null)
		}
	});

	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView
	}
	jQuery.each({
		Height: "height",
		Width: "width"
	}, function(name, type) {
		jQuery.each({
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function(defaultExtra, funcName) {
			jQuery.fn[funcName] = function(margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
					extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
				return jQuery.access(this, function(elem, type, value) {
					var doc;
					if (jQuery.isWindow(elem)) {
						return elem.document.documentElement["client" + name]
					}
					if (elem.nodeType === 9) {
						doc = elem.documentElement;
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
					}
					return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
				}, type, chainable ? margin : undefined, chainable, null)
			}
		})
	});
	jQuery.fn.andSelf = jQuery.fn.addBack;
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = jQuery
	} else {
		window.jQuery = window.$ = jQuery;
		if (typeof define === "function" && define.amd) {
			define("jquery", [], function() {
				return jQuery
			})
		}
	}
})(this);
jQuery.cookie = function(b, j, m) {
	if (typeof j != "undefined") {
		m = m || {};
		if (j === null) {
			j = "";
			m.expires = -1
		}
		var e = "";
		if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
			var f;
			if (typeof m.expires == "number") {
				f = new Date();
				f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
			} else {
				f = m.expires
			}
			e = "; expires=" + f.toUTCString()
		}
		var l = m.path ? "; path=" + (m.path) : "";
		var g = m.domain ? "; domain=" + (m.domain) : "";
		var a = m.secure ? "; secure" : "";
		document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
	} else {
		var d = null;
		if (document.cookie && document.cookie != "") {
			var k = document.cookie.split(";");
			for (var h = 0; h < k.length; h++) {
				var c = jQuery.trim(k[h]);
				if (c.substring(0, b.length + 1) == (b + "=")) {
					d = decodeURIComponent(c.substring(b.length + 1));
					break
				}
			}
		}
		return d
	}
};
(function(e, t) {
	function i(t, n) {
		var r, i, o, u = t.nodeName.toLowerCase();
		return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !! o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
	}
	function s(t) {
		return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function() {
			return e.css(this, "visibility") === "hidden"
		}).length
	}
	var n = 0,
		r = /^ui-id-\d+$/;
	e.ui = e.ui || {};
	if (e.ui.version) return;
	e.extend(e.ui, {
		version: "1.9.2",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), e.fn.extend({
		_focus: e.fn.focus,
		focus: function(t, n) {
			return typeof t == "number" ? this.each(function() {
				var r = this;
				setTimeout(function() {
					e(r).focus(), n && n.call(r)
				}, t)
			}) : this._focus.apply(this, arguments)
		},
		scrollParent: function() {
			var t;
			return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
				return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
			}).eq(0) : t = this.parents().filter(function() {
				return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
			}).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
		},
		zIndex: function(n) {
			if (n !== t) return this.css("zIndex", n);
			if (this.length) {
				var r = e(this[0]),
					i, s;
				while (r.length && r[0] !== document) {
					i = r.css("position");
					if (i === "absolute" || i === "relative" || i === "fixed") {
						s = parseInt(r.css("zIndex"), 10);
						if (!isNaN(s) && s !== 0) return s
					}
					r = r.parent()
				}
			}
			return 0
		},
		uniqueId: function() {
			return this.each(function() {
				this.id || (this.id = "ui-id-" + ++n)
			})
		},
		removeUniqueId: function() {
			return this.each(function() {
				r.test(this.id) && e(this).removeAttr("id")
			})
		}
	}), e.extend(e.expr[":"], {
		data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
			return function(n) {
				return !!e.data(n, t)
			}
		}) : function(t, n, r) {
			return !!e.data(t, r[3])
		},
		focusable: function(t) {
			return i(t, !isNaN(e.attr(t, "tabindex")))
		},
		tabbable: function(t) {
			var n = e.attr(t, "tabindex"),
				r = isNaN(n);
			return (r || n >= 0) && i(t, !r)
		}
	}), e(function() {
		var t = document.body,
			n = t.appendChild(n = document.createElement("div"));
		n.offsetHeight, e.extend(n.style, {
			minHeight: "100px",
			height: "auto",
			padding: 0,
			borderWidth: 0
		}), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
	}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, r) {
		function u(t, n, r, s) {
			return e.each(i, function() {
				n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
			}), n
		}
		var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
			s = r.toLowerCase(),
			o = {
				innerWidth: e.fn.innerWidth,
				innerHeight: e.fn.innerHeight,
				outerWidth: e.fn.outerWidth,
				outerHeight: e.fn.outerHeight
			};
		e.fn["inner" + r] = function(n) {
			return n === t ? o["inner" + r].call(this) : this.each(function() {
				e(this).css(s, u(this, n) + "px")
			})
		}, e.fn["outer" + r] = function(t, n) {
			return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function() {
				e(this).css(s, u(this, t, !0, n) + "px")
			})
		}
	}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
		return function(n) {
			return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
		}
	}(e.fn.removeData)), function() {
		var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
		e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = parseFloat(t[1], 10) === 6
	}(), e.fn.extend({
		disableSelection: function() {
			return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
				e.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		}
	}), e.extend(e.ui, {
		plugin: {
			add: function(t, n, r) {
				var i, s = e.ui[t].prototype;
				for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
			},
			call: function(e, t, n) {
				var r, i = e.plugins[t];
				if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
				for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
			}
		},
		contains: e.contains,
		hasScroll: function(t, n) {
			if (e(t).css("overflow") === "hidden") return !1;
			var r = n && n === "left" ? "scrollLeft" : "scrollTop",
				i = !1;
			return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
		},
		isOverAxis: function(e, t, n) {
			return e > t && e < t + n
		},
		isOver: function(t, n, r, i, s, o) {
			return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
		}
	})
})(jQuery);
(function(e, t) {
	var n = 0,
		r = Array.prototype.slice,
		i = e.cleanData;
	e.cleanData = function(t) {
		for (var n = 0, r;
		(r = t[n]) != null; n++) try {
			e(r).triggerHandler("remove")
		} catch (s) {}
		i(t)
	}, e.widget = function(t, n, r) {
		var i, s, o, u, a = t.split(".")[0];
		t = t.split(".")[1], i = a + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
			return !!e.data(t, i)
		}, e[a] = e[a] || {}, s = e[a][t], o = e[a][t] = function(e, t) {
			if (!this._createWidget) return new o(e, t);
			arguments.length && this._createWidget(e, t)
		}, e.extend(o, s, {
			version: r.version,
			_proto: e.extend({}, r),
			_childConstructors: []
		}), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function(t, i) {
			e.isFunction(i) && (r[t] = function() {
				var e = function() {
						return n.prototype[t].apply(this, arguments)
					},
					r = function(e) {
						return n.prototype[t].apply(this, e)
					};
				return function() {
					var t = this._super,
						n = this._superApply,
						s;
					return this._super = e, this._superApply = r, s = i.apply(this, arguments), this._super = t, this._superApply = n, s
				}
			}())
		}), o.prototype = e.widget.extend(u, {
			widgetEventPrefix: s ? u.widgetEventPrefix : t
		}, r, {
			constructor: o,
			namespace: a,
			widgetName: t,
			widgetBaseClass: i,
			widgetFullName: i
		}), s ? (e.each(s._childConstructors, function(t, n) {
			var r = n.prototype;
			e.widget(r.namespace + "." + r.widgetName, o, n._proto)
		}), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
	}, e.widget.extend = function(n) {
		var i = r.call(arguments, 1),
			s = 0,
			o = i.length,
			u, a;
		for (; s < o; s++) for (u in i[s]) a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a);
		return n
	}, e.widget.bridge = function(n, i) {
		var s = i.prototype.widgetFullName || n;
		e.fn[n] = function(o) {
			var u = typeof o == "string",
				a = r.call(arguments, 1),
				f = this;
			return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function() {
				var r, i = e.data(this, s);
				if (!i) return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
				if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + n + " widget instance");
				r = i[o].apply(i, a);
				if (r !== i && r !== t) return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
			}) : this.each(function() {
				var t = e.data(this, s);
				t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
			}), f
		}
	}, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(t, r) {
			r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(e) {
					e.target === r && this.destroy()
				}
			}), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: e.noop,
		_getCreateEventData: e.noop,
		_create: e.noop,
		_init: e.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: e.noop,
		widget: function() {
			return this.element
		},
		option: function(n, r) {
			var i = n,
				s, o, u;
			if (arguments.length === 0) return e.widget.extend({}, this.options);
			if (typeof n == "string") {
				i = {}, s = n.split("."), n = s.shift();
				if (s.length) {
					o = i[n] = e.widget.extend({}, this.options[n]);
					for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {}, o = o[s[u]];
					n = s.pop();
					if (r === t) return o[n] === t ? null : o[n];
					o[n] = r
				} else {
					if (r === t) return this.options[n] === t ? null : this.options[n];
					i[n] = r
				}
			}
			return this._setOptions(i), this
		},
		_setOptions: function(e) {
			var t;
			for (t in e) this._setOption(t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
		},
		enable: function() {
			return this._setOption("disabled", !1)
		},
		disable: function() {
			return this._setOption("disabled", !0)
		},
		_on: function(t, n, r) {
			var i, s = this;
			typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function(r, o) {
				function u() {
					if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) return;
					return (typeof o == "string" ? s[o] : o).apply(s, arguments)
				}
				typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
				var a = r.match(/^(\w+)\s*(.*)$/),
					f = a[1] + s.eventNamespace,
					l = a[2];
				l ? i.delegate(l, f, u) : n.bind(f, u)
			})
		},
		_off: function(e, t) {
			t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
		},
		_delay: function(e, t) {
			function n() {
				return (typeof e == "string" ? r[e] : e).apply(r, arguments)
			}
			var r = this;
			return setTimeout(n, t || 0)
		},
		_hoverable: function(t) {
			this.hoverable = this.hoverable.add(t), this._on(t, {
				mouseenter: function(t) {
					e(t.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(t) {
					e(t.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(t) {
			this.focusable = this.focusable.add(t), this._on(t, {
				focusin: function(t) {
					e(t.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(t) {
					e(t.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(t, n, r) {
			var i, s, o = this.options[t];
			r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
			if (s) for (i in s) i in n || (n[i] = s[i]);
			return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
		}
	}, e.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, n) {
		e.Widget.prototype["_" + t] = function(r, i, s) {
			typeof i == "string" && (i = {
				effect: i
			});
			var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
			i = i || {}, typeof i == "number" && (i = {
				duration: i
			}), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
				e(this)[t](), s && s.call(r[0]), n()
			})
		}
	}), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function() {
		return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
	})
})(jQuery);
(function(e, t) {
	var n = !1;
	e(document).mouseup(function(e) {
		n = !1
	}), e.widget("ui.mouse", {
		version: "1.9.2",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var t = this;
			this.element.bind("mousedown." + this.widgetName, function(e) {
				return t._mouseDown(e)
			}).bind("click." + this.widgetName, function(n) {
				if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(t) {
			if (n) return;
			this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
			var r = this,
				i = t.which === 1,
				s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
			if (!i || s || !this._mouseCapture(t)) return !0;
			this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
				r.mouseDelayMet = !0
			}, this.options.delay));
			if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
				this._mouseStarted = this._mouseStart(t) !== !1;
				if (!this._mouseStarted) return t.preventDefault(), !0
			}
			return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
				return r._mouseMove(e)
			}, this._mouseUpDelegate = function(e) {
				return r._mouseUp(e)
			}, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
		},
		_mouseMove: function(t) {
			return !e.ui.ie || document.documentMode >= 9 || !! t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
		},
		_mouseUp: function(t) {
			return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
		},
		_mouseDistanceMet: function(e) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function(e) {
			return this.mouseDelayMet
		},
		_mouseStart: function(e) {},
		_mouseDrag: function(e) {},
		_mouseStop: function(e) {},
		_mouseCapture: function(e) {
			return !0
		}
	})
})(jQuery);
(function(e, t) {
	e.widget("ui.draggable", e.ui.mouse, {
		version: "1.9.2",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1
		},
		_create: function() {
			this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
		},
		_destroy: function() {
			this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
		},
		_mouseCapture: function(t) {
			var n = this.options;
			return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function() {
				e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1e3
				}).css(e(this).offset()).appendTo("body")
			}), !0) : !1)
		},
		_mouseStart: function(t) {
			var n = this.options;
			return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, e.extend(this.offset, {
				click: {
					left: t.pageX - this.offset.left,
					top: t.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
		},
		_mouseDrag: function(t, n) {
			this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
			if (!n) {
				var r = this._uiHash();
				if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
				this.position = r.position
			}
			if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
			if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
			return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
		},
		_mouseStop: function(t) {
			var n = !1;
			e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1);
			var r = this.element[0],
				i = !1;
			while (r && (r = r.parentNode)) r == document && (i = !0);
			if (!i && this.options.helper === "original") return !1;
			if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
				var s = this;
				e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
					s._trigger("stop", t) !== !1 && s._clear()
				})
			} else this._trigger("stop", t) !== !1 && this._clear();
			return !1
		},
		_mouseUp: function(t) {
			return e("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this)
			}), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function(t) {
			var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
			return e(this.options.handle, this.element).find("*").andSelf().each(function() {
				this == t.target && (n = !0)
			}), n
		},
		_createHelper: function(t) {
			var n = this.options,
				r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
			return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo), r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
		},
		_adjustOffsetFromHelper: function(t) {
			typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var t = this.offsetParent.offset();
			this.cssPosition == "absolute" && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
			if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.ui.ie) t = {
				top: 0,
				left: 0
			};
			return {
				top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if (this.cssPosition == "relative") {
				var e = this.element.position();
				return {
					top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var t = this.options;
			t.containment == "parent" && (t.containment = this.helper[0].parentNode);
			if (t.containment == "document" || t.containment == "window") this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
			if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
				var n = e(t.containment),
					r = n[0];
				if (!r) return;
				var i = n.offset(),
					s = e(r).css("overflow") != "hidden";
				this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
			} else t.containment.constructor == Array && (this.containment = t.containment)
		},
		_convertPositionTo: function(t, n) {
			n || (n = this.position);
			var r = t == "absolute" ? 1 : -1,
				i = this.options,
				s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				o = /(html|body)/i.test(s[0].tagName);
			return {
				top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r,
				left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r
			}
		},
		_generatePosition: function(t) {
			var n = this.options,
				r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				i = /(html|body)/i.test(r[0].tagName),
				s = t.pageX,
				o = t.pageY;
			if (this.originalPosition) {
				var u;
				if (this.containment) {
					if (this.relative_container) {
						var a = this.relative_container.offset();
						u = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
					} else u = this.containment;
					t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left), t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top), t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left), t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
				}
				if (n.grid) {
					var f = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
					o = u ? f - this.offset.click.top < u[1] || f - this.offset.click.top > u[3] ? f - this.offset.click.top < u[1] ? f + n.grid[1] : f - n.grid[1] : f : f;
					var l = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
					s = u ? l - this.offset.click.left < u[0] || l - this.offset.click.left > u[2] ? l - this.offset.click.left < u[0] ? l + n.grid[0] : l - n.grid[0] : l : l
				}
			}
			return {
				top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
				left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
		},
		_trigger: function(t, n, r) {
			return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
		},
		plugins: {},
		_uiHash: function(e) {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), e.ui.plugin.add("draggable", "connectToSortable", {
		start: function(t, n) {
			var r = e(this).data("draggable"),
				i = r.options,
				s = e.extend({}, n, {
					item: r.element
				});
			r.sortables = [], e(i.connectToSortable).each(function() {
				var n = e.data(this, "sortable");
				n && !n.options.disabled && (r.sortables.push({
					instance: n,
					shouldRevert: n.options.revert
				}), n.refreshPositions(), n._trigger("activate", t, s))
			})
		},
		stop: function(t, n) {
			var r = e(this).data("draggable"),
				i = e.extend({}, n, {
					item: r.element
				});
			e.each(r.sortables, function() {
				this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({
					top: "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
			})
		},
		drag: function(t, n) {
			var r = e(this).data("draggable"),
				i = this,
				s = function(t) {
					var n = this.offset.click.top,
						r = this.offset.click.left,
						i = this.positionAbs.top,
						s = this.positionAbs.left,
						o = t.height,
						u = t.width,
						a = t.top,
						f = t.left;
					return e.ui.isOver(i + n, s + r, a, f, o, u)
				};
			e.each(r.sortables, function(s) {
				var o = !1,
					u = this;
				this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, e.each(r.sortables, function() {
					return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this != u && this.instance._intersectsWith(this.instance.containerCache) && e.ui.contains(u.instance.element[0], this.instance.element[0]) && (o = !1), o
				})), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
					return n.helper[0]
				}, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
			})
		}
	}), e.ui.plugin.add("draggable", "cursor", {
		start: function(t, n) {
			var r = e("body"),
				i = e(this).data("draggable").options;
			r.css("cursor") && (i._cursor = r.css("cursor")), r.css("cursor", i.cursor)
		},
		stop: function(t, n) {
			var r = e(this).data("draggable").options;
			r._cursor && e("body").css("cursor", r._cursor)
		}
	}), e.ui.plugin.add("draggable", "opacity", {
		start: function(t, n) {
			var r = e(n.helper),
				i = e(this).data("draggable").options;
			r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
		},
		stop: function(t, n) {
			var r = e(this).data("draggable").options;
			r._opacity && e(n.helper).css("opacity", r._opacity)
		}
	}), e.ui.plugin.add("draggable", "scroll", {
		start: function(t, n) {
			var r = e(this).data("draggable");
			r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
		},
		drag: function(t, n) {
			var r = e(this).data("draggable"),
				i = r.options,
				s = !1;
			if (r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
				if (!i.axis || i.axis != "x") r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed);
				if (!i.axis || i.axis != "y") r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
			} else {
				if (!i.axis || i.axis != "x") t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed));
				if (!i.axis || i.axis != "y") t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
			}
			s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
		}
	}), e.ui.plugin.add("draggable", "snap", {
		start: function(t, n) {
			var r = e(this).data("draggable"),
				i = r.options;
			r.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function() {
				var t = e(this),
					n = t.offset();
				this != r.element[0] && r.snapElements.push({
					item: this,
					width: t.outerWidth(),
					height: t.outerHeight(),
					top: n.top,
					left: n.left
				})
			})
		},
		drag: function(t, n) {
			var r = e(this).data("draggable"),
				i = r.options,
				s = i.snapTolerance,
				o = n.offset.left,
				u = o + r.helperProportions.width,
				a = n.offset.top,
				f = a + r.helperProportions.height;
			for (var l = r.snapElements.length - 1; l >= 0; l--) {
				var c = r.snapElements[l].left,
					h = c + r.snapElements[l].width,
					p = r.snapElements[l].top,
					d = p + r.snapElements[l].height;
				if (!(c - s < o && o < h + s && p - s < a && a < d + s || c - s < o && o < h + s && p - s < f && f < d + s || c - s < u && u < h + s && p - s < a && a < d + s || c - s < u && u < h + s && p - s < f && f < d + s)) {
					r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {
						snapItem: r.snapElements[l].item
					})), r.snapElements[l].snapping = !1;
					continue
				}
				if (i.snapMode != "inner") {
					var v = Math.abs(p - f) <= s,
						m = Math.abs(d - a) <= s,
						g = Math.abs(c - u) <= s,
						y = Math.abs(h - o) <= s;
					v && (n.position.top = r._convertPositionTo("relative", {
						top: p - r.helperProportions.height,
						left: 0
					}).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
						top: d,
						left: 0
					}).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
						top: 0,
						left: c - r.helperProportions.width
					}).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
						top: 0,
						left: h
					}).left - r.margins.left)
				}
				var b = v || m || g || y;
				if (i.snapMode != "outer") {
					var v = Math.abs(p - a) <= s,
						m = Math.abs(d - f) <= s,
						g = Math.abs(c - o) <= s,
						y = Math.abs(h - u) <= s;
					v && (n.position.top = r._convertPositionTo("relative", {
						top: p,
						left: 0
					}).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
						top: d - r.helperProportions.height,
						left: 0
					}).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
						top: 0,
						left: c
					}).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
						top: 0,
						left: h - r.helperProportions.width
					}).left - r.margins.left)
				}!r.snapElements[l].snapping && (v || m || g || y || b) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {
					snapItem: r.snapElements[l].item
				})), r.snapElements[l].snapping = v || m || g || y || b
			}
		}
	}), e.ui.plugin.add("draggable", "stack", {
		start: function(t, n) {
			var r = e(this).data("draggable").options,
				i = e.makeArray(e(r.stack)).sort(function(t, n) {
					return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
				});
			if (!i.length) return;
			var s = parseInt(i[0].style.zIndex) || 0;
			e(i).each(function(e) {
				this.style.zIndex = s + e
			}), this[0].style.zIndex = s + i.length
		}
	}), e.ui.plugin.add("draggable", "zIndex", {
		start: function(t, n) {
			var r = e(n.helper),
				i = e(this).data("draggable").options;
			r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
		},
		stop: function(t, n) {
			var r = e(this).data("draggable").options;
			r._zIndex && e(n.helper).css("zIndex", r._zIndex)
		}
	})
})(jQuery);
$(function(e) {
	var a = e.cookie("o") || "pevc",
		b = e("#yM").toggleClass("on", a.search(/v/) != -1).click(function() {
			var p = e(this),
				o = p.hasClass("on");
			if (o) {
				return
			}
			e(this).addClass("on");
			i.removeClass("H").addClass("I");
			f.removeClass("on");
			m();
			e(window).resize()
		}),
		f = e("#xL").toggleClass("on", a.search(/v/) === -1).click(function() {
			var p = e(this),
				o = p.hasClass("on");
			if (o) {
				return
			}
			p.addClass("on");
			i.addClass("H").removeClass("I");
			b.removeClass("on");
			m();
			e(window).resize()
		}),
		k = e("#cR").toggleClass("on", a.search(/c/) != -1).click(function() {
			var o = e(this).toggleClass("on").hasClass("on");
			n.toggleClass("color", o);
			m()
		}),
		l = e("#bQ").toggleClass("on", a.search(/t/) != -1).click(function() {
			var o = e(this).toggleClass("on").hasClass("on");
			n.toggleClass("bQ", o);
			m()
		}),
		g = e("#aP").toggleClass("on", a.search(/i/) != -1).click(function() {
			var o = e(this).toggleClass("on").hasClass("on");
			n.toggleClass("aP", o);
			m()
		}),
		h = e("#zN").toggleClass("on", a.search(/C/) != -1).click(function() {
			var o = e(this).toggleClass("on").hasClass("on");
			n.toggleClass("compact", o);
			m()
		}),
		c = e("#gV").toggleClass("on", a.search(/p/) != -1).toggleClass("inactive", a.search(/e/) == -1).click(function() {
			if (!j.hasClass("on")) {
				return
			}
			var o = e(this).toggleClass("on").hasClass("on");
			n.toggleClass("R", !o);
			j.toggleClass("inactive", !o);
			m();
			d.click()
		}),
		j = e("#jY").toggleClass("on", a.search(/e/) != -1).toggleClass("inactive", a.search(/p/) == -1).click(function() {
			if (!c.hasClass("on")) {
				return
			}
			var o = e(this).toggleClass("on").hasClass("on");
			n.toggleClass("S", !o);
			c.toggleClass("inactive", !o);
			m();
			d.click()
		}),
		i = e(".N").toggleClass("H", !b.hasClass("on")).toggleClass("I", b.hasClass("on")),
		d = e("#eT"),
		n = e("#fU").toggleClass("R", !c.hasClass("on")).toggleClass("S", !j.hasClass("on")).toggleClass("compact", h.hasClass("on")).toggleClass("color", k.hasClass("on")).toggleClass("aP", g.hasClass("on")).toggleClass("bQ", l.hasClass("on"));

	function m() {
		e.cookie("o", (c.hasClass("on") ? "p" : "") + (j.hasClass("on") ? "e" : "") + (b.hasClass("on") ? "v" : "") + (l.hasClass("on") ? "t" : "") + (g.hasClass("on") ? "i" : "") + (k.hasClass("on") ? "c" : "") + (h.hasClass("on") ? "C" : ""), {
			path: "/",
			expires: 90
		})
	}
	setTimeout(function() {
		e(".O").click(function() {
			e.get(e(this).data("json"), function(o) {
				e("#eT").val(o).click()
			}, "text")
		});
		e(".n").click(function(o) {
			if (e(this).is(".k")) {
				if (e(o.target).closest(".j").length === 0) {
					e(this).removeClass("k")
				}
			} else {
				e(".n").removeClass("k");
				e(this).addClass("k");
				o.stopPropagation();
				e("body").bind("click.dropdown", function(p) {
					if (e(p.target).closest(".j").length === 0) {
						e(".n").removeClass("k");
						e("body").unbind("click.dropdown")
					}
				})
			}
		})
	}, 0)
});
$(function() {
	var e = "H",
		u = function() {
			var y = false;
			u = function() {
				var A = c,
					z = j - q - c - d - b + 20;
				h.css("top", q - 20);
				l.outerHeight(A - 20);
				if (z === -20) {
					if (!y) {
						p.hide();
						y = true
					}
				} else {
					if (y) {
						p.show();
						y = false
					}
					p.outerHeight(z)
				}
				m.outerHeight(z - m.position().top - 2);
				$.cookie("y", "" + A, {
					path: "/"
				})
			};
			u()
		},
		r = function() {
			var y = false;
			r = function() {
				var D = v,
					B = w - v - k,
					A = j - q - b;
				h.css("top", q).css("width", "");
				l.outerWidth(D - 20);
				if (B === 0) {
					if (!y) {
						p.hide();
						y = true
					}
				} else {
					if (y) {
						p.show();
						y = false
					}
					p.outerWidth(B - 20)
				}
				var z = p.hasClass("R") || p.hasClass("S") ? 1 : 2,
					C = Math.floor(a.outerWidth() / z);
				o.eq(0).outerWidth(C);
				o.eq(2).outerWidth(C);
				o.eq(3).outerWidth(C - 1);
				m.outerHeight(A - m.position().top - 2);
				$.cookie("x", "" + D, {
					path: "/"
				})
			};
			r()
		},
		h = $(".N"),
		l = $(".J", h),
		p = $(".K", h),
		m = $(".L", p),
		g = $(".F", p),
		f = $(".y", p),
		a = $(".E", p),
		o = $(".C"),
		x = $(".M", h).mousedown(function() {
			x.addClass("G")
		}).mouseout(function() {
			x.removeClass("G")
		}).mouseup(function() {
			x.removeClass("G")
		}),
		d = x.outerHeight(),
		k = x.outerWidth(),
		v = -1,
		c = -1,
		i = $(".a"),
		q = -1,
		s = $(".r"),
		b = -1,
		j = -1,
		w = -1,
		n = $(window).resize(function() {
			var A = h.hasClass("H") ? "ns" : "ew";
			if (e !== A) {
				t(A)
			}
			switch (A) {
			case "ew":
				var G = $(this).height(),
					F = $(this).width(),
					H = i.outerHeight(),
					B = s.outerHeight(),
					I = F !== w,
					D = G !== j,
					z = H !== q,
					E = B !== b;
				if (v === -1) {
					v = $("body").hasClass("posted") ? 0 : $.cookie("x") ? Number($.cookie("x")) : Math.floor(F / 2.6);
					x.css("left", v)
				} else {
					if (I) {
						v = Math.floor(v * F / w);
						x.css("left", v)
					}
				}
				j = G;
				w = F;
				q = H;
				b = B;
				h.add(l).outerHeight(j - q - b);
				r();
				break;
			case "ns":
				var G = $(this).height(),
					F = $(this).width(),
					H = i.outerHeight(),
					B = s.outerHeight(),
					I = F !== w,
					D = G !== j,
					z = H !== q,
					E = B !== b;
				if (c === -1) {
					c = $.cookie("y") ? Number($.cookie("y")) : (G - H - B) / 2.5;
					x.css("top", c)
				} else {
					if (D) {
						c = c * (G - B) / (j - b);
						x.css("top", c)
					}
				}
				j = G;
				w = F;
				q = H;
				b = B;
				if (I) {
					h.width(w - 42);
					var C = p.hasClass("R") || p.hasClass("S") ? 1 : 2,
						y = Math.floor(a.innerWidth() / C);
					o.not(":eq(1)").outerWidth(y - 1);
					l.outerWidth(w - 40)
				}
				if (D || z || E) {
					h.height(j - q - b + 40);
					u()
				}
			}
		}).resize();

	function t(y) {
		switch (y) {
		case "ew":
			x.draggable({
				axis: "x",
				containment: ".N",
				cursor: "ew-resize",
				drag: function(z, A) {
					v = A.position.left;
					r()
				},
				snap: ".N",
				snapMode: "inner",
				snapTolerance: 40
			});
			h.addClass("I").removeClass("H");
			break;
		case "ns":
		default:
			x.draggable({
				axis: "y",
				containment: ".N",
				cursor: "ns-resize",
				drag: function(z, A) {
					c = A.position.top;
					u()
				},
				snap: ".N",
				snapMode: "inner",
				snapTolerance: 40
			});
			h.addClass("H").removeClass("I")
		}
		e = y;
		l.add(p).add(x).removeAttr("style");
		v = -1;
		c = -1;
		j = -1;
		w = -1;
		d = x.outerHeight();
		k = x.outerWidth()
	}
});
$(function() {
	setTimeout(function() {
		var c = '';
		$("#header > b").css("margin-right", 30).after(c);
		$("#support-it,#donate").hide();
		$("#nC").show(5000);
		$("#support-it").delay(7000).show(1000);
		$("#donate").delay(9500).show(800)
	}, 4000 + Math.random() * 5000);
	$(".s").click(function(d) {
		var c = $(this).attr("rel");
		if ($("#popup-" + c).length > 0) {
			return
		}
		$.get("form-" + c + ".html", function(f) {
			$("#footer").after(f);
			if (c == "contact") {
				$.getScript("contact.js")
			}
			var i = $(window),
				g = i.width(),
				e = i.height(),
				h = $("#popup-" + c);
			h.draggable().css("z-index", b() + 1).offset({
				left: (g - h.width()) / 2,
				top: (e - h.height()) / 2
			}).mousedown(function() {
				var j = $(this).css("z-index");
				$(this).css("z-index", b() + 1)
			});
			$(".u", h).add(".t", h).click(function() {
				h.remove()
			})
		}, "text");
		d.preventDefault()
	});
	$(window).keydown(function(c) {
		if (c.keyCode == "27") {
			var d = a();
			if (d) {
				d.remove()
			}
			c.preventDefault()
		}
	});

	function a() {
		var d = 2001,
			c;
		$(".v").each(function() {
			var e = $(this).css("z-index");
			if (e > d) {
				d = Number(e);
				c = $(this)
			}
		});
		return c
	}
	function b() {
		var c = a();
		return (c) ? Number(c.css("z-index")) : 2001
	}
});
$(function(d) {
	var D = d.cookie("o") || "pecT",
		w = d("body"),
		G = "online",
		a = d("#eT").keyup(function() {
			j("keyup")
		}).click(function() {
			j("click")
		}).select().focus(),
		r = d("#iX"),
		B = d("#hW"),
		n = d("#lA"),
		k = d("#kZ"),
		f = r.add(n),
		l = d("#gV"),
		u = d("#jY"),
		s = "/",
		g = a.hasClass("posted"),
		c = D.search(/e/) != -1,
		h = "fr",
		p = 100,
		b = "parser",
		v = d("html"),
		o = d(window),
		q = ".",
		i = d("#favicon"),
		y = d("#footer"),
		A = "json",
		z = "object",
		m = "array",
		C = "string",
		F = "number",
		e = "boolean",
		x = "http:" + s + s + A + q + b + q + G + q + h + s;
	if ((document.location + "").search(x) !== 0) {
		d = null;
		return
	}
	
	d(".P").delegate(".toggle", "click", function() {
		var H = d(this).parent();
		if (H.length == 0) {
			H = d(this).closest(".P")
		}
		H.toggleClass("collapsed");
		return false
	});

	function t(I) {
		function H(J) {
			function K(O) {
				if (O === null) {
					return "null"
				}
				if (typeof(O) === "object" && O.length) {
					return "array"
				}
				return typeof O
			}
			function N(O, Q, T) {
				var P = "",
					S, R;
				for (R in O) {
					if (O.hasOwnProperty(R)) {
						if (P !== "") {
							P += T
						}
						S = O[R];
						if (S === undefined) {
							S = null
						}
						if (Q !== "array") {
							P += '<span class="property">';
							P += (Q === "object") ? '"<span class="p">' + R + '</span>"</span>:' : '<span class="p">' + R + "</span></span>:"
						}
						P += H(S)
					}
				}
				return P
			}
			var M = "",
				L = K(J);
			switch (L) {
			case "object":
				M = '<span class="' + L + '"><span class="toggle">{</span><ul><li>' + N(J, L, ",</li><li>") + '</li></ul><span class="toggle-end">}</span></span>';
				break;
			case "array":
				M = '<span class="' + L + '"><span class="toggle">[</span><ol><li>' + N(J, L, ",</li><li>") + '</li></ol><span class="toggle-end" card="' + J.length + '">]</span></span>';
				break;
			case "null":
				M = '<span class="' + L + '">' + L + "</span>";
				break;
			case "string":
				M = '<span class="' + L + '">"' + J + '"</span>';
				break;
			default:
				M = '<span class="' + L + '">' + J + "</span>";
				break
			}
			return M
		}
		return H(I)
	}
	function E(O) {
		function I(T) {
			return Q(J(T))
		}
		function J(T) {
			return T.replace(/\s+$/g, "")
		}
		function Q(T) {
			return T.replace(/^\s+/g, "")
		}
		function K() {
			var V = 0,
				U, T;
			do {
				V = N.indexOf('"', V + 1), U = 0, T = 1;
				do {
					if (N.substring(V - T, V - T + 1) === "\\") {
						U = U + 1;
						T++;
						continue
					}
					break
				} while (true);
				if (U % 2 === 0) {
					break
				}
			} while (true);
			return V
		}
		function L(U) {
			function T(X) {
				function V(ac) {
					var aa, Z, Y, ab = ac.substring(0, 1);
					ac.update("");
					if (ab === '"') {
						aa = ac.shift(K(ac.todo) + 1);
						if (aa.search(/\\u(?![\d|A-F|a-f]{4})/g) !== -1) {
							return ac.err("\\u must be followed by 4 hexadecimal characters", aa)
						}
						length = aa.length;
						for (Y = 0; Y < length; Y++) {
							if (aa.substring(Y, Y + 1) == "\\") {
								if (Y + 1 < length) {
									Y++;
									if (!aa.substring(Y, Y + 1).search(/[^\"|\\|\/|b|f|n|r|t|u]/)) {
										return ac.err("Backslash must be escaped", aa)
									}
								}
							}
						}
						return ac.update('<span class="property">"<span class="p">' + aa.substring(1, aa.length - 1) + '</span>"</span>')
					}
					aa = ac.shift(ac.indexOf(":"));
					return ac.err("Name property must be a String wrapped in double quotes.", aa)
				}
				function W(Y) {
					if (Y.substring(0, 1) !== ":") {
						Y.err("Semi-column is missing.", Y.shift(Y.indexOf(":")))
					}
					return Y.swap(1)
				}
				X.update("<li>");
				if (X.substring(0, 1) === "}") {
					return X.update("</li>")
				}
				X = V(X);
				X = W(X);
				X = M(X, "}");
				if (X.substring(0, 1) === ",") {
					X.swap(1).update("</li>");
					return T(X)
				}
				if (X.substring(0, 1) === "}") {
					return X.update("</li>")
				}
				return X.err("Comma is missing", X.shift(X.indexOf("}"))).update("</li>")
			}
			if (U.indexOf("{") === -1) {
				U.err("Opening brace is missing", U.todo);
				return U.update("", "")
			} else {
				U.shift(1);
				U.update('<span class="object"><span class="toggle">{</span><ul>');
				U = T(U).update("</ul>");
				if (U.indexOf("}") === -1) {
					U.err("Closing brace is missing", U.todo);
					return U.update("", "")
				}
				return U.span("toggle-end", U.shift(1))
			}
		}
		function H(U) {
			var V = 0;

			function T(X, W) {
				X.update("<li>");
				X = M(X, "]");
				if (X.substring(0, 1) === ",") {
					X.swap(1).update("</li>");
					return T(X, ++V)
				}
				if (X.substring(0, 1) === "]") {
					return X.update("</li>")
				}
				return X.err("Comma is missing", X.shift(X.search(/(,|\])/))).update("</li>")
			}
			if (U.indexOf("[") === -1) {
				U.err("Opening square bracket is missing", U.todo);
				return U.update("", "")
			}
			U.shift(1);
			U.update('<span class="array">');
			U.update('<span class="toggle">[</span><ol>');
			if (U.indexOf("]") === 0) {
				U.shift(1);
				U.update('</ol><span class="toggle-end" card="0">]</span>');
				return U.update("</span>")
			}
			U = T(U, 0);
			if (U.indexOf("]") === -1) {
				U.err("Closing square bracket is missing", U.todo);
				U.update('</ol><span class="toggle-end" card="' + (V + 1) + '"></span>');
				return U.update("</span>")
			}
			U.shift(1);
			U.update('</ol><span class="toggle-end" card="' + (V + 1) + '">]</span>');
			return U.update("</span>")
		}
		function M(Z, U) {
			var ab, X, V, T, W, aa = "";
			if (Z.search(/^(")/) === 0) {
				ab = Z.shift(K(Z.todo) + 1);
				if (ab.search(/\\u(?![\d|A-F|a-f]{4})/g) !== -1) {
					return Z.err("\\u must be followed by 4 hexadecimal characters", ab)
				}
				T = ab.length;
				for (V = 0; V < T; V++) {
					if (ab.substring(V, V + 1) == "\\") {
						if (V + 1 < T) {
							V++;
							if (!ab.substring(V, V + 1).search(/[^\"|\\|\/|b|f|n|r|t|u]/)) {
								return Z.err("Backslash must be escaped", ab)
							}
						}
					}
				}
				return Z.span("string", ab)
			}
			if (Z.search(/^\{/) === 0) {
				return L(Z)
			}
			if (Z.search(/^\[/) === 0) {
				return H(Z)
			}
			X = Z.search(new RegExp("(,|" + U + ")"));
			if (X === -1) {
				X = Z.todo.length - 1;
				W = J(Z.todo);
				Z.update("", "")
			} else {
				W = J(Z.shift(X))
			}
			try {
				aa = typeof $.parseJSON(W)
			} catch (Y) {}
			switch (aa) {
			case "boolean":
			case "number":
				return Z.span(aa, W);
			default:
				if (W === "null") {
					return Z.span("null", W)
				} else {
					if (W.search(/^(')/) === 0) {
						return Z.err("String must be wrapped in double quotes", W)
					}
					return Z.err("Unknown type", W)
				}
			}
		}
		var P = false,
			R = function(T) {
				this.done = "";
				this.todo = T ? T : "";
				this.update = function(V, U) {
					if (V) {
						this.done += V
					}
					if (U !== undefined) {
						this.todo = Q(U)
					}
					return this
				};
				this.swap = function(U) {
					if (U && !isNaN(Number(U)) && this.todo.length >= U) {
						this.update(this.todo.substr(0, U), this.todo.substring(U))
					}
					return this
				};
				this.toString = function() {
					if (this.todo.length !== 0) {
						this.err("Text after last closing brace.", this.todo)
					}
					return this.done
				};
				this.span = function(U, V) {
					return this.update('<span class="' + U + '">' + V + "</span>")
				};
				this.err = function(V, U) {
					P = true;
					return this.update('<span class="error" title="' + V + '">' + U + "</span>")
				};
				this.shift = function(U) {
					var V;
					if (U && !isNaN(Number(U)) && this.todo.length >= U) {
						V = this.substring(0, U);
						this.update("", this.substring(U));
						return J(V)
					}
					return ""
				};
				this.indexOf = function(V, U) {
					if (U) {
						return this.todo.indexOf(V, U)
					} else {
						return this.todo.indexOf(V)
					}
				};
				this.substring = function(U, V) {
					if (V) {
						return this.todo.substring(U, V)
					} else {
						return this.todo.substring(U)
					}
				};
				this.search = function(U) {
					return this.todo.search(U)
				}
			},
			N = new R(I(O)),
			S;
		if (Q(O).substr(0, 1) === "[") {
			S = {
				html: H(N).toString(),
				valid: !P
			}
		} else {
			if (Q(O).substr(0, 1) === "{") {
				S = {
					html: L(N).toString(),
					valid: !P
				}
			} else {
				S = {
					html: N.err("JSON expression must be an object or an array", O).update(null, "").toString(),
					valid: false
				}
			}
		}
		return S
	}
	function j(J) {
		var K = a.val(),
			I = '<link rel="icon" type="image/png" href="/favicon',
			H = '.png" id="favicon"/>';
		if ($.trim(K) === "") {
			r.html("");
			n.html("");
			i.after(I + H).remove();
			w.addClass("json-empty").removeClass("json-error");
			B.html("当前数据为空");
			k.html("&nbsp;");
			return
		}
		//K = unescape(K.replace(/\\u/g,'%u'));

		w.removeClass("json-empty json-error");
		K = K.replace(/</g, "&lt;");
		K = K.replace(/>/g, "&gt;");
		if (l.hasClass("on")) {
			setTimeout(function() {
				var M = E(K),
					N = $(M.html, document),
					L;
				N.find(".p").each(function() {
					if ($(this).closest("li").find("li").length !== 0) {
						$(this).addClass("collapsible")
					}
				});
				r.html(N);
				if (M.valid) {
					i.after(I + H).remove();
					B.html("结果")
				} else {
					i.after(I + "ko" + H).remove();
					L = M.html.match(/class="error"/g).length;
					B.html("字符串解析出:&nbsp;<b>" + L + "&nbsp;错误" + (L > 1 ? "" : "") + ",详细请看黑色部分</b>");
					w.addClass("json-error")
				}
				o.resize()
			}, 0)
		} else {
			r.html("");
			B.html("")
		}
		if (u.hasClass("on")) {
			setTimeout(function() {
				try {
					var L = t($.parseJSON(K)),
						N = $(L, document);
					k.html("JS eval");
					N.find(".p").each(function() {
						if ($(this).closest("li").find("li").length !== 0) {
							$(this).addClass("collapsible")
						}
					});
					n.html(N)
				} catch (M) {
					n.html('<span class="error">' + M + "</span>");
					k.html("JS eval <b>fails</b>");
					w.addClass("json-error")
				}
				o.resize()
			}, 0)
		} else {
			n.html("");
			k.html("")
		}
	}
	if (x.length !== 29) {
		d = null;
		return
	}
	j();
});

 $(document).on("click",".toggle",function() {
		var H = $(this).parent();
		if (H.length == 0) {
			H = $(this).closest(".P")
		}
		H.toggleClass("collapsed");
		return false
	});