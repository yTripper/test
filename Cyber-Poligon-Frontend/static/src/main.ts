if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll);
}


function onScroll(): void {
    const elements: NodeListOf<Element> = document.querySelectorAll('.animate');

    elements.forEach((element: Element) => {
        const elementPosition: number = (element as HTMLElement).getBoundingClientRect().top;
        const windowHeight: number = window.innerHeight;

        if (elementPosition < windowHeight - 50) {
            element.classList.add('show');
        }
    });
}

window.addEventListener('scroll', onScroll);
window.onload = onScroll;

// Скрипт для того, чтобы показывать пароли
const passwordInput = document.getElementById('password') as HTMLInputElement;
const showPasswordCheckbox = document.getElementById('showPassword') as HTMLInputElement;

showPasswordCheckbox.addEventListener('change', () => {
    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function login(event: Event): void {
    event.preventDefault();
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;

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

function register(event: Event): void {
    event.preventDefault();
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const email: string = (document.getElementById('registerEmail') as HTMLInputElement).value;
    const password: string = (document.getElementById('registerPassword') as HTMLInputElement).value;
    const confirmPassword: string = (document.getElementById('confirmPassword') as HTMLInputElement).value;

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

function forgotPassword(event: Event): void {
    event.preventDefault();
    const email: string = (document.getElementById('resetEmail') as HTMLInputElement).value;

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

function closeModal(modalId: string): void {
    const modal = document.getElementById(modalId) as HTMLElement;
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
}

document.querySelector('#loginModal form')?.addEventListener('submit', login);
document.querySelector('#registrationModal form')?.addEventListener('submit', register);
document.querySelector('#resetPasswordModal form')?.addEventListener('submit', forgotPassword);

// Загрузка аватара для личного кабинета
document.getElementById('avatarInput')?.addEventListener('change', function(this: HTMLInputElement) {
    const file = this.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e: ProgressEvent<FileReader>) {
            const result = e.target?.result;
            if (result) {
                (document.getElementById('avatarPreview') as HTMLElement).style.backgroundImage = `url(${result})`;
            }
        };
        reader.readAsDataURL(file);
    }
});
