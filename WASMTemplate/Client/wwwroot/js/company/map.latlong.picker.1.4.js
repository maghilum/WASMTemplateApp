export function initMap(container, prefexTag, outValue, defLat = 8.55387619375953, defLong = 125.94693580091435, searchElem = "pac-search", enableOutVal = false, enableSearch = false, enablePickLoc = false) {
    const myLatlng = { lat: defLat, lng: defLong };
    const icon = {
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35),
    };

    const map = new google.maps.Map(document.getElementById(container), {
        zoom: 15,
        center: myLatlng,
    });

    if (enableOutVal) {
        document.getElementById(outValue).value = myLatlng.lat + "," + myLatlng.lng;
    }

    var infoWindow = new google.maps.InfoWindow({ position: myLatlng });
    infoWindow.setContent(
        '<i class="fad fa-store"></i> ' + prefexTag + " <br/> <a target='_blank' style='margin-left: 19.5px;text-decoration: none;' href='https://www.google.com/maps/place/" + prefexTag + "/@" + defLat + "," + defLong +",15z'>View on Google Maps</a>"
    );
    
    var oMarker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: prefexTag,
        position: myLatlng,
    });

    infoWindow.open(map, oMarker);

    google.maps.event.addListener(oMarker, 'click', function () {
        infoWindow.open(map, oMarker);
    });

    if (enableSearch) {
        const input = document.getElementById(searchElem);
        const searchBox = new google.maps.places.SearchBox(input);

        /*map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);*/

        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];

        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach((marker) => {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();

            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                // Create a marker for each place.
                markers.push(
                    new google.maps.Marker({
                        map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location,
                    })
                );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }

    if (enablePickLoc) {
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
            // Close the current InfoWindow.
            infoWindow.close();

            // Create a new InfoWindow.
            infoWindow = new google.maps.InfoWindow({
                position: mapsMouseEvent.latLng,
            });

            infoWindow.setContent(
                '<i class="fad fa-store"></i> ' + prefexTag /*+ " (" + mapsMouseEvent.latLng.lat() + "," + mapsMouseEvent.latLng.lng() + ")"*/
            );

            infoWindow.open(map);

            document.getElementById(outValue).value = mapsMouseEvent.latLng.lat() + "," + mapsMouseEvent.latLng.lng();

            //setTimeout(function () {
            //    $(".gm-ui-hover-effect").remove();
            //}, 50);
        });
    }
}

export function getLatLongValue(outValueID) {
    return document.getElementById(outValueID).value;
}

export async function getReverseGeocodingData(lat, lng) {
    return new Promise(resolve => {
        var latlng = new google.maps.LatLng(lat, lng);
        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, (results, status) => {
            if (status !== google.maps.GeocoderStatus.OK) {
                resolve('');
            }
            // This is checking to see if the Geoeode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
                var address = (results[0].formatted_address);
                resolve(address);
            }
        }); 
    });
}

export let Geolocation = {

    getCurrentPosition: async function (options) {
        var result = { position: null, error: null };
        var getCurrentPositionPromise = new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject({ code: 0, message: 'This device does not support geolocation.' });
            } else {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            }
        });

        await getCurrentPositionPromise.then(
            (position) => { this.mapPositionToResult(position, result) }
        ).catch(
            (error) => { this.mapErrorToResult(error, result) }
        );

        //console.log(result.position.coords);
        return result.position.coords;
    },

    mapPositionToResult: function (position, result) {
        result.position = {
            coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude,
                accuracy: position.coords.accuracy,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                speed: position.coords.speed
            },
            timestamp: position.timestamp
        }
    },

    mapErrorToResult: function (error, result) {
        result.error = {
            code: error.code,
            message: error.message
        }
    }

}