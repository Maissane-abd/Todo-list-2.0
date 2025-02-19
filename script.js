const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const btnClose = document.querySelector('.close');
const registerForm = document.querySelector('.form-box.register form');
const loginForm = document.querySelector('.form-box.login form');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
    localStorage.clear();
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

btnClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const username = document.getElementById('username-register').value.trim();
    const email = document.getElementById('email-register').value.trim();
    const password = document.getElementById('password-register').value.trim();

    if ( username === "" || email === "" || password === "" ) {
        document.querySelector('.error').style.display = 'block';
        return;
    } else {
        document.querySelector('.success').style.display = 'block';
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.some(user => user.email === email || user.username === username);
    if (userExists) {
        alert("This email or username already exits, Choose another one please.");
        return;
    }

    let newUser = { id: Date.now(), email, username, password };
    users.push(newUser);
    
    localStorage.setItem("users", JSON.stringify(users));

    console.log("User save :", newUser);

    e.target.reset();

    setTimeout(() => {
        wrapper.classList.remove("active");
    }, 2000);
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === "" || password === "") {
        document.querySelector('.error').style.display = 'block';
        return;
    } else {
        document.querySelector('.success').style.display = 'block';
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {

        setTimeout(() => {
            window.location.href = "todo.html";
        }, 1000);
    } else {
        document.querySelector('.error').style.display = 'block';
    }
});


    