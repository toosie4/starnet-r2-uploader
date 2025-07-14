import React, { useState } from 'react';
import './App.css';
import { uploadToR2 } from './r2Uploader';

function App() {
  const [files, setFiles] = useState([]);
  const [log, setLog] = useState("");

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFiles = [...e.dataTransfer.files];
    setFiles(droppedFiles);

    for (const file of droppedFiles) {
      setLog(`Uploading ${file.name}...`);
      try {
        const res = await uploadToR2(file);
        setLog(`✅ Uploaded: ${file.name}`);
      } catch (err) {
        setLog(`❌ Failed: ${file.name}`);
      }
    }
  };

  return (
    <div 
      className="drop-zone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2>📦 STARNET R2 Upload</h2>
      <p>Drag & drop your React files here to deploy to R2</p>
      <div className="log">{log}</div>
    </div>
  );
}

export default App;