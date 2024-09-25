
function onScroll() {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
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
  } else {
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
    setTimeout(function () {
        closeModal('loginModal');
        window.location.href = 'personal_account.html';
        // showProfile(); // Здесь можно добавить логику для отображения профиля пользователя (пока что костыль)
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
    setTimeout(function () {
        closeModal('registrationModal');
        // showLoginModal(); // Вернуть пользователя ко входу, если нужно
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
    setTimeout(function () {
        closeModal('resetPasswordModal');
        // showLoginModal(); // Переход на окно входа
    }, 1000);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
}

document.querySelector('#loginModal form').addEventListener('submit', login);
document.querySelector('#registrationModal form').addEventListener('submit', register);
document.querySelector('#resetPasswordModal form').addEventListener('submit', forgotPassword);

// Загрузка аватара для личного кабинета

document.getElementById('avatarInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('avatarPreview').style.backgroundImage = 'url(' + e.target.result + ')';
      }
      reader.readAsDataURL(file);
    }
  });