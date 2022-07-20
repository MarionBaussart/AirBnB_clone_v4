#!/usr/bin/node

/*
JavaScript script that listen for changes on each input checkbox tag.
Use the JQuery API
*/

const $ = window.$;
const amenityId = [];

document.addEventListener('DOMContentLoaded', function () {
    $('input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {
            amenityId.push($(this).attr('data-name'));
        } else {
            amenityId.splice(amenityId.indexOf($(this).attr('data-name')), 1);
        }
        if (amenityId.length === 0) {
            $('.amenities h4').html('&nbsp;');
        } else {
            $('.amenities h4').html(amenityId.join(', '));
        }
    });
});
