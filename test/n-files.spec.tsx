import * as React from 'react';
import { render } from '@testing-library/react';
import App from './fixtures/app';

describe('testing initial list of n videos', () => {
  it('should render component', () => {
    const file1 = new File([''], 'video-1-name', { type: 'video/mp4' });
    const file2 = new File([''], 'video-2-name', { type: 'video/mp4' });

    const { container } = render(<App value={[file1, file2]} />);
    expect(container).toMatchSnapshot();
  });
});
