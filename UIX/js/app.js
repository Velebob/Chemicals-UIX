async function loadGavetas(){
    const data=await apiRequest("/gavetas");

    const div=document.getElementById("gavetas");

    data.gavetas.forEach(g=>{
        const d=document.createElement("div");
        d.className="item "+g.estado_dominante.toLowerCase();
        d.innerText=g.codigo;

        d.onclick=()=>{
            localStorage.setItem("gaveta",g.codigo);
            window.location="app.html";
        };

        div.appendChild(d);
    });
}

async function initApp(){
    requireAuth();

    const g=localStorage.getItem("gaveta");

    document.getElementById("title").innerText="Gaveta: "+g;

    await loadInventario();
    initScanner();
}

async function loadInventario(){
    const g=localStorage.getItem("gaveta");

    const data=await apiRequest("/inventario/"+g);

    renderInventory(data.lotes);
}

async function salida(){
    const g=localStorage.getItem("gaveta");

    await apiRequest("/salida","POST",{gaveta:g,items:cart});

    clearCart();
    loadInventario();
}

async function entrada(){
    const g=localStorage.getItem("gaveta");

    await apiRequest("/entrada","POST",{gaveta:g,items:cart});

    clearCart();
    loadInventario();
}