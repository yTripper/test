const dbName = "UserAuthDB";
const dbVersion = 2;
let db;

// Открытие или создание базы данных
const request = indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
    console.log("Ошибка при работе с базой данных", event);
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log("База данных успешно открыта");
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("users")) {
        const userStore = db.createObjectStore("users", { keyPath: "email" });
        userStore.createIndex("email", "email", { unique: true });
    }
    if (!db.objectStoreNames.contains('testResults')) {
        db.createObjectStore('testResults', { autoIncrement: true });
    }
};



// Кастомные алерты

function showCustomAlert(message, type = 'error') {
    const alertElement = document.getElementById("customAlert");
    const messageElement = document.getElementById("customAlertMessage");

    if (type === 'success') {
        alertElement.style.backgroundColor = '#d4edda';
        alertElement.style.color = '#155724';
        alertElement.style.borderColor = '#c3e6cb';
    } else {
        alertElement.style.backgroundColor = '#f8d7da';
        alertElement.style.color = '#721c24';
        alertElement.style.borderColor = '#f5c6cb';
    }

    messageElement.textContent = message;
    alertElement.classList.remove("d-none");

    setTimeout(() => {
        alertElement.classList.add("d-none");
    }, 3000); // скрываем алерт через 3 секунды
}

document.querySelector("#registrationModal form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
      showCustomAlert("Пароли не совпадают!", 'error');
      return;
  }

  const transaction = db.transaction(["users"], "readwrite");
  const userStore = transaction.objectStore("users");

  const user = { username, email, password };

  const request = userStore.add(user);

    request.onsuccess = () => {
        showCustomAlert("Регистрация успешна!", 'success');
    };

    request.onerror = () => {
        showCustomAlert("Пользователь с таким email уже зарегистрирован.", 'error');
    };
});





function closeModal(modalId) {
  const modalElement = document.getElementById(modalId);
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}



document.querySelector("#resetPasswordModal form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("resetEmail").value;

  const transaction = db.transaction(["users"], "readonly");
  const userStore = transaction.objectStore("users");
  const request = userStore.get(email);

  request.onsuccess = (event) => {
      const user = event.target.result;
      if (user) {
          // Здесь можно отправить email с инструкциями или показать пароль
          showCustomAlert(`Ваш пароль: ${user.password}`, 'success');
      } else {
          showCustomAlert("Пользователь с таким email не найден.", 'error');
      }
  };

  request.onerror = () => {
      showCustomAlert("Ошибка при восстановлении пароля.", 'error');
  };
});



document.getElementById("showPassword").addEventListener("change", (event) => {
  const passwordInput = document.getElementById("password");
  if (event.target.checked) {
      passwordInput.type = "text";
  } else {
      passwordInput.type = "password";
  }
});

// Функция для проверки, вошел ли пользователь
function checkLoggedInUser() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('loginLink');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');

    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        // Скрываем кнопку "Войти"
        loginLink.style.display = 'none';

        // Показываем ссылку на профиль и кнопку "Выйти"
        profileLink.style.display = 'block';
        logoutLink.style.display = 'block';

        // Устанавливаем имя пользователя в профиле
        document.getElementById('usernameDisplay').textContent = user.username;
    } else {
        // Если нет пользователя, показываем "Войти"
        loginLink.style.display = 'block';
        profileLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}

// Вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', checkLoggedInUser);


// Логика для выхода
document.getElementById('logoutButton').addEventListener('click', function () {
    // Удаляем информацию о пользователе из localStorage
    localStorage.removeItem('loggedInUser');
    showCustomAlert("Вы вышли из системы.", 'error');
    
    // Обновляем отображение навигации
    checkLoggedInUser();
    
    // Перенаправление на главную страницу
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', function () {
    // Функция для проверки, вошел ли пользователь
    function checkLoggedInUser() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const loginLink = document.getElementById('loginLink');
        const profileDropdown = document.getElementById('profileDropdown');
        const usernameDisplay = document.getElementById('usernameDisplay');

        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            // Скрываем кнопку "Войти"
            loginLink.style.display = 'none';

            // Показываем выпадающий список профиля
            profileDropdown.style.display = 'block';

            // Устанавливаем имя пользователя в выпадающем списке
            usernameDisplay.textContent = user.username;
        } else {
            // Если нет пользователя, показываем "Войти"
            loginLink.style.display = 'block';
            profileDropdown.style.display = 'none';
        }
    }

    // Проверяем статус пользователя при загрузке страницы
    checkLoggedInUser();

    // Обрабатываем событие входа
    document.querySelector("#loginModal form").addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Проверяем пользователя в базе данных (например, IndexedDB)
        const transaction = db.transaction(["users"], "readonly");
        const userStore = transaction.objectStore("users");
        const request = userStore.get(email);

        request.onsuccess = (event) => {
            const user = event.target.result;
            if (user && user.password === password) {
                // Сохраняем информацию о пользователе в localStorage
                localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, username: user.username }));

                showCustomAlert("Вход успешен!", 'success');

                // Закрываем модальное окно
                const modalElement = document.getElementById("loginModal");
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();

                // Обновляем отображение навигации
                checkLoggedInUser();
            } else {
                showCustomAlert("Неверный email или пароль.", 'error');
            }
        };

        request.onerror = () => {
            showCustomAlert("Ошибка при входе.", 'error');
        };
    });

    // Логика для выхода
    document.getElementById('logoutButton').addEventListener('click', function () {
        // Удаляем информацию о пользователе из localStorage
        localStorage.removeItem('loggedInUser');
        showCustomAlert("Вы вышли из системы.", 'error');

        // Обновляем отображение навигации
        checkLoggedInUser();

        // Перенаправляем на главную страницу
        window.location.href = 'index.html';
    });
});






// Функция для проверки, вошел ли пользователь перед переходом на страницу
function checkUserAndRedirect(event) {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        // Блокируем переход по ссылке
        event.preventDefault();
        // Выводим алерт о необходимости войти в аккаунт
        showCustomAlert('Пожалуйста, войдите в аккаунт, чтобы читать больше.', 'error');
    }
}

// Получаем элемент кнопки по ID и добавляем обработчик клика
const readMoreBtn = document.getElementById('readMoreBtn');
readMoreBtn.addEventListener('click', checkUserAndRedirect);


// Мдам

