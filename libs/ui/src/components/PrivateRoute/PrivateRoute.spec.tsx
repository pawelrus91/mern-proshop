import { render } from '@testing-library/react';

import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PrivateRoute />);
    expect(baseElement).toBeTruthy();
  });
});
