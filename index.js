//Fetch entire data set from spacex API
function getList() {
    fetch("https://api.spacexdata.com/v3/launches/")
    .then(response => response.json())
    .then(result => populateList(result))
    .catch(error => console.log('error', error));
}

//Fetch image of the day from NASA API
function fetchNasaImage() {
    fetch("https://api.nasa.gov/planetary/apod?api_key=41FHuXEuM9EyGLwF1vhwsG58cBsKs6EdwFONWedh")
    .then(response => response.json())
    .then(result => backgroundImage(result))
}

//Take image url from NASA fetch and set it as background image
function backgroundImage(result) {
//    let picURL = result.url

   if (result.url.includes('youtube')) {
        picURL = "space-photo.jpg"    
    } else {
        picURL = result.url
    }

    // let nasaImage = `background-image: url(${picURL});
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: cover;
    // background-position-y: inherit;`

    let nasaImage = `background: url(${picURL}) no-repeat center center fixed; background-size: cover`
    
    $('#body').attr('style', nasaImage)
    appendFooter(result)
}

//Take result from NASA fetch and run append functions
function appendFooter(result) {
    let title = result.title
    let photographer = result.copyright
    if (photographer === undefined) {
        appendFooterWithoutPhotographer(title)
    } else {
        appendFooterWithPhotographer(title, photographer)
    }
}

//Display footer if Photographer's name is not listed in API (to avoid webpage displaying "null")
function appendFooterWithoutPhotographer(title) {
    $('footer').append(
        `<p><i>${title}</i> provided by <a href="http://apod.nasa.gov/apod/astropix.html" target=blank>Astronomy Picture of the Day</a></p>`
    )
}

//Display footer if Photographer's name is included
function appendFooterWithPhotographer(title, photographer) {
    $('footer').append(
        `<p>"${title}" by ${photographer}, provided by <a href="http://apod.nasa.gov/apod/astropix.html" target=blank>Astronomy Picture of the Day</a></p>`
    )
 }

//Create list upon page load as a result of Space X fetch
function populateList(result) {
    let dataSet = result
    for (let i = 0; i < result.length; i++) {
        $('#select-flight').append(
            `<option value="${result[i].flight_number}">${result[i].flight_number}</option>`);
    };
    getFlightStats(dataSet)
}

//Define variables for results card
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
            displayAllFlightInfo(flightNum, missionName, rocketName, launchSuccess, image, location, videoId)
        } else if (flightSelect >= 96)  {
            dislpayLimitedFlightInfo(flightNum, missionName, rocketName)
        }

        $('.results-container').removeClass('hidden')
        $('#card-info').append(html)
    });
}

//Display results card including all available information
function displayAllFlightInfo(flightNum, missionName, rocketName, launchSuccess, image, location, videoId) {
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
}

//Display results card with reduced information, to avoid results card displaying "null" for values that don't exist within the API
function dislpayLimitedFlightInfo(flightNum, missionName, rocketName) {
    html = `
        <h2>Flight no. ${flightNum}</h2>
        <h3>Mission: ${missionName}</h3>
        <p>Rocket name: ${rocketName}</p>
        <p class="error-message">Complete info not available</p>
        `
    $('#card-info').empty()
    $('#card-video').addClass('hidden')       
}

$(getList())
$(fetchNasaImage())