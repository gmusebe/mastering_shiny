/* ========================================================================
 * Bootstrap: transition.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/v3-dev/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // https://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: tab.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

// Register tab plugin after DOM content loaded in order to
// override BS5's plugin
// https://github.com/twbs/bootstrap/blob/08139c22/js/dist/tab.js#L87
$(function() {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.4.1'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(document).find(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
          .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

});
;
// Inform the world that we have the ability to use BS3 nav/navbar markup in BS4
window.BS3_COMPAT = true;

// This logic needs to execute after both the BS4+ (new) as well as BS3 (legacy)
// jQuery plugins have been registered. For BS5, plugin registration happens
// after DOM content is loaded, which is why we do the same here.
// https://github.com/twbs/bootstrap/blob/08139c22/js/dist/tab.js#L87
$(function() {

  // The legacy plugin needs to be registered after the new one
  if (!$.fn.tab.Constructor.VERSION.match(/^3\./)) {
    (console.warn || console.error || console.log)("bs3compat.js couldn't find bs3 tab impl; bs3 tabs will not be properly supported");
    return;
  }
  var legacyTabPlugin = $.fn.tab.noConflict();

  if (!$.fn.tab || !$.fn.tab.Constructor || !$.fn.tab.noConflict) {
    (console.warn || console.error || console.log)("bs3compat.js couldn't find a jQuery tab impl; bs3 tabs will not be properly supported");
  }
  var newTabPlugin = $.fn.tab.noConflict();

  // Re-define the tab click event
  // https://github.com/twbs/bootstrap/blob/08139c2/js/src/tab.js#L33
  var EVENT_KEY = "click.bs.tab.data-api";
  $(document).off(EVENT_KEY);

  var SELECTOR = '[data-toggle="tab"], [data-toggle="pill"], [data-bs-toggle="tab"], [data-bs-toggle="pill"]';
  $(document).on(EVENT_KEY, SELECTOR, function(event) {
    event.preventDefault();
    $(this).tab("show");
  });

  function TabPlugin(config) {
    // Legacy (bs3) tabs: li.active > a
    // New (bs4+) tabs: li.nav-item > a.active.nav-link
    var legacy = $(this).closest(".nav").find("li:not(.dropdown).active > a").length > 0;
    var plugin = legacy ? legacyTabPlugin : newTabPlugin;
    plugin.call($(this), config);
  }

  var noconflict = $.fn.tab;
  $.fn.tab = TabPlugin;
  $.fn.tab.Constructor = newTabPlugin.Constructor;
  $.fn.tab.noConflict = function() {
    $.fn.tab = noconflict;
    return TabPlugin;
  };
});
;
$(function () {
  var url = new URL(window.location.href);
  var toMark = url.searchParams.get("q");
  var mark = new Mark("main");
  if (toMark) {
    mark.mark(toMark, {
      accuracy: {
        value: "complementary",
        limiters: [",", ".", ":", "/"],
      }
    });
  }

  // Activate popovers
  $('[data-toggle="popover"]').popover({
    container: 'body',
    html: true,
    trigger: 'focus',
    placement: "top",
    sanitize: false,
  });
  $('[data-toggle="tooltip"]').tooltip();
})

// Search ----------------------------------------------------------------------

var fuse;

$(function () {
  // Initialise search index on focus
  $("#search").focus(async function(e) {
    if (fuse) {
      return;
    }

    $(e.target).addClass("loading");

    var response = await fetch('search.json');
    var data = await response.json();

    var options = {
      keys: ["heading", "text", "code"],
      ignoreLocation: true,
      threshold: 0.1,
      includeMatches: true,
      includeScore: true,
    };
    fuse = new Fuse(data, options);

    $(e.target).removeClass("loading");
  });

  // Use algolia autocomplete
  var options = {
    autoselect: true,
    debug: true,
    hint: false,
    minLength: 2,
  };

  $("#search").autocomplete(options, [
    {
      name: "content",
      source: searchFuse,
      templates: {
        suggestion: (s) => {
          if (s.chapter == s.heading) {
            return `${s.chapter}`;
          } else {
            return `${s.chapter} /<br> ${s.heading}`;
          }
        },
      },
    },
  ]).on('autocomplete:selected', function(event, s) {
    window.location.href = s.path + "?q=" + q + "#" + s.id;
  });
});

var q;
async function searchFuse(query, callback) {
  await fuse;

  var items;
  if (!fuse) {
    items = [];
  } else {
    q = query;
    var results = fuse.search(query, { limit: 20 });
    items = results
      .filter((x) => x.score <= 0.75)
      .map((x) => x.item);
  }

  callback(items);
}

// Copy to clipboard -----------------------------------------------------------

function changeTooltipMessage(element, msg) {
  var tooltipOriginalTitle=element.getAttribute('data-original-title');
  element.setAttribute('data-original-title', msg);
  $(element).tooltip('show');
  element.setAttribute('data-original-title', tooltipOriginalTitle);
}

$(document).ready(function() {
  if(ClipboardJS.isSupported()) {
    // Insert copy buttons
    var copyButton = "<button type='button' class='btn btn-copy' title='Copy to clipboard' aria-label='Copy to clipboard' data-toggle='popover' data-placement='top' data-trigger='hover'><i class='bi'></i></button>";
    $(copyButton).appendTo("div.sourceCode");
    // Initialize tooltips:
    $('.btn-copy').tooltip({container: 'body', boundary: 'window'});

    // Initialize clipboard:
    var clipboard = new ClipboardJS('.btn-copy', {
      text: function(trigger) {
        return trigger.parentNode.textContent;
      }
    });

    clipboard.on('success', function(e) {
      const btn = e.trigger;
      changeTooltipMessage(btn, 'Copied!');
      btn.classList.add('btn-copy-checked');
      setTimeout(function() {
        btn.classList.remove('btn-copy-checked');
      }, 2000);
      e.clearSelection();
    });

    clipboard.on('error', function() {
      changeTooltipMessage(e.trigger,'Press Ctrl+C or Command+C to copy');
    });
  };
});
;
