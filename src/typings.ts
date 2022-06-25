import React from 'react';

export interface FileUploadingPropsType {
  value: File[];
  onChange: (value: File[], addUpdatedIndex?: Array<number>) => void;
  children?: (props: ExportInterface) => React.ReactNode;
  multiple?: boolean;
  maxNumber?: number;
  acceptType?: Array<string>;
  maxFileSize?: number;
  onError?: (errors: ErrorsType, files?: File[]) => void;
  inputProps?: React.HTMLProps<HTMLInputElement>;
}

export interface ExportInterface {
  fileList: File[];
  onFileUpload: () => void;
  onFileRemoveAll: () => void;
  errors: ErrorsType;
  onFileUpdate: (index: number) => void;
  onFileRemove: (index: number) => void;
  isDragging: boolean;
  dragProps: {
    onDrop: (e: any) => void;
    onDragEnter: (e: any) => void;
    onDragLeave: (e: any) => void;
    onDragOver: (e: any) => void;
    onDragStart: (e: any) => void;
  };
}

export type ErrorsType = {
  maxFileSize?: boolean;
  maxNumber?: boolean;
  acceptType?: boolean;
} | null;
