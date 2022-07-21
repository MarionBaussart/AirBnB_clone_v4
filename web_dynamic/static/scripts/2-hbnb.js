#!/usr/bin/node

/*
JavaScript script that check api status and add the class available
to the div#api_status if the status is “OK”.
Otherwise, remove the class available to the div#api_status
URL: http://0.0.0.0:5001/api/v1/status/
Use the JQuery API
*/

const url = 'http://0.0.0.0:5001/api/v1/status/';

document.addEventListener('DOMContentLoaded',  async function () {
    const status = await $.getJSON(url, (data) => {
        if (data.status === 'OK') {
            $('#api_status').addClass("available");
        } else {
            $('#api_status').removeClass("available");
        }
    });


});
