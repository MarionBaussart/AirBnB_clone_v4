#!/usr/bin/node

/*
JavaScript script that check api status and add the class available
to the div#api_status if the status is “OK”.
Otherwise, remove the class available to the div#api_status
URL: http://0.0.0.0:5001/api/v1/status/
Use the JQuery API
*/

const status = require("statuses");

const $ = window.$;
const url = 'http://localhost:5001/api/v1/status/';

document.addEventListener('DOMContentLoaded', function () {
    const status = $.getJSON(url, function (data) {
        $('#api_status').text(data.status);
    });

    if (status === 'OK') {
        $('#api_status').addClass("available");
    } else {
        $('#api_status').removeClass("available");
    }
});
