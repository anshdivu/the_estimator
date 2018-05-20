import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import App from './App';
// import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

// const store = createStore(reducers);

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
