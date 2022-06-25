import React from 'react';

export const openFileDialog = (
  inputRef: React.RefObject<HTMLInputElement>
): void => {
  if (inputRef.current) inputRef.current.click();
};

export const getAcceptTypeString = (acceptType?: Array<string>) => {
  return acceptType && acceptType.length > 0
    ? acceptType.map((item) => `.${item}`).join(', ')
    : '*/*';
};
