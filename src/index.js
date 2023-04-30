// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// editor
import 'react-quill/dist/quill.snow.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'katex/dist/katex.min.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//
import App from './App';

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
