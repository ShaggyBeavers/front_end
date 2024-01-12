import { useDropzone } from 'react-dropzone';
import React, { FC } from 'react';
import './dropzone.css';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  initialFiles: File[];
}

const FileUpload: FC<FileUploadProps> = ({ onFilesChange, initialFiles }) => {
  const [isUploadDisabled, setUploadDisabled] = React.useState(false);
  React.useEffect(() => {
    if (initialFiles.length >= 3) {
      setUploadDisabled(true);
    } else {
      setUploadDisabled(false);
    }
  }, [initialFiles]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    onDrop: (acceptedFiles) => {
      const remainingSlots = 3 - initialFiles.length;
      const newFiles = [...initialFiles, ...acceptedFiles.slice(0, remainingSlots)];
      onFilesChange(newFiles);
    },    
    disabled: isUploadDisabled,
  });

  return (
    
      <div className='report_input' style={{ width: '32%'}}>
        <label htmlFor="drop" style={{alignSelf:'center',marginBottom:'2px'}}><p>Завантажте до 3х фото</p></label>
        <div {...getRootProps()} className={`dropzone ${isUploadDisabled ? 'disabled' : ''}`}>
          <input {...getInputProps()} disabled={isUploadDisabled} />
          <p className={`upload-input ${isUploadDisabled ? 'disabled-upload' : ''}`}>
          Завантажити фото
        </p>
        </div>
        <div className='uploaded-files'>
          {initialFiles.map((file, index) => (
            <div key={index} className='uploaded-file'>
              <img src="/icons/report/image_icon.svg" alt="" />
              <p>{file.name}</p>
              <button type="button" onClick={() => onFilesChange(initialFiles.filter((_, i) => i !== index))}>
                <img src="/icons/report/trash.svg"/>
              </button>
            </div>
          ))}
        </div>
      </div>
   
  );
};

export default FileUpload;