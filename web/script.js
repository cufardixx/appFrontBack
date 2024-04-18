
const elementoFormulario = document.getElementById('guardarTransaccion')
const botonVer = document.getElementById('botonVer')
const divTransacciones = document.getElementById('verTransacciones')


elementoFormulario.addEventListener("submit", (event)=>{
    event.preventDefault()
    let descripcionTransaccion = document.getElementById('descripcionTransaccion').value
    let precioTransaccion = document.getElementById('precioTransaccion').value

    //crear el objeto donde va a estar la info anteriror
    let objetoTransaccion = {descripcionTransaccion: descripcionTransaccion , precioTransaccion:precioTransaccion}
    //transformarlo en un JSON
    let objetoTransaccionJSON = JSON.stringify(objetoTransaccion)
    console.log(objetoTransaccionJSON);

    if(descripcionTransaccion, descripcionTransaccion != ''){
         //envio a esa URL mando un POST con ese cuerpo
        fetch('http://localhost:3000/transaccion', {
        method: 'Post',
        body: objetoTransaccionJSON
    })
    }

    


   
})

botonVer.addEventListener("click", () => {
    fetch('http://localhost:3000/transaccion')
        .then(x => x.json())
        .then(data => {
            // Limpiar los elementos existentes antes de agregar nuevos
            divTransacciones.innerHTML = '';

            data.forEach(transaccion => {
                
                const mostrarTransacciones = document.createElement('ul');

                // Asignar las propiedades de la transacción al texto del elemento 
                mostrarTransacciones.textContent = `Nombre: ${transaccion.descripcionTransaccion}, Precio: ${transaccion.precioTransaccion}`;

                // Agregar el elemento al contenedor divTransacciones
                divTransacciones.appendChild(mostrarTransacciones);
            });
        })
        .catch(error => {
            console.error('Error de solicitud:', error);
        });
});