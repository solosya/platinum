(function ($) {

    $(document).ready(function() {
        var dropdown = function(date) {
            return '<div class="weather-date">' + 
                        '<h1>Weather</h1>' + 
                        '<p>' + date + '</p>' + 
                    '</div>' + 
                    '<div id="weather-panels"></div>';
        }

        var weatherPanel = function(i, icon) {
            return '<div id="weather-' + i + '" class="panel">' +
                        '<div style="width: 180px;">' +
                            '<p class="date"></p>' + 
                            '<p class="location"></p>' + 
                        '</div>' + 
                        '<div style="width: 48px;">' +
                            '<div class="icon weather-' + icon + '"></div>' + 
                        '</div>' + 
                        '<div style="width: 120px;">' +
                            '<div class="temp-desc"></div>' + 
                            '<div class="wind"></div>' + 
                        '</div>' + 
                    '</div>';
            }

        var location = 'Australia/Shepparton';

        console.log(window.Acme.templatePath);

        $.ajax({
            url: 'https://weather.pagemasters.com.au/weather?d=' + location,
            dataType: "json",
            type: 'GET',
            success: function(res) {
                var local = res.data[0];
                var name = local.location.split('/')[1];

                var range = Math.round(local.day_high) + '&#176; - ' + Math.round(local.day_low) + '&#176;'

                $('#weather').html(weatherPanel(1, local.icon));
                $('#weather-1 > div > p.date').text(local.date);
                $('#weather-1 > div > p.location').text(name);
                $('#weather-1 > div > .temp-desc').html(Math.round(local.temperature) + '&#176; ' + local.description);
                $('#weather-1 > div > .wind').html(Math.round(local.wind_speed) + ' km/h | ' + range);

                $('.show-weather').on("click", function () {
                    $('.show-weather').toggleClass('flip');

                    $.ajax({
                        url: 'https://weather.pagemasters.com.au/weather?q=' + location,
                        dataType: "json",
                        type: 'GET',
                        success: function(res) {

                            $('.weather-dropdown').toggleClass('hidden');
                            $('.weather-dropdown').html(dropdown('Thursday, 28th September'));

                            res.data.forEach(function(l) {
                                var name = l.location.split('/')[1];

                                $('#weather-panels').append(weatherPanel(name, l.icon));

                                $('#' + name + '-weather > .location').text(name);
                                $('#' + name + '-weather > .description').text(l.description);
                                $('#' + name + '-weather > div > p.temp').html(Math.round(l.temperature) + '&#176;');
                            })
                        }
                    })
                })


            }
        })
    })

}(jQuery));