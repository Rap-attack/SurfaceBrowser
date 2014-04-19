'use strict';

var tabId = 1;

function newTab() {
    var tabClickEvent = function() {
        var windowId = $(this).data('tab-id');

        $('.active-tab').removeClass('active-tab');
        $(this).addClass('active-tab');

        $('.active')
            .removeClass('active')
            .hide();

        $('#window-id-' + windowId)
            .addClass('active')
            .show();

        if(Modernizr.mq('screen and (max-width: 480px)')) {
            $('.close-tabs').click();
        }
    };

    var closeButtonClickEvent = function() {
        var activeTab = $(this).parent();
        var tabId = activeTab.data('tab-id');
        var activeFrame = $('#window-id-' + tabId);

        activeTab.remove();

        if(activeFrame.attr('id') === 'window-id-' + tabId){
            var newActiveTab = $('.tab').last();
            var newActiveFrame = $('#window-id-' + newActiveTab.data('tab-id'));

            newActiveTab.addClass('active-tab');

            newActiveFrame
                .addClass('active')
                .show();
        }

        activeFrame.remove();
    };

    $('.active-tab').removeClass('active-tab');

    var closeButton = $('<i class="close fa fa-fw fa-times"></i>').click(closeButtonClickEvent);

    var tab = $('<div></div>')
        .addClass('tab')
        .addClass('active-tab')
        .attr('data-tab-id', tabId)
        .append('<a href="#0">New tab</a>')
        .append(closeButton)
        .click(tabClickEvent);

    tabId++;

    $('.new-tab').before(tab);

    if(Modernizr.mq('screen and (max-width: 480px)')) {
        $('.close-tabs').click();
    }
}

$(document).ready(function(){

    $('.new-tab').click(function(){
        var tabHistory = [];
        var tabFuture = [];
        var thisTabId = tabId;

        $('.active')
            .removeClass('active')
            .hide();

        var window = $('<div></div>')
            .addClass('window')
            .addClass('active')
            .attr('id', 'window-id-' + thisTabId);

        var iframe = $('<iframe></iframe>')
            .attr('allowfullscreen', true);

        var nav = $('<nav></nav>');

        var refreshClickEvent = function() {
            $('.active').find('form').submit();
        };

        var refresh = $('<button></button>')
            .addClass('refresh')
            .append('<i class="fa fa-fw fa-refresh">')
            .click(refreshClickEvent);

        var menu = $('<button></button>')
            .addClass('menu')
            .append('<i class="fa fa-fw fa-bars">');

        var formSubmitEvent = function() {
            event.preventDefault();
            var oldUrl = iframe.attr('src');
            var newUrl = form.children('input').val();

            tabHistory.push(oldUrl);
            tabFuture.length = 0;

            if(iframe.length)
            {
                iframe.attr('src', newUrl);
            }

            $('.tab[data-tab-id="' + thisTabId + '"]').children('a').text(newUrl);
        };

        var form = $('<form></form>')
            .addClass('search')
            .append('<input class="searchbar" value="http://">')
            .submit(formSubmitEvent);

        var previousClickEvent = function () {
            var currentSite = iframe.attr('src');
            tabFuture.push(currentSite);

            var previousSite = tabHistory.pop();

            form.children('input').val(previousSite);
            iframe.attr('src', previousSite);
        };

        var previous = $('<button></button>')
            .addClass('previous')
            .append('<i class="fa fa-fw fa-chevron-left">')
            .click(previousClickEvent);

        var nextClickEvent = function() {
            var currentSite = iframe.attr('src');
            tabHistory.push(currentSite);

            var nextSite = tabFuture.pop();

            form.children('input').val(nextSite);
            iframe.attr('src', nextSite);
        };

        var next = $('<button></button>')
            .addClass('next')
            .append('<i class="fa fa-fw fa-chevron-right"></i>')
            .click(nextClickEvent);

        var tabsClickEvent = function() {
            $('.tabs').removeClass('hide-mobile');
            $('.active').hide();
        };

        var tabs = $('<button></button>')
            .addClass('show-tabs')
            .append('<i class="fa fa-fw fa-th"></i>')
            .click(tabsClickEvent);

        nav
            .append(previous)
            .append(next)
            .append(refresh)
            .append(form)
            .append(tabs)
            .append(menu);

        window
            .append(nav)
            .append(iframe);

        $('body').append(window);

        newTab();
    });

    $('.menu').click(function(){

    });

    $('.close-tabs').click(function(){
        //$('.tabs').hide();
        $('.tabs').addClass('hide-mobile');
        $('.active').show();
    });

    /*
     *          START
     */

    $('.new-tab').click();
});