/*global Modernizr:true */
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

        // Events

        var refreshClickEvent = function() {
            try {
                form.submit();
            }
            catch(err) {
                alert(err);
            }
        };

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

        var previousClickEvent = function () {
            var previousSite = tabHistory.pop();
            var currentSite = iframe.attr('src');

            if( currentSite ) tabFuture.push(currentSite);

            if( ! previousSite ) {
                form.children('input').val('http://');
                iframe.attr('src', '');
                return false;
            }

            form.children('input').val(previousSite);
            iframe.attr('src', previousSite);
        };

        var nextClickEvent = function() {
            var nextSite = tabFuture.pop();

            if( ! nextSite ) return false;

            var currentSite = iframe.attr('src');
            tabHistory.push(currentSite);

            form.children('input').val(nextSite);
            iframe.attr('src', nextSite);
        };

        var tabsClickEvent = function() {
            $('.tabs').removeClass('hide-mobile');
            $('.active').hide();
        };

        $('.active')
            .removeClass('active')
            .hide();

        var window = $('<div></div>')
            .addClass('window')
            .addClass('active')
            .attr('id', 'window-id-' + thisTabId);

        var iframe = $('<iframe></iframe>')
            .attr('allowfullscreen', true)
            .attr('allowtransperancy', true)
            .attr('name', 'iframe-' + tabId);

        // Top Controls
        var minimizeButton = $('<button></button>')
            .addClass('top-button')
            .addClass('minimize')
            .append('<i class="fa fa-fw fa-minus"></i>')
            .click(function(){
                alert('Minimize!');
            });

        var maximizeButton = $('<button></button>')
            .addClass('top-button')
            .addClass('maximize')
            .append('<i class="fa fa-fw fa-square-o"></i>')
            .click(function(){
                alert('Maximize!');
            });

        var closeWindowButton = $('<button></button>')
            .addClass('top-button')
            .addClass('close-window')
            .append('<i class="fa fa-fw fa-times"></i>')
            .click(function(){
                alert('Close!');
            });

        var topControls = $('<div></div>')
            .addClass('top-controls')
            .append(minimizeButton)
            .append(closeWindowButton)
            .append(maximizeButton);

        // Navigation
        var nav = $('<nav></nav>');

        var refresh = $('<button></button>')
            .addClass('refresh')
            .append('<i class="fa fa-fw fa-refresh">')
            .click(refreshClickEvent);

        // Menu items
        var menuBookmarkThisClickEvent = function() {
            alert('Bookmarked!');
        };

        var menuBookmarkThis = $('<li><a href="#" class="menu-item">Bookmark this page</a>  </li>')
            .click(menuBookmarkThisClickEvent);

        var menuBookmarks = $('<li><a href="bookmarks.html" class="menu-item" target="iframe-' + tabId + '">Bookmarks</a></li>');
        var menuHistory = $('<li><a href="history.html" class="menu-item" target="iframe-' + tabId + '">History</a></li>');
        var menuTest = $('<li><a href="test-site.html" class="menu-item" target="iframe-' + tabId + '">Test!</a></li>');

        var menu = $('<ul></ul>')
            .addClass('menu')
            .append(menuBookmarkThis)
            .append(menuBookmarks)
            .append(menuHistory)
            .append(menuTest);

        var menuButtonClickEvent = function(e) {
            e.stopPropagation();
            $('.menu').toggle();
        };

        var menuButton = $('<button></button>')
            .addClass('menu-button')
            .append('<i class="fa fa-fw fa-bars">')
            .click(menuButtonClickEvent);

        var form = $('<form></form>')
            .addClass('search')
            .append('<input class="searchbar" value="http://">')
            .submit(formSubmitEvent);

        var previous = $('<button></button>')
            .addClass('previous')
            .append('<i class="fa fa-fw fa-chevron-left">')
            .click(previousClickEvent);

        var next = $('<button></button>')
            .addClass('next')
            .append('<i class="fa fa-fw fa-chevron-right"></i>')
            .click(nextClickEvent);

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
            .append(menuButton)
            .append(menu);

        window
            .append(topControls)
            .append(nav)
            .append(iframe);

        $('body').append(window);

        newTab();
    });

    $('.close-tabs').click(function(){
        $('.tabs').addClass('hide-mobile');
        $('.active').show();
    });

    $(document).click(function(){
        $('.menu').hide();
    });

});