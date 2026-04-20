let cart=[];

function addToCart(lot){
    const f=cart.find(x=>x.lot_number===lot);

    if(f) f.cantidad++;
    else cart.push({lot_number:lot,cantidad:1});

    renderCart();
}

function clearCart(){
    cart=[];
    renderCart();
}