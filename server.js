const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'tu_secreto_seguro',
  resave: false,
  saveUninitialized: true
}));

const USUARIO = {
  nombre: 'admin',
  contrasena: '1234'
};

app.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;
  if (usuario === USUARIO.nombre && contrasena === USUARIO.contrasena) {
    req.session.usuario = usuario;
    res.redirect('/privado');
  } else {
    res.send('Credenciales incorrectas. <a href="/login.html">Intentar de nuevo</a>');
  }
});

app.get('/privado', (req, res) => {
  if (req.session.usuario) {
    res.send(`Hola ${req.session.usuario}, esta es la zona privada. <a href="/logout">Cerrar sesión</a>`);
  } else {
    res.redirect('/login.html');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});