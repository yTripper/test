"use strict";
var _a, _b, _c, _d;
if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll);
}
function onScroll() {
    const elements = document.querySelectorAll('.animate');
    elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight - 50) {
            element.classList.add('show');
        }
    });
}
window.addEventListener('scroll', onScroll);
window.onload = onScroll;
// Скрипт для того, чтобы показывать пароли
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
showPasswordCheckbox.addEventListener('change', () => {
    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    }
    else {
        passwordInput.type = 'password';
    }
});
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }
    if (!validateEmail(email)) {
        alert('Пожалуйста, введите действительный адрес электронной почты.');
        return;
    }
    alert('Вход выполнен успешно.');
    setTimeout(() => {
        closeModal('loginModal');
        window.location.href = 'personal_account.html';
    }, 1000);
}
function register(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (!username || !email || !password || !confirmPassword) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }
    if (!validateEmail(email)) {
        alert('Пожалуйста, введите действительный адрес электронной почты.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Пароли не совпадают.');
        return;
    }
    alert('Регистрация прошла успешно.');
    setTimeout(() => {
        closeModal('registrationModal');
    }, 1000);
}
function forgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;
    if (!email) {
        alert('Пожалуйста, введите адрес электронной почты.');
        return;
    }
    if (!validateEmail(email)) {
        alert('Пожалуйста, введите действительный адрес электронной почты.');
        return;
    }
    alert('Инструкции по восстановлению пароля отправлены на ваш email.');
    setTimeout(() => {
        closeModal('resetPasswordModal');
    }, 1000);
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
}
(_a = document.querySelector('#loginModal form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', login);
(_b = document.querySelector('#registrationModal form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', register);
(_c = document.querySelector('#resetPasswordModal form')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', forgotPassword);
// Загрузка аватара для личного кабинета
(_d = document.getElementById('avatarInput')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', function () {
    var _a;
    const file = (_a = this.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            const result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (result) {
                document.getElementById('avatarPreview').style.backgroundImage = `url(${result})`;
            }
        };
        reader.readAsDataURL(file);
    }
});
