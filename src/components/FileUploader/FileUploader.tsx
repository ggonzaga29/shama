'use client';

import { Accept, useDropzone } from 'react-dropzone';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import useFileDropHandler from 'src/components/FileUploader/hooks/useFileDropHandler';

type FileUploaderProps<T extends FieldValues> = {
  maxFileCount?: number;
  maxFileSize?: number;
  acceptedFileTypes?: Accept;
  showUploads?: 'preview' | 'list';
  field: ControllerRenderProps<T, Path<T>>;
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
const FileUploader = <T extends FieldValues>({
  maxFileCount = 1,
  maxFileSize = maxFileCount * 1024 * 1024,
  acceptedFileTypes,
  field,
}: FileUploaderProps<T>) => {
  const { onDrop, uploadedFiles } = useFileDropHandler({
    maxFileSize,
    field,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // onDrop,
    accept: acceptedFileTypes,
    disabled: uploadedFiles.length >= maxFileCount,
  });

  // @see https://github.com/colinhacks/zod/discussions/2215
  return (
    <div>
      <div
        {...getRootProps()}
        className="mb-4 rounded-md border border-dashed border-gray-300 p-4"
      >
        <input
          {...getInputProps({
            onChange: (e) => onDrop(e.target.files as unknown as File[]),
          })}
          {...field}
        />
        {isDragActive ? (
          <p>Drop the {maxFileCount === 1 ? 'file' : 'files'} here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop{' '}
            {maxFileCount === 1 ? 'a file' : 'some files'} here, or click to
            select {maxFileCount === 1 ? 'a file' : 'files'}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {/* {uploadedFiles.map((file) => (
          // eslint-disable-next-line react/jsx-key
          // <ZoomableImage
          //   src={file.fullPath}
          //   alt={file.path}
          //   className="aspect-square cursor-pointer rounded-md border object-cover"
          //   width={200}
          //   height={200}
          // />
          // <Image key={file.name} src={file.} alt="Uploaded Image" />
        ))} */}
      </div>
    </div>
  );
};

export default FileUploader;
