import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import App from './app/app';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
