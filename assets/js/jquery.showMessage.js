/**
 * @preserve showMessage - jQuery plugin
 * Simple Twitter like notification method
 *
 * Examples and documentation can be found at http://showMessage.dingobytes.com/
 *
 * Copyright (c) 2009 - 2012 Andrew Alba (http://albawebstudio.com)
 *
 * Version: 3.0
 * Requires jQuery v1.7+
 *
 * Dual licensed under the MIT  and GPL licenses:
 * 	 http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Tue Apr 04 18:00:00 2010 -0500
 */

;(function($) {
	var showMessage_t, messageHolder, stateHolder, showmessageul, messageNav,
        _close, _autoClose, _useEsc, _navigation, _abandon, _show, option;

	/* Private methods */
    _close = function() {
        $('#showMessage', window.parent.document).fadeOut(function() {
           jQuery(this).remove();
        });
    },

	_autoClose = function(delayTime) {
		if (typeof(showMessage_t) != 'undefined') {
			clearTimeout(showMessage_t);
		}
		showMessage_t = setTimeout(function() {
			//$('#showMessage', window.parent.document).fadeOut();
            _close();
		}, delayTime);
	},

	_useEsc = function() {
		$(window).keydown(function(e) {
			var keycode;
			if (e === null) { // ie
				keycode = window.event.keyCode;
			} else { // mozilla
				keycode = e.which;
			}
			if (keycode == 27) { // close
				//$('#showMessage', window.parent.document).fadeOut();
				if (typeof(showMessage_t) != 'undefined') {
					clearTimeout(showMessage_t);
				}
                _close();
			}
		});
	},

	_navigation = function(useEsc, escText, closeText) {
		var messageNavigation = $('<span></span>').addClass('messageNav');
		if (useEsc) {
			$(messageNavigation).html(escText + ' ');
		}
		var closeTxt = $('<a></a>').attr({
			href: '',
			title: closeText
		}).css('text-decoration', 'underline').click(function() {
			//$('#showMessage', window.parent.document).fadeOut();
			clearTimeout(showMessage_t);
            _close();
			return false;
		}).text(closeText);
		$(messageNavigation).append(closeTxt);
		return messageNavigation;
	},

	_abandon = function() {
		$(window).click(function() {
			if ($('#showMessage', window.parent.document).length) {
				//$('#showMessage', window.parent.document).fadeOut();
				$(window).unbind('click');
				if (typeof(showMessage_t) != 'undefined') {
					clearTimeout(showMessage_t);
				}
                _close();
				return false;
			}
		});
	},

	_show = function(that, option) {
		// first clear all ui=widget
		try{
			if ($('#showMessage', window.parent.document).length) {
				$('#showMessage', window.parent.document).remove();
			}
			// create an messageHolder div
			messageHolder = $('<div></div>').css({
				position: option.position,
				'z-index': option.zIndex,
				filter: 'Alpha(Opacity=' + option.opacity * 100 + ')',
				opacity: option.opacity
			}).attr('id', 'showMessage').addClass(option.className);
			if (option.location == 'top') {
				$(messageHolder).css('top', 0);
			} else {
				$(messageHolder).css('bottom', 0);
			}
			if (option.useEsc) {
				_useEsc();
			} else {
				$(window).unbind('keydown');
			}
			if (option.displayNavigation) {
				messageNav = _navigation(option.useEsc, option.escText, option.closeText);
				$(messageHolder).append(messageNav);
			} else {
				_abandon();
			}

			showmessageul = $('<ul></ul>');

			// build messages from array
			for (var i = 0; i < option.thisMessage.length; i++) {
				var showmessageli = $('<li></li>').html(option.thisMessage[i]);
				$(showmessageul).append(showmessageli);
			}
			stateHolder = $('<div></div>').addClass('stateHolder').append(showmessageul);
			$(messageHolder).append(stateHolder);
			if (option.location == 'top') {
				$(that, window.parent.document).prepend(messageHolder);
			} else {
				$(that, window.parent.document).append(messageHolder);
			}
			$(messageHolder).fadeIn();
			if (option.autoClose) {
				_autoClose(option.delayTime);
			}
		} catch(e) {
			window.console.log('error message:', e.message);
		}
	},

	/* Public methods */
	$.fn.showMessage = function(options) {
		if (!$(this).length) {
			return this;
		}

		option = $.extend($.fn.showMessage.defaults, options);
		_show(this, option);
	};


	$.showMessage = function(obj) {
		option = $.extend($.fn.showMessage.defaults, obj);
		_show(jQuery('body', window.parent.document), option);
  	};

  	$.showMessage.close = function() {
		if ($('#showMessage', window.parent.document).length) {
			if (typeof(showMessage_t) != 'undefined') {
				clearTimeout(showMessage_t);
			}
			//$('#showMessage', window.parent.document).fadeOut();
            _close();
		}
		return false;
	};

	$.showMessage.init = function() {
		if ($("#showMessage").length) {
			return;
		}

	};

	//DEFAULT CONFIGURATION PROPERTIES
	$.fn.showMessage.defaults = {
		thisMessage: [''],
		className: 'notification',

		position: 'fixed',
		zIndex: 1001,
		opacity: .9,
		location: 'top',

		useEsc: true,
		displayNavigation: true,
		closeText: 'close',
		escText: 'Esc Key or',

		autoClose: false,
		delayTime: 5000,

		onStart : function(){},
		onCancel : function(){},
		onComplete : function(){},
		onCleanup : function(){},
		onClosed : function(){},
		onError : function(){}
	};

  	$(document).ready(function() {
		$.showMessage.init();
	});
})(jQuery);