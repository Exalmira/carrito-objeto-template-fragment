const carrito = document.querySelector('#carrito');
const template = document.querySelector('#template');
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('templateFooter');
const fragment = document.createDocumentFragment();
//delegación de eventos (botones)
document.addEventListener('click',(e)=>{
//console.log(e.target.matches(".card .btn-outline-primary"));
if(e.target.matches(".card .btn-outline-primary")){
//  console.log("ejecutar agregar al carro")
 agregarAlCarrito(e)
}

// console.log(e.target.matches(".list-group-item .btn-success"));
if(e.target.matches(".list-group-item .btn-success")){
btnAumentar(e)
}

if(e.target.matches(".list-group-item .btn-danger")){
    btnDisminuir(e)
    }

});

let carritoObjeto=[];

const agregarAlCarrito=(e)=>{
// console.log(e.target.dataset.fruta);//id

const producto={
    titulo:e.target.dataset.fruta,
    id:e.target.dataset.fruta,
    cantidad:1,
    precio:parseInt(e.target.dataset.precio),
};
// console.log(producto);
const index= carritoObjeto.findIndex(
(item)=>item.id===producto.id
);

// console.log(index);

if(index=== -1){
    carritoObjeto.push(producto);
}else{
    carritoObjeto[index].cantidad++
    // carritoObjeto[index].precio = carritoObjeto[index].cantidad*producto.precio
}
console.log(carritoObjeto)

// carritoObjeto[producto.titulo]=producto


pintarCarrito();

};

const pintarCarrito=()=>{
    carrito.textContent="";
    // console.log('pintar carrito',producto)
   carritoObjeto.forEach(item=>{
        const clone = template.content.cloneNode(true);
        clone.querySelector('.text-white .lead').textContent=item.titulo;
        clone.querySelector('.badge').textContent=item.cantidad;
        clone.querySelector('div .lead span').textContent=item.precio*item.cantidad
        clone.querySelector('.btn-danger').dataset.id=item.id
        clone.querySelector('.btn-success').dataset.id=item.id// saber que elemento se captura
        
        fragment.appendChild(clone)
    });
carrito.appendChild(fragment)
pintarFooter();
};

const pintarFooter=()=>{
    console.log("pintar footer");
    footer.textContent=""
    const total=carritoObjeto.reduce(
        (acc,current)=> acc+ current.cantidad*current.precio,0
    );
    //console.log(total);
    const clone= templateFooter.content.cloneNode(true);
    clone.querySelector('span').textContent=total
    footer.appendChild(clone);
}

const btnAumentar=(e)=>{
    console.log("me diste click",e.target.dataset.id);
    carritoObjeto=carritoObjeto.map(item=>{
        if(item.id=== e.target.dataset.id){
            item.cantidad++
        }
        return item
    });
    pintarCarrito();
};

const btnDisminuir=(e)=>{
    console.log("me diste click",e.target.dataset.id);
    carritoObjeto=carritoObjeto.filter(item=>{
        if(item.id=== e.target.dataset.id){
           if(item.cantidad>0){
            item.cantidad--
            if(item.cantidad===0)return
            return item
           }
        }else{ return item}
        
    });
   pintarCarrito();
};


//  btnBotones.forEach((btn)=>btn.addEventListener("click",agregarAlCarrito));//agregar eventos a cada boton 
