export default {
  translation: {
    navbar: {
      title: 'Хекслет чат',
      login: 'Войти в аккаунт',
      logout: 'Выйти из аккаунта',
      signup: 'Зарегистрироваться',
      language: 'Язык',
      ru: 'русский',
      en: 'english',
    },
    loginForm: {
      title: 'Войти в аккаунт',
      username: 'Имя пользователя',
      password: 'Ваш пароль',
      submitButton: 'Войти',
    },
    signupForm: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPass: 'Подтвердить пароль',
      submitButton: 'Создать аккаунт',
    },
    chat: {
      channels: 'Каналы',
      messages: {
        key_zero: 'сообщений',
        key_one: 'сообщение',
        key_two: 'сообщения',
        key_few: 'сообщения',
        key_many: 'сообщений',
        key_other: 'сообщений',
      },
      addChannel: 'Добавить',
      messageInput: 'Введите сообщение...',
    },
    404: {
      title: 'Упс!',
      text: 'К сожалению, произошла непредвиденная ошибка',
      descr: '404 данная страница не существует',
    },
    dropdowns: {
      renameChannel: 'Переименовать',
      deleteChannel: 'Удалить',
    },
    modals: {
      addChannel: {
        title: 'Создание нового канала',
        button: 'Создать',
        titleMin: 'Не менее 5 символов',
        titleMax: 'Не более 20 символов',
        titleRequired: 'Обязательное поле',
        titleUnique: 'Канал с таким названием уже существует',
      },
      renameChannel: {
        title: 'Переименование канала',
        button: 'Переименовать',
        titleMin: 'Не менее 5 символов',
        titleMax: 'Не более 20 символов',
        titleRequired: 'Обязательное поле',
        titleUnique: 'Канал с таким названием уже существует',
      },
      deleteChannel: {
        title: 'Удаление канала',
        descr: 'Вы уверены, что хотите удалить канал',
        button: 'Удалить',
      },
      singupSuccess: {
        title: 'Вы успешно зарегистрировались',
        descr: 'После закрытия окна, вы переместитесь в чат',
        button: 'Закрыть',
      },
      signupError: {
        title: 'Произошла ошибка',
        descr: 'Пользователь с таким именем уже существует',
        button: 'Закрыть',
      },
    },
    errors: {
      loginForm: 'Неверные имя пользователя или пароль',
      usernameMin: 'Не менее 3 символов',
      usernameMax: 'Не более 20 символов',
      passwordMin: 'Не менее 6 символов',
      confirmPass: 'Пароли должны совпадать',
      required: 'Обязательное поле',
    },
  },
};
