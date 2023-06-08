export default {
  translation: {
    navbar: {
      title: 'Hexlet chat',
      login: 'Login',
      logout: 'Logout',
      signup: 'Signup',
      language: 'Lang',
      ru: 'русский',
      en: 'english',
    },
    loginForm: {
      title: 'Login in account',
      username: 'Username',
      password: 'Password',
      submitButton: 'Submit',
    },
    signupForm: {
      title: 'Register',
      username: 'Username',
      password: 'Password',
      confirmPass: 'Confirm password',
      submitButton: 'Submit',
      toastError: 'Invalid username',
    },
    chat: {
      channels: 'Channels',
      messages: {
        key_zero: 'messages',
        key_one: 'message',
        key_two: 'messages',
        key_few: 'messages',
        key_many: 'messages',
        key_other: 'messages',
      },
      addChannel: 'Add',
      messageInput: 'Enter your message...',
      messageLabel: 'New message',
    },
    404: {
      title: 'Oops!',
      text: 'Sorry, an unexpected error occurred',
      descr: "404 page doesn't exists",
    },
    dropdowns: {
      renameChannel: 'Rename',
      deleteChannel: 'Delete',
      control: 'Managing channels',
    },
    modals: {
      addChannel: {
        title: 'Creating new channel',
        button: 'Create',
        titleMin: 'At least 5 characters',
        titleMax: 'No more than 20 characters',
        titleRequired: 'Required field',
        titleUnique: 'This channel name already exists',
        inputLabel: 'Channel name',
      },
      renameChannel: {
        title: 'Renaming channel',
        button: 'Rename',
        titleMin: 'At least 5 characters',
        titleMax: 'No more than 20 characters',
        titleRequired: 'Required field',
        titleUnique: 'This channel name already exists',
      },
      deleteChannel: {
        title: 'Deleting channel',
        descr: 'Are you sure you want to delete the channel',
        button: 'Delete',
      },
      singupSuccess: {
        title: 'Successfully registered',
        descr: 'After closing the window, you will be moved to the chat',
        button: 'Close',
      },
      signupError: {
        title: 'An error occured',
        descr: 'This username already exists',
        button: 'Close',
      },
    },
    errors: {
      loginForm: 'Wrong username or password',
      username: 'From 3 to 20 characters',
      password: 'At least 6 characters',
      confirmPass: 'Passwords must match',
      required: 'Required field',
    },
    toastify: {
      newChannel: 'Channel created',
      channelRenamed: 'Channel renamed',
      channelDeleted: 'Channel deleted',
      connectionError: 'Connection error',
      badWordChannel: 'Try another channel name',
    },
  },
};
