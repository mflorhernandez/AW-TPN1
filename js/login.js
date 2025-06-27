document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

  if (usuarioEncontrado) {
    sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
    alert("Login exitoso");
    window.location.href = "index.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
});