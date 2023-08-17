/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var carrito=null;

function CargarInicio(){
    carrito=JSON.parse(localStorage.getItem("carrito"));
    if(carrito===null){
        carrito=new Object();
    }
}

function Actualizar(){
    localStorage.removeItem("carrito");
    localStorage.setItem('carrito',JSON.stringify(carrito));
}

function anyadirCarrito(codigo,descripcion,precio,imagen){
    descripcion.toString();
    var i,encontrado=0;
    for(i in carrito){
        if(carrito[i].id===codigo){
            carrito[i].cantidad++;
            encontrado=1;
            break;
        }
    }
    if(encontrado===0){
      var producto=new Object();
      producto.id=codigo;
      producto.nombre=descripcion;
      producto.cantidad=1;
      producto.precio=precio;
      producto.imagen=imagen;
      carrito[codigo]=producto;
    }
    Actualizar();
}

function modoficarCantidad(codigo,cantidad){

    var i;
    for(i in carrito){
        if(i === codigo){
            if(cantidad <= 0){
                delete carrito[i];
            }
            else{
                carrito[i].cantidad = parseInt(cantidad);
            }
            
            break;
        }
    }
    
    Actualizar();
}

function borrarCarrito(codigo){
    modificarCantidad(codigo,0);
}

//A CAMBIAR!
function borrarCarritoCompleto(){
    var i;
    for(i in carrito){
        delete carrito[i];
    }
    
    Actualizar();

}

function numCarrito(){
    var i;
    var numCarrito;
    for(i in carrito){
        numCarrito=parseInt(carrito[i].cantidad);
    }
    alert(numCarrito);
    document.getElementById("num_Carrito").innerHTML = numCarrito;
}

function mostrarCarrito(){
    let x, text="",precio_actual=0,total=0;
    text += "<table>";
    text += "<tr>";
        text += "<th>Producto</th>";
        text += "<th>Cantidad</th>";
        text += "<th>Total</th>";
    text += "</tr>";
    
    text+="<tbody>";
    for(x in carrito){
        text += "<tr>";
            text += "<td>";
                text += "<div class='info-carrito'>";
                    text += "<div>";
                        text += "<img src="+carrito[x].imagen+ " alt=''>";
                        text += "<p>"+carrito[x].descripcion+"</p>";
                        text += "<small>Precio:$"+carrito[x].precio+"</small>";
                        text += "<br>";
                        text += "<a href=''>Borrar</a>";
                    text += "</div>";
                text += "</div>";
            text += "</td>";
            text += "<td><input type='number' value="+carrito[x].cantidad+"></td>";
            text += "<td>$5</td>";
        text += "</tr>";
        precio_actual = parseInt(carrito[x].cantidad)*parseFloat(carrito[x].precio);
        total += precio_actual;
    }
    text +="</tbody>";
    text +="</table>";
    
    text +="<div class='precio-total'>";
        text +="<table>";
            text +="<tr>";
                text +="<td>Sub-Total</td>";
                text +="<td>$"+total+"</td>";
            text +="</tr>";
            
            text +="<tr>";
                text +="<td>Impuestos</td>";
                text +="<td>$2</td>";
            text +="</tr>";
                
            text +="<tr>";
                text +="<td>Total</td>";
                text +="<td>$22</td>";
            text +="</tr>";
        text +="</table>";
    text +="</div>";
    return text;
}