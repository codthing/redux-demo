import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// 如果您希望您的应用离线运行并更快地加载，则可以进行更改，
// 将unregister（）更改为下面的register（）。 请注意，这带有一些陷阱。
//了解有关服务人员的更多信息：https://bit.ly/CRA-PWA
serviceWorker.unregister();
