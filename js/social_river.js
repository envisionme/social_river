Drupal.behaviors.social_river = function() {
  'use strict';

  var count = 0,
      settings = {};

  if (Drupal.settings.social_river) {
    settings = Drupal.settings.social_river;

    Date.prototype.toISO8601 = function(date) {
        var pad = function (amount, width) {
            var padding = '';
            while (padding.length < width - 1 && amount < Math.pow(10, width - padding.length - 1))
                padding += '0';
            return padding + amount.toString();
        }
        date = date ? date : new Date();
        var offset = date.getTimezoneOffset();
        return pad(date.getFullYear(), 4)
            + '-' + pad(date.getMonth() + 1, 2)
            + '-' + pad(date.getDate(), 2)
            + 'T' + pad(date.getHours(), 2)
            + ':' + pad(date.getMinutes(), 2)
            + ':' + pad(date.getUTCSeconds(), 2)
            + (offset > 0 ? '-' : '+')
            + pad(Math.floor(Math.abs(offset) / 60), 2)
            + ':' + pad(Math.abs(offset) % 60, 2);
      };

    $('#social_river').lifestream({
      limit: settings.feed_limit,
      list: settings.service_list,
      feedloaded: function(){
        count++;
        // Check if all the feeds have been loaded
        if( count === settings.service_list.length ){
          $('#social_river li').each(function(){
            var element = $(this),
                date = new Date(element.data('time'));
            element.append('<abbr class="timeago" title="' + date.toISO8601(date) + '">' + date + '</abbr>');
          })
          if(jQuery().timeago) {
            $('#social_river .timeago').timeago();
          }
        }
      }
    });
  }
};
