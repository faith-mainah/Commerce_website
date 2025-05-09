document.cookie = "orderId=0; path=/;";

let httpRequest = new XMLHttpRequest(),
    jsonArray,
    method = "GET",
    jsonRequestURL = "https://5d76bf96515d1a0014085cf9.mockapi.io/order";

httpRequest.open(method, jsonRequestURL, true);

httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        jsonArray = JSON.parse(httpRequest.responseText);
        console.log(jsonArray);

        jsonArray.push({
            "id": jsonArray.length + 1, 
            "amount": 200, 
            "product": ["userOrder"]
        });

        const postRequest = new XMLHttpRequest();
        postRequest.open("POST", jsonRequestURL, true);
        postRequest.setRequestHeader("Content-Type", "application/json");
        postRequest.onreadystatechange = function () {
            if (postRequest.readyState == 4 && postRequest.status == 201) {
                console.log("Order added successfully!");
            }
        };

        postRequest.send(JSON.stringify(jsonArray));
    }
};

httpRequest.send(null);
