#!/usr/bin/node

/*
JavaScript script for AirBnB clone
URL: http://0.0.0.0:5001/api/v1/places_search/
Use the JQuery API
*/

const amenityName = [];
const amenityId = [];
const stateName = [];
const stateId = [];
const cityName = [];
const cityId = [];

document.addEventListener('DOMContentLoaded', async function () {

    const checkAmenities = function () {
    // listen for changes on each amenities input checkbox tag
        window.$('.amenities .popover li input:checkbox').change(function() {
            if (window.$(this).is(':checked')) {
                amenityName.push($(this).attr('data-name'));
                amenityId.push($(this).attr('data-id'));
            } else {
                amenityName.splice(amenityName.indexOf($(this).attr('data-name')), 1);
                amenityId.splice(amenityId.indexOf($(this).attr('data-id')), 1);
            }
            amenityName.sort();
            if (amenityName.length === 0) {
                $('.amenities h4').html('&nbsp;');
            } else {
                $('.amenities h4').html(amenityName.join(', '));
            }
            console.log(amenityName);
        });
    };

    const checkStates = function () {
        // listen for changes on each states input checkbox tag
        window.$('.locations .popover ul li input:checkbox').change(function() {
            if (window.$(this).is(':checked')) {
                stateName.push($(this).attr('data-name'));
                stateId.push($(this).attr('data-id'));
            } else {
                stateName.splice(stateName.indexOf($(this).attr('data-name')), 1);
                stateId.splice(stateId.indexOf($(this).attr('data-id')), 1);
            }
            stateName.sort();
            // if (stateName.length === 0) {
            //     $('.locations h4').html('&nbsp;');
            // } else {
            //     $('.locations h4').html(stateName.join(', '));
            // }
            // console.log(stateName);
        });
    };

    const checkCities = function () {
        // listen for changes on each cities input checkbox tag
        window.$('.locations .popover li ul li input:checkbox').change(function() {
            if (window.$(this).is(':checked')) {
                cityName.push($(this).attr('data-name'));
                cityId.push($(this).attr('data-id'));
            } else {
                cityName.splice(cityName.indexOf($(this).attr('data-name')), 1);
                cityId.splice(cityId.indexOf($(this).attr('data-id')), 1);
            }
            cityName.sort();
            if (cityName.length === 0) {
                $('.locations h4').html('&nbsp;');
            } else {
                $('.locations h4').html(cityName.join(', '));
            }
            console.log(cityName);
        });
    };

    const checkApiStatus = async function () {
        // check api status and add the class available
        const url = 'http://localhost:5001/api/v1/status/';
        const status = await $.getJSON(url, (data) => {
            if (data.status === 'OK') {
                $('#api_status').addClass("available");
            } else {
                $('#api_status').removeClass("available");
            }
        });
    };

    const displayPlaces = async function (amenitiesFilter = [], statesFilter = [], citiesFilter = []) {
        // display places filtered by States, Cities and Amenities
        let response = await fetch('http://localhost:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amenities: amenitiesFilter,
                                   states: statesFilter,
                                   cities: citiesFilter })

        })

        let resUsers = await fetch('http://localhost:5001/api/v1/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {}
        })

        response.json().then(data => {
            const places = Object.values(data);
            resUsers.json().then(dataUser => {
                const users = Object.values(dataUser);
                let userName = '';

                $('.places').empty();
                for (const place of places) {
                    // get the user name
                    for (const user of users) {
                        if (user.id === place.user_id) {
                            userName = user.first_name + ' ' + user.last_name;
                        }
                    }
                    //

                    const infos = {
                        guests: "Guest",
                        rooms: "Bedroom",
                        bathrooms: "Bathroom",
                    }
                    if (place.max_guest !== 1)
                        infos.guests = "Guests";
                    if (place.number_rooms !== 1)
                        infos.rooms = "Bedrooms";
                    if (place.number_bathrooms !== 1)
                        infos.bathrooms = "Bathrooms";

                    const article = `
                        <article>
                            <div class="title_box">
                                <h2>${ place.name }</h2>
                                <div class="price_by_night">$${ place.price_by_night }</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${ place.max_guest } ${ infos.guests }</div>
                                <div class="number_rooms">${ place.number_rooms } ${ infos.rooms }</div>
                                <div class="number_bathrooms">${ place.number_bathrooms } ${ infos.bathrooms }</div>
                            </div>
                            <div class="user">
                                <b>Owner:</b> ${ userName }
                            </div>
                            <div class="description">
                                ${ place.description }
                            </div>
                        </article>
                    `
                    $('.places').append(article);
                }
            });
        });
    };

    checkStates();
    checkCities();
    checkAmenities();
    checkApiStatus();
    displayPlaces(amenityId, stateId, cityId);
    $('button').on('click', () => {
        displayPlaces(amenityId, stateId, cityId);
    });
});
