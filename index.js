function getList() {
    // $('#select-flight').on('click', function() {
    // let url = "https://api.spacexdata.com/v3/launches/"
    // let response = fetch(url)
    //     console.log(response)

    fetch("https://api.spacexdata.com/v3/launches/")
    .then(response => response.json())
    .then(result => populateList(result))
    .catch(error => console.log('error', error));
    // });
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
        console.log(videoLink)
        let date = flightInfo.launch_date_local
        let location = flightInfo.launch_site.site_name
        
        let html = ''
        html += `
        <div class="results-card">
            <h2>Flight no. ${flightNum}</h2>
            <h3>Mission: ${missionName}</h3>
            <p>Rocket name: ${rocketName}</p>
            <p>Mission success: ${launchSuccess}</p>
            <img src="${image}" alt="${image}">
            <p>Launch location: ${location}</p>
            <p><a href="${videoLink}" target="blank">video link</a></p>
        </div>
        `
        
        $('.results-container').removeClass('hidden')
        $('.results-container').html(html)
    });
}

$(getList())

//listen on the list
//get list()
//populateList
//take list.val()
//search for stats on list.val()
//return stats on list.val()
//create thing with stats and append to section