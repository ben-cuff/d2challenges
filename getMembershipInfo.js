/** 
 * This function takes a string input, which is the user's Bungie name and tag, 
 * and returns an array of integers, which are the user's membershipID.
 * 
 * @param inputValue - The user's Bungie name and tag (e.g. "username#1234")
 * @return - The user's Display Name, membershipId, and membershipType as an array
 */


async function getMembershipInfo(inputValue) {

    if (!inputValue.includes("#")) {
        throw new Error("Invalid input format. Please provide the Bungie name and tag in the format 'username#1234'.");
    }

    var name = "";
    var numbers = "";

    for (var i = 0; i < inputValue.length; i++) {
        if (inputValue[i] == "#") {
            name = inputValue.substring(0, i);
            numbers = inputValue.substring(i + 1, inputValue.length);
            if (numbers.length !== 4) {
                throw new Error("Invalid input format. The tag should be a 4-digit number.");
            }
            numbers = parseInt(numbers, 10).toString(); // Remove leading zeros
            break;
        } 
    }





    var myHeaders = new Headers();
    myHeaders.append("Cookie", "bungled=2342621163030745343; bungledid=B21cCyjpVY9Gu3DIXh9NRdhMmHxy5kLcCAAA; bungleanon=sv=BAAAAACTdAAAAAAAAD0FEAAAAAAAAAAAAAAAAABMmHxy5kLcCEAAAAAQCe4+1/0tWVaRRdIn8i292BjWfyd/f0jwS8MjJ97Q+vPIpqLCDBS3w5xV+XOKkmndRRddcLuec2caZrQdSmLM&cl=MC4yOTg0My4xMDQ5OTE3; Q6dA7j3mn3WPBQVV61rt5CrQXv0q+I9ddZfGro+PognXQwjWM8bM6VGC=v1MN5Rgw__qCk; __cflb=0H28vP5GxS7vgVH4MZT6rB7QcDNQ8jpmQGDhrhbNzwu");
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("X-API-Key", 'de1f8d237c5148afafe513982223d5b6');

    var raw = "{\r\n    displayNamePrefix: '" + name + "'\r\n}";

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    var i = 0
    while (true) {
        try {
            const response = await fetch(`https://www.bungie.net/Platform/User/Search/GlobalName/${i}/`, requestOptions);
            const json = await response.json();
            console.log(json);

            for (let j = 0; j < json.Response.searchResults.length; j++) {
                if (json.Response.searchResults[j].bungieGlobalDisplayNameCode == numbers) {
                    console.log("Found!!!!");
                    let arr = [];
                    arr.push(json.Response.searchResults[j].bungieGlobalDisplayName);
                    arr.push(json.Response.searchResults[j].destinyMemberships[0].membershipId);
                    arr.push(json.Response.searchResults[j].destinyMemberships[0].membershipType);
                    return arr;
                }
            }

        } catch (error) {
            return -1;
            console.log('error', error);
        }
        i++
    }
}