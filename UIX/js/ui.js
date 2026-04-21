function mapColor(c){
    return {
        "VERDE":"green",
        "NARANJA":"orange",
        "ROJO":"red",
        "MORADO":"purple"
    }[c] || "green";
}

function renderInventory(lotes){
    const div = document.getElementById("inventory");

    div.innerHTML = `
        <table class="inv-table">
            <thead>
                <tr>
                    <th>Lote</th>
                    <th>Descripción</th>
                    <th>Cant</th>
                    <th>Días</th>
                    <th>Flags</th>
                </tr>
            </thead>
            <tbody id="inv-body"></tbody>
        </table>
    `;

    const tbody = document.getElementById("inv-body");

    lotes.forEach(l=>{
        const tr = document.createElement("tr");

        const colorClass = mapColor(l.estado.color);
        tr.className = colorClass;

        tr.innerHTML = `
            <td>${l.lot_number}</td>
            <td>${l.descripcion}</td>
            <td>${l.cantidad}</td>
            <td>${l.dias_para_caducar ?? ""}</td>
            <td>
                ${l.flags.es_caducado ? "⛔" : ""}
                ${l.flags.por_caducar ? "⚠️" : ""}
                ${l.flags.programa_mismatch ? "🔀" : ""}
                ${l.flags.no_en_erp ? "❓" : ""}
            </td>
        `;

        tr.onclick = ()=> addToCart(l);

        tbody.appendChild(tr);
    });
}

function toast(msg){
    const t=document.createElement("div");
    t.className="toast";
    t.innerText=msg;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),1500);
}
