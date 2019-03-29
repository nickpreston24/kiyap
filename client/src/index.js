import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

import Firebase, { FirebaseContext } from './components/Firebase';

import { Provider } from 'mobx-react';
import { LocationStore } from './components/Stores';

// Initialize Store
// TODO: Try to get @inject working here if you can.  You have a duplicate LocationStore in /Home.
// const store = new LocationStore();
// console.log(store)

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        {/* <Provider store={store} > */}
            <App />
        {/* </Provider> */}
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
