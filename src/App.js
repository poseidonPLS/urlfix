import React, { useState } from 'react';
import './URLInput.css'; // Import CSS file for styling

function URLInput() {
  const [inputURL, setInputURL] = useState('');
  const [convertedURL, setConvertedURL] = useState('');
  const [fetchingData, setFetchingData] = useState(false);
  const [fetchDataError, setFetchDataError] = useState('');

  const handleURLConversion = () => {
    let modifiedURL = '';

    // Check if URL starts with "https://scan.pulsechain.com/"
    if (inputURL.startsWith('https://scan.pulsechain.com/')) {
      setFetchingData(true); // Set fetching data to true before fetching
      setFetchDataError(''); // Clear any previous fetch error

      fetch('https://scan.pulsechain.com/version.json')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data); // Log the fetched data
          const ipfsAddress = data.ipfs_address; // Extract ipfs_address from version.json
          // Modify URL according to the format specified
          modifiedURL = `http://${ipfsAddress}.ipfs.dweb.link/#/${inputURL.split('https://scan.pulsechain.com/')[1]}`;
          setConvertedURL(modifiedURL); // Update state with the converted URL
        })
        .catch(error => {
          console.error('Error fetching data:', error); // Log any fetch errors
          setFetchDataError('Error fetching data. Please try again.'); // Set fetch error state
        })
        .finally(() => {
          setFetchingData(false); // Set fetching data back to false after fetch completes
        });
    }
    // Check if URL contains "dweb.link/"
    else if (inputURL.includes('dweb.link/')) {
      // Modify URL by adding "#/" after "dweb.link/"
      modifiedURL = inputURL.replace(/(dweb.link\/)/, '$1#/');
      setConvertedURL(modifiedURL); // Update state with the converted URL
    } else {
      setConvertedURL(inputURL); // No modification needed, set as it is
      setFetchDataError(''); // Clear any error message
    }
  };

  return (
    <div className="container">
      <h1 className="title">PulseChain URL Reformat Tool</h1>
      <input
        type="text"
        value={inputURL}
        onChange={(e) => setInputURL(e.target.value)}
        placeholder="Enter URL"
        className="text-box"
      />
      <button onClick={handleURLConversion} className="button">
        Convert URL
      </button>
      <br />
      {fetchingData && <p>Fetching data from version.json...</p>}
      {fetchDataError && <p>{fetchDataError}</p>}
      {convertedURL && !fetchingData && !fetchDataError && (
        <a href={convertedURL} target="_blank" rel="noopener noreferrer" className="result">
          {convertedURL}
        </a>
      )}
      <footer className="footer">
        Made by <a href="https://twitter.com/Poseidon_5555" target="_blank" rel="noopener noreferrer" className="poseidon-link">Poseidon</a>
        <a href="https://twitter.com/Poseidon_5555" target="_blank" rel="noopener noreferrer">
          <img src="poseidon_logo.png" alt="Poseidon Logo" className="logo" />
        </a>
      </footer>
    </div>
  );
}

export default URLInput;
