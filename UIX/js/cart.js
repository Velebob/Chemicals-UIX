let cart = [];

/* =========================
NORMALIZADOR
========================= */
function normalizeLot(l){
    return {
        lot_number: l.lot_number,
        descripcion: l.descripcion || l.description || "",
        cantidad: l.cantidad || 1,
        flags: l.flags || {}
    };
}

/* =========================
ADD TO CART
========================= */
function addToCart(lot){

    const l = normalizeLot(lot);

    let mensajes = [];

    if(l.flags?.es_caducado){
        mensajes.push("⛔ Lote caducado");
    }

    if(l.flags?.por_caducar){
        mensajes.push("⚠️ Próximo a caducar");
    }

    if(l.flags?.programa_mismatch){
        mensajes.push("🔀 Programa no coincide");
    }

    if(l.flags?.no_en_erp){
        mensajes.push("❓ No existe en ERP");
    }

    if(mensajes.length){
        alert(mensajes.join("\n"));
    }

    const f = cart.find(x => x.lot_number === l.lot_number);

    if(f){
        f.cantidad++;
    } else {
        cart.push({
            lot_number: l.lot_number,
            descripcion: l.descripcion,
            cantidad: 1
        });
    }

    renderCart();
}

/* =========================
CLEAR CART
========================= */
window.clearCart = function(){
    cart = [];
    renderCart();
};

/* =========================
RENDER
========================= */
function renderCart(){
    const div = document.getElementById("cart");
    div.innerHTML = "";

    cart.forEach((i,idx)=>{
        const d = document.createElement("div");

        d.innerHTML = `
            <div class="cart-item">
                <b>${i.lot_number}</b><br>
                ${i.descripcion}
        
                <div class="cart-controls">
                    <button onclick="dec(${idx})">-</button>
        
                    <input 
                        type="number" 
                        value="${i.cantidad}" 
                        min="1"
                        onchange="setQty(${idx}, this.value)"
                    >
        
                    <button onclick="inc(${idx})">+</button>
                </div>
            </div>
        `;

        div.appendChild(d);
    });
}

/* =========================
CONTROLES
========================= */
function inc(i){
    cart[i].cantidad++;
    renderCart();
}

function dec(i){
    if(cart[i].cantidad > 1){
        cart[i].cantidad--;
    }
    renderCart();
}

function setQty(i,val){
    const n = parseFloat(val);
    if(n > 0){
        cart[i].cantidad = n;
    }
    renderCart();
}
