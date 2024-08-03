import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { Delete as DeleteIcon } from '@mui/icons-material';

const DropzoneContainer = styled(Box)({
  border: '2px dashed #cccccc',
  padding: '40px 20px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border 0.3s',
  '&:hover': {
    border: '2px dashed #aaaaaa',
  },
});

const PreviewContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10px',
});

const PreviewImage = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '5px',
  marginBottom: '10px',
});

const AddImageField = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    onFileSelect(acceptedFiles[0]);
  }, [onFileSelect]);

  const handleRemoveFile = () => {
    setFiles([]);
    onFileSelect(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1
  });

  return (
    <Box>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="body1">Drag 'n' drop an image here, or click to select one</Typography>
      </DropzoneContainer>
      {files.length > 0 && (
        <PreviewContainer>
          <PreviewImage src={files[0].preview} alt="Preview" />
          <Typography variant="body2">{files[0].name}</Typography>
          <IconButton onClick={handleRemoveFile}>
            <DeleteIcon />
          </IconButton>
        </PreviewContainer>
      )}
    </Box>
  );
};

export default AddImageField;
