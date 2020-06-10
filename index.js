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
    appendFooter(result)
    // let url = result.url
    
    let nasaImage = `background-image: url(https://apod.nasa.gov/apod/image/2006/OrionMountains_Tabbush_960.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 1500px;
    background-position-y: inherit;`
    $('#body').attr('style', nasaImage);
}

function appendFooter(result) {
    let title = result.title
    let photographer = result.copyright
    $('footer').append(
        `<p>"${title}" by ${photographer}, provided by <a href="http://apod.nasa.gov/apod/astropix.html" target=blank>Astronomy Picture of the Day</a></p>`
    )
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
        // let successDetail = flightInfo.launch_failure_details.reason
        let videoLink = flightInfo.links.video_link
        videoLink = videoLink.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
        console.log(videoLink)
        let date = flightInfo.launch_date_local
        let location = flightInfo.launch_site.site_name
        
        let html = `
            <h2>Flight no. ${flightNum}</h2>
            <h3>Mission: ${missionName}</h3>
            <p>Rocket name: ${rocketName}</p>
            <p>Mission success: ${launchSuccess}</p>
            <img src="${image}" alt="${image}">
            <p>Launch location: ${location}</p>
        `
        // console.log(videoLinkId)
        // onYouTubeIframeAPIReady(videoLinkId)
        // player.loadVideoById(videoLinkId, 5, "small")
        $('#card-video').attr('src', videoLink);
        $('.results-container').removeClass('hidden')
        $('#card-info').empty()
        $('#card-info').append(html)
    });
}



 // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
// function onYouTubeIframeAPIReady() {
//     // var player;
//     player = new YT.Player('ytplayer', {
//         height: '390',
//         width: '640',
//         videoId: 'nxSxgBKlYws',
        
//     events: {
//         'onReady': onPlayerReady,
//         'onStateChange': onPlayerStateChange
//     }
//     });
//     // console.log("Player state is ", player.getPlayerState())
//     // function onPlayerReady(event) {
//     //     event.target.playVideo();
//     //   }
//     function onPlayerReady(event) {
//         var embedCode = event.target.getVideoEmbedCode();
//         event.target.playVideo();
//         if (document.getElementById('embed-code')) {
//           document.getElementById('embed-code').innerHTML = embedCode;
//         }
//       }
  
//       // 5. The API calls this function when the player's state changes.
//       //    The function indicates that when playing a video (state=1),
//       //    the player should play for six seconds and then stop.
//       var done = false;
//       function onPlayerStateChange(event) {
//         if (event.data == YT.PlayerState.PLAYING && !done) {
//           setTimeout(stopVideo, 6000);
//           done = true;
//         }
//       }
//       function stopVideo() {
//         player.stopVideo();
//       }
// }

// function createiFrame() {
//     // 2. This code loads the IFrame Player API code asynchronously.
//     var tag = document.createElement('script');

//     tag.src = "https://www.youtube.com/iframe_api";
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     // 4. The API will call this function when the video player is ready.
    
// }
$(getList())
$(fetchNasaImage())
// $(createiFrame())