import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));

if (module && module.hot) {
    module.hot.accept('./app.jsx', () => {
        render(
            <AppContainer>
                <App />
            </AppContainer>,
            document.querySelector("#app")
        );
    });
}
