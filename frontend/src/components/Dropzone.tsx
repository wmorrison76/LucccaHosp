import React, { useRef, useState } from 'react';

interface DropzoneProps {
  onDrop?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function Dropzone({ onDrop, accept = '*', multiple = true }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onDrop?.(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onDrop?.(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{
        border: isDragging ? '2px solid #3b82f6' : '2px dashed #d1d5db',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragging ? '#f0f9ff' : '#f8fafc',
        transition: 'all 0.2s'
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <p style={{ margin: 0, color: '#666', fontWeight: '600' }}>
        📁 Drag and drop files here, or click to select
      </p>
    </div>
  );
}
