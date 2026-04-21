function mapColor(c){
    return {
        "VERDE":"green",
        "NARANJA":"orange",
        "ROJO":"red",
        "MORADO":"purple"
    }[c] || "green";
}

function renderCart(){
    const div = document.getElementById("cart");
    div.innerHTML = "";

    cart.forEach(i=>{
        const d = document.createElement("div");
        d.innerText = `${i.lot_number} - ${i.descripcion} (${i.cantidad})`;
        div.appendChild(d);
    });
}

function renderInventory(lotes){
    const div=document.getElementById("inventory");
    div.innerHTML="";

    lotes.forEach(l=>{
        const d=document.createElement("div");
        d.className="item "+l.estado.color.toLowerCase();

        d.innerHTML=`
            <b>${l.lot_number}</b><br>
            ${l.descripcion}<br>
            ${l.cantidad}
        `;

        div.appendChild(d);
    });
}

function toast(msg){
    const t=document.createElement("div");
    t.className="toast";
    t.innerText=msg;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),1500);
}
