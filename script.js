// Sélection des éléments du DOM nécessaires pour gérer l'authentification et l'affichage des formulaires
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const btnClose = document.querySelector('.close');
const registerForm = document.querySelector('.form-box.register form');
const loginForm = document.querySelector('.form-box.login form');

// Afficher le formulaire d'inscription lorsque l'utilisateur clique sur "Register"
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
    localStorage.clear(); // Efface les données stockées précédemment pour éviter les conflits
});

// Revenir au formulaire de connexion lorsque l'utilisateur clique sur "Login"
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Afficher la popup de connexion/inscription
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// Fermer la popup de connexion/inscription
btnClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Gestion de l'inscription
registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission
    console.log('Form submitted');

    // Récupération des valeurs des champs
    const username = document.getElementById('username-register').value.trim();
    const email = document.getElementById('email-register').value.trim();
    const password = document.getElementById('password-register').value.trim();

    // Vérification que tous les champs sont remplis
    if (username === "" || email === "" || password === "") {
        document.querySelector('.error').style.display = 'block';
        return;
    } else {
        document.querySelector('.success').style.display = 'block';
    }

    // Récupération des utilisateurs stockés dans le localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérification si l'email ou le pseudo existent déjà
    let userExists = users.some(user => user.email === email || user.username === username);
    if (userExists) {
        alert("This email or username already exists, choose another one please.");
        return;
    }

    // Création d'un nouvel utilisateur et stockage dans localStorage
    let newUser = { id: Date.now(), email, username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("User saved:", newUser);

    // Réinitialisation du formulaire après inscription
    e.target.reset();

    // Fermeture automatique du formulaire après 2 secondes
    setTimeout(() => {
        wrapper.classList.remove("active");
    }, 2000);
});

// Gestion de la connexion
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    // Récupération des valeurs des champs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Vérification que tous les champs sont remplis
    if (email === "" || password === "") {
        document.querySelector('.error').style.display = 'block';
        return;
    } else {
        document.querySelector('.success').style.display = 'block';
    }

    // Récupération des utilisateurs stockés dans le localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérification des identifiants
    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        // Redirection vers la page "todo.html" après une seconde si l'utilisateur est authentifié
        setTimeout(() => {
            window.location.href = "Todo.html";
        }, 1000);
    } else {
        // Affichage d'un message d'erreur si les identifiants sont incorrects
        document.querySelector('.error').style.display = 'block';
    }
});
