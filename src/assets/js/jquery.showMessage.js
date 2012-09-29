/*global jQuery:false setTimeout:false window:false document:false event:false clearTimeout:false console:false */

/**
 *  @preserve showMessage - jQuery plugin
 * Simple Twitter like notification method
 * Examples and documentation can be found at http://showMessage.dingobytes.com/
 * Copyright (c) 2009 - 2012 Andrew Alba (http://albawebstudio.com)
 *
 * Version: 3.1
 * Requires jQuery v1.7+
 *
 * Dual licensed under the MIT  and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: Fri Sep 28 23:24:00 2010 -0500 */
;(function($) {
    "use strict";
    var showMessage_t, messageHolder, stateHolder, showmessageul, messageNav,
        _autoClose, _useEsc, _navigation, _abandon, _show;

    /* Private methods */
    _autoClose = function(delayTime) {
        if ( typeof(showMessage_t) !== 'undefined' ) {
            clearTimeout(showMessage_t);
        }
        showMessage_t = setTimeout(function() {
            $('#showMessage', window.parent.document).fadeOut(function() { $(this).remove(); });
        }, delayTime);
    },

    _useEsc = function() {
        $(window).keydown(function(e) {
            var keycode;
            if ( e === null ) { // ie
                keycode = event.keyCode;
            } else { // mozilla
                keycode = e.which;
            }
            if ( keycode === 27 ) { // close
                $('#showMessage', window.parent.document).fadeOut(function() { $(this).remove(); });
                if ( typeof(showMessage_t) !== 'undefined' ) {
                    clearTimeout(showMessage_t);
                }
            }
        });
    },

    _navigation = function(useEsc, escText, closeText) {
        var messageNavigation = $('<span></span>').addClass('messageNav'),
            closeTextEl;
        if ( useEsc ) {
            $(messageNavigation).html(escText + ' ');
        }
        closeTextEl = $('<a></a>').attr({
            href: '',
            title: closeText
        }).css('text-decoration', 'underline').click(function() {
                $('#showMessage', window.parent.document).fadeOut(function() { $(this).remove(); });
                clearTimeout(showMessage_t);
                return false;
            }).text(closeText);
        $(messageNavigation).append(closeTextEl);
        return messageNavigation;
    },

    _abandon = function() {
        $(window).click(function() {
            if ( $('#showMessage', window.parent.document).length ) {
                $('#showMessage', window.parent.document).fadeOut(function() { $(this).remove(); });
                $(window).unbind('click');
                if (typeof(showMessage_t) !== 'undefined') {
                    clearTimeout(showMessage_t);
                }
                return false;
            }
        });
    },

    _show = function(that, option) {
    // first clear all ui=widget
        try{
            if ( $('#showMessage', window.parent.document).length ) {
                $('#showMessage', window.parent.document).remove();
            }
            // create an messageHolder div
            messageHolder = $('<div></div>').css({
                position: option.position,
                'z-index': option.zIndex,
                filter: 'Alpha(Opacity=' + option.opacity * 100 + ')',
                opacity: option.opacity
            }).attr('id', 'showMessage').addClass(option.className);
            if (option.location === 'top') {
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
            if (option.location === 'top') {
                $(that, window.parent.document).prepend(messageHolder);
            } else {
                $(that, window.parent.document).append(messageHolder);
            }
            $(messageHolder).fadeIn();
            if (option.autoClose) {
                _autoClose(option.delayTime);
            }
        } catch(e) {
            console.log('error message:', e.message);
        }
    },

    /* Public methods */
    $.fn.showMessage = function(options) {
        if ( !$(this).length ) {
            return this;
        }

        var option = $.extend({},$.fn.showMessage.defaults, options);
        _show(this, option);
    };


    $.showMessage = function(obj) {
        var option = $.extend({}, $.fn.showMessage.defaults, obj);
        _show($('body', window.parent.document), option);
    };

    $.showMessage.close = function() {
        if ($('#showMessage', window.parent.document).length) {
            if ( typeof(showMessage_t) !== 'undefined' ) {
                clearTimeout(showMessage_t);
            }
            $('#showMessage', window.parent.document).fadeOut(function() { $(this).remove(); });
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
        thisMessage: [],
        className: 'notification',

        position: 'fixed',
        zIndex: 1001,
        opacity: 0.9,
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