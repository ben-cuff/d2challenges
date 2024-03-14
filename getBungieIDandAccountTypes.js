/** 
 * This function takes a string input, which is the user's Bungie name and tag, 
 * and returns an array of integers, which are the user's membershipId and membershipType.
 * 
 * @param inputValue - The user's Bungie name and tag (e.g. "username#1234")
 * @return - The user's membershipId and membershipType as an array of integers (e.g. [membershipId, membershipType, membershipId, membershipType,...])
 */


function getBungieIDandAccountTypes(inputValue) {
    var name = "", numbers = "";
    for (var i = 0; i < inputValue.length; i++) {
        if (inputValue[i] == "#") {
            name = inputValue.substring(0, i);
            numbers = inputValue.substring(i + 1, inputValue.length);
        }
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-Key", 'de1f8d237c5148afafe513982223d5b6');

    var raw = JSON.stringify({
        displayName: name,
        displayNameCode: numbers
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1/", requestOptions)
        .then(response => response.json())
        .then(data => {
            // Create an empty array to store the result
            var result = [];

            console.log(data);

            // Iterate through the response data
            for (var i = 0; i < data.Response.length; i++) {
                // Get the membershipId and membershipType from each response item
                var membershipId = parseInt(data.Response[i].membershipId);
                var membershipType = parseInt(data.Response[i].membershipType);

                // Push the membershipId and membershipType as integers to the result array
                result.push(membershipId, membershipType);
            }
            console.log(result);
            // Return the result array
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return [];
        });
}