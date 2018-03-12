$(document).ready(function () {

    $("#submitBTN").on('click', function () {
        if ($("#search").val()) {
            event.preventDefault()
            fetchEvents()
        }
    })

    function fetchEvents() {
        $.ajax({
            type: "GET",
            url: "https://app.ticketmaster.com/discovery/v2/events.json?",
            data: {
                apikey: "o6J3jBABhcb5ppZPQggVw453G8JGuwPg",\
                // countryCode: "US"
                async: true,
                keyword: $("#search").val().trim(),
                format: "json"
            },
            dataType: "json",
            success: function (response) {
                console.log(response.page.totalPages)
                $(".event").remove()
                if (response.page.totalPages == 0) {
                    console.log("hi")
                    var errorMessage = $("<p>No Upcoming Events :(</p>").addClass("event")
                    console.log(errorMessage)
                    $(".container").append(errorMessage)
                    return
                }
                $(".event").remove()
                for (var i = 0; i < 5; i++) {
                    console.log(response)
                    var date = response._embedded.events[i].dates.start.localDate
                    var venue = response._embedded.events[i]._embedded.venues[0].name
                    var city = response._embedded.events[i]._embedded.venues[0].city.name
                    var state
                    if (response._embedded.events[i]._embedded.venues[0].hasOwnProperty("state")) {
                        state = response._embedded.events[i]._embedded.venues[0].state.name
                    }
                    var country = response._embedded.events[i]._embedded.venues[0].country.countryCode

                    var url = $("<a>").text("Venue").attr("href", response._embedded.events[i].url)

                    var newDate = $("<p>").text(date).addClass("col-md-4")

                    var text
                    if (state) {
                        text = city + ", " + state + ", " + country
                    } else {
                        text = city + ", " + country
                    }
                    var newLoc = $("<p>").text(text).addClass("col-md-4")

                    var link = url.addClass("col-md-4")

                    var newLine = $("<div>").addClass("row event")
                    newLine.append(newDate)
                    newLine.append(newLoc)
                    newLine.append(link)

                    $(".container").append(newLine)
                }
            }
        })
    }
})