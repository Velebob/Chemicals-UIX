let cart=[];

function addToCart(lot){

    let mensajes = [];

    if(lot.flags?.es_caducado){
        mensajes.push("⛔ Lote caducado");
    }

    if(lot.flags?.por_caducar){
        mensajes.push("⚠️ Próximo a caducar");
    }

    if(lot.flags?.programa_mismatch){
        mensajes.push("🔀 Programa no coincide");
    }

    if(lot.flags?.no_en_erp){
        mensajes.push("❓ No existe en ERP");
    }

    if(mensajes.length){
        alert(mensajes.join("\n"));
    }

    const f = cart.find(x => x.lot_number === lot.lot_number);

    if(f){
        f.cantidad++;
    } else {
        cart.push({
            lot_number: lot.lot_number,
            descripcion: lot.descripcion,
            cantidad: 1
        });
    }

    renderCart();
}

window.clearCart = function(){
    cart = [];
    renderCart();
};

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
