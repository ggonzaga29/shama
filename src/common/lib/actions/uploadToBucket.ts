'use server';

import { createClient } from 'src/common/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';

type UploadFileToBucketProps = {
  bucketName: 'avatars' | 'assets' | 'cars' | 'driver_avatars';
  upsert?: boolean;
  randomizeFilename?: boolean;
  randomizedNamePrefix?: string;
  prefixStyle?: 'prepend' | 'append' | 'replace';
} & (
  | {
      file: File;
      onFileUploaded?: (props: { file: File; path: string }) => void;
      files?: never;
      onFilesUploaded?: never;
      onEachFileUploaded?: never;
    }
  | {
      files: File[] | FileList;
      onEachFileUploaded?: (props: { file: File; path: string }) => void;
      onFilesUploaded?: (props: { files: File[]; paths: string[] }) => void;
      file?: never;
      onFileUploaded?: never;
    }
);

type UploadFileToBucketResponse =
  | {
      path: string;
    }
  | {
      paths: string[];
    };

/**
 * Props for uploading a single file.
 * @typedef {Object} SingleFileUploadProps
 * @property {File} file - The file to upload.
 * @property {(props: { file: File; path: string }) => void} [onFileUploaded] - Callback function called after the file is uploaded.
 */

/**
 * Props for uploading multiple files.
 * @typedef {Object} MultipleFileUploadProps
 * @property {File[] | FileList} files - The files to upload.
 * @property {(props: { file: File; path: string }) => void} [onEachFileUploaded] - Callback function called after each file is uploaded.
 * @property {(props: { files: File[]; paths: string[] }) => void} [onFilesUploaded] - Callback function called after all files are uploaded.
 */

/**
 * Props for the uploadFileToBucket function.
 * @typedef {Object} CommonUploadProps
 * @property {string} bucketName - The name of the Supabase storage bucket.
 * @property {boolean} [upsert=false] - Whether to upsert the file if it already exists.
 * @property {boolean} [randomizeFilename] - Whether to randomize the filename.
 * @property {string} [randomizedNamePrefix] - Prefix to use when randomizing filenames.
 * @property {'prepend' | 'append' | 'replace'} [prefixStyle='append'] - How to apply the randomized name prefix.
 */

/**
 * @typedef {CommonUploadProps & (SingleFileUploadProps | MultipleFileUploadProps)} UploadFileToBucketProps
 */

/**
 * Uploads one or multiple files to a Supabase storage bucket.
 *
 * @param {UploadFileToBucketProps} props - The upload configuration and callbacks.
 * @returns {Promise<void>}
 *
 * @throws {Error} Throws an error if the file upload fails.
 *
 * @example
 * // Uploading a single file
 * await uploadFileToBucket({
 *   bucketName: 'my-bucket',
 *   file: myFile,
 *   onFileUploaded: ({ file, path }) => console.log(`Uploaded ${file.name} to ${path}`)
 * });
 *
 * @example
 * // Uploading multiple files with randomized names
 * await uploadFileToBucket({
 *   bucketName: 'my-bucket',
 *   files: myFileList,
 *   randomizeFilename: true,
 *   randomizedNamePrefix: 'upload',
 *   onEachFileUploaded: ({ file, path }) => console.log(`Uploaded ${file.name} to ${path}`),
 *   onFilesUploaded: ({ files, paths }) => console.log(`Uploaded ${files.length} files`)
 * });
 */
export async function uploadToBucket({
  bucketName,
  upsert = false,
  file,
  files,
  onFileUploaded,
  onEachFileUploaded,
  onFilesUploaded,
  randomizeFilename,
  // randomizedNamePrefix,
  // prefixStyle = 'append',
}: UploadFileToBucketProps): Promise<UploadFileToBucketResponse> {
  const supabase = createClient();

  /**
   * Randomizes the filename with an optional prefix.
   * @param {string} filename - The original filename.
   * @returns {string} The randomized filename.
   */
  function randomizeFilenameWithPrefix(filename: string): string {
    return `${uuidv4()}-${filename}`;
  }

  /**
   * Uploads a single file to the Supabase bucket.
   * @param {File} file - The file to upload.
   * @returns {Promise<string>} The path of the uploaded file.
   * @throws {Error} If the file upload fails.
   */
  async function uploadSingleFile(file: File): Promise<string> {
    if (!file.name) {
      throw new Error('File name is required for upload');
    }

    let filename = file.name;

    if (randomizeFilename) {
      filename = randomizeFilenameWithPrefix(filename);
    }

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filename, file, {
        upsert,
      });

    if (error) {
      throw new Error(
        `Failed to upload file: ${file.name}. Error: ${error.message}`
      );
    }

    return data.path;
  }

  // Handle single file upload
  if (file) {
    console.log('Uploading single file');
    const path = await uploadSingleFile(file);

    if (onFileUploaded) {
      await onFileUploaded({ file, path });
    }

    return {
      path,
    };
  }

  // Handle multiple file uploads
  if (files) {
    const filesArray = Array.from(files);
    const paths: string[] = [];

    for (const file of filesArray) {
      const path = await uploadSingleFile(file);
      paths.push(path);

      if (onEachFileUploaded) {
        await onEachFileUploaded({ file, path });
      }
    }

    if (onFilesUploaded) {
      await onFilesUploaded({ files: filesArray, paths });
    }

    return {
      paths,
    };
  }

  throw new Error('No file or files provided for upload');
}
