
const elementoFormulario = document.getElementById('guardarTransaccion')
const botonVer = document.getElementById('botonVer')
const tablaTransacciones = document.getElementById('verTransacciones')
const tbody = tablaTransacciones.querySelector("tbody");
let ID = 1


ver()
elementoFormulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let fecha = new Date().toLocaleDateString({ weekday:"short", year:"numeric", month:"short", day:"numeric"}) 
    let descripcionTransaccion = document.getElementById('descripcionTransaccion').value;
    let precioTransaccion = document.getElementById('precioTransaccion').value;
    let valorSeleccionado = document.getElementById('opciones').value;

    // Crear el objeto con la información recolectada
    let objetoTransaccion = {
        descripcionTransaccion: descripcionTransaccion,
        precioTransaccion: precioTransaccion,
        valorSeleccionado: valorSeleccionado,
        id: ID,
        fecha: fecha
    };

    // Convertir el objeto a JSON
    let objetoTransaccionJSON = JSON.stringify(objetoTransaccion);
    console.log(objetoTransaccionJSON);

    // Verificar si la descripción de la transacción no está vacía
    if (descripcionTransaccion !== '') {
        ID++;
        
        // Enviar una solicitud POST con los datos del formulario
        fetch('http://localhost:3000/transaccion', {
            method: 'POST',
            body: objetoTransaccionJSON
        })
        .then(response => {
            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                console.log('¡Datos enviados correctamente!');
            } else {
                console.error('Error al enviar los datos');
            }
        })
        .catch(error => {
            console.error('Error de red:', error);
        });
    } 

    ver()
});


function ver(){
    fetch('http://localhost:3000/transaccion')
        .then(x => x.json())
        .then(data => {
            // Limpiar los elementos existentes antes de agregar nuevos
            tbody.innerHTML = "";

            data.forEach(transaccion => {
                
                const fila = document.createElement("tr");

                // Asignar las propiedades de la transacción al texto del elemento 
                fila.innerHTML = `
                <td>${transaccion.descripcionTransaccion}</td>
                <td>${transaccion.precioTransaccion}</td>
                <td>${transaccion.valorSeleccionado}</td>
                <td>${transaccion.fecha}</td>
              `;

                // Agregar el elemento al contenedor tablaTransacciones
                tbody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error de solicitud:', error);
        });
}

