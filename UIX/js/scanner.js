let scanning=false;

function initScanner(){
    const input=document.getElementById("scanner");

    input.focus();

    input.addEventListener("blur",()=>setTimeout(()=>input.focus(),0));

    input.addEventListener("change",()=>{
        const code=input.value.trim();
        input.value="";
        handleScan(code);
    });
}

function limpiarCodigo(code){
    code = code.trim();

    // quitar prefijo "lt"
    if(code.toLowerCase().startsWith("lt")){
        code = code.substring(2);
    }

    return code;
}

async function handleScan(code){
    try{
        code = limpiarCodigo(code);

        const lote = await apiRequest("/lote/"+code);

        addToCart(lote.lot);
        toast("OK");
    }catch{
        toast("Error lote");
    }
}

function openCamera(){
    document.getElementById("cameraModal").style.display="flex";

    if(scanning) return;

    scanning=true;

    Quagga.init({
        inputStream:{
            type:"LiveStream",
            target:document.querySelector("#scanner-container"),
            constraints:{facingMode:"environment"}
        },
        decoder:{
            readers:["code_128_reader"]
        }
    },err=>{
        if(err){console.log(err);return;}
        Quagga.start();
    });

    Quagga.onDetected(data=>{
        const code=data.codeResult.code;
        stopCamera();
        handleScan(code);
    });
}

function stopCamera(){
    if(scanning){
        Quagga.stop();
        scanning=false;
    }
    document.getElementById("cameraModal").style.display="none";
}

function closeCamera(){
    stopCamera();
}
