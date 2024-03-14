function getCharactersList(membershipType, membershipID) {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "bungled=2342621163030745343; bungledid=B21cCyjpVY9Gu3DIXh9NRdhMmHxy5kLcCAAA; bungleanon=sv=BAAAAACTdAAAAAAAAD0FEAAAAAAAAAAAAAAAAABMmHxy5kLcCEAAAAAQCe4+1/0tWVaRRdIn8i292BjWfyd/f0jwS8MjJ97Q+vPIpqLCDBS3w5xV+XOKkmndRRddcLuec2caZrQdSmLM&cl=MC4yOTg0My4xMDQ5OTE7; __cflb=0H28vP5GxS7vgVH4MZT6rB7QcDNQ8jpmCvaeropT939");
    myHeaders.append("X-API-Key", 'de1f8d237c5148afafe513982223d5b6');

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipID}/?components=100`, requestOptions)
        .then(response => response.text())
        .then(result => {
            var json = JSON.parse(result);
            
            return json.Response.profile.data.characterIds;
        })
        .catch(error => {
            console.log('error', error);
            return -1;
        });
}
