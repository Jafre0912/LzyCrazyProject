import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { countries } from './countries';

function App() {
  // State for the component
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.name === 'India'));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // For upload status messages
  const dropdownRef = useRef(null);
  
  // This ref is for our invisible file input
  const fileInputRef = useRef(null);

  // --- LOGIC FOR BUTTONS ---

  // This function programmatically clicks the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // This function runs after you select a file
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setStatusMessage(`Uploading ${file.name}...`);
    const formData = new FormData();
    formData.append('uploadedFile', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setStatusMessage(data.message); // Show success message from backend
    } catch (error) {
      setStatusMessage(error.message || 'Upload failed.'); // Show error message
    }
  };

  // --- LOGIC FOR DROPDOWN ---

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="upload-container">
      {/* Invisible file input that does the actual work */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <h2 className="component-title">Select Country</h2>
      
      <div className="country-select-wrapper" ref={dropdownRef}>
        <div className="country-select" onClick={() => setIsOpen(!isOpen)}>
          {selectedCountry ? (
            <>
              <img src={selectedCountry.flag} alt="" className="country-flag" />
              <span>{selectedCountry.name}</span>
            </>
          ) : (
            <span>Select a Country</span>
          )}
          <i className={`fas fa-chevron-down ${isOpen ? 'open' : ''}`}></i>
        </div>

        {isOpen && (
          <div className="country-dropdown">
            <input
              type="text"
              className="country-search-input"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="country-list">
              {filteredCountries.map(country => (
                <li key={country.code} onClick={() => {
                  setSelectedCountry(country);
                  setIsOpen(false);
                  setSearchTerm('');
                }}>
                  <img src={country.flag} alt="" className="country-flag" />
                  <span>{country.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <h2 className="component-title upload-title">Upload Number List</h2>
      
      <div className="upload-options-grid">
         {/* The Copy button has different logic, so we'll handle it separately for now */}
         <button className="upload-option-btn" onClick={() => alert('Copy from clipboard functionality will be added later.')}>
            <i className="far fa-copy"></i><span>Copy</span>
         </button>
         
         {/* These buttons will now open the file selection window */}
         <button className="upload-option-btn" onClick={handleUploadClick}><i className="far fa-file-excel"></i><span>Excel</span></button>
         <button className="upload-option-btn" onClick={handleUploadClick}><i className="fas fa-expand"></i><span>Scan</span></button>
         <button className="upload-option-btn" onClick={handleUploadClick}><i className="far fa-file-image"></i><span>JPG</span></button>
         <button className="upload-option-btn" onClick={handleUploadClick}><i className="far fa-file-image"></i><span>PNG</span></button>
         <button className="upload-option-btn primary" onClick={handleUploadClick}><i className="fas fa-upload"></i><span>UPLOAD</span></button>
      </div>

      {/* This will show the status of the upload */}
      {statusMessage && <p style={{ textAlign: 'center', marginTop: '20px' }}>{statusMessage}</p>}
    </div>
  );
}

export default App;