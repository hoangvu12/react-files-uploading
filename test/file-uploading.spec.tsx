import * as React from 'react';
import sinon from 'sinon';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './fixtures/app';
import * as Utils from '../src/utils';

describe('testing ReactImageUploading component', () => {
  let sandbox;
  let openDialog;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    openDialog = sandbox.stub(Utils, 'openFileDialog');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should open dialog', () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText(/Click or Drop here/));
    expect(openDialog.called).toBeTruthy();
  });

  it('should upload a file', async () => {
    const { queryByTestId, getByText } = render(<App />);

    // 1. Open file dialog
    fireEvent.click(getByText(/Click or Drop here/));
    expect(openDialog.called).toBeTruthy();

    // 2. Mock file data
    const file = new File([''], 'test_video.mp4', { type: 'video/mp4' });
    const inputEl = document.querySelectorAll(
      '[type="file"]'
    )[0] as HTMLInputElement;

    Object.defineProperty(inputEl, 'files', { value: [file] });

    fireEvent.change(inputEl);

    await waitFor(() => queryByTestId('file-0'));

    const fileName = (queryByTestId('file-0') as HTMLParagraphElement)
      .innerText;
    expect(fileName).toMatchSnapshot('test_video');
  });

  it('should upload multiple files', async () => {
    const { queryByTestId, getByText } = render(<App multiple />);

    // 1. Open file dialog
    fireEvent.click(getByText(/Click or Drop here/));
    expect(openDialog.called).toBeTruthy();

    // 2. Mock file data
    const videoFile = new File([''], 'test_video.mp4', { type: 'video/mp4' });
    const imageFile = new File([''], 'test_image.mp4', { type: 'image/png' });
    const textFile = new File([''], 'test_text.txt', { type: 'text/plain' });

    const inputEl = document.querySelectorAll(
      '[type="file"]'
    )[0] as HTMLInputElement;

    Object.defineProperty(inputEl, 'files', {
      value: [videoFile, imageFile, textFile],
    });

    fireEvent.change(inputEl);

    await waitFor(() => queryByTestId('file-0'));

    const videoFileName = (queryByTestId('file-0') as HTMLParagraphElement)
      .innerText;
    const imageFileName = (queryByTestId('file-1') as HTMLParagraphElement)
      .innerText;
    const textFileName = (queryByTestId('file-2') as HTMLParagraphElement)
      .innerText;

    expect(videoFileName).toMatchSnapshot('test_video');
    expect(imageFileName).toMatchSnapshot('test_image');
    expect(textFileName).toMatchSnapshot('test_text');
  });

  it('should remove all videos', async () => {
    const { queryByTestId, getByText } = render(<App />);

    fireEvent.click(getByText(/Click or Drop here/));
    expect(openDialog.called).toBeTruthy();

    const file = new File([''], 'test_video.mp4', { type: 'video/mp4' });
    const inputEl = document.querySelectorAll(
      '[type="file"]'
    )[0] as HTMLInputElement;

    Object.defineProperty(inputEl, 'files', { value: [file] });

    fireEvent.change(inputEl);

    await waitFor(() => queryByTestId('file-0'));

    fireEvent.click(getByText(/Remove all videos/));
    expect(queryByTestId('file-0')).toBeNull();
  });

  it('should remove specific video', async () => {
    const { queryByTestId, getByText } = render(<App />);

    fireEvent.click(getByText(/Click or Drop here/));
    expect(openDialog.called).toBeTruthy();

    const file = new File([''], 'test_video.mp4', { type: 'video/mp4' });
    const inputEl = document.querySelectorAll(
      '[type="file"]'
    )[0] as HTMLInputElement;

    Object.defineProperty(inputEl, 'files', { value: [file] });

    fireEvent.change(inputEl);

    await waitFor(() => queryByTestId('file-0'));

    fireEvent.click(getByText('Remove 0'));
    expect(queryByTestId('file-0')).toBeNull();
  });
});
