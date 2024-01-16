import { render } from '@testing-library/react';

import { AdminRoute } from './AdminRoute';

describe('AdminRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminRoute />);
    expect(baseElement).toBeTruthy();
  });
});
