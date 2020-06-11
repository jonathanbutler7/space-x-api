// var player

function getList() {
    fetch("https://api.spacexdata.com/v3/launches/")
    .then(response => response.json())
    .then(result => populateList(result))
    .catch(error => console.log('error', error));
}

function fetchNasaImage() {
    fetch("https://api.nasa.gov/planetary/apod?api_key=41FHuXEuM9EyGLwF1vhwsG58cBsKs6EdwFONWedh")
    .then(response => response.json())
    .then(result => backgroundImage(result))
}

function backgroundImage(result) {
    let picURL = result.url
    
    let nasaImage = `background-image: url(${picURL});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 1800px;
    background-position-y: inherit;`
    $('#body').attr('style', nasaImage)
    appendFooter(result)
}

function appendFooter(result) {
    let title = result.title
    let photographer = result.copyright
    if (photographer === undefined) {
        $('footer').append(
            `<p><i>${title}</i> provided by <a href="http://apod.nasa.gov/apod/astropix.html" target=blank>Astronomy Picture of the Day</a></p>`
        )
    } else {
    $('footer').append(
        `<p>"${title}" by ${photographer}, provided by <a href="http://apod.nasa.gov/apod/astropix.html" target=blank>Astronomy Picture of the Day</a></p>`
    )
    }
}

function populateList(result) {
    let dataSet = result
    // console.log(dataSet)
    for (let i = 0; i < result.length; i++) {
        $('#select-flight').append(
            `<option value="${result[i].flight_number}">${result[i].flight_number}</option>`);
    };
    getFlightStats(dataSet)
}

function getFlightStats(dataSet) {
    $('#select-flight').change(function() {
        let flightSelect = $('#select-flight').val()

        let flightInfo = dataSet[flightSelect - 1]
        let flightNum = flightInfo.flight_number
        let missionName = flightInfo.mission_name
        let rocketName = flightInfo.rocket.rocket_name
        let image = flightInfo.links.mission_patch
        let launchSuccess = flightInfo.launch_success
        let videoId = flightInfo.links.youtube_id
        videoId = 'https://www.youtube.com/embed/' + videoId
        let location = flightInfo.launch_site.site_name_long
        if (flightSelect < 96) {

        html = `
            <h2>Flight no. ${flightNum}</h2>
            <div class="info-block">
            <h3>Mission: ${missionName}</h3>
            <p>Rocket name: ${rocketName}</p>
            <p>Mission success: ${launchSuccess}</p>
            </div>
            <img src="${image}" alt="${image}">
            <p>Location: ${location}</p>
        `
        $('#card-video').attr('src', videoId);
        $('#card-info').empty()
        $('#card-video').removeClass('hidden')
        } else {
            html = 
            `<h2>Flight no. ${flightNum}</h2>
            <h3>Mission: ${missionName}</h3>
            <p>Rocket name: ${rocketName}</p>
            <p class="error-message">Complete info not available</p>
            `
            $('#card-info').empty()
            $('#card-video').addClass('hidden')
        }
        
        $('.results-container').removeClass('hidden')
        
        $('#card-info').append(html)
        
    });
}

$(getList())
$(fetchNasaImage())