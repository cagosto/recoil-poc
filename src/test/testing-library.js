import { render } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

const AllTheProviders = ({ children }) => {
  return (
    <RecoilRoot>
      <React.Suspense fallback="<div>hi</div>">{children}</React.Suspense>
    </RecoilRoot>
  );
};

export function renderWithRouts(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(
      <AllTheProviders>
        <Router history={history}>
          <Route path={route}>{ui}</Route>
        </Router>
      </AllTheProviders>
    ),
    history,
  };
}

const renderWithRecoil = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { renderWithRecoil as render };
