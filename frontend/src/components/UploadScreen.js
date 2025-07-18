import React, { useState, useRef } from 'react';
// Make sure you have a countries.js file in your src folder
// import { countries } from '../countries';

function UploadScreen({ mode, onUploadSuccess }) {
  // Using a static country for now as the dropdown logic was complex.
  // We can add the full searchable dropdown back later if needed.
  const [status, setStatus] = useState({ message: '', type: '' });
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setStatus({ message: `Uploading ${file.name}...`, type: 'info' });
    const formData = new FormData();
    formData.append('uploadedFile', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setStatus({ message: data.message, type: 'success' });
      // Call the function passed from App.js to switch screens
      onUploadSuccess(data.results);
    } catch (error) {
      setStatus({ message: error.message || 'Upload failed.', type: 'error' });
    }
  };

  const uploadTitle = mode === 'whatsapp' ? 'Upload Number List' : 'Upload Email List';

  return (
    <div>
      <div className="upload-form-top-bar">
        <div className="country-select-wrapper">
          <h2 className="component-title">Select Country</h2>
          <div className="country-select">
            <img src="https://flagcdn.com/w40/in.png" alt="India Flag" />
            <span>India</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        <div className="action-buttons">
          <button>Follow Up Calls</button>
          <button>Chat History</button>
        </div>
      </div>

      <h2 className="component-title">{uploadTitle}</h2>
      <div className="upload-options-grid">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        <button className="upload-option-btn"><i className="far fa-copy"></i><span>Copy</span></button>
        <button className="upload-option-btn" onClick={handleUploadClick}><i className="far fa-file-excel"></i><span>Excel</span></button>
        <button className="upload-option-btn"><i className="fas fa-expand"></i><span>Scan</span></button>
        <button className="upload-option-btn" onClick={handleUploadClick}><i className="far fa-file-image"></i><span>JPG</span></button>
        <button className="upload-option-btn" onClick={handleUploadClick}><i className="far fa-file-image"></i><span>PNG</span></button>
        <button className="upload-option-btn" id="upload-btn" onClick={handleUploadClick}>
          <i className="fas fa-upload"></i><span>UPLOAD</span>
        </button>
      </div>
      {status.message && <p id="statusMessage" className={`status-${status.message}`}>{status.message}</p>}
    </div>
  );
}

export default UploadScreen;