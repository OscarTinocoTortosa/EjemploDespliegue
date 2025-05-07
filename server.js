const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3004;
const db = require('./database');

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

  db.get(
    'SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?',
    [usuario, contrasena],
    (err, fila) => {
      if (err) {
        return res.send('Error de base de datos');
      }

      if (fila) {
        req.session.usuario = fila.nombre;
        res.redirect('/privado');
      } else {
        res.send('Credenciales incorrectas. <a href="/login.html">Intentar de nuevo</a>');
      }
    }
  );
});

app.post('/registro', (req, res) => {
  const { usuario, contrasena } = req.body;

  db.run(
    'INSERT INTO usuarios (nombre, contrasena) VALUES (?, ?)',
    [usuario, contrasena],
    function (err) {
      if (err) {
        return res.send('Usuario ya existe o error al registrar');
      }
      res.send('Usuario registrado correctamente. <a href="/login.html">Iniciar sesión</a>');
    }
  );
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

// 🔽 ESTA ES LA LÍNEA QUE HACE QUE SE MUESTRE login.html AL ENTRAR A "/"
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});