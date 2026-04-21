let cart=[];

function addToCart(lot){
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

function clearCart(){
    cart=[];
    renderCart();
}

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
