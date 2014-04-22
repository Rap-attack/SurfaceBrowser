/*
    TESTS:
    Tabletop:   Touch, large screen
    Wall:       Large screen, no touch
                Does the wall need any other functionality than Desktop?
 */
/*global Modernizr:true */

'use strict';

$(document).ready(function(){
    Modernizr.load({
        test : Modernizr.touch && Modernizr.mq('only all and (min-width: 1824px)'),
        yep : 'tabletop.js',
        nope : 'desktop.js'
    });
});
