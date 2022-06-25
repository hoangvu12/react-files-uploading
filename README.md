# react-files-uploading

<div align="center">
  <img src="https://user-images.githubusercontent.com/6290720/91559755-9d6e8c00-e973-11ea-9bde-4b60c89f441a.png" width="250" />
</div>

The simple files uploader applied `Render Props` pattern. (You can read more about this pattern [here](https://reactjs.org/docs/render-props.html)).

This approach allows you to fully control UI component and behaviours.

_This is a modified version of [react-images-uploading](https://github.com/vutoan266/react-images-uploading) for files uploading._

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) ![Github_Actions](https://github.com/hoangvu12/react-files-uploading/workflows/CI/CD/badge.svg) [![NPM](https://img.shields.io/npm/v/react-files-uploading.svg)](https://www.npmjs.com/package/react-files-uploading) [![NPM](https://img.shields.io/npm/dm/react-files-uploading.svg)](https://www.npmjs.com/package/react-files-uploading) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hoangvu12/react-files-uploading/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/hoangvu12/react-files-uploading/pulls) [![Package Quality](https://npm.packagequality.com/shield/react-files-uploading.svg)](https://packagequality.com/#?package=react-files-uploading) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Package Quality](https://npm.packagequality.com/badge/react-files-uploading.png)](https://packagequality.com/#?package=react-files-uploading)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
  - [Note](#note)
- [Exported options](#exported-options)
- [Contributors ✨](#contributors-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

**npm**

```bash
npm install --save react-files-uploading
```

**yarn**

```bash
yarn add react-files-uploading
```

**Basic**

```tsx
import * as React from 'react';
import FileUploading from 'react-files-uploading';

export const App = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const onChange = (fileList: File[]) => {
    setFiles(fileList);
  };

  return (
    <div className="App">
      <FileUploading multiple value={files} maxNumber={10} onChange={onChange}>
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
            <div className="upload__file-wrapper">
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
                    <p>{file.name}</p>
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
```

**Validation**

```ts
...
  {({ fileList, onFileUpload, onFileRemoveAll, errors }) => (
    errors && <div>
      {errors.maxNumber && <span>Number of selected files exceed maxNumber</span>}
      {errors.acceptType && <span>Your selected file type is not allow</span>}
      {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
    </div>
  )}
...
```

**Drag and Drop**

```tsx
...
  {({ fileList, dragProps, isDragging }) => (
    <div {...dragProps}>
      {isDragging ? "Drop here please" : "Upload space"}
      {fileList.map((file, index) => (
        <p>{file.name}</p>
      ))}
    </div>
  )}
...
```

## Props

| parameter   | type                                | options                            | default | description                                          |
| ----------- | ----------------------------------- | ---------------------------------- | ------- | ---------------------------------------------------- |
| value       | array                               |                                    | []      | List of files                                        |
| onChange    | function                            | (fileList, addUpdateIndex) => void |         | Called when add, update or delete action is called   |
| multiple    | boolean                             |                                    | false   | Set `true` for multiple chooses                      |
| maxNumber   | number                              |                                    | 1000    | Number of files user can select if mode = `multiple` |
| onError     | function                            | (errors, files) => void            |         | Called when it has errors                            |
| acceptType  | array                               | ['mp4', 'webm', 'png', 'pdf]       | []      | The file extension(s) to upload                      |
| maxFileSize | number                              |                                    |         | Max file size (Byte) and it is used in validation    |
| inputProps  | React.HTMLProps\<HTMLInputElement\> |                                    |         |                                                      |

## Exported options

| parameter       | type                                      | description                                                         |
| :-------------- | :---------------------------------------- | :------------------------------------------------------------------ |
| fileList        | array                                     | List of files to render.                                            |
| onFileUpload    | function                                  | Called when an element is clicks and triggers to open a file dialog |
| onFileRemoveAll | function                                  | Called when removing all files                                      |
| onFileUpdate    | (updateIndex: number) => void             | Called when updating a file at `updateIndex`.                       |
| onFileRemove    | (deleteIndex: number \| number[]) => void | Called when removing one or list of files.                          |
| errors          | object                                    | Exported object of validation                                       |
| dragProps       | object                                    | Native element props for drag and drop feature                      |
| isDragging      | boolean                                   | "true" if a file is being dragged                                   |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://medium.com/@imvutoan"><img src="https://avatars1.githubusercontent.com/u/18349710?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vutoan266</b></sub></a><br /><a href="https://github.com/vutoan266/react-images-uploading/commits?author=vutoan266" title="Code">💻</a> <a href="#ideas-vutoan266" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/vutoan266/react-images-uploading/commits?author=vutoan266" title="Documentation">📖</a> <a href="#maintenance-vutoan266" title="Maintenance">🚧</a> <a href="https://github.com/vutoan266/react-images-uploading/commits?author=vutoan266" title="Tests">⚠️</a> <a href="https://github.com/vutoan266/react-images-uploading/pulls?q=is%3Apr+reviewed-by%3Avutoan266" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://www.dzungnguyen.dev/about"><img src="https://avatars3.githubusercontent.com/u/6290720?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Nguyen</b></sub></a><br /><a href="https://github.com/vutoan266/react-images-uploading/commits?author=davidnguyen179" title="Code">💻</a> <a href="#ideas-davidnguyen179" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/vutoan266/react-images-uploading/commits?author=davidnguyen179" title="Documentation">📖</a> <a href="https://github.com/vutoan266/react-images-uploading/pulls?q=is%3Apr+reviewed-by%3Adavidnguyen179" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/conandk"><img src="https://avatars2.githubusercontent.com/u/12934183?v=4?s=100" width="100px;" alt=""/><br /><sub><b>DK</b></sub></a><br /><a href="https://github.com/vutoan266/react-images-uploading/commits?author=conandk" title="Code">💻</a> <a href="#infra-conandk" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-conandk" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/vutoan266/react-images-uploading/pulls?q=is%3Apr+reviewed-by%3Aconandk" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/vutoan266/react-images-uploading/commits?author=conandk" title="Documentation">📖</a></td>
    <td align="center"><a href="https://masesisaac.me/"><img src="https://avatars2.githubusercontent.com/u/9384060?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Isaac Maseruka</b></sub></a><br /><a href="https://github.com/vutoan266/react-images-uploading/commits?author=masesisaac" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hoangvu12"><img src="https://avatars.githubusercontent.com/u/68330291?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vu Nguyen</b></sub></a><br /><a href="https://github.com/vutoan266/react-images-uploading/commits?author=hoangvu12" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
