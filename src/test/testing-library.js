import { render } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

const AllTheProviders = ({ children }) => {
  return (
    <React.Suspense fallback="<div>hi</div>">
      <RecoilRoot>{children}</RecoilRoot>
    </React.Suspense>
  );
};

const renderWithContext = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { renderWithContext as render };
