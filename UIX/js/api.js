const API_URL = "http://chemicals-core-api-ageyc7esd7atezdd.centralus-01.azurewebsites.net";

async function apiRequest(path, method="GET", body=null) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + path, {
        method,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        },
        body: body ? JSON.stringify(body) : null
    });

    if(res.status===401){
        logout();
        throw "Unauthorized";
    }

    if(!res.ok) throw "API error";

    return await res.json();
}