## Hexlet tests and linter status:

[![Actions Status](https://github.com/vlad1slove1/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/vlad1slove1/frontend-project-12/actions)

## Demo link

<https://frontend-project-12-production-8529.up.railway.app/>

## Description

Real-time app on React aka minified Slack-chat. Backend on [project-js-chat-backend](https://github.com/hexlet-components/project-js-chat-backend) by [Hexlet team](https://ru.hexlet.io). The project is made with web sockets, interaction with REST API, use of React (with hooks), Redux (via reduxjs/toolkit), organization of routing on the client, authorization and authentication.

## Usage

First of all user must enter the signup page, fill and submit the form. After the submitting, user will be redirected to the chat page. By the defaults, there're two channles **# General** and **# Random**. Every user is able to create, rename, delete new channels (exept default). Chat provides messages, usernames, channel names censorship by [leo-profanity](https://github.com/jojoee/leo-profanity). Interface got two locales: russian and english, easy to manage by clicking the button.

## Preview

**Login page**
![Login page](https://drive.google.com/uc?id=1y9JT_difK6eut-oMB3G_oxbZRlQxUE31)

**Signup page**
![Signup page](https://drive.google.com/uc?id=1c_ZmghanrzYv_tXypz8LJCZyM-XdOUEM)

**Chat page**
![Chat page](https://drive.google.com/uc?id=1rD6HIGIZ85I9Zo1MhSb9SpdKv-UuXSc0)

## Setup

1) Create and enter new dir
```
mkdir <dirname> && cd <dirname>
``` 

2) Clone repository
```
git clone https://github.com/vlad1slove1/frontend-project-12.git
```

3) Install depencies
```
make install
```

4) Start app
```
make start
```

### Makefile commands

```javascript
make lint-frontend // cd into frontend and start linting
make install // install depencies
make start-frontend // cd into frontend and start frontend
make start-backend // cd into frontend and start backend
make start // start backend & start frontend
```

## Stack

- React/Redux (hooks + reduxjs/toolkit)
- client routing
- authorization and authentication
- REST api
- [socket.io](https://socket.io/)
- forms by [formik](https://formik.org)
- [yup](https://github.com/jquense/yup) validation
- [react-i18next](https://react.i18next.com/) internationalization
- [react-bootstrap](https://react-bootstrap.github.io/) components
