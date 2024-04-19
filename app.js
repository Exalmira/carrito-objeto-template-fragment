const carrito=document.querySelector('#carrito');
const template=document.querySelector('#template');
const fragment=document.createDocumentFragment();
const btnBotones=document.querySelectorAll('.card .btn');

const carritoObjeto={

};
const agregarAlCarrito=(e)=>{
console.log(e.target.dataset.fruta);//id

const producto={
    titulo:e.target.dataset.fruta,
    id:e.target.dataset.fruta,
    cantidad:1
};
if(carritoObjeto.hasOwnProperty(producto.titulo)){
    producto.cantidad=carritoObjeto[producto.titulo].cantidad +1
}

carritoObjeto[producto.titulo]=producto
// console.log(carritoObjeto);
pintarCarrito(producto)
};

const pintarCarrito=(producto)=>{
    carrito.textContent="";
    // console.log('pintar carrito',producto)
    Object.values(carritoObjeto).forEach(item=>{
        const clone = template.content.firstElementChild.cloneNode(true)
        clone.querySelector('.lead').textContent=item.titulo
        clone.querySelector('.badge').textContent=item.cantidad
        fragment.appendChild(clone)
    })
carrito.appendChild(fragment)

};
 btnBotones.forEach((btn)=>btn.addEventListener("click",agregarAlCarrito));//agregar eventos a cada boton 
