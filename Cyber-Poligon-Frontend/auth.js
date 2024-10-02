const dbName = "UserAuthDB";
const dbVersion = 1;
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
};



document.querySelector("#registrationModal form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
  }

  const transaction = db.transaction(["users"], "readwrite");
  const userStore = transaction.objectStore("users");

  const user = { username, email, password };

  const request = userStore.add(user);

  request.onsuccess = () => {
      alert("Регистрация успешна!");
  };

  request.onerror = () => {
      alert("Пользователь с таким email уже зарегистрирован.");
  };
});



document.querySelector("#loginModal form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const transaction = db.transaction(["users"], "readonly");
  const userStore = transaction.objectStore("users");
  const request = userStore.get(email);

  request.onsuccess = (event) => {
      const user = event.target.result;
      if (user && user.password === password) {
          alert("Вход успешен!");

          // Переход на страницу личного кабинета
          setTimeout(function () {
              closeModal('loginModal'); // Закрытие модального окна
              window.location.href = 'personal_account.html';
              // showProfile(); // Здесь можно добавить логику для отображения профиля пользователя
          }, 1000);

      } else {
          alert("Неверный email или пароль.");
      }
  };

  request.onerror = () => {
      alert("Ошибка при входе.");
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
          alert(`Ваш пароль: ${user.password}`);
      } else {
          alert("Пользователь с таким email не найден.");
      }
  };

  request.onerror = () => {
      alert("Ошибка при восстановлении пароля.");
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