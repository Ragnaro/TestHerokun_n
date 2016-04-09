if(!(window.location.hostname == "mega.co.nz" || window.location.hostname == "mega.nz")){
  /**
   * This script is intended to facilitate navigation on certain websites.
   * This skip sites like adfly, linkbucks etc. also on image sites, we try to
   * hide advertising or enlarge the image.
   *
   * Version: 5.49.0
   */
  (function SB_INIT() {
  //5.49.0
  if ( typeof unsafeWindow === "undefined") {
        unsafeWindow = ( function () {
            var dummyElem   = document.createElement('p');
            dummyElem.setAttribute ('onclick', 'return window;');
            return dummyElem.onclick ();
        } ) ();
  };

  function SB_setValue( cookieName, cookieValue, lifeTime ) {
    /*if( !cookieName ) { return; }
    if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
    document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
      ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";*/
  }
  function SB_getValue( cookieName, oDefault ) {
    /*var cookieJar = document.cookie.split( "; " );
    for( var x = 0; x < cookieJar.length; x++ ) {
      var oneCookie = cookieJar[x].split( "=" );
      if( oneCookie[0] == escape( cookieName ) ) {
        try {
          eval('var footm = '+unescape( oneCookie[1] ));
        } catch(e) { return oDefault; }
        return footm;
      }
    }
    return oDefault;*/
  }
  function SB_xmlhttpRequest(details) {
    function setupEvent(xhr, url, eventName, callback) {
      xhr[eventName] = function () {
        var isComplete = xhr.readyState == 4;
        var responseState = {
          responseText: xhr.responseText,
          readyState: xhr.readyState,
          responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
          status: isComplete ? xhr.status : 0,
          statusText: isComplete ? xhr.statusText : "",
          finalUrl: isComplete ? url : ""
        };
        callback(responseState);
      };
    }

    var xhr = new XMLHttpRequest();
    var eventNames = ["onload", "onerror", "onreadystatechange"];
    for (var i = 0; i < eventNames.length; i++ ) {
      var eventName = eventNames[i];
      if (eventName in details) {
        setupEvent(xhr, details.url, eventName, details[eventName]);
      }
    }

    xhr.open(details.method, details.url);

    if (details.overrideMimeType) {
      xhr.overrideMimeType(details.overrideMimeType);
    }
    if (details.headers) {
      for (var header in details.headers) {
        xhr.setRequestHeader(header, details.headers[header]);
      }
    }
    xhr.send(details.data ? details.data : null);
  }

  function SB_getResourceText(name) {
    for (var k in HTM_script.resources) {
      var r = HTM_script.resources[k];
      if (r.name == name) {
        return r.resText;
      }
    }
    return null;
  };

  function SB_addStyle(css) {
    var parent = document.getElementsByTagName("head")[0];
    if (!parent) {
      parent = document.documentElement;
    }
    var style = document.createElement("style");
    style.type = "text/css";
    var textNode = document.createTextNode(css);
    style.appendChild(textNode);
    parent.appendChild(style);
  }

  function SB_getResourceURL(name) {
    for (var k in HTM_script.resources) {
      var r = HTM_script.resources[k];
      if (r.name == name) {
        return r.resURL;
      }
    }
    return null;
  };

  function getRecoverableString(oVar,notFirst) {
    var oType = typeof(oVar);
    if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
      return 'null';
    }
    if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
    if( oType == 'object' ) {
      if( oVar == window ) { return 'window'; }
      if( oVar == document ) { return 'document'; }
      if( oVar == document.body ) { return 'document.body'; }
      if( oVar == document.documentElement ) { return 'document.documentElement'; }
    }
    if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
    if( !notFirst ) {
      Object.prototype.toRecoverableString = function (oBn) {
        if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
        this.tempLockIgnoreMe = true;
        var retVal = '{', sepChar = '', j;
        for( var i in this ) {
          if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
          if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
          j = this[i];
          if( !i.match(basicObPropNameValStr) ) {
            for( var x = 0; x < cleanStrFromAr.length; x++ ) {
              i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
            }
            i = '\''+i+'\'';
          } else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
            i = '\''+i+'\'';
          }
          retVal += sepChar+i+':'+getRecoverableString(j,true);
          sepChar = ',';
        }
        retVal += '}';
        this.tempLockIgnoreMe = false;
        return retVal;
      };
      Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
      Array.prototype.toRecoverableString = function () {
        if( this.tempLock ) { return '[\'LoopBack\']'; }
        if( !this.length ) {
          var oCountProp = 0;
          for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
          if( oCountProp ) { return this.toRecoverableObString(true); }
        }
        this.tempLock = true;
        var retVal = '[';
        for( var i = 0; i < this.length; i++ ) {
          retVal += (i?',':'')+getRecoverableString(this[i],true);
        }
        retVal += ']';
        delete this.tempLock;
        return retVal;
      };
      Boolean.prototype.toRecoverableString = function () {
        return ''+this+'';
      };
      Date.prototype.toRecoverableString = function () {
        return 'new Date('+this.getTime()+')';
      };
      Function.prototype.toRecoverableString = function () {
        return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
      };
      Number.prototype.toRecoverableString = function () {
        if( isNaN(this) ) { return 'Number.NaN'; }
        if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
        if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
        return ''+this+'';
      };
      RegExp.prototype.toRecoverableString = function () {
        return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
      };
      String.prototype.toRecoverableString = function () {
        var oTmp = escape(this);
        if( oTmp == this ) { return '\''+this+'\''; }
        return 'unescape(\''+oTmp+'\')';
      };
    }
    if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
    var oTmp = oVar.toRecoverableString();
    if( !notFirst ) {
      delete Object.prototype.toRecoverableString;
      delete Array.prototype.toRecoverableObString;
      delete Array.prototype.toRecoverableString;
      delete Boolean.prototype.toRecoverableString;
      delete Date.prototype.toRecoverableString;
      delete Function.prototype.toRecoverableString;
      delete Number.prototype.toRecoverableString;
      delete RegExp.prototype.toRecoverableString;
      delete String.prototype.toRecoverableString;
    }
    return oTmp;
  }


  if ( typeof unsafeWindow === "undefined") {
        unsafeWindow = ( function () {
            var dummyElem   = document.createElement('p');
            dummyElem.setAttribute ('onclick', 'return window;');
            return dummyElem.onclick ();
        } ) ();
  };

  function SB_setValue( cookieName, cookieValue, lifeTime ) {
    /*if( !cookieName ) { return; }
    if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
    document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
      ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";*/
  }
  function SB_getValue( cookieName, oDefault ) {
    /*var cookieJar = document.cookie.split( "; " );
    for( var x = 0; x < cookieJar.length; x++ ) {
      var oneCookie = cookieJar[x].split( "=" );
      if( oneCookie[0] == escape( cookieName ) ) {
        try {
          eval('var footm = '+unescape( oneCookie[1] ));
        } catch(e) { return oDefault; }
        return footm;
      }
    }
    return oDefault;*/
  }
  function SB_xmlhttpRequest(details) {
    function setupEvent(xhr, url, eventName, callback) {
      xhr[eventName] = function () {
        var isComplete = xhr.readyState == 4;
        var responseState = {
          responseText: xhr.responseText,
          readyState: xhr.readyState,
          responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
          status: isComplete ? xhr.status : 0,
          statusText: isComplete ? xhr.statusText : "",
          finalUrl: isComplete ? url : ""
        };
        callback(responseState);
      };
    }

    var xhr = new XMLHttpRequest();
    var eventNames = ["onload", "onerror", "onreadystatechange"];
    for (var i = 0; i < eventNames.length; i++ ) {
      var eventName = eventNames[i];
      if (eventName in details) {
        setupEvent(xhr, details.url, eventName, details[eventName]);
      }
    }

    xhr.open(details.method, details.url);

    if (details.overrideMimeType) {
      xhr.overrideMimeType(details.overrideMimeType);
    }
    if (details.headers) {
      for (var header in details.headers) {
        xhr.setRequestHeader(header, details.headers[header]);
      }
    }
    xhr.send(details.data ? details.data : null);
  }

  function SB_getResourceText(name) {
    for (var k in HTM_script.resources) {
      var r = HTM_script.resources[k];
      if (r.name == name) {
        return r.resText;
      }
    }
    return null;
  };

  function SB_addStyle(css) {
    var parent = document.getElementsByTagName("head")[0];
    if (!parent) {
      parent = document.documentElement;
    }
    var style = document.createElement("style");
    style.type = "text/css";
    var textNode = document.createTextNode(css);
    style.appendChild(textNode);
    parent.appendChild(style);
  }

  function SB_getResourceURL(name) {
    for (var k in HTM_script.resources) {
      var r = HTM_script.resources[k];
      if (r.name == name) {
        return r.resURL;
      }
    }
    return null;
  };

  function getRecoverableString(oVar,notFirst) {
    var oType = typeof(oVar);
    if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
      return 'null';
    }
    if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
    if( oType == 'object' ) {
      if( oVar == window ) { return 'window'; }
      if( oVar == document ) { return 'document'; }
      if( oVar == document.body ) { return 'document.body'; }
      if( oVar == document.documentElement ) { return 'document.documentElement'; }
    }
    if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
    if( !notFirst ) {
      Object.prototype.toRecoverableString = function (oBn) {
        if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
        this.tempLockIgnoreMe = true;
        var retVal = '{', sepChar = '', j;
        for( var i in this ) {
          if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
          if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
          j = this[i];
          if( !i.match(basicObPropNameValStr) ) {
            for( var x = 0; x < cleanStrFromAr.length; x++ ) {
              i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
            }
            i = '\''+i+'\'';
          } else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
            i = '\''+i+'\'';
          }
          retVal += sepChar+i+':'+getRecoverableString(j,true);
          sepChar = ',';
        }
        retVal += '}';
        this.tempLockIgnoreMe = false;
        return retVal;
      };
      Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
      Array.prototype.toRecoverableString = function () {
        if( this.tempLock ) { return '[\'LoopBack\']'; }
        if( !this.length ) {
          var oCountProp = 0;
          for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
          if( oCountProp ) { return this.toRecoverableObString(true); }
        }
        this.tempLock = true;
        var retVal = '[';
        for( var i = 0; i < this.length; i++ ) {
          retVal += (i?',':'')+getRecoverableString(this[i],true);
        }
        retVal += ']';
        delete this.tempLock;
        return retVal;
      };
      Boolean.prototype.toRecoverableString = function () {
        return ''+this+'';
      };
      Date.prototype.toRecoverableString = function () {
        return 'new Date('+this.getTime()+')';
      };
      Function.prototype.toRecoverableString = function () {
        return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
      };
      Number.prototype.toRecoverableString = function () {
        if( isNaN(this) ) { return 'Number.NaN'; }
        if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
        if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
        return ''+this+'';
      };
      RegExp.prototype.toRecoverableString = function () {
        return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
      };
      String.prototype.toRecoverableString = function () {
        var oTmp = escape(this);
        if( oTmp == this ) { return '\''+this+'\''; }
        return 'unescape(\''+oTmp+'\')';
      };
    }
    if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
    var oTmp = oVar.toRecoverableString();
    if( !notFirst ) {
      delete Object.prototype.toRecoverableString;
      delete Array.prototype.toRecoverableObString;
      delete Array.prototype.toRecoverableString;
      delete Boolean.prototype.toRecoverableString;
      delete Date.prototype.toRecoverableString;
      delete Function.prototype.toRecoverableString;
      delete Number.prototype.toRecoverableString;
      delete RegExp.prototype.toRecoverableString;
      delete String.prototype.toRecoverableString;
    }
    return oTmp;
  }


  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      var bluebird = require('bluebird');
      module.exports = factory(context, bluebird.Promise);
    } else {
      var P = null;
      if (context.unsafeWindow.Future) {
        P = function (fn) {
          return context.unsafeWindow.Future.call(this, function (fr) {
            fn(fr.resolve.bind(fr), fr.reject.bind(fr));
          });
        };
      } else if (context.PromiseResolver) {
        P = function (fn) {
          return new context.Promise(function (pr) {
            fn(pr.resolve.bind(pr), pr.reject.bind(pr));
          });
        };
      } else {
        P = context.Promise;
      }
      factory(context, P);
    }
  }(this, function (context, Promise) {
    'use strict';
    var _SB = context._SB = {};
    function setupStack () {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else if (!this.hasOwnProperty('stack')) {
        var stack = (new Error()).stack.split('\n').slice(2);
        var e = stack[0].match(/^.*@(.*):(\d*)$/);
        this.fileName = e[1];
        this.lineNumber = parseInt(e[2], 10);
        this.stack = stack.join('\n');
      }
    }
    function SafeBrowseError (message) {
      setupStack.call(this);
      this.message = message;
    }
    SafeBrowseError.prototype = Object.create(Error.prototype);
    SafeBrowseError.prototype.constructor = SafeBrowseError;
    SafeBrowseError.prototype.name = 'SafeBrowseError';
    SafeBrowseError.extend = function (protoProps, staticProps) {
      var parent = this, child = function () {
        setupStack.call(this);
        protoProps.constructor.apply(this, arguments);
      };
      extend(child, parent, staticProps);
      child.prototype = Object.create(parent.prototype);
      extend(child.prototype, protoProps);
      child.prototype.constructor = child;
      child.super = parent.prototype;
      return child;
    };
    SafeBrowseError.super = null;
    _SB.SafeBrowseError = SafeBrowseError;
    function any (c, fn) {
      if (c.some) {
        return c.some(fn);
      }
      if (typeof c.length === 'number') {
        return Array.prototype.some.call(c, fn);
      }
      return Object.keys(c).some(function (k) {
        return fn(c[k], k, c);
      });
    }
    function all (c, fn) {
      if (c.every) {
        return c.every(fn);
      }
      if (typeof c.length === 'number') {
        return Array.prototype.every.call(c, fn);
      }
      return Object.keys(c).every(function (k) {
        return fn(c[k], k, c);
      });
    }
    function each (c, fn) {
      if (c.forEach) {
        c.forEach(fn);
      } else if (typeof c.length === 'number') {
        Array.prototype.forEach.call(c, fn);
      } else {
        Object.keys(c).forEach(function (k) {
          fn(c[k], k, c);
        });
      }
    }
    function map (c, fn) {
      if (c.map) {
        return c.map(fn);
      }
      if (typeof c.length === 'number') {
        return Array.prototype.map.call(c, fn);
      }
      return Object.keys(c).map(function (k) {
        return fn(c[k], k, c);
      });
    }
    function extend(c) {
      Array.prototype.slice.call(arguments, 1).forEach(function (source) {
        if (!source) {
          return;
        }
        _SB.C(source).each(function (v, k) {
          c[k] = v;
        });
      });
      return c;
    }
    function CollectionProxy (collection) {
      this._c = collection;
    }
    CollectionProxy.prototype.size = function () {
      if (typeof this._c.length === 'number') {
        return this._c.length;
      }
      return Object.keys(c).length;
    };
    CollectionProxy.prototype.at = function (k) {
      return this._c[k];
    };
    CollectionProxy.prototype.each = function (fn) {
      each(this._c, fn);
      return this;
    };
    CollectionProxy.prototype.find = function (fn) {
      var result;
      any(this._c, function (value, index, self) {
        var tmp = fn(value, index, self);
        if (tmp !== _SB.none) {
          result = {
            key: index,
            value: value,
            payload: tmp,
          };
          return true;
        }
        return false;
      });
      return result;
    };
    CollectionProxy.prototype.all = function (fn) {
      return all(this._c, fn);
    };
    CollectionProxy.prototype.map = function (fn) {
      return map(this._c, fn);
    };
    _SB.C = function (collection) {
      return new CollectionProxy(collection);
    };
    _SB.T = function (s) {
      if (typeof s === 'string') {
      } else if (s instanceof String) {
        s = s.toString();
      } else {
        throw new SafeBrowseError('template must be a string');
      }
      var T = {
        '{{': '{',
        '}}': '}',
      };
      return function () {
        var args = Array.prototype.slice.call(arguments);
        var kwargs = args[args.length-1];
        return s.replace(/\{\{|\}\}|\{([^\}]+)\}/g, function (m, key) {
          if (T.hasOwnProperty(m)) {
            return T[m];
          }
          if (args.hasOwnProperty(key)) {
            return args[key];
          }
          if (kwargs.hasOwnProperty(key)) {
            return kwargs[key];
          }
          return m;
        });
      };
    };
    _SB.P = function (fn) {
      if (typeof fn !== 'function') {
        throw new _SB.SafeBrowseError('must give a function');
      }
      var slice = Array.prototype.slice;
      var args = slice.call(arguments, 1);
      return function () {
        return fn.apply(this, args.concat(slice.call(arguments)));
      };
    };
    _SB.D = function (fn) {
      return new Promise(fn);
    };
    _SB.parseJSON = function (json) {
      try {
        return JSON.parse(json);
      } catch (e) {
        _SB.warn(e, json);
      }
      return _SB.none;
    };
    _SB.isString = function (value) {
      return (typeof value === 'string') || (value instanceof String);
    };
    _SB.nop = function () {
    };
    _SB.none = _SB.nop;
    _SB.wait = function (msDelay) {
      return _SB.D(function (resolve, reject) {
        setTimeout(resolve, msDelay);
      });
    };
    _SB.try = function (msInterval, fn) {
      return _SB.D(function (resolve, reject) {
        var handle = setInterval(function () {
          var result = fn();
          if (result !== _SB.none) {
            clearInterval(handle);
            resolve(result);
          }
        }, msInterval);
      });
    };
    function log (method, args) {
      if (_SB._quiet) {
        return;
      }
      args = Array.prototype.slice.call(args);
      if (_SB.isString(args[0])) {
        args[0] = 'SafeBrowse: ' + args[0];
      } else {
        args.unshift('SafeBrowse:');
      }
      var f = console[method];
      if (typeof f === 'function') {
        f.apply(console, args);
      }
    }
    _SB._quiet = false;
    _SB.info = function () {
      log('info', arguments);
    };
    _SB.warn = function () {
      log('warn', arguments);
    };
    return _SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context) {
        var core = require('./core.js');
        return factory(context, core);
      };
    } else {
      context.$SB = factory(context, context._);
    }
  }(this, function (context, _) {
    'use strict';
    var window = context.window;
    var document = window.document;
    var DomNotFoundError = _SB.SafeBrowseError.extend({
      name: 'DomNotFoundError',
      constructor: function (selector) {
        DomNotFoundError.super.constructor.call(this, _SB.T('`{0}` not found')(selector));
      },
    });
    var $SB = function (selector, context) {
      if (!context || !context.querySelector) {
        context = document;
      }
      var n = context.querySelector(selector);
      if (!n) {
        throw new DomNotFoundError(selector);
      }
      return n;
    };
    $SB.$SB = function (selector, context) {
      try {
        return $SB(selector, context);
      } catch (e) {
        return null;
      }
    };
    $SB.$SB$SB = function (selector, context) {
      if (!context || !context.querySelectorAll) {
        context = document;
      }
      var ns = context.querySelectorAll(selector);
      return _SB.C(ns);
    };
    $SB.toDOM = function(rawHTML) {
      try {
        var parser = new DOMParser();
        var DOMHTML = parser.parseFromString(rawHTML, "text/html");
        return DOMHTML;
      } catch (e) {
        throw new _SB.SafeBrowseError('could not parse HTML to DOM');
      }
    };
    $SB.removeNodes = function (selector, context) {
      $SB.$SB$SB(selector, context).each(function (e) {
        e.parentNode.removeChild(e);
      });
    };
    function searchScriptsByRegExp (pattern, context) {
      var m = $SB.$SB$SB('script', context).find(function (s) {
        var m = s.innerHTML.match(pattern);
        if (!m) {
          return _SB.none;
        }
        return m;
      });
      if (!m) {
        return null;
      }
      return m.payload;
    }
    function searchScriptsByString (pattern, context) {
      var m = $SB.$SB$SB('script', context).find(function (s) {
        var m = s.innerHTML.indexOf(pattern);
        if (m < 0) {
          return _SB.none;
        }
        return m;
      });
      if (!m) {
        return null;
      }
      return m.value.innerHTML;
    }
    $SB.searchScripts = function (pattern, context) {
      if (pattern instanceof RegExp) {
        return searchScriptsByRegExp(pattern, context);
      } else if (_SB.isString(pattern)) {
        return searchScriptsByString(pattern, context);
      } else {
        return null;
      }
    };
    return $SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context, GM) {
        var core = require('./core.js');
        return factory(context, GM, core);
      };
    } else {
      factory(context, {
        xmlhttpRequest: SB_xmlhttpRequest,
      }, context._);
    }
  }(this, function (context, GM, _) {
    'use strict';
    var window = context.window;
    var document = window.document;
    var $SB = context.$SB || {};
    function deepJoin (prefix, object) {
      return _SB.C(object).map(function (v, k) {
        var key = _SB.T('{0}[{1}]')(prefix, k);
        if (typeof v === 'object') {
          return deepJoin(key, v);
        }
        return _SB.T('{0}={1}').apply(this, [key, v].map(encodeURIComponent));
      }).join('&');
    }
    function toQuery (data) {
      var type = typeof data;
      if (data === null || (type !== 'string' && type !== 'object')) {
        return '';
      }
      if (type === 'string') {
        return data;
      }
      if (data instanceof String) {
        return data.toString();
      }
      return _SB.C(data).map(function (v, k) {
        if (typeof v === 'object') {
          return deepJoin(k, v);
        }
        return _SB.T('{0}={1}').apply(this, [k, v].map(encodeURIComponent));
      }).join('&');
    }
    function ajax (method, url, data, headers) {
      var l = document.createElement('a');
      l.href = url;
      var reqHost = l.hostname;
      var overrideHeaders = {
        Host: reqHost || window.location.host,
        Origin: window.location.origin,
        Referer: window.location.href,
        'X-Requested-With': 'XMLHttpRequest',
      };
      _SB.C(overrideHeaders).each(function (v, k, c) {
        if (headers[k] === _SB.none) {
          delete headers[k];
        } else {
          headers[k] = v;
        }
      });
      if (data) {
        if (headers['Content-Type'].indexOf('json') >= 0) {
          data = JSON.stringify(data);
        } else {
          data = toQuery(data);
        }
        headers['Content-Length'] = data.length;
      }
      var xhr = null;
      var promise = _SB.D(function (resolve, reject) {
        xhr = GM.xmlhttpRequest({
          method: method,
          url: url,
          data: data,
          headers: headers,
          onload: function (response) {
            response = (typeof response.responseText !== 'undefined') ? response : this;
            if (response.status !== 200) {
              reject(response.responseText);
            } else {
              resolve(response.responseText);
            }
          },
          onerror: function (response) {
            response = (typeof response.responseText !== 'undefined') ? response : this;
            reject(response.responseText);
          },
        });
      });
      promise.abort = function () {
        xhr.abort();
      };
      return promise;
    }
    $SB.get = function (url, data, headers) {
      data = toQuery(data);
      data = data ? '?' + data : '';
      headers = headers || {};
      return ajax('GET', url + data, '', headers);
    };
    $SB.post = function (url, data, headers) {
      var h = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      };
      if (headers) {
        _SB.C(headers).each(function (v, k) {
          h[k] = v;
        });
      }
      return ajax('POST', url, data, h);
    };
    return $SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context) {
        var core = require('./core.js');
        return factory(context, core);
      };
    } else {
      factory(context, context._);
    }
  }(this, function (context, _) {
    'use strict';
    var window = context.window;
    var document = window.document;
    var $SB = context.$SB || {};
    $SB.setCookie = function (key, value) {
      var now = new Date();
      now.setTime(now.getTime() + 3600 * 1000);
      var tpl = _SB.T('{0}={1};path={2};');
      document.cookie = tpl(key, value, window.location.pathname, now.toUTCString());
    };
    $SB.getCookie = function (key) {
      var c = _SB.C(document.cookie.split(';')).find(function (v) {
        var k = v.replace(/^\s*([a-zA-Z0-9-_]+)=.+$/, '$1');
        if (k !== key) {
          return _SB.none;
        }
      });
      if (!c) {
        return null;
      }
      c = c.value.replace(/^\s*[a-zA-Z0-9-_]+=([^;]+).?$/, '$1');
      if (!c) {
        return null;
      }
      return c;
    };
    $SB.resetCookies = function () {
      var a = document.domain;
      var b = document.domain.replace(/^www\./, '');
      var c = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, '$2');
      var d = (new Date(1e3)).toUTCString();
      _SB.C(document.cookie.split(';')).each(function (v) {
        var k = v.replace(/^\s*(\w+)=.+$/, '$1');
        document.cookie = _SB.T('{0}=;expires={1};')(k, d);
        document.cookie = _SB.T('{0}=;path=/;expires={1};')(k, d);
        var e = _SB.T('{0}=;path=/;domain={1};expires={2};');
        document.cookie = e(k, a, d);
        document.cookie = e(k, b, d);
        document.cookie = e(k, c, d);
      });
    };
    return $SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context) {
        var core = require('./core.js');
        return factory(context, core);
      };
    } else {
      factory(context, context._);
    }
  }(this, function (context, _) {
    'use strict';
    var window = context.window;
    var document = window.document;
    var $SB = context.$SB || {};
    var patterns = [];
    $SB.register = function (pattern) {
      patterns.push(pattern);
    };
    function dispatchByObject (rule, url_6) {
      var matched = {};
      var passed = _SB.C(rule).all(function (pattern, part) {
        if (pattern instanceof RegExp) {
          matched[part] = url_6[part].match(pattern);
        } else if (pattern instanceof Array) {
          var r = _SB.C(pattern).find(function (p) {
            var m = url_6[part].match(p);
            return m || _SB.none;
          });
          matched[part] = r ? r.payload : null;
        }
        return !!matched[part];
      });
      return passed ? matched : null;
    }
    function dispatchByRegExp (rule, url_1) {
      return url_1.match(rule);
    }
    function dispatchByArray (byLocation, rules, url_1, url_3, url_6) {
      var tmp = _SB.C(rules).find(function (rule) {
        var m = dispatch(byLocation, rule, url_1, url_3, url_6);
        if (!m) {
          return _SB.none;
        }
        return m;
      });
      return tmp ? tmp.payload : null;
    }
    function dispatchByString (rule, url_3) {
      var scheme = /\*|https?|file|ftp|chrome-extension/;
      var host = /\*|(\*\.)?([^\/*]+)/;
      var path = /\/.*/;
      var up = new RegExp(_SB.T('^({scheme})://({host})?({path})$')({
        scheme: scheme.source,
        host: host.source,
        path: path.source,
      }));
      var matched = rule.match(up);
      if (!matched) {
        return null;
      }
      scheme = matched[1];
      host = matched[2];
      var wc = matched[3];
      var sd = matched[4];
      path = matched[5];
      if (scheme === '*' && !/https?/.test(url_3.scheme)) {
        return null;
      } else if (scheme !== url_3.scheme) {
        return null;
      }
      if (scheme !== 'file' && host !== '*') {
        if (wc) {
          up = url_3.host.indexOf(sd);
          if (up < 0 || up + sd.length !== url_3.host.length) {
            return null;
          }
        } else if (host !== url_3.host) {
          return null;
        }
      }
      path = new RegExp(_SB.T('^{0}$')(path.replace(/[*.\[\]?+#]/g, function (c) {
        if (c === '*') {
          return '.*';
        }
        return '\\' + c;
      })));
      if (!path.test(url_3.path)) {
        return null;
      }
      return url_3;
    }
    function dispatchByFunction (rule, url_1, url_3, url_6) {
      return rule(url_1, url_3, url_6);
    }
    function dispatch (byLocation, rule, url_1, url_3, url_6) {
      if (rule instanceof Array) {
        return dispatchByArray(byLocation, rule, url_1, url_3, url_6);
      }
      if (typeof rule === 'function') {
        if (byLocation) {
          return null;
        }
        return dispatchByFunction(rule, url_1, url_3, url_6);
      }
      if (rule instanceof RegExp) {
        return dispatchByRegExp(rule, url_1);
      }
      if (_SB.isString(rule)) {
        return dispatchByString(rule, url_3);
      }
      return dispatchByObject(rule, url_6);
    }
    $SB._findHandler = function (byLocation) {
      var url_1 = window.location.toString();
      var url_3 = {
        scheme: window.location.protocol.slice(0, -1),
        host: window.location.host,
        path: window.location.pathname + window.location.search + window.location.hash,
      };
      var url_6 = {
        scheme: window.location.protocol,
        host: window.location.hostname,
        port: window.location.port,
        path: window.location.pathname,
        query: window.location.search,
        hash: window.location.hash,
      };
      var pattern = _SB.C(patterns).find(function (pattern) {
        var m = dispatch(byLocation, pattern.rule, url_1, url_3, url_6);
        if (!m) {
          return _SB.none;
        }
        return m;
      });
      if (!pattern) {
        return null;
      }
      var matched = pattern.payload;
      pattern = pattern.value;
      if (!pattern.start && !pattern.ready) {
        return null;
      }
      return {
        start: pattern.start ? _SB.P(pattern.start, matched) : _SB.nop,
        ready: pattern.ready ? _SB.P(pattern.ready, matched) : _SB.nop,
      };
    };
    return $SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context) {
        var core = require('./core.js');
        return factory(context, core);
      };
    } else {
      factory(context, context._);
    }
  }(this, function (context, _) {
    'use strict';
    var window = context.window;
    var document = window.document;
    var $SB = context.$SB || {};
    function prepare (e) {
      if (!document.body) {
        document.body = document.createElement('body');
      }
      document.body.appendChild(e);
    }
    function get (url) {
      var a = document.createElement('a');
      a.href = url;
      prepare(a);
      a.click();
    }
    function post (path, params) {
      params = params || {};
      var form = document.createElement('form');
      form.method = 'post';
      form.action = path;
      _SB.C(params).each(function (value, key) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
      });
      prepare(form);
      form.submit();
    }
    $SB.openLink = function (to, options) {
      if (!_SB.isString(to) && !to) {
        _SB.warn('false URL');
        return;
      }
      options = options || {};
      var withReferer = typeof options.referer === 'undefined' ? true : options.referer;
      var postData = options.post;
      var from = window.location.toString();
      _SB.info(_SB.T('{0} -> {1}')(from, to));
      if (postData) {
        post(to, postData);
        return;
      }
      if (withReferer) {
        get(to);
        return;
      }
      window.top.location.replace(to);
    };
    return $SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context) {
        var core = require('./core.js');
        var ajax = require('./ajax.js');
        var $SB = ajax(context);
        return factory(context, core, $SB);
      };
    } else {
      factory(context, context._, context.$SB);
    }
  }(this, function (context, _, $SB) {
    'use strict';
    var window = context.window;
    var unsafeWindow = context.unsafeWindow || (0, eval)('this').window;
    var document = window.document;
    $SB.removeAllTimer = function () {
      var handle = window.setInterval(_SB.nop, 10);
      while (handle > 0) {
        window.clearInterval(handle--);
      }
      handle = window.setTimeout(_SB.nop, 10);
      while (handle > 0) {
        window.clearTimeout(handle--);
      }
    };
    $SB.generateRandomIP = function () {
      return [0,0,0,0].map(function () {
        return Math.floor(Math.random() * 256);
      }).join('.');
    };
    $SB.captcha = function (imgSrc, cb) {
      if (!$SB.config.externalServerSupport) {
        return;
      }
      var a = document.createElement('canvas');
      var b = a.getContext('2d');
      var c = new Image();
      c.src = imgSrc;
      c.onload = function () {
        a.width = c.width;
        a.height = c.height;
        b.drawImage(c, 0, 0);
        var d = a.toDataURL();
        var e = d.substr(d.indexOf(',') + 1);
        $SB.post('http://www.wcpan.info/cgi-bin/captcha.cgi', {
          i: e,
        }, cb);
      };
    };
    function clone (safe) {
      if (safe === null || !(safe instanceof Object)) {
        return safe;
      }
      if (safe instanceof String) {
        return safe.toString();
      }
      if (safe instanceof Function) {
          var injected;
          try {
            injected = exportFunction(safe, unsafeWindow, {
              allowCrossOriginArguments: true,
            });
          } catch(e) {
            console.error(e);
          }
          return injected;

      }
      if (safe instanceof Array) {
        var unsafe = new unsafeWindow.Array();
        for (var i = 0; i < safe.length; ++i) {
          unsafe.push(clone(safe[i]));
        }
        return unsafe;
      }
      var unsafe = new unsafeWindow.Object();
      _SB.C(safe).each(function (v, k) {
        unsafe[k] = clone(v);
      });
      return unsafe;
    }
    var MAGIC_KEY = '__safebrowse_reverse_proxy__';
    $SB.window = (function () {
      var isFirefox = typeof InstallTrigger !== 'undefined';
      if (!isFirefox) {
        return unsafeWindow;
      }
      var decorator = {
        set: function (target, key, value) {
          if (key === MAGIC_KEY) {
            return false;
          }
          if (target === unsafeWindow && key === 'open') {
            var d = Object.getOwnPropertyDescriptor(target, key);
            d.value = clone(value);
            Object.defineProperty(target, key, d);
          } else {
            target[key] = clone(value);
          }
          return true;
        },
        get: function (target, key) {
          if (key === MAGIC_KEY) {
            return target;
          }
          var value = target[key];
          var type = typeof value;
          if (value === null || (type !== 'function' && type !== 'object')) {
            return value;
          }
          return new Proxy(value, decorator);
        },
        apply: function (target, self, args) {
          args = Array.prototype.slice.call(args);
          if (target === unsafeWindow.Object.defineProperty) {
            args[0] = args[0][MAGIC_KEY];
          }
          if (target === unsafeWindow.Function.apply) {
            self = self[MAGIC_KEY];
            args[1] = Array.prototype.slice.call(args[1]);
          }
          if (target === unsafeWindow.document.querySelector) {
            self = self[MAGIC_KEY];
          }
          var usargs = clone(args);
          return target.apply(self, usargs);
        },
        construct: function (target, args) {
          args = Array.prototype.slice.call(args);
          args.unshift(undefined);
          var usargs = clone(args);
          var bind = unsafeWindow.Function.prototype.bind;
          return new (bind.apply(target, usargs));
        },
      };
      return new Proxy(unsafeWindow, decorator);
    })();
    return $SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context, GM) {
        var _SB = require('lodash');
        var core = require('./core.js');
        var misc = require('./misc.js');
        var dispatcher = require('./dispatcher.js');
        var modules = [misc, dispatcher].map(function (v) {
          return v.call(null, context, GM);
        });
        var $SB = _SB.assign.apply(null, modules);
        return factory(context, GM, core, $SB);
      };
    } else {
      factory(context, {
        getValue: SB_getValue,
        setValue: SB_setValue,
      }, context._, context.$SB);
    }
  }(this, function (context, GM, _, $SB) {
    'use strict';
    var window = context.window;
    $SB.config = {
      set version (value) {
        //GM.setValue('version', value);
      },
      get version () {
        return 3;
      },
      set alignCenter (value) {
        //GM.setValue('align_center', value);
      },
      get alignCenter () {
        return true;
      },
      set changeBackground (value) {
        //GM.setValue('change_background', value);
      },
      get changeBackground () {
        return true;
      },
      set externalServerSupport (value) {
        //GM.setValue('external_server_support', value);
      },
      get externalServerSupport () {
        return false;
      },
      set redirectImage (value) {
        //GM.setValue('redirect_image', value);
      },
      get redirectImage () {
        return true;
      },
      set scaleImage (value) {
        //GM.setValue('scale_image', value);
      },
      get scaleImage () {
        return true;
      },
      set logLevel (value) {
        //GM.setValue('log_level', 1 * value);
      },
      get logLevel () {
        return 1;
      },
    };
    fixup($SB.config);
    function fixup (c) {
      var patches = [
        function (c) {
          var ac = typeof c.alignCenter !== 'undefined';
          if (typeof c.changeBackground === 'undefined') {
            c.changeBackground = ac ? c.alignCenter : true;
          }
          if (typeof c.scaleImage === 'undefined') {
            c.scaleImage = ac ? c.alignCenter : true;
          }
          if (!ac) {
            c.alignCenter = true;
          }
          if (typeof c.redirectImage === 'undefined') {
            c.redirectImage = true;
          }
        },
        function (c) {
          if (typeof c.externalServerSupport === 'undefined') {
            c.externalServerSupport = false;
          }
        },
        function (c) {
          if (typeof c.logLevel === 'undefined') {
            c.logLevel = 1;
          }
        },
      ];
      while (c.version < patches.length) {
        patches[c.version](c);
        ++c.version;
      }
    }
    $SB.register({
      rule: {
        host: /^safebrowse\.github\.io$/,
        path: /^\/configure\.html$/,
      },
      ready: function () {
        $SB.window.commit = function (data) {
          data.version = $SB.config.version;
          _SB.C(data).each(function (v, k) {
            $SB.config[k] = v;
          });
          setTimeout(function () {
            save(data);
          }, 0);
        };
        $SB.window.render({
          version: $SB.config.version,
          options: {
            alignCenter: {
              type: 'checkbox',
              value: $SB.config.alignCenter,
              label: 'Align Center',
              help: 'Align image to the center if possible. (default: enabled)',
            },
            changeBackground: {
              type: 'checkbox',
              value: $SB.config.changeBackground,
              label: 'Change Background',
              help: 'Use Firefox-like image background if possible. (default: enabled)',
            },
            redirectImage: {
              type: 'checkbox',
              value: $SB.config.redirectImage,
              label: 'Redirect Image',
              help: [
                'Directly open image link if possible. (default: enabled)',
                'If disabled, redirection will only works on link shortener sites.',
              ].join('<br/>\n'),
            },
            scaleImage: {
              type: 'checkbox',
              value: $SB.config.scaleImage,
              label: 'Scale Image',
              help: 'When image loaded, scale it to fit window if possible. (default: enabled)',
            },
            externalServerSupport: {
              type: 'checkbox',
              value: $SB.config.externalServerSupport,
              label: 'External Server Support',
              help: [
                'Send URL information to external server to enhance features (e.g.: captcha resolving). (default: disabled)',
                'Affected sites:',
                'setlinks.us (captcha)',
              ].join('<br/>\n'),
            },
            logLevel: {
              type: 'select',
              value: $SB.config.logLevel,
              menu: [
                [0, '0 (quiet)'],
                [1, '1 (default)'],
                [2, '2 (verbose)'],
              ],
              label: 'Log Level',
              help: [
                'Log level in developer console. (default: 1)',
                '0 will not print anything in console.',
                '1 will only print logs on affected sites.',
                '2 will print on any sites.',
              ].join('<br/>\n'),
            },
          },
        });
      },
    });
    return $SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context, GM) {
        var _SB = require('lodash');
        var core = require('./core.js');
        var dom = require('./dom.js');
        var config = require('./config.js');
        var link = require('./link.js');
        var misc = require('./misc.js');
        var modules = [dom, config, link, misc].map(function (v) {
          return v.call(null, context, GM);
        });
        var $SB = _SB.assign.apply(_, modules);
        return factory(context, GM, core, $SB);
      };
    } else {
      factory(context, {
        getResourceText: SB_getResourceText,
        addStyle: SB_addStyle,
        getResourceURL: SB_getResourceURL,
      }, context._, context.$SB);
    }
  }(this, function (context, GM, _, $SB) {
    'use strict';
    var window = context.window;
    var document = window.document;
    $SB.openImage = function (imgSrc, options) {
      options = options || {};
      var replace = !!options.replace;
      var referer = !!options.referer;
      if (replace) {
        replaceBody(imgSrc);
        return;
      }
      if ($SB.config.redirectImage) {
        $SB.openLink(imgSrc, {
          referer: referer,
        });
      }
    };
    function enableScrolling () {
      var o = document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
      o.style.overflow = '';
    };
    function toggleShrinking () {
      this.classList.toggle('safebrowse-shrinked');
    }
    function checkScaling () {
      var nw = this.naturalWidth;
      var nh = this.naturalHeight;
      var cw = document.documentElement.clientWidth;
      var ch = document.documentElement.clientHeight;
      if ((nw > cw || nh > ch) && !this.classList.contains('safebrowse-resizable')) {
        this.classList.add('safebrowse-resizable');
        this.classList.add('safebrowse-shrinked');
        this.addEventListener('click', toggleShrinking);
      } else {
        this.removeEventListener('click', toggleShrinking);
        this.classList.remove('safebrowse-shrinked');
        this.classList.remove('safebrowse-resizable');
      }
    }
    function scaleImage (i) {
      var style = GM.getResourceText('scaleImage');
      GM.addStyle(style);
      if (i.naturalWidth && i.naturalHeight) {
        checkScaling.call(i);
      } else {
        i.addEventListener('load', checkScaling);
      }
      var h;
      window.addEventListener('resize', function () {
        window.clearTimeout(h);
        h = window.setTimeout(checkScaling.bind(i), 100);
      });
    }
    function changeBackground () {
      var bgImage = GM.getResourceURL('bgImage');
      document.body.style.backgroundColor = '#222222';
      document.body.style.backgroundImage = _SB.T('url(\'{0}\')')(bgImage);
    }
    function alignCenter () {
      var style = GM.getResourceText('alignCenter');
      GM.addStyle(style);
    }
    function injectStyle (d, i) {
      $SB.removeNodes('style, link[rel=stylesheet]');
      d.id = 'safebrowse-wrapper';
      i.id = 'safebrowse-image';
    }
    function replaceBody (imgSrc) {
      if (!$SB.config.redirectImage) {
        return;
      }
      if (!imgSrc) {
        _SB.warn('false url');
        return;
      }
      _SB.info(_SB.T('replacing body with `{0}` ...')(imgSrc));
      $SB.removeAllTimer();
      enableScrolling();
      document.body = document.createElement('body');
      var d = document.createElement('div');
      document.body.appendChild(d);
      var i = document.createElement('img');
      i.src = imgSrc;
      d.appendChild(i);
      if ($SB.config.alignCenter || $SB.config.scaleImage) {
        injectStyle(d, i);
      }
      if ($SB.config.alignCenter) {
        alignCenter();
      }
      if ($SB.config.changeBackground) {
        changeBackground();
      }
      if ($SB.config.scaleImage) {
        scaleImage(i);
      }
    };
    return $SB;
  }));

  (function (context, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = function (context, GM) {
        var _ = require('lodash');
        var core = require('./core.js');
        var misc = require('./misc.js');
        var dispatcher = require('./dispatcher.js');
        var modules = [misc, dispatcher].map(function (v) {
          return v.call(null, context, GM);
        });
        var $ = _.assign.apply(_, modules);
        return factory(context, GM, core, $);
      };
    } else {
      factory(context, {
      }, context._, context.$);
    }
  }(this, function (context, GM, _, $) {
    'use strict';
    var window = context.window;
    var document = window.document;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    function disableWindowOpen () {
      window.open = _SB.nop;
      window.alert = _SB.nop;
      window.confirm = _SB.nop;
    }
    function disableLeavePrompt (element) {
      if (!element) {
        return;
      }
      var seal = {
        set: function () {
          _SB.info('blocked onbeforeunload');
        },
      };
      element.onbeforeunload = undefined;
      if (isSafari) {
        element.__defineSetter__('onbeforeunload', seal.set);
      } else {
        window.Object.defineProperty(element, 'onbeforeunload', {
          configurable: true,
          enumerable: false,
          get: undefined,
          set: seal.set,
        });
      }
      var oael = element.addEventListener;
      var nael = function (type) {
        if (type === 'beforeunload') {
          _SB.info('blocked addEventListener onbeforeunload');
          return;
        }
        return oael.apply(this, arguments);
      };
      element.addEventListener = nael;
    }
    function changeTitle () {
      document.title += ' - SafeBrowse';
    }
    function beforeDOMReady (handler) {
      _SB.info('working on\n%s \nwith\n%s', window.location.toString(), JSON.stringify($SB.config));
      disableLeavePrompt(window);
      disableWindowOpen();
      handler.start();
    }
    function afterDOMReady (handler) {
      disableLeavePrompt(window.document.body);
      changeTitle();
      handler.ready();
    }
    function waitDOM () {
      return _SB.D(function (resolve, reject) {
        if (document.readyState !== 'loading') {
          resolve();
          return;
        }
        document.addEventListener('DOMContentLoaded', function () {
          resolve();
        });
      });
    }
    $SB._main = function () {
      var findHandler = $SB._findHandler;
      delete $SB._main;
      delete $SB._findHandler;
      if (window.top !== window.self) {
        return;
      }
      var handler = findHandler(true);
      if (handler) {
        if ($SB.config.logLevel <= 0) {
          _SB._quiet = true;
        }
        beforeDOMReady(handler);
        waitDOM().then(function () {
          afterDOMReady(handler);
        });
        return;
      }
      if ($SB.config.logLevel < 2) {
        _SB._quiet = true;
      }
      _SB.info('does not match location on `%s`, will try HTML content', window.location.toString());
      waitDOM().then(function () {
        handler = findHandler(false);
        if (!handler) {
          _SB.info('does not match HTML content on `%s`', window.location.toString());
          return;
        }
        beforeDOMReady(handler);
        afterDOMReady(handler);
      });
    };
    return $SB;
  }));
  $SB._main();
  $SB.register({
    rule: {
      host: /^01\.nl$/,
    },
    ready: function () {
      'use strict';
      var f = $SB('iframe#redirectframe');
      $SB.openLink(f.src);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?1be\.biz$/,
      path: /^\/s\.php$/,
      query: /^\?(.+)/,
    },
    start: function (m) {
      'use strict';
      $SB.openLink(m.query[1]);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?1tiny\.net$/,
      path: /\/\w+/
    },
    ready: function () {
      'use strict';
      var directUrl = $SB.searchScripts(/window\.location='([^']+)';/);
      if (!directUrl) {
        throw new _SB.SafeBrowseError('script content changed');
      }
      $SB.openLink(directUrl[1]);
    },
  });

  $SB.register({
    rule: {
      host: /^2ty\.cc$/,
      path: /^\/.+/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var a = $SB('#close');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?3ra\.be$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var f = window.fc;
      if (!f) {
        throw new _SB.SafeBrowseError('window.fc is undefined');
      }
      f = f.toString();
      f = f.match(/href="([^"]*)/);
      if (!f) {
        throw new _SB.SafeBrowseError('url pattern outdated');
      }
      $SB.openLink(f[1]);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?4fun\.tw$/,
    },
    ready: function () {
      'use strict';
      var i = $SB('#original_url');
      $SB.openLink(i.value);
    },
  });

  $SB.register({
    rule: {
      host: /^ad2links\.com$/,
      path: /^\/\w-.+$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      $SB.openLink(window.location.toString(), {
        post: {
          image: 'Skip Ad.',
        },
      });
    },
  });
  $SB.register({
    rule: {
      host: /^ad4\.fr$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var s = $SB.searchScripts(/"src", "([^"]+)"/);
      if (!s) {
        _SB.warn('changed');
        return;
      }
      $SB.openLink(s[1]);
    },
  });

  (function () {
    'use strict';
    $SB.register({
      rule: {
        host: /^ad7.biz$/,
        path: /^\/\d+\/(.*)$/,
      },
      start: function (m) {
        $SB.removeNodes('iframe');
        var redirectLink = m.path[1];
        if (!redirectLink.match(/^https?:\/\//)) {
          redirectLink = "http://" + redirectLink;
        }
        $SB.openLink(redirectLink);
      },
    });
    $SB.register({
      rule: {
        host: /^ad7.biz$/,
        path: /^\/\w+$/,
      },
      ready: function () {
        $SB.removeNodes('iframe');
        var script = $SB.searchScripts('var r_url');
        var url = script.match(/&url=([^&]+)/);
        url = url[1];
        $SB.openLink(url);
      },
    });
  })();

  $SB.register({
    rule: {
      host: [
        /^(www\.)?adb\.ug$/,
        /^(www\.)?lynk\.my$/,
        /^adyou\.me$/,
      ],
      path: /^(?!\/(?:privacy|terms|contact(\/.*)?|#.*)?$).*$/
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var m = $SB.searchScripts(/top\.location\.href="([^"]+)"/);
      if (m) {
        $SB.openLink(m[1]);
        return;
      }
      m = $SB.searchScripts(/\{_args.+\}/);
      if (!m) {
        throw new _SB.SafeBrowseError('script content changed');
      }
      m = eval('(' + m[0] + ')');
      var url = window.location.pathname + '/skip_timer';
      var i = setInterval(function () {
        $SB.post(url, m).then(function (text) {
          var jj = _SB.parseJSON(text);
          if (!jj.errors && jj.messages) {
            clearInterval(i);
            $SB.openLink(jj.messages.url);
          }
        });
      }, 1000);
    },
  });

  (function () {
    'use strict';
    function getTokenFromRocketScript () {
      var a = $SB.searchScripts(/var eu = '(?!false)(.*)'/);
      return a ? a[1] : null;
    }
    $SB.register({
      rule: {
        path: /\/locked$/,
        query: /url=([^&]+)/,
      },
      start: function (m) {
        $SB.resetCookies();
        var url = decodeURIComponent(m.query[1]);
        if (url.match(/^http/)) {
          $SB.openLink(url);
        } else {
          $SB.openLink('/' + url);
        }
      },
    });
    $SB.register({
      rule: [
        'http://u.shareme.in/*',
        'http://server.sbenny.com/*',
        function () {
          var h = $SB.$SB('html[id="main_html"]');
          var b = $SB.$SB('body[id="home"]');
          if (h && b) {
            return true;
          } else {
            return null;
          }
        },
      ],
      start: function () {
        window.document.write = _SB.nop;
      },
      ready: function () {
        var h = $SB.$SB('#main_html'), b = $SB.$SB('#home');
        if (!h || !b || h.nodeName !== 'HTML' || b.nodeName !== 'BODY') {
          return;
        }
        $SB.removeNodes('iframe');
        window.cookieCheck = _SB.nop;
        h = window.eu || getTokenFromRocketScript();
        if (!h) {
          h = $SB('#adfly_bar');
          window.close_bar();
          return;
        }
        var a = h.indexOf('!HiTommy');
        if (a >= 0) {
          h = h.substring(0, a);
        }
        a = '';
        b = '';
        for (var i = 0; i < h.length; ++i) {
          if (i % 2 === 0) {
            a = a + h.charAt(i);
          } else {
            b = h.charAt(i) + b;
          }
        }
        h = atob(a + b);
        h = h.substr(2);
        if (location.hash) {
          h += location.hash;
        }
        $SB.openLink(h);
      },
    });
  })();

  $SB.register({
    rule: {
      host: /^(www\.)?adfe\.es$/,
      path: /^\/\w+$/,
    },
    ready: function () {
      'use strict';
      var f = $SB('#frmvideo');
      if (!f.STEP4) {
        return;
      }
      f.submit();
    },
  });

  $SB.register({
    rule: 'http://adfoc.us/*',
    ready: function () {
      'use strict';
      var root = document.body;
      var observer = new MutationObserver(function (mutations) {
        var o = $SB.$SB('#showSkip');
        if (o) {
          observer.disconnect();
          o = o.querySelector('a');
          $SB.openLink(o.href);
        }
      });
      observer.observe(root, {
        childList: true,
        subtree: true,
      });
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?adjet\.biz$/,
    },
    ready: function () {
      'use strict';
      var m = $SB.searchScripts(/href=(\S+)/);
      if (!m) {
        throw new _SB.SafeBrowseError('site changed');
      }
      $SB.openLink(m[1]);
    },
  });

  $SB.register({
    rule: {
      host: /^adlock\.org$/,
    },
    ready: function () {
      'use strict';
      var a = $SB.$SB('#xre a.xxr, #downloadButton1');
      if (a) {
        $SB.openLink(a.href);
        return;
      }
      a = window.fileLocation;
      if (a) {
        $SB.openLink(a);
      }
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?adlot\.us$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var script = $SB.searchScripts('form');
      var p = /name='([^']+)' value='([^']+)'/g;
      var opt = {
        image: ' ',
      };
      var tmp = null;
      while (tmp = p.exec(script)) {
        opt[tmp[1]] = tmp[2];
      }
      $SB.openLink('', {
        path: opt,
      });
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?ah-informatique\.com$/,
      path: /^\/ZipUrl/,
    },
    ready: function () {
      'use strict';
      var a = $SB('#zip3 a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^ah\.pe$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var url = window.url;
      $SB.get(url).then(function (url) {
        $SB.openLink(url);
      });
    },
  });
  $SB.register({
    rule: {
      host: /^aka\.gr$/
    },
    ready: function () {
      'use strict';
      var l = $SB('iframe#yourls-frame');
      $SB.openLink(l.src);
    },
  });

  $SB.register({
    rule: {
      host: /^al\.ly$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe, #CashSlideDiv, #ct_catfish');
      var a = $SB('#modal-shadow');
      a.style.display = 'block';
      a = $SB('#modal-alert');
      a.style.left = 0;
      a.style.top = 80;
      a.style.display = 'block';
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?allkeyshop\.com$/,
    },
    ready: function (m) {
      'use strict';
      var matches = $SB.searchScripts(/window\.location\.href = "([^"]+)"/);
      $SB.openLink(matches[1]);
      $SB.removeAllTimer();
    },
  });

  $SB.register({
    rule: {
      host: /^anonymbucks\.com$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('#boton-continuar');
      a.click();
    },
  });

  $SB.register({
    rule: {
      host: [
        /^(awet|sortir)\.in$/,
        /^st\.benfile\.com$/,
        /^st\.azhie\.net$/,
      ],
    },
    ready: function () {
      'use strict';
      var m = $SB.searchScripts(/window\.location="([^"]*)";/);
      $SB.openLink(m[1]);
    },
  });

  (function () {
    'use strict';
    $SB.register({
      rule: {
        host: [
          /^bc\.vc$/,
          /^linc\.ml$/,
        ],
        path: /^.+(https?:\/\/.+)$/,
      },
      start: function (m) {
        $SB.openLink(m.path[1] + document.location.search + document.location.hash);
      },
    });
    function decompress (script, unzip) {
      if (!unzip) {
        return script;
      }
      var matches = script.match(/eval(.*)/);
      matches = matches[1];
      script = eval(matches);
      return script;
    }
    function searchScript (unzip) {
      var content = $SB.searchScripts('make_log');
      if (content) {
        return {
          direct: false,
          script: decompress(content, unzip),
        };
      }
      content = $SB.searchScripts('click_log');
      if (content) {
        return {
          direct: true,
          script: decompress(content, unzip),
        };
      }
      throw _SB.SafeBrowseError('script changed');
    }
    function knockServer (script, dirtyFix) {
      var matches = script.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
      var make_url = matches[1];
      var make_opts = eval('(' + matches[2] + ')');
      var i = setInterval(function () {
        $SB.post(make_url, make_opts).then(function (text) {
          if (dirtyFix) {
            text = text.match(/\{.+\}/)[0];
          }
          var jj = _SB.parseJSON(text);
          if (jj.message) {
            clearInterval(i);
            $SB.openLink(jj.message.url);
          }
        });
      }, 1000);
    }
    function knockServer2 (script) {
      var post = window.$.post;
      window.$.post = function (a, b, c) {
        if (typeof c !== 'function') {
          return;
        }
        setTimeout(function () {
          var data = {
            error: false,
            message: {
              url: '#',
            },
          };
          c(JSON.stringify(data));
        }, 1000);
      };
      var matches = script.match(/\$.post\('([^']*)'[^{]+(\{opt:'make_log'[^}]+\}\}),/i);
      var make_url = matches[1];
      var tZ, cW, cH, sW, sH;
      var make_opts = eval('(' + matches[2] + ')');
      function makeLog () {
          make_opts.opt = 'make_log';
          post(make_url, make_opts, function (text) {
            var data = _SB.parseJSON(text);
            _SB.info('make_log', data);
            if (!data.message) {
              checksLog();
              return;
            }
            $SB.openLink(data.message.url);
          });
      }
      function checkLog () {
        make_opts.opt = 'check_log';
        post(make_url, make_opts, function (text) {
          var data = _SB.parseJSON(text);
          _SB.info('check_log', data);
          if (!data.message) {
            checkLog();
            return;
          }
          makeLog();
        });
      }
      function checksLog () {
        make_opts.opt = 'checks_log';
        post(make_url, make_opts, function () {
          _SB.info('checks_log');
          checkLog();
        });
      }
      checksLog();
    }
    $SB.register({
      rule: {
        host: /^bc\.vc$/,
        path: /^\/.+/,
      },
      ready: function () {
        $SB.removeNodes('iframe');
        var result = searchScript(false);
        if (!result.direct) {
          knockServer2(result.script);
        } else {
          result = result.script.match(/top\.location\.href = '([^']+)'/);
          if (!result) {
            throw new _SB.SafeBrowseError('script changed');
          }
          result = result[1];
          $SB.openLink(result);
        }
      },
    });
    function run (dirtyFix) {
      $SB.removeNodes('iframe');
      var result = searchScript(true);
      if (!result.direct) {
        knockServer(result.script,dirtyFix);
      } else {
        result = result.script.match(/top\.location\.href='([^']+)'/);
        if (!result) {
          throw new _SB.SafeBrowseError('script changed');
        }
        result = result[1];
        $SB.openLink(result);
      }
    }
    $SB.register({
      rule: {
        host: /^adcrun\.ch$/,
        path: /^\/\w+$/,
      },
      ready: function () {
        $SB.removeNodes('.user_content');
        var rSurveyLink = /http\.open\("GET", "api_ajax\.php\?sid=\d*&ip=[^&]*&longurl=([^"]+)" \+ first_time, (?:true|false)\);/;
        var l = $SB.searchScripts(rSurveyLink);
        if (l) {
          $SB.openLink(l[1]);
          return;
        }
        run(true);
      },
    });
    $SB.register({
      rule: {
        host: [
          /^1tk\.us$/,
          /^gx\.si$/,
          /^adwat\.ch$/,
          /^(fly2url|urlwiz|xafox)\.com$/,
          /^(zpoz|ultry)\.net$/,
          /^(wwy|myam)\.me$/,
          /^ssl\.gs$/,
          /^lin(c\.ml|k\.tl)$/,
          /^hit\.us$/,
          /^shortit\.in$/,
          /^(adbla|tl7)\.us$/,
          /^www\.adjet\.eu$/,
          /^srk\.gs$/,
          /^cun\.bz$/,
          /^miniurl\.tk$/,
          /^vizzy\.es$/,
          /^kazan\.vc$/,
        ],
        path: /^\/.+/,
      },
      ready: run,
    });
    $SB.register({
      rule: {
        host: /^adtr\.im|ysear\.ch|xip\.ir$/,
        path: /^\/.+/,
      },
      ready: function () {
        var a = $SB.$SB('div.fly_head a.close');
        var f = $SB.$SB('iframe.fly_frame');
        if (a && f) {
          $SB.openLink(f.src);
        } else {
          run();
        }
      },
    });
    $SB.register({
      rule: {
        host: /^ad5\.eu$/,
        path: /^\/[^.]+$/,
      },
      ready: function() {
        $SB.removeNodes('iframe');
        var s = searchScript(true);
        var m = s.script.match(/(<form name="form1"method="post".*(?!<\\form>)<\/form>)/);
        if (!m) {return;}
        m = m[1];
        var tz = -(new Date().getTimezoneOffset()/60);
        m = m.replace("'+timezone+'",tz);
        var d = document.createElement('div');
        d.setAttribute('id','AdsBypasserFTW');
        d.setAttribute('style', 'display:none;');
        d.innerHTML = m;
        document.body.appendChild(d);
        $SB('#SafeBrowseFTW > form[name=form1]').submit();
      },
    });
    $SB.register({
      rule: {
        host: /^tr5\.in$/,
        path: /^\/.+/,
      },
      ready: function () {
        run(true);
      },
    });
  })();

  $SB.register({
    rule: {
      host: /^(www\.)?biglistofwebsites\.com$/,
      path: /^\/go\/(\w+\.\w+)$/
    },
    start: function (m) {
      'use strict';
      $SB.openLink('http://' + m.path[1]);
    },
  });

  $SB.register({
    rule: 'http://www.bild.me/bild.php?file=*',
    ready: function () {
      'use strict';
      var i = $SB('#Bild');
      $SB.openLink(i.src);
    },
  });

  $SB.register({
    rule: 'http://bildr.no/view/*',
    ready: function () {
      'use strict';
      var i = $SB('img.bilde');
      $SB.openLink(i.src);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?([a-zA-Z0-9]+\.)?binbox\.io$/,
      path: /\/o\/([a-zA-Z0-9]+)/,
    },
    start: function (m) {
      'use strict';
      var direct_link = window.atob(m.path[1]);
      $SB.openLink(direct_link);
    },
  });
  (function () {
    'use strict';
    function hostMapper (host) {
      switch (host) {
      case 'bk-ddl.net':
      case 'disingkat.in':
        return function () {
          var a = $SB('a.btn-block.redirect');
          return a.href;
        };
      case 'link.animagz.org':
        return function () {
          var a = $SB('a.redirect');
          a = a.onclick.toString();
          a = a.match(/window\.open \('([^']+)'\)/);
          return a[1];
        };
      case 'coeg.in':
        return function () {
          var a = $SB('.link a');
          return a.href;
        };
      default:
        return null;
      }
    }
  $SB.register({
    rule: {
        host: [
          /^bk-ddl\.net$/,
          /^link\.animagz\.org$/,
          /^coeg\.in$/,
          /^disingkat\.in$/,
        ],
      path: /^\/\w+$/,
    },
    ready: function (m) {
        var mapper = hostMapper(m.host[0]);
        var b64 = mapper().match(/\?r=(\w+={0,2}?)/);
      $SB.openLink(atob(b64[1]));
    },
  });
  })();
  $SB.register({
    rule: {
      host: /^(www\.)?boxcash\.net$/,
      path: /^\/[\w~]+$/,
    },
    ready: function () {
      'use strict';
      var m = $SB.searchScripts(/\'\/ajax_link\.php\',\s*\{key:\s*'(\w+)',\s*url:\s*'(\d+)',\s*t:\s*'(\d+)',\s*r:\s*'(\w*)'\}/);
      if (!m) {
        return;
      }
      $SB.post('/ajax_link.php', {
        key: m[1],
        url: m[2],
        t: m[3],
        r: m[4],
      }).then(function (response) {
        var l = response.match(/window(?:.top.window)\.location="([^"]+)"/);
        $SB.openLink(l[1]);
      });
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?boxcash\.net$/,
      path: /^\/redirect\.html$/,
      query: /url=(.+)$/,
    },
    start: function (m) {
      'use strict';
      var l = decodeURIComponent(m.query[1]);
      $SB.openLink(l);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?(buz|vzt)url\.com$/,
    },
    ready: function () {
      'use strict';
      var frame = $SB('frame[scrolling=yes]');
      $SB.openLink(frame.src);
    },
  });

  $SB.register({
    rule: {
      host: /^(cf|ex|xt)\d\.(me|co)$/,
    },
    ready: function (m) {
      'use strict';
      $SB.removeNodes('iframe');
      var a = $SB('#skip_button');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^cf\.ly$/,
      path: /^\/[^\/]+$/,
    },
    start: function (m) {
      'use strict';
      $SB.removeNodes('iframe');
      $SB.openLink('/skip' + m.path[0]);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?cli\.gs$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('a.RedirectLink');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?clictune\.com$/,
      path: /^\/id=\d+/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var matches = $SB.searchScripts(/<a href="http:\/\/(?:www.)?clictune\.com\/redirect\.php\?url=([^&]+)&/);
      var url = decodeURIComponent(matches[1]);
      $SB.openLink(url);
    },
  });

  $SB.register({
    rule: {
      host: /^clk\.im$/,
    },
    ready: function (m) {
      'use strict';
      $SB.removeNodes('iframe');
      var matches = $SB.searchScripts(/\$\("\.countdown"\)\.attr\("href","([^"]+)"\)/);
      $SB.openLink(matches[1]);
    },
  });

  $SB.register({
    rule: {
      host: /^(?:(\w+)\.)?(coinurl\.com|cur\.lv)$/,
      path: /^\/([-\w]+)$/
    },
    ready: function (m) {
      'use strict';
      $SB.removeNodes('iframe');
      var host = 'http://cur.lv/redirect_curlv.php';
      var param = m.host[1] === undefined ? {
        code: m.path[1],
      } : {
        zone: m.host[1],
        name: m.path[1],
      };
      $SB.get(host, param).then(function(mainFrameContent) {
        try {
          var docMainFrame = $SB.toDOM(mainFrameContent);
        } catch (e) {
          throw new _SB.SafeBrowseError('main frame changed');
        }
        var rExtractLink = /onclick="open_url\('([^']+)',\s*'go'\)/;
        var innerFrames = $SB.$SB$SB('iframe', docMainFrame).each(function (currFrame) {
          var currFrameAddr = currFrame.getAttribute('src');
          $SB.get(currFrameAddr).then(function(currFrameContent) {
            var aRealLink = rExtractLink.exec(currFrameContent);
            if (aRealLink === undefined || aRealLink[1] === undefined) {
              return;
            }
            var realLink = aRealLink[1];
            $SB.openLink(realLink);
          });
        });
      });
    },
  });

  $SB.register({
    rule: {
      host: /^comyonet\.com$/,
    },
    ready: function () {
      'use strict';
      var input = $SB('input[name="enter"]');
      input.click();
    },
  });
  $SB.register({
    rule: {
      host: /^www\.cuzle\.com$/,
      path: /^\/$/,
      query: /^\?(.+)=$/,
    },
    start: function (m) {
      'use strict';
      var url = atob(m.query[1]);
      $SB.openLink(url);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?cvc\.la$/,
      path: /^\/\w+$/,
    },
    start: function () {
      'use strict';
      $SB.post(document.location.href, {
        hidden: 24,
        image: ' ',
      }).then(function (text) {
        var matches = text.match(/window\.location\.replace\('([^']+)'\);/);
        $SB.openLink(matches[1]);
      });
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?dapat\.in$/,
    },
    ready: function () {
      'use strict';
      var f = $SB('iframe[name=pagetext]');
      $SB.openLink(f.src);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?dd\.ma$/,
    },
    ready: function (m) {
      'use strict';
      var i = $SB.$SB('#mainframe');
      if (i) {
        $SB.openLink(i.src);
        return;
      }
      var a = $SB('#btn_open a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?dereferer\.website$/,
      query: /^\?(.+)/,
    },
    start: function (m) {
      'use strict';
      $SB.openLink(m.query[1]);
    },
  });
  $SB.register({
    rule: {
      host: /^www\.dewaurl\.com$/,
    },
    ready: function () {
      'use strict';
      var f = $SB('.framedRedirectTopFrame');
      $SB.get(f.src).then(function (html) {
        html = $SB.toDOM(html);
        var a = $SB('#continueButton > a', html);
        $SB.openLink(a.href);
      }).catch(function (e) {
        _SB.warn(e);
      });
    },
  });

  $SB.register({
    rule: {
      host: /^dikit\.in$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var a = $SB('.disclaimer a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: 'http://www.dumppix.com/viewer.php?*',
    ready: function () {
      'use strict';
      var i = $SB.$SB('#boring');
      if (i) {
        $SB.openLink(i.src);
        return;
      }
      i = $SB('table td:nth-child(1) a');
      $SB.openLink(i.href);
    },
  });

  $SB.register({
    rule: {
      host: /^durl\.me$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('a[class="proceedBtn"]');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /easyurl\.net|(atu|clickthru|redirects|readthis)\.ca|goshrink\.com$/,
    },
    ready: function () {
      'use strict';
      var f = $SB('frame[name=main]');
      $SB.openLink(f.src);
    },
  });

  $SB.register({
    rule: {
      host: /empireload\.com$/,
      path: /^\/plugin\.php$/,
      query: /^\?id=linkout&url=([^&]+)$/,
    },
    start: function (m) {
      $SB.openLink(m.query[1]);
    },
  });

  $SB.register({
    rule: {
      host: [
        /^ethi\.in$/,
        /^st\.wardhanime\.net$/,
      ],
      path: /^\/i\/\d+$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('#wrapper > [class^="tombo"] > a[target="_blank"]');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?filoops.info$/
    },
    ready: function () {
      'use strict';
      var a = $SB('#text > center a, #text > div[align=center] a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^fit\.sh$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('.container-body');
      var m = $SB.searchScripts(/token="([^"]+)"/);
      if (!m) {
        throw new _SB.SafeBrowseError('site changed');
      }
      m = m[1];
      var interLink = '/go/' + m + '?fa=15466&a=' + window.location.hash.substr(1);
      setTimeout(function () {
        $SB.openLink(interLink);
      }, 6000);
    },
  });

  $SB.register({
    rule: {
      host: /^www\.forbes\.com$/,
    },
    ready: function () {
      'use strict';
      var o = window.ox_zones;
      if (o) {
        $SB.openLink(o.page_url);
      }
    },
  });
  $SB.register({
    rule: {
      host: /^www\.free-tv-video-online\.info$/,
      path: /^\/interstitial2\.html$/,
      query: /lnk=([^&]+)/,
    },
    start: function (m) {
      'use strict';
      var url = decodeURIComponent(m.query[1]);
      $SB.openLink(url);
    },
  });

  (function () {
    'use strict';
    $SB.register({
      rule: {
        host: /^(www\.)?fundurl\.com$/,
        query: /i=([^&]+)/,
      },
      start: function (m) {
        $SB.openLink(m.query[1]);
      },
    });
    $SB.register({
      rule: {
        host: /^(www\.)?fundurl\.com$/,
        path: /^\/(go-\w+|load\.php)$/,
      },
      ready: function () {
        var f = $SB('iframe[name=fpage3]');
        $SB.openLink(f.src);
      },
    });
  })();

  (function () {
    var hosts = /^gca\.sh|repla\.cr$/;
    $SB.register({
      rule: {
        host: hosts,
        path: /^\/adv\/\w+\/(.*)$/,
        query: /^(.*)$/,
        hash: /^(.*)$/,
      },
      start: function (m) {
        'use strict';
        var l = m.path[1] + m.query[1] + m.hash[1];
        $SB.openLink(l);
      },
    });
    $SB.register({
      rule: {
        host: hosts,
      },
      ready: function () {
        'use strict';
        $SB.removeNodes('iframe');
        var jQuery = window.$;
        setTimeout(function () {
          jQuery("#captcha-dialog").dialog("open");
        }, 1000);
      },
    });
  })();

  $SB.register({
    rule: {
      host: /^gkurl\.us$/,
    },
    ready: function () {
      'use strict';
      var iframe = $SB('#gkurl-frame');
      $SB.openLink(iframe.src);
    },
  });

  $SB.register({
    rule: {
      host: /^u\.go2\.me$/,
    },
    ready: function () {
      'use strict';
      var iframe = $SB('iframe');
      $SB.openLink(iframe.src);
    },
  });

  $SB.register({
    rule: {
      host: /^hotshorturl\.com$/,
    },
    ready: function () {
      'use strict';
      var frame = $SB('frame[scrolling=yes]');
      $SB.openLink(frame.src);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?(ilix\.in|priva\.us)$/,
      path: /\/(\w+)/,
    },
    ready: function (m) {
      'use strict';
      var realHost = 'ilix.in';
      if (m.host[2] !== realHost) {
        var realURL = location.href.replace(m.host[2], realHost);
        $SB.openLink(realURL);
        return;
      }
      var f = $SB.$SB('iframe[name=ifram]');
      if (f) {
        $SB.openLink(f.src);
        return;
      }
      if (!$SB.$SB('img#captcha')) {
        $SB('form[name=frm]').submit();
      }
    },
  });

  $SB.register({
    rule: {
      host: /^itw\.me$/,
      path: /^\/r\//,
    },
    ready: function () {
      'use strict';
      var f = $SB('.go-form');
      f.submit();
    },
  });
  $SB.register({
    rule: {
      host: /^ity\.im$/,
    },
    ready: function () {
      'use strict';
      var f = $SB.$SB('#main');
      if (f) {
        $SB.openLink(f.src);
        return;
      }
      f = $SB.$SB$SB('frame').find(function (frame) {
        if (frame.src.indexOf('interheader.php') < 0) {
          return _SB.none;
        }
        return frame.src;
      });
      if (f) {
        $SB.openLink(f.payload);
        return;
      }
      f = $SB.searchScripts(/krypted=([^&]+)/);
      if (!f) {
        throw new _SB.SafeBrowseError('site changed');
      }
      f = f[1];
      var data = window.des('ksnslmtmk0v4Pdviusajqu', window.hexToString(f), 0, 0);
      if (data) {
        $SB.openLink('http://ity.im/1104_21_50846_' + data);
      }
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?kingofshrink\.com$/,
    },
    ready: function () {
      'use strict';
      var l = $SB('#textresult > a');
      $SB.openLink(l.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?leechbd\.tk$/,
      path: /^\/Shortener\/(\w+)$/,
    },
    start: function (m) {
      'use strict';
      $SB.get('/Shortener/API/read/get', {id: m.path[1], type: 'json'}).then(function (text) {
        var r = _SB.parseJSON(text);
        if (r.success == true && r.data.full) {
          $SB.openLink(r.data.full);
        } else {
          _SB.warn('API Error ' + r.error.code + ' : ' + r.error.msg);
        }
      });
    },
  });

  $SB.register({
    rule: 'http://www.lienscash.com/l/*',
    ready: function () {
      'use strict';
      var a = $SB('#redir_btn');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?\w+\.link-protector\.com$/,
    },
    ready: function (m) {
      'use strict';
      var f = $SB('form[style="font-weight:normal;font-size:12;font-family:Verdana;"]');
      $SB.openLink(f.action);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?link\.im$/,
      path: /^\/\w+$/,
    },
    start: function () {
      'use strict';
      $SB.post(document.location.href, {
        image: 'Continue',
      }).then(function (text) {
        var m = text.match(/window\.location\.replace\('([^']+)'\)/);
        $SB.openLink(m[1]);
      });
    },
  });

  $SB.register({
    rule: {
      host: /\.link2dollar\.com$/,
      path: /^\/\d+$/,
    },
    ready: function () {
      'use strict';
      var m = $SB.searchScripts(/var rlink = '([^']+)';/);
      if (!m) {
        throw new _SB.SafeBrowseError('site changed');
      }
      m = m[1];
      $SB.openLink(m);
    },
  });

  $SB.register({
    rule: {
      host: /^link2you\.ru$/,
      path: /^\/\d+\/(.+)$/,
    },
    start: function (m) {
      'use strict';
      var url = m.path[1];
      if (!url.match(/^https?:\/\//)) {
        url = '//' + url;
      }
      $SB.openLink(url);
    },
  });
  $SB.register({
    rule: {
      host: /^link(4ad|ajc)\.com$/,
      path: /^\/(.+)$/,
    },
    ready: function (m) {
      'use strict';
      var d = $SB('div[id^=module_]');
      d = d.id.match(/module_(\d+)/);
      d = d[1];
      $SB.post('form.php?block_id=' + d, {
        cmd: 'get_source',
        act: 'waiting',
        id: m.path[1],
      }).then(function (url) {
        $SB.openLink(url);
      }).catch(function (e) {
        _SB.warn(e);
      });
    },
  });
  (function () {
    'use strict';
    function sendRequest (opts) {
      return $SB.post('/ajax/r.php', opts).then(function (data) {
        if (data.length <= 1) {
          return sendRequest(opts);
        }
        var a = $SB.toDOM(data);
        a = $SB('a', a);
        return a.href;
      });
    }
    $SB.register({
      rule: {
        host: /^link5s\.com$/,
        path: /^\/([^\/]+)$/,
      },
      ready: function (m) {
        window.$ = null;
        var i = $SB('#iframeID');
        var opts = {
          page: m.path[1],
          advID: i.dataset.cmp,
          u: i.dataset.u,
        };
        $SB.removeNodes('iframe');
        sendRequest(opts).then(function (url) {
          $SB.openLink(url);
        });
      },
    });
  })();
  $SB.register({
    rule: {
      host: /^www\.linkarus\.com$/,
      path: /^\/skip\//,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var m = $SB.searchScripts(/action="([^"]+)"/);
      m = m[1];
      $SB.openLink(m);
    },
  });
  $SB.register({
    rule: {
      host: /^www\.linkarus\.com$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var m = $SB.searchScripts(/var counter = (\d+);/);
      m = parseInt(m[1], 10);
      m = m * 1000 + 500;
      _SB.wait(m).then(function () {
        var a = $SB('#skip-ad');
        $SB.openLink(a.href);
      });
    },
  });
  (function() {
    function ConvertFromHex (str) {
      var result = [];
      while (str.length >= 2) {
        result.push(String.fromCharCode(parseInt(str.substring(0, 2), 16)));
        str = str.substring(2, str.length);
      }
      return result.join("");
    }
    var Encode = function (str) {
      var s = [], j = 0, x, res = '', k = arguments.callee.toString().replace(/\s+/g, "");
      for (var i = 0; i < 256; i++) {
        s[i] = i;
      }
      for (i = 0; i < 256; i++) {
        j = (j + s[i] + k.charCodeAt(i % k.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
      }
      i = 0;
      j = 0;
      for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
      }
      return res;
    };
    var hostRules = [
      /^(([\w]{8}|www)\.)?(allanalpass|cash4files|drstickyfingers|fapoff|freegaysitepass|(gone|tube)viral|(pic|tna)bucks|whackyvidz|fuestfka)\.com$/,
      /^(([\w]{8}|www)\.)?(a[mn]y|deb|dyo|sexpalace)\.gs$/,
      /^(([\w]{8}|www)\.)?(filesonthe|poontown|seriousdeals|ultrafiles|urlbeat|eafyfsuh|sasontnwc|zatnawqy)\.net$/,
      /^(([\w]{8}|www)\.)?freean\.us$/,
      /^(([\w]{8}|www)\.)?galleries\.bz$/,
      /^(([\w]{8}|www)\.)?hornywood\.tv$/,
      /^(([\w]{8}|www)\.)?link(babes|bucks)\.com$/,
      /^(([\w]{8}|www)\.)?(megaline|miniurls|qqc|rqq|tinylinks|yyv|zff)\.co$/,
      /^(([\w]{8}|www)\.)?(these(blog|forum)s)\.com$/,
      /^(([\w]{8}|www)\.)?youfap\.me$/,
      /^warning-this-linkcode-will-cease-working-soon\.www\.linkbucksdns\.com$/,
    ];
    (function () {
      'use strict';
      function findToken (context) {
        var script = $SB.searchScripts('    var f = window[\'init\' + \'Lb\' + \'js\' + \'\']', context);
        if (!script) {
          _SB.warn('pattern changed');
          return null;
        }
        var adurl = script.match(/AdUrl\s*:\s*'([^']+)'/);
        if (!adurl) {
          return null;
        }
        adurl = adurl[1];
        var m1 = script.match(/AdPopUrl\s*:\s*'.+\?[^=]+=([\w\d]+)'/);
        var m2 = script.match(/Token\s*:\s*'([\w\d]+)'/);
        var token = m1[1] || m2[1];
        var m = script.match(/=\s*(\d+);/);
        var ak = parseInt(m[1], 10);
        var re = /\+\s*(\d+);/g;
        var tmp = null;
        while((m = re.exec(script)) !== null) {
          tmp = m[1];
      }
        ak += parseInt(tmp, 10);
        return {
          t: token,
          aK: ak,
          adurl: adurl,
        };
      }
      function sendRequest (token) {
        $SB.get(token.adurl);
        delete token.adurl;
        token.a_b = false;
        _SB.info('waiting the interval');
        return _SB.wait(5000).then(function () {
          _SB.info('sending token: %o', token);
          return $SB.get('/intermission/loadTargetUrl', token, {
            'X-Requested-With': _SB.none,
            Origin: _SB.none,
          });
        }).then(function (text) {
          var data = _SB.parseJSON(text);
          _SB.info('response: %o', data);
          if (!data.Success && data.Errors[0] === 'Invalid token') {
            _SB.warn('got invalid token');
            return retry();
          }
          if (data.AdBlockSpotted) {
            _SB.warn('adblock spotted');
            return;
            }
          if (data.Success && !data.AdBlockSpotted && data.Url) {
            return data.Url;
          }
          });
      }
      function retry () {
        return $SB.get(window.location.toString(), {}, {
          'X-Forwarded-For': $SB.generateRandomIP(),
        }).then(function (text) {
          var d = $SB.toDOM(text);
          var t = findToken(d);
          if (!t) {
            return _SB.wait(1000).then(retry);
            }
          return sendRequest(t);
          });
      }
      $SB.register({
        rule: {
          host: hostRules,
          path: /^\/\w+\/url\/(.+)$/,
        },
        ready: function(m) {
          $SB.removeAllTimer();
          $SB.resetCookies();
          $SB.removeNodes('iframe');
          var url = m.path[1] + window.location.search;
          var match = $SB.searchScripts(/UrlEncoded: ([^,]+)/);
          if (match && match[1] === 'true') {
            url = Encode(ConvertFromHex(url));
          }
          $SB.openLink(url);
        }
      });
      $SB.register({
        rule: {
          host: hostRules,
        },
        start: function () {
          //window.XMLHttpRequest = _SB.nop;
        },
        ready: function () {
          $SB.removeAllTimer();
          $SB.resetCookies();
          $SB.removeNodes('iframe');
          if (window.location.pathname.indexOf('verify') >= 0) {
            var path = window.location.pathname.replace('/verify', '');
            $SB.openLink(path);
            return;
          }
          var token = findToken(document);
          sendRequest(token).then(function (url) {
            $SB.openLink(url);
          });
        },
      });
      $SB.register({
        rule: {
          query: /^(.*)[?&]_lbGate=\d+$/,
        },
        start: function (m) {
          $SB.setCookie('_lbGatePassed', 'true');
          $SB.openLink(window.location.pathname + m.query[1]);
        },
      });
    })();
  })();

  $SB.register({
    rule: {
      host: [
        /^www\.linkdecode\.com$/,
        /^www\.fastdecode\.com$/,
      ],
      path: /^\/$/,
      query: /^\?(.+)$/,
    },
    ready: function (m) {
      'use strict';
      $SB.removeNodes('iframe');
      var lnk = m.query[1];
      if (m.query[1].match(/^https?:\/\//)) {
        $SB.openLink(lnk);
        return;
      }
      var b = $SB.$SB('#popup');
      if (b && b.href) {
        $SB.openLink(b.href);
        return;
      }
      b = $SB('#m > .Visit_Link');
      b = b.onclick.toString().match(/window\.open\(\'([^']+)\'/);
      if (!b) {
        throw new _SB.SafeBrowse('pattern changed');
      }
      lnk = b[1].match(/\?(https?:\/\/.*)$/);
      if (lnk) {
          $SB.openLink(lnk[1]);
          return;
      }
      $SB.openLink(b[1]);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?linkdrop\.net$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var matches = $SB.searchScripts(/\$\("a\.redirect"\)\.attr\("href","([^"]+)"\)\.text/);
      if (!matches) {
          return;
      }
      var l = matches[1];
      $SB.openLink(l);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?linkplugapp\.com$/,
    },
    ready: function () {
      'use strict'
      var a = $SB('#mc_embed_signup_scroll a')
      $SB.openLink(a.href)
    },
  })
  $SB.register({
    rule: {
      host: /^linksas\.us$/,
      path: /^(\/\w+)$/,
    },
    ready: function (m) {
      'use strict';
      _SB.try(1000, function () {
        var recaptcha = $SB('#g-recaptcha-response');
        if (!recaptcha) {
          return null;
        }
        if (!recaptcha.value) {
          return _SB.none;
        }
        return recaptcha.value;
      }).then(function (recaptcha) {
        var url = _SB.T('http://ipinfo.io/{0}/json')($SB.generateRandomIP());
        return $SB.get(url).then(function (ipinfo) {
          ipinfo = _SB.parseJSON(ipinfo);
          return {
            codeAds: 1,
            country: ipinfo.country,
            ipAddress: ipinfo.ip,
            recaptcha: recaptcha,
          };
        });
      }).then(function (payload) {
        var token = $SB.getCookie('XSRF-TOKEN');
        return $SB.post('/go' + m.path[1], payload, {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token,
        });
      }).then(function (data) {
        data = _SB.parseJSON(data);
        $SB.openLink(data.message);
      }).catch(function (e) {
        _SB.warn(e);
      });
    },
  });
  $SB.register({
    rule: {
      host: /^linksas\.us$/,
      path: /^\/go\//,
    },
    ready: function () {
      'use strict';
      var a = $SB.$SB('#btnSubmit');
      if (!a) {
        return;
      }
      var url = a.href;
      var pattern = /https?:\/\//g;
      var lastURL = '';
      while (true) {
        var matched = pattern.exec(url);
        if (!matched) {
          break;
        }
        lastURL = matched + url.substring(pattern.lastIndex);
      }
      $SB.openLink(lastURL);
    },
  });
  $SB.register({
    rule: {
      host: /^linkshrink\.net$/,
      path: /^\/[a-zA-Z0-9]+$/,
    },
    start: function () {
      'use strict';
      window._impspcabe = 0;
    },
    ready: function () {
      'use strict';
      var l = $SB('#skip .bt');
      $SB.openLink(l.href);
    },
  });
  $SB.register({
    rule: {
      host: /^linkshrink\.net$/,
      path: /=(.+)$/,
    },
    start: function (m) {
      'use strict';
      $SB.openLink(m.path[1]);
    },
  });

  $SB.register({
    rule: 'http://lix.in/-*',
    ready: function () {
      'use strict';
      var i = $SB.$SB('#ibdc');
      if (i) {
        return;
      }
      i = $SB.$SB('form');
      if (i) {
        i.submit();
        return;
      }
      i = $SB('iframe');
      $SB.openLink(i.src);
    },
  });

  $SB.register({
    rule: {
      host: /^lnk\.in$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('#divRedirectText a');
      $SB.openLink(a.innerHTML);
    },
  });

  $SB.register({
    rule: {
      host: /^(rd?)lnk\.co|reducelnk\.com$/,
      path: /^\/[^.]+$/,
    },
    ready: function () {
      'use strict';
      var f = $SB.$SB('iframe#dest');
      if (f) {
        $SB.openLink(f.src);
        return;
      }
      $SB.removeNodes('iframe');
      var o = $SB.$SB('#urlholder');
      if (o) {
        $SB.openLink(o.value);
        return;
      }
      o = $SB.$SB('#skipBtn');
      if (o) {
        o = o.querySelector('a');
        $SB.openLink(o.href);
        return;
      }
      o = document.title.replace(/(LNK.co|Linkbee)\s*:\s*/, '');
      $SB.openLink(o);
    },
  });

  $SB.register({
    rule: {
      host: /^lnx\.lu|url\.fm|z\.gs$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('#clickbtn a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?loook\.ga$/,
      path: /^\/\d+$/
    },
    ready: function (m) {
      'use strict';
      var a = $SB('#download_link > a.btn');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: [
      'http://madlink.sk/',
      'http://madlink.sk/*.html',
    ],
  });
  $SB.register({
    rule: 'http://madlink.sk/*',
    start: function (m) {
      'use strict';
      $SB.removeNodes('iframe');
      $SB.post('/ajax/check_redirect.php', {
        link: m[1],
      }).then(function (text) {
        $SB.openLink(text);
      });
    },
  });

  $SB.register({
    rule: {
      host: [
        /^mant[ae][pb]\.in$/,
        /^st\.oploverz\.net$/,
        /^minidroid\.net$/,
      ],
    },
    ready: function () {
      'use strict';
      var a = $SB('a.redirect, a[target=_blank][rel=nofollow]');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^www\.mije\.net$/,
      path: /^\/\w+\/(.+)$/,
    },
    start: function (m) {
      'use strict';
      var url = atob(m.path[1]);
      $SB.openLink(url);
    },
  });

  $SB.register({
    rule: {
      host: [
        /^moe\.god\.jp$/,
        /^moesubs\.akurapopo\.pro$/,
        /^dl\.nsfk\.in$/,
      ]
    },
    ready: function () {
      'use strict';
      var a = $SB('div div center a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^mt0\.org$/,
      path: /^\/[^\/]+\/$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('frame[name=bottom]');
      var f = $SB('frame[name=top]');
      var i = setInterval(function () {
        var a = $SB.$SB('div a', f.contentDocument);
        if (!a) {
          return;
        }
        clearInterval(i);
        $SB.openLink(a.href)
      }, 1000);
    },
  });

  $SB.register({
    rule: 'http://my-link.pro/*',
    ready: function () {
      'use strict';
      var i = $SB('iframe[scrolling=auto]');
      if (i) {
        $SB.openLink(i.src);
      }
    },
  });

  $SB.register({
    rule: {
      host: /^nsfw\.in$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('#long_url a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^nutshellurl\.com$/,
    },
    ready: function () {
      'use strict';
      var iframe = $SB('iframe');
      $SB.openLink(iframe.src);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?ohleech\.com$/,
      path: /^\/dl\/$/,
    },
    ready: function () {
      'use strict';
      window.startdl();
    },
  });

  $SB.register({
    rule: {
      host: /^www\.oni\.vn$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var data = $SB.searchScripts(/data:"([^"]+)"/);
      if (!data) {
        throw new _SB.SafeBrowseError('pattern changed');
      }
      data = data[1];
      $SB.get('/click.html', data).then(function (url) {
        $SB.openLink(url);
      });
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?ouo\.io$/,
      path: /^\/go\/\w+$/,
    },
    ready: function (m) {
      'use strict';
      var a = $SB('#btn-main');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^oxyl\.me$/,
    },
    ready: function () {
      'use strict';
      var l = $SB.$SB$SB('.links-container.result-form > a.result-a');
      if (l.size() > 1) {
        return;
      }
      $SB.openLink(l.at(0).href);
    },
  });

  $SB.register({
    rule: {
      host: /^p\.pw$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var m = $SB.searchScripts(/window\.location = "(.*)";/);
      m = m[1];
      $SB.openLink(m);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?\w+\.rapeit\.net$/,
      path: /^\/(go|prepair|request|collect|analyze)\/[a-f0-9]+$/,
    },
    ready: function (m) {
      'use strict';
      var a = $SB('a#download_link');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: 'http://reffbux.com/refflinx/view/*',
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var m = $SB.searchScripts(/skip_this_ad_(\d+)_(\d+)/);
      var id = m[1];
      var share = m[2];
      var location = window.location.toString();
      $SB.post('http://reffbux.com/refflinx/register', {
        id: id,
        share: share,
        fp: 0,
        location: location,
        referer: '',
      }).then(function (text) {
        var m = text.match(/'([^']+)'/);
        if (!m) {
          throw new _SB.SafeBrowseError('pattern changed');
        }
        $SB.openLink(m[1]);
      });
    },
  });

  $SB.register({
    rule: 'http://richlink.com/app/webscr?cmd=_click&key=*',
    ready: function () {
      'use strict';
      var f = $SB('frameset');
      f = f.onload.toString();
      f = f.match(/url=([^&]+)/);
      if (f) {
        f = decodeURIComponent(f[1]);
      } else {
        f = $SB('frame[name=site]');
        f = f.src;
      }
      $SB.openLink(f);
    },
  });

  $SB.register({
    rule: 'http://rijaliti.info/*.php',
    ready: function () {
      'use strict';
      var a = $SB('#main td[align="center"] a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^riurl\.com$/,
      path: /^\/.+/,
    },
    ready: function () {
      'use strict';
      var s = $SB.$SB('body script');
      if (s) {
        s = s.innerHTML.indexOf('window.location.replace');
        if (s >= 0) {
          return;
        }
      }
      $SB.openLink('', {
        path: {
          hidden: '1',
          image: ' ',
        },
      });
    },
  });

  $SB.register({
    rule: {
      host: /^preview\.rlu\.ru$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('#content > .long_url > a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^robo\.us$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var url = atob(window.fl);
      $SB.openLink(url);
    },
  });
  $SB.register({
    rule: {
      host: /^www\.ron\.vn$/,
    },
    ready: function () {
      'use strict';
      var script = $SB.searchScripts('linknexttop');
      var data = script.match(/data:"([^"]+)"/);
      var url = window.domain + 'click.html?' + data[1];
      $SB.get(url, {}, {
        'Content-Type': 'application/json; charset=utf-8',
      }).then(function (url) {
        $SB.openLink(url);
      });
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?sa\.ae$/,
      path: /^\/\w+\/$/,
    },
    ready: function () {
      'use strict';
      var m = $SB.searchScripts(/var real_link = '([^']+)';/);
      $SB.openLink(m[1]);
    },
  });

  $SB.register({


    rule: {
      host: /^(www\.)?safeurl\.eu$/,
      path: /\/\w+/,
    },
    ready: function () {
      'use strict';
      var directUrl = $SB.searchScripts(/window\.open\("([^"]+)"\);/);
      if (!directUrl) {
        throw new _SB.SafeBrowseError('script content changed');
      }
      directUrl = directUrl[1];
      $SB.openLink(directUrl);
    },
  });

  $SB.register({
    rule: {
      host: [
        /^segmentnext\.com$/,
        /^(www\.)?videogamesblogger.com$/,
      ],
      path: /^\/interstitial\.html$/,
      query: /return_url=([^&]+)/,
    },
    start: function (m) {
      'use strict';
      $SB.openLink(decodeURIComponent(m.query[1]));
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?(apploadz\.ru|seomafia\.net)$/
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var a = $SB('table a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: /http:\/\/setlinks\.us\/(p|t|d).*/,
    ready: function () {
      'use strict';
      var k = $SB.searchScripts(/window\.location='([^']+)'/);
      if (k) {
        $SB.openLink(k[1]);
        return;
      }
      var aLinks = $SB.$SB$SB('div.links-container.result-form:not(.p-links-container) > span.dlinks > a');
      if (aLinks.size() === 1) {
        $SB.openLink(aLinks.at(0).href);
        return;
      }
      k = $SB('img[alt=captcha]');
      $SB.captcha(k.src, function (a) {
        var b = $SB('#captcha');
        var c = $SB('input[name=Submit]');
        b.value = a;
        c.click();
      });
    },
  });

  (function () {
    'use strict';
    function afterGotSessionId (sessionId) {
      var X_NewRelic_ID = $SB.searchScripts(/xpid:"([^"]+)"/);
    var data = {
      adSessionId: sessionId,
    };
      var header = {
        Accept: 'application/json, text/javascript',
      };
      if (X_NewRelic_ID) {
        header['X-NewRelic-ID'] = X_NewRelic_ID;
      }
      var i = setInterval(function () {
        $SB.get('/shortest-url/end-adsession', data, header).then(function (text) {
          var r = _SB.parseJSON(text);
          if (r.status == "ok" && r.destinationUrl) {
            clearInterval(i);
            $SB.removeAllTimer();
            var url = decodeURIComponent(r.destinationUrl);
            $SB.openLink(url);
          }
        });
      }, 1000);
    }
    var hostRules = /^sh\.st|(dh10thbvu|u2ks|jnw0)\.com|digg\.to$/;
    $SB.register({
      rule: {
        host: hostRules,
        path: /^\/freeze\/.+/,
      },
      ready: function () {
        var o = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.target.getAttribute('class').match(/active/)) {
              o.disconnect();
              $SB.openLink(mutation.target.href);
            }
          });
        });
        o.observe($SB('#skip_button'), {
          attributes: true,
          attributeFilter: ['class'],
        });
      },
    });
    $SB.register({
      rule: {
        host: hostRules,
        path: /https?:\/\//,
      },
      start: function () {
        var url = window.location.pathname + window.location.search + window.location.hash;
        url = url.match(/(https?:\/\/.*)$/);
        url = url[1];
        $SB.openLink(url);
      },
    });
    $SB.register({
      rule: {
        host: hostRules,
        path: /^\/[\d\w]+/,
      },
      start: function () {
        window._impspcabe = 0;
      },
      ready: function () {
        $SB.removeNodes('iframe');
        $SB.removeAllTimer();
        var m = $SB.searchScripts(/sessionId: "([\d\w]+)",/);
        if (m) {
          afterGotSessionId(m[1]);
          return;
        }
        var o = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            var m = $SB.searchScripts(/sessionId: "([\d\w]+)",/);
            if (m) {
              o.disconnect();
              afterGotSessionId(m[1]);
            }
          });
        });
        o.observe(document.body, {
          childList: true,
        });
      },
    });
  })();

  $SB.register({
    rule: {
      host: /^(www\.)?shink\.in$/,
      path: /^\/\w+$/,
    },
    ready: function () {
      'use strict';
      var f = $SB('#skip');
      if (!$SB.$SB('#captcha')) {
        f.submit();
        return;
      }
      var envio = $SB("#envio");
      envio.disabled = false;
      envio.style.visibility= "hidden";
      envio.style.display='none';
      var envio2 = $SB("#envio2");
      envio2.style.visibility= "visible";
      envio2.style.display='block';
      window.$("#myModal").reveal();
    },
  });

  $SB.register({
    rule: {
      host: [
        /^(www\.)?shortenurl\.tk$/,
        /^(www\.)?pengaman\.link$/,
      ],
      path: /^\/\w+$/,
    },
    ready: function (m) {
      'use strict';
      var l = $SB('a.btn-block.redirect');
      $SB.openLink(l.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?shorti\.ga$/,
      path: [
        /^\/\w+$/,
        /^\/url_redirector\.html$/,
      ],
    },
    ready: function () {
      'use strict';
      var f = $SB.$SB$SB('frame');
      var fl = f.find(function(value, key, self) {
        if (value.getAttribute('class')) {
          return _SB.none;
        }
        return 'Target frame found';
      });
      $SB.openLink(fl.value.src);
    },
  });

  $SB.register({
    rule: {
      host: /^www\.shortskip\.com$/,
      path: /^\/short\.php$/,
      query: /i=([^&]+)/,
    },
    start: function (m) {
      'use strict';
      var url = decodeURIComponent(m.query[1]);
      $SB.openLink(url);
    },
  });
  $SB.register({
    rule: {
      host: /^sht\.io$/,
      path: /^\/\d+\/(.+)$/,
    },
    start: function (m) {
      'use strict';
      var url = atob(m.path[1]);
      url = url.match(/\{sht-io\}(.+)$/);
      $SB.openLink(url[1]);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?similarsites\.com$/,
      path: /^\/goto\/([^?]+)/
    },
    start: function (m) {
      'use strict';
      var l = m.path[1];
      if (!/^https?:\/\//.test(l)) {
        l = 'http://' + l;
      }

      $SB.openLink(l);
    },
  });
  $SB.register({
    rule: {
      host: /^srnk\.co$/,
      path: /^\/i\//,
    },
    ready: function () {
      'use strict';
      var a = $SB.$SB('#btn-with-link');
      if (!a) {
        return;
      }
      var href = a.href;
      var method = a.dataset.method;
      if (method) {
        var csrfParam = $SB('meta[name="csrf-param"]').content;
        var csrfToken = $SB('meta[name="csrf-token"]').content;
        var form = document.createElement('form');
        form.method = 'post';
        form.action = href;
        var input = document.createElement('input');
        input.name = '_method';
        input.value = method;
        form.appendChild(input);
        input = document.createElement('input');
        input.name = csrfParam;
        input.value = csrfToken;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        return;
      }
      $SB.post(location.pathname + '.js').then(function (script) {
        var m = script.match(/var link = "([^"]+)";/);
        if (!m) {
          _SB.warn('script changed');
          return;
        }
        $SB.openLink(m[1]);
      });
    },
  });
  $SB.register({
    rule: {
      host: /^stash-coins\.com$/,
    },
    start: function () {
      'use strict';
      var url = window.location.toString();
      var i = url.lastIndexOf('http');
      url = url.substr(i);
      $SB.openLink(url);
    },
  });
  $SB.register({
    rule: {
      host: /^streamingfrench\.net$/,
      path: /^\/$/,
      query: /^\?xb=(.+)$/,
    },
    start: function (m) {
      'use strict';
      var url = decodeURIComponent(m.query[1]);
      $SB.openLink(url);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?supercheats\.com$/,
      path: /^\/interstitial\.html$/,
      query: /(?:\?|&)oldurl=([^&]+)(?:$|&)/,
    },
    start: function (m) {
      'use strict';
      $SB.openLink(m.query[1]);
    },
  });

  $SB.register({
    rule: [
      {
        host: [
          /^(www\.)?sylnk\.net$/,
          /^dlneko\.(com|net|org)$/,
          /^rumahsimpel\.com$/,
        ],
        query: /link=([^&]+)/,
      },
      {
        host: /^(www\.)?compul\.in$/,
        path: /^\/n\.php$/,
        query: /v=([^&]+)/,
      },
      {
        host: /^(www\.)?safelinkair\.com$/,
        path: /^\/code$/,
        query: /(?:\?|&)link=([a-zA-Z0-9=]+)(?:$|&)/,
      },
      {
        host: /^link\.filmku\.net$/,
        path: /^\/p\/go\.html$/,
        query: /^\?url=([a-zA-Z0-9=]+)$/,
      },
    ],
    start: function (m) {
      'use strict';
      var rawLink = atob(m.query[1]);
      $SB.openLink(rawLink);
    },
  });
  $SB.register({
    rule: [
      {
        host: [
          /^(www\.)?(link\.)?safelink(converter2?|s?review)\.com$/,
          /^susutin\.com$/,
        ],
        query: /id=(\w+=*)/,
      },
      {
        host: [
          /^(www\.)?dlneko\.com$/,
          /^(satuasia|tawaku)\.com$/,
          /^ww3\.manteb\.in$/,
          /^link\.filmku\.net$/,
          /^www\.muucih\.com$/,
        ],
        query: /go=(\w+=*)/,
      },
    ],
    start: function (m) {
      'use strict';
      var l = atob(m.query[1]);
      var table = {
        '!': 'a',
        ')': 'e',
        '_': 'i',
        '(': 'o',
        '*': 'u',
      };
      l = l.replace(/[!)_(*]/g, function (m) {
        return table[m];
      });
      $SB.openLink(l);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?safelinkreview\.com$/,
      path: /^\/\w+\/cost\/([\w\.]+)\/?$/,
    },
    start: function (m) {
      'use strict';
      var l = 'http://' + m.path[1];
      $SB.openLink(l);
    },
  });

  $SB.register({
    rule: {
      host: /^thinfi\.com$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('div p a');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^tinyarrows\.com$/,
      path: /^\/preview\.php$/,
      query: /^\?page=([^&]+)/,
    },
    start: function (m) {
      'use strict';
      $SB.openLink(decodeURIComponent(m.query[1]));
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?totaldebrid\.org$/,
      path:/\/l\/(l\.php)?$/,
      query: /\?ads=([a-zA-Z0-9=]+)$/,
    },
    start: function (m) {
      'use strict';
      var l = atob(m.query[1]);
      $SB.openLink(l);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?typ\.me$/,
    },
    ready: function (m) {
      'use strict';
      var a = $SB('#skipAdBtn');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?ultshare\.com$/,
      path: /^\/(?:(?:\d-)?(\d+)|index\.php)$/,
      query: /^(?:\?a=\d&c=(\d+))?$/
    },
    start: function (m) {
      'use strict';
      var linkId = m.path[1]?m.path[1]:m.query[1];
      var directLink = '/3-' + linkId;
      $SB.openLink(directLink);
    },
  });

  $SB.register({
    rule: {
      host: /^unfake\.it$/,
    },
    ready: function () {
      'use strict';
      var frame = $SB('frame');
      var i = frame.src.lastIndexOf('http://');
      $SB.openLink(frame.src.substr(i));
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?(upan|gxp)\.so$/,
      path: /^\/\w+$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('table.td_line a[onclick="down_process_s();"]');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /^url\.ie$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('a[title="Link to original URL"]');
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: {
      host: /urlcash\.(com|net|org)|(bat5|detonating|celebclk|eightteen|smilinglinks|peekatmygirlfriend|pornyhost|clb1|urlgalleries)\.com|looble\.net|xxxs\.org$/,
    },
    ready: function () {
      'use strict';
      if (window && window.linkDestUrl) {
        $SB.openLink(window.linkDestUrl);
        return;
      }
      var matches = document.body.innerHTML.match(/linkDestUrl = '(.+)'/);
      if (matches) {
        $SB.openLink(matches[1]);
        return;
      }
    },
  });

  $SB.register({
    rule: {
      host: /^urlinn\.com$/,
    },
    ready: function () {
      'use strict';
      var m = $SB('META[HTTP-EQUIV=refresh]').getAttribute('CONTENT').match(/url='([^']+)'/);
      if (m) {
        $SB.openLink(m[1]);
      }
    },
  });

  $SB.register({
    rule: {
      host: /^urlms\.com$/,
    },
    ready: function () {
      'use strict';
      var iframe = $SB('#content');
      $SB.openLink(iframe.src);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?urlv2\.com$/,
    },
    ready: function (m) {
      'use strict';
      if (window.location.pathname.indexOf('locked') >= 0) {
        var path = window.location.pathname.replace('/locked', '');
        $SB.openLink(path);
        return;
      }
      var m = $SB.searchScripts(/jeton=([\w]+)/);
      var l = 'http://urlv2.com/algo.php?action=passer&px=0&so=1&jeton=' + m[1];
      window.setTimeout(function() {$SB.openLink(l)}, 5000);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?victly\.com$/,
      path: /^\/\w+$/,
    },
    start: function () {
      'use strict';
      $SB.post(document.location.href, {
        hidden: '',
        image: 'Skip+Ads',
      }).then(function (text) {
        var m = text.match(/window\.location\.replace\('([^']+)'\)/);
        $SB.openLink(m[1]);
      });
    },
  });

  $SB.register({
    rule: {
      host: /^www\.viidii\.info$/,
    },
    ready: function () {
      'use strict';
      var o = $SB('#directlink');
      $SB.openLink(o.href);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?vir\.al$/,
    },
    ready: function () {
      'use strict';
      var m = $SB.searchScripts(/var target_url = '([^']+)';/);
      if (!m) {
        throw new _SB.SafeBrowseError('site changed');
      }
      $SB.openLink(m[1]);
    },
  });

  $SB.register({
    rule: {
      host: /^(www\.)?wzzq\.me$/,
    },
    ready: function () {
      'use strict';
      try {
        var l = $SB('#img_loading_table2  div.wz_img_hit a[target=_blank]').href;
        $SB.openLink(l);
      } catch (e) {
      }
    },
  });

  $SB.register({
    rule: {
      host: /^xlink.me$/
    },
    ready: function () {
      'use strict';
      var a = $SB('#main_form > center > a');
      if (!a) {return;}
      $SB.openLink(a.href);
    },
  });

  $SB.register({
    rule: 'http://yep.it/preview.php?p=*',
    ready: function () {
      'use strict';
      var link = $SB('font[color="grey"]').innerHTML;
      $SB.openLink(link);
    },
  });

  $SB.register({
    rule: 'http://www.yooclick.com/l/*',
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      var uniq = window.uniq || window.uniqi;
      if (!uniq) {return;}
      var path = window.location.pathname;
      var url = _SB.T('{0}?ajax=true&adblock=false&old=false&framed=false&uniq={1}')(path, uniq);
      var getURL = function() {
        $SB.get(url).then(function (text) {
          var goodURL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(text);
          if (goodURL) {
            $SB.openLink(text);
          } else {
            setTimeout(getURL, 500);
          }
        });
      }
      getURL();
    },
  });
  $SB.register({
    rule: {
      host: /^ysf\.pl$/,
      path: /^\/3\/(.+)$/,
    },
    start: function (m) {
      'use strict';
      var url = atob(m.path[1]);
      $SB.openLink(url);
    },
  });
  $SB.register({
    rule: 'http://zo.mu/redirector/process?link=*',
    ready: function () {
      'use strict';
      $SB.removeNodes('iframe');
      window.location.reload();
    },
  });

  $SB.register({
    rule: {
      host: /^zzz\.gl$/,
    },
    ready: function () {
      'use strict';
      var m = $SB.searchScripts(/var domainurl = '([^']+)';/);
      if (!m) {
        throw new _SB.SafeBrowseError('site changed');
      }
      $SB.openLink(m[1]);
    },
  });
  $SB.register({
    rule: {
      host: /^akoam\.com$/,
      path: /^\/download\//,
    },
    start: function () {
      'use strict';
      var location_link = location.hash;
      $SB.post(location_link).then(function (data) {
        data = JSON.parse(data);
        if (!data.hash_data) {
          _SB.warn('rule changed');
          return;
        }
        $SB.openLink(data.direct_link);
      });
    },
  });
  $SB.register({
    rule: {
      host: /^www\.anafile\.com$/,
    },
    ready: function () {
      'use strict';
      var b = $SB.$SB('#btn_download');
      if (b) {
        b.disabled = false;
        $SB.removeNodes('div[align=center]');
        return;
      }
      b = $SB('#plans_free form [type=submit]');
      b.click();
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?arab\.sh$/,
      path: /^\/\w+$/,
    },
    ready: function () {
      'use strict';
      var f = $SB('form[name=F1]');
      setTimeout(function() {
          f.submit();
      }, 20000);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?coolrom\.com$/,
      path: /^\/dlpop\.php$/,
    },
    ready: function () {
      'use strict';
      var matches = $SB.searchScripts(/<form method="POST" action="([^"]+)">/);
      $SB.openLink(matches[1]);
    },
  });
  (function() {
    'use strict';
    $SB.register({
      rule: {
        host: /^(www\.)?dl-protect\.com$/,
        path: /\/[A-Z0-9]+/,
      },
      ready: function () {
        if ($SB.$SB('#captcha')) {
          return;
        }
        var f = $SB.$SB('form[name=ccerure]');
        if (f) {
          var observer = new MutationObserver(function (mutations) {
            var iIn = $SB('input[id=in]');
            for (var i = 0; i < mutations.length; i++) {
              if (mutations[i].target.value && mutations[i].attributeName === 'value') {
                observer.disconnect();
                iIn.value = "Tracking too much hurts users' privacy";
                if (!canFastRedirect()) {
                  return;
                }
                setTimeout(function() {
                  f.submit();
                }, 600);
                break;
              }
            }
          });
          var iIn = $SB('input[id=in]');
          if (iIn.value) {
            setTimeout(function() {
              f.submit();
            }, 600);
          } else {
            observer.observe(iIn, {
              attributes: true,
            });
          }
          return;
        }
        var l = $SB.$SB$SB('#slinks > a');
        if (l.size() === 1) {
          $SB.openLink(l.at(0).href);
        }
      },
    });
    function canFastRedirect () {
      return !$SB.$SB('form[name=ccerure]').onsubmit && !$SB.$SB('form[name=ccerure] input[name=pwd]');
    }
  })();
  $SB.register({
    rule: {
      host: /^(www\.)?embedupload\.com$/,
      path: /^\/$/,
      query: /^\?\w{2}=\w+$/
    },
    ready: function () {
      'use strict';
      var downloadPage = $SB('.categories a[target=_blank]');
      $SB.openLink(downloadPage);
    },
  });
  $SB.register({
    rule: {
      host: /^www\.fileproject\.com\.br$/,
      path: /^\/files\/+/,
    },
    ready: function () {
      'use strict';
      var m = $SB.searchScripts(/<a id="down" href="([^"]+)">/);
      $SB.openLink(m[1]);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?(firedrive|putlocker)\.com$/,
      path: /^\/file\/[0-9A-F]+$/,
    },
    ready: function () {
      'use strict';
      var c = $SB('#confirm_form');
      c.submit();
    },
  });
  $SB.register({
    rule: {
      host: /^iori\.us$/,
    },
    ready: function () {
      'use strict';
      var a = $SB('#wrapper .tombol a');
      $SB.openLink(a.href);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?jheberg\.net$/,
      path: /^\/captcha\//,
    },
    ready: function () {
      'use strict';
      $SB('.dl-button').click();
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?jheberg\.net$/,
      path: /^\/redirect\//,
    },
    ready: function () {
      'use strict';
      $SB.removeAllTimer();
      var matches = $SB.searchScripts(/'slug':\s*'([^']+)',\s*'hoster':\s*'([^']+)'/);
      var slug = matches[1];
      var hoster = matches[2];
      $SB.post('/get/link/', {
        'slug': slug,
        'hoster': hoster
      }).then(function(response) {
        var respJSON = _SB.parseJSON(response);
        $SB.openLink(respJSON.url);
      });
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?larashare\.com$/,
      path: /^\/do\.php$/,
      query: /id=\d+/,
    },
    start: function () {
      'use strict';
      $SB.openLink(document.location.href.replace('id=','down='));
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?maxmirror\.com$/,
      path: /^\/redirect\//,
    },
    ready: function () {
      'use strict';
      var l = $SB('#download_url > a');
      $SB.openLink(l.href);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?mirrorcreator\.com$/,
      path: /^\/showlink\.php$/,
    },
    ready: function () {
      'use strict';
      var a = $SB.$SB('#redirectlink a');
      if (a) {
        $SB.openLink(a.href);
        return;
      }
      a = $SB('#redirectlink > div.redirecturl');
      a = a.innerHTML;
      if (!a.match(/^http/)) {
        throw new _SB.AdsBypasserError('not a valid URL');
      }
      $SB.openLink(a);
    },
  });
  $SB.register({
    rule: {
      host: /^www.mirrorupload.net$/,
    },
    ready: function () {
      'use strict';
      var accessForm = $SB('form[name=form_upload]');
      var accessInput = document.createElement('input');
      accessInput.type = 'hidden';
      accessInput.name = 'access';
      accessInput.value = Math.random();
      accessForm.appendChild(accessInput);
      accessForm.submit();
    },
  });
  $SB.register({
    rule: {
      host: /^www\.multiupfile\.com$/,
      path: /^\/f\//,
    },
    ready: function () {
      'use strict';
      var f = $SB('#yw0');
      f.submit();
    },
  });
  $SB.register({
    rule: {
      host: /^mylinkgen\.com$/,
      path: /^\/p\/(.+)$/,
    },
    start: function (m) {
      'use strict';
      $SB.openLink('/g/' + m.path[1]);
    },
  });
  $SB.register({
    rule: {
      host: /^mylinkgen\.com$/,
      path: /^\/g\//,
    },
    ready: function () {
      'use strict';
      var a = $SB('#main-content a.btn.btn-default');
      $SB.openLink(a.href);
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?upmirror\.info$/,
    },
    ready: function () {
      'use strict';
      $SB.setCookie('user', 'ppp');
      if ($SB.$SB('#countDownText')) {
          $SB.openLink(document.location.toString());
      }
    },
  });
  $SB.register({
    rule: {
      host: /^(www\.)?vidto\.me$/,
    },
    ready: function () {
      'use strict';
      var f = $SB('#btn_download').form;
      setTimeout(function() {
          f.submit();
      }, 6000);
    },
  });


  (function () {
    'use strict';
    var sUrl = '(\\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])';
    function isLink (text) {
      var rUrl = new RegExp(_SB.T('^{0}$')(sUrl), 'i');
      return rUrl.test(text);
    }
    function linkify (text) {
      var rUrl = new RegExp(sUrl, 'ig');
      return text.replace(rUrl, function(match) {
        return _SB.T("<a href='{0}'>{0}</a>")(match);
      });
    }
    $SB.register({
      rule: {
        host: /^(www\.)?([a-zA-Z0-9]+\.)?binbox\.io$/,
        path: /\/([a-zA-Z0-9]+)/,
        hash: /(?:#([a-zA-Z0-9]+))?/,
      },
      ready: function (m) {
        var sjcl = window.sjcl;
        var paste_id = m.path[1];
        var paste_salt = m.hash[1];
        var API_URL = _SB.T('https://binbox.io/{0}.json')(paste_id);
        $SB.get(API_URL, false, {
          Origin: _SB.none,
          Referer: _SB.none,
          Cookie: 'referrer=1',
          'X-Requested-With': _SB.none,
        }).then(function (pasteInfo) {
          pasteInfo = _SB.parseJSON(pasteInfo);
          if (!pasteInfo.ok) {
            throw new _SB.SafeBrowseError("error when getting paste information");
          }
          if (pasteInfo.paste.url) {
            $SB.openLink(pasteInfo.paste.url);
            return;
          }
          var raw_paste = sjcl.decrypt(paste_salt, pasteInfo.paste.text);
          if (isLink(raw_paste)) {
            $SB.openLink(raw_paste);
            return;
          }
          var elm = document.createElement('pre');
          elm.id = 'paste-text';
          elm.innerHTML = linkify(raw_paste);
          var frame = $SB('#paste-frame, #captcha-page');
          frame.parentNode.replaceChild(elm, frame);
        });
      },
    });
  })();

  $SB.register({
    rule: {
      host: /^(www\.)?pasted\.co$/,
      path: /^\/\w+$/,
    },
    ready: function () {
      'use strict';
      $SB.removeNodes('#captcha_overlay');
    },
  });

  })(0);
}