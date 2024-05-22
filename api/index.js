const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
let arrayTransacciones = [];

// Procesar datos enviados mediante formularios HTML
app.use(express.urlencoded({ extended: true }));

// Middleware para analizar datos JSON entrantes en las solicitudes HTTP
app.use(express.json({ type: "*/*" }));

// Permitir que tu servidor responda a solicitudes desde un dominio diferente al de la propia aplicación
app.use(cors());

// Crear rutas
app.get('/transaccion', (req, res) => {
    res.json(arrayTransacciones); // Enviar JSON directamente
});

app.post('/transaccion', (req, res) => {
    let respuestaTransaccion = req.body;
    arrayTransacciones.push(respuestaTransaccion);
    console.log(arrayTransacciones);
    res.send("OK!");
});

app.delete('/transaccion/:id', (req, res) => {
    const id = req.params.id;
    arrayTransacciones = arrayTransacciones.filter(transaccion => transaccion.id !== id);
    res.json(arrayTransacciones); // Devolver el array actualizado como JSON
    console.log(arrayTransacciones);
});

// GET -> miPc/transaccion -> Devolver las Transacciones
// POST -> miPc/transaccion con una {Transaccion} -> Guardar la transaccion

app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
