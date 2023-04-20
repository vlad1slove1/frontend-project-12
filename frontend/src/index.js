import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('container'));
  root.render(await init());
};

app();
