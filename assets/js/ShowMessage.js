/*global ALBA.ShowMessage:true, $:false, Spinner:false, smoothScroll:true */
/**
 * User: andrew.alba
 * Date: 12/15/2015
 * Copyright 2015 Alba Web Studio. All rights reserved.
 */
if( typeof(ALBA) === "undefined" || ALBA === null ){
	ALBA = {};
}
ALBA.ShowMessage = function(){
	"use strict";
	// GLOBAL VARS
	var message1=['Hey! Something bit me!'];

	// DOM ELEMENTS
	var $body;

	function registerDomElements() {
		$body = $('body');
	}

	function addListeners() {
		if (typeof smoothScroll === 'object') {
			smoothScroll.init({updateURL: false,offset: 50});
		}
		if (typeof prettyPrint === 'function') {
			window.prettyPrint && prettyPrint();
		}
		jQuery('#clickMe').click(function() {
			$('body').showMessage({thisMessage: ['Hey! Something bit me!'], zIndex: 1031});
			return false;
		});
		jQuery('#joeForm').on('submit', function() {
			var rMessage = [],rClass='success';
			if (jQuery('input[name="joeName"]').val() === 'Joe') {
				rMessage.push('You know Joe!');
			} else {
				rMessage.push('Bahnt! Enter Joe foo!');
				rClass='fail'
			}
			jQuery('body').showMessage({thisMessage: rMessage, zIndex: 1031, className: rClass});
			return false;
		});
		jQuery('#modalBtn').click(function() {
			jQuery('#testModal').showMessage({thisMessage: ['You opened my modal!'], position: 'absolute'});
			return false;
		});
		jQuery('a.sMtooltip').mouseenter(function() {
			var returnMessage = [jQuery(this).attr('title')];
			$.showMessage({
				thisMessage: returnMessage,
				className: 'success',
				opacity: .95,
				displayNavigation: false,
				autoClose: true,
				delayTime: 3000,
				zIndex: 1031,
				position: 'fixed'
			});
			return false;
		}).click(function() {return false;});
	}

	return {
		init: function() {
			registerDomElements();
			addListeners();
		}
	};
}();