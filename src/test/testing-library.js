import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const AllTheProviders = ({ children }) => {
  return (
    <React.Suspense fallback="<div>hi</div>">
      <RecoilRoot>
        <Router>{children}</Router>
      </RecoilRoot>
    </React.Suspense>
  );
};

const renderWithRecoil = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { renderWithRecoil as render };
