import { render } from '@testing-library/react';

import CheckoutSteps from './CheckoutSteps';

describe('CheckoutSteps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckoutSteps />);
    expect(baseElement).toBeTruthy();
  });
});
