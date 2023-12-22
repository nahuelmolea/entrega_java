

/* CAPTURAR LOS ELEMENTOS HTML */
//cambie .querySelector por .getElementById
const cantidad = document.getElementById('cantidad');
const categoria = document.getElementById('categoria');
const totalCompra = document.getElementById('totalCompra');
const btnResumen = document.getElementById('btnResumen');
const  btnBorrar = document.getElementById('btnBorrar');

// /* BOTON RESUMEN */
function calcular(){

 let compra = cantidad.value*200;

 if(categoria.value ==="estudiante"){

    let descuento = compra -(compra*0.8);
     totalCompra.innerHTML=`Total a Pagar: $ ${descuento}`;
    }
    else if(categoria.value ==="trainee"){
        //categoria: "Trainee"
        let descuento = compra -(compra*0.5);
        totalCompra.innerHTML=`Total a Pagar: $ ${descuento}`;
        }
    else if(categoria.value ==="junior"){

        let descuento = compra -(compra*0.15);
        totalCompra.innerHTML=`Total a Pagar: $ ${descuento}`;
        }
    
}

// /*BOTON BORRAR */
function borrar(){
    totalCompra.innerHTML="Total A Pagar: $";
}