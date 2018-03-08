$(document).ready(function () {
    $("#submitBTN").on('click', function () {
        event.preventDefault()
        youtubeApiCall()
    })

    function youtubeApiCall() {
        $.ajax({
            cache: false,
            data: $.extend({
                key: 'AIzaSyBELBleJ5s5uOzjgVXJx1nlfI_d6ZsK5Aw',
                q: $("input").val(),
                type: 'video',
                part: 'snippet'
            }, { maxResults: 4 }),
            dataType: 'json',
            type: 'GET',
            timeout: 5000,
            url: 'https://www.googleapis.com/youtube/v3/search'
        })
        .done(function (data) {
            $('.results').empty()
            console.log(data)
            for (i in data.items) {

                // create new div to act as video container
                var vidContainer = $("<div>")
                vidContainer.addClass("vid-container col-lg-4")

                // create iframe for video search result, append to video container
                var newVid = $("<iframe>")
                newVid.attr("frameborder", "0")
                var vidID = data.items[i].id.videoId
                newVid.attr("src", "http://www.youtube.com/embed/" + vidID)
                vidContainer.append(newVid)

                // add title to video container, append to video container
                var vidTitle = data.items[i].snippet.title
                var newTitle = $("<p>")
                newTitle.text(vidTitle)
                vidContainer.append(newTitle)

                // append container to results div
                $(".results").append(vidContainer)
            }
        })
    }
})