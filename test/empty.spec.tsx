import * as React from 'react';
import { render } from '@testing-library/react';
import App from './fixtures/app';

describe('testing empty case', () => {
  it('should render component', () => {
    const { container } = render(<App value={[] as File[]} />);
    expect(container).toMatchSnapshot();
  });
});
