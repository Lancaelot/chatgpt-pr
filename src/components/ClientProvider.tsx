'useClient';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function ClientProvider() {
  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default ClientProvider;
