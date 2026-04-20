async function login(username,password){
    const res = await fetch(API_URL + "/login",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({username,password})
    });

    if(!res.ok) throw "login error";

    const data = await res.json();
    localStorage.setItem("token",data.token);

    window.location="gavetas.html";
}

function requireAuth(){
    if(!localStorage.getItem("token")){
        window.location="index.html";
    }
}

function logout(){
    localStorage.clear();
    window.location="index.html";
}