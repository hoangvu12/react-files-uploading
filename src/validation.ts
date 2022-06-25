import { DEFAULT_NULL_INDEX } from './constants';
import { ErrorsType } from './typings';

export const isMaxFileSizeValid = (fileSize: number, maxFileSize?: number) => {
  return maxFileSize ? fileSize <= maxFileSize : true;
};

export const isAcceptTypeValid = (
  acceptType: string[] | null,
  fileName: string
) => {
  if (acceptType && acceptType.length > 0) {
    const type: string = fileName.split('.').pop() || '';
    if (
      acceptType.findIndex(
        (item) => item.toLowerCase() === type.toLowerCase()
      ) < 0
    )
      return false;
  }
  return true;
};

export const isMaxNumberValid = (
  totalNumber: number,
  maxNumber: number | null,
  keyUpdate: number | null
) => {
  if (maxNumber !== 0 && !maxNumber) return true;

  if (keyUpdate === DEFAULT_NULL_INDEX) {
    if (totalNumber <= maxNumber) return true;
  } else if (totalNumber <= maxNumber + 1) return true;

  return false;
};

export const getErrorValidation = ({
  fileList,
  value,
  maxNumber,
  keyUpdate,
  acceptType,
  maxFileSize,
}): ErrorsType => {
  const newErrors: ErrorsType = {};

  if (!isMaxNumberValid(fileList.length + value.length, maxNumber, keyUpdate)) {
    newErrors.maxNumber = true;
  } else {
    for (let i = 0; i < fileList.length; i += 1) {
      const { file } = fileList[i];
      if (!file) continue;

      if (!isAcceptTypeValid(acceptType, file.name)) {
        newErrors.acceptType = true;
        break;
      }

      if (!isMaxFileSizeValid(file.size, maxFileSize)) {
        newErrors.maxFileSize = true;
        break;
      }
    }
  }

  if (Object.values(newErrors).find(Boolean)) return newErrors;

  return null;
};
