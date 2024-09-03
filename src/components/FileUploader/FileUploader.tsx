'use client';

import { FC, useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import SupabaseImage from 'src/components/SupabaseImage';
import { Button } from 'src/components/ui/Button';
import { TrashCan } from '@carbon/icons-react';
import ZoomableImage from 'src/components/ZoomableImage';
import { OnUploadResponse, UploadedFile } from 'src/common/types';

type FileUploaderProps = {
  onUpload: (file: FormData) => Promise<OnUploadResponse>;
  maxFileCount?: number;
  maxFileSize?: number;
  acceptedFileTypes?: Accept;
  showUploads?: 'preview' | 'list';
};

/**
 * FileUploader component allows users to drag and drop files or click to select files for upload.
 *
 * @param {(file: FormData) => Promise<void>} onUpload - The function to handle the file upload.
 * Assumes that the function will be looped for each file because Supabase does not support bulk uploading.
 * @param {number} [maxFileCount=1] - The maximum number of files that can be uploaded at once.
 * @param {number} [maxFileSize=1 * 1024 * 1024] - The maximum size of a single file in bytes.
 * @param {Accept} [acceptedFileTypes] - The accepted file types for the dropzone.
 * @example  <FileUploader
            onUpload={uploadAvatar}
            acceptedFileTypes={{
              'image/jpeg': [],
              'image/png': [],
            }}
        />
 */
const FileUploader: FC<FileUploaderProps> = ({
  onUpload,
  maxFileCount = 1,
  maxFileSize = 1 * 1024 * 1024,
  acceptedFileTypes,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  /**
   * Handles the drop event when files are dropped into the dropzone.
   * Converts each file to an ArrayBuffer and calls the onUpload function.
   *
   * @param {File[]} acceptedFiles - The files that were dropped.
   */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        if (file.size > maxFileSize) {
          console.error(
            `File size exceeds the maximum of ${maxFileSize} bytes`
          );
          return;
        }

        file.arrayBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: file.type });
          const formData = new FormData();
          formData.append('file', blob, file.name);
          onUpload(formData).then((uploadedFile) => {
            if (uploadedFile.success) {
              const newFile: UploadedFile = {
                id: uploadedFile.data.id,
                fullPath: uploadedFile.data.fullPath,
                path: uploadedFile.data.path,
              };
              setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
            }
          });
        });
      });
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    disabled: uploadedFiles.length >= maxFileCount,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="mb-4 rounded-md border border-dashed border-gray-300 p-4"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the {maxFileCount === 1 ? 'file' : 'files'} here ...</p>
        ) : (
          <p>
            Drag 'n' drop {maxFileCount === 1 ? 'a file' : 'some files'} here,
            or click to select {maxFileCount === 1 ? 'a file' : 'files'}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {uploadedFiles.map((file) => (
          <ZoomableImage
            src={file.fullPath}
            alt={file.path}
            className="aspect-square cursor-pointer rounded-md border object-cover"
            width={200}
            height={200}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
