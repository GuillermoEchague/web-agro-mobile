import React from 'react';
import ReactDOM from 'react-dom';
import './assets/bootstrap.min.css';
import './assets/style.css';
import App from './App';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { AuthProvider } from './providers/AuthProvider';
import store from './redux';
import { Provider } from 'react-redux';


Sentry.init({
  dsn: "https://046f230acd454feb8c379990c84e310e@o1088415.ingest.sentry.io/6112421",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));


ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
    <App />
  </AuthProvider>
  </Provider>
 ,
  document.getElementById('root')
);

