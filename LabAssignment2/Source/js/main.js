
// This will initilaze the maps on screen with given some geo locations
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {  //This creates map in a divison with ID "map" with given map properties
        mapTypeControl: false,
        center: {lat: -33.8688, lng: 151.2195}, // map options
        zoom: 13
    });

    new AutocompleteDirectionsHandler(map);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) { // creating a function to calculate the route
    directionsService.route({
        origin: document.getElementById('start').value,   // Takes the value of starting point from text field
        destination: document.getElementById('end').value, // Takes the value of Destination point from tesx field
        travelMode: 'DRIVING'
    }, function(response, status) {          // Function to check response from google server and if ok give directions or alert user
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}



/**
 * @constructor
 */
function AutocompleteDirectionsHandler(map) {  //Function take a map object as input and calculates directions and also auto completes the fields
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');
    this.directionsService = new google.maps.DirectionsService;       // this creates object for Direction services
    this.directionsDisplay = new google.maps.DirectionsRenderer;      // this creates object for Direction Rendering
    this.directionsDisplay.setMap(map);             //This method specifies the map on which directions will be rendered. Pass null to remove the directions from map

    var originAutocomplete = new google.maps.places.Autocomplete(
        originInput, {placeIdOnly: true});
    var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput, {placeIdOnly: true});

    this.setupClickListener('changemode-walking', 'WALKING');
    this.setupClickListener('changemode-transit', 'TRANSIT');
    this.setupClickListener('changemode-driving', 'DRIVING');

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;
    radioButton.addEventListener('click', function() {
        me.travelMode = mode;
        me.route();
    });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
            window.alert("Please select starting and Destination places.");
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });

};

AutocompleteDirectionsHandler.prototype.route = function() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    var me = this;

    this.directionsService.route({
        origin: {'placeId': this.originPlaceId},
        destination: {'placeId': this.destinationPlaceId},
        travelMode: this.travelMode
    }, function(response, status) {
        if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};


function hi() {
    var new1 = document.getElementById("origin-input").value;
    var element = new1;
    var Index_Of_UN = element.search("United States");
    element = element.substring(0, Index_Of_UN);
    var state = element.substring(Index_Of_UN - 4, Index_Of_UN - 2);
    element = element.substring(0, Index_Of_UN - 6);
    var Index_Of_Comma = element.search(",");
    var city = element.substring(Index_Of_Comma + 1, Index_Of_UN - 5);

    url = "https://api.wunderground.com/api/f02e66aa92a32623/conditions/q/" + state + "/" + city + ".json";
    alert(url);
    return url;
}

function hi2() {
    var new1 = document.getElementById("destination-input").value;
    var element = new1;
    var Index_Of_UN = element.search("United States");
    element = element.substring(0, Index_Of_UN);
    var state = element.substring(Index_Of_UN - 4, Index_Of_UN - 2);
    element = element.substring(0, Index_Of_UN - 6);
    var Index_Of_Comma = element.search(",");
    var city = element.substring(Index_Of_Comma + 1, Index_Of_UN - 5);

    url2 = "https://api.wunderground.com/api/f02e66aa92a32623/conditions/q/" + state + "/" + city + ".json";
    alert(url2);
    return url2;
}

angular.module('weather', []).controller('weatherctrl', function($scope, $http) {
        $scope.getWeather = function() {
            url = hi();
            url2 = hi2();
            $http.get(url).success(function(data) {
                console.log(data);
                temp = data.current_observation.temp_f;
                icon = data.current_observation.icon_url;
                weather = data.current_observation.weather;
                console.log(temp);
                $scope.currentweather = {
                    html: "Currently " + temp + " &deg; F and " + weather + ""
                }
                $scope.currentIcon = {
                    html: "<img src='" + icon + "'/>"
                }

            })
            $http.get(url2).success(function(data) {
                console.log(data);
                temp = data.current_observation.temp_f;
                icon = data.current_observation.icon_url;
                weather = data.current_observation.weather;
                console.log(temp);
                $scope.currentweather2 = {
                    html: "Currently " + temp + " &deg; F and " + weather + ""
                }
                $scope.currentIcon2 = {
                    html: "<img src='" + icon + "'/>"
                }

            })
        }
    });







