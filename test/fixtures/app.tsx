import * as React from 'react';
import FileUploading from '../../src';

export default (props: Props) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const onChange = (fileList: File[]) => {
    setFiles(fileList);
  };

  return (
    <div id="app">
      <FileUploading value={files} onChange={onChange} {...props}>
        {({
          fileList,
          errors,
          isDragging,
          onFileUpload,
          onFileRemoveAll,
          onFileUpdate,
          onFileRemove,
          dragProps,
        }) => {
          return (
            <div className="file-wrapper">
              {errors && errors.maxNumber && (
                <span>Number of selected files exceed maxNumber</span>
              )}

              <button
                id="btn-upload"
                type="button"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onFileUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>

              <button id="btn-remove" type="button" onClick={onFileRemoveAll}>
                Remove all files
              </button>

              <div id="list-files">
                {fileList.map((file, index) => (
                  <div key={`file-${index}`} className="file-item">
                    <p data-testid={`file-${index}`} id={`file-${index}`}>
                      {file.name}
                    </p>
                    <div className="file-item__btn-wrapper">
                      <button
                        id={`update_${index}`}
                        type="button"
                        onClick={() => onFileUpdate(index)}
                      >
                        {`Update ${index}`}
                      </button>
                      <button
                        id={`remove_${index}`}
                        type="button"
                        onClick={() => onFileRemove(index)}
                      >
                        {`Remove ${index}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </FileUploading>
    </div>
  );
};

type Props = {
  value?: File[];
  multiple?: boolean;
};
