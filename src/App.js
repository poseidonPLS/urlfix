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
      setFetchingData(true);
      setFetchDataError('');

      fetch('https://scan.pulsechain.com/version.json')
        .then(response => response.json())
        .then(data => {
          const ipfsAddress = data.ipfs_address;
          modifiedURL = `http://${ipfsAddress}.ipfs.dweb.link/#/${inputURL.split('https://scan.pulsechain.com/')[1]}`;
          setConvertedURL(modifiedURL);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setFetchDataError('Error fetching data. Please try again.');
        })
        .finally(() => {
          setFetchingData(false);
        });
    }
    // Check if URL contains "dweb.link/"
    else if (inputURL.includes('dweb.link/')) {
      modifiedURL = inputURL.replace(/(dweb.link\/)/, '$1#/');
      setConvertedURL(modifiedURL);
    }
    // Check if URL matches EVM transaction pattern
    else if (inputURL.match(/^0x[a-fA-F0-9]{64}$/)) {
      modifiedURL = `https://bafybeicb2hlad6zs4kc4yvn5xbbzti6krjtpoxrysg42d4e5s5oubbipum.ipfs.dweb.link/#/tx/${inputURL}`;
      setConvertedURL(modifiedURL);
      setFetchDataError('');
    }
    else if (inputURL.match(/^0x[a-fA-F0-9]{64}$/)) {
      setFetchingData(true);
      setFetchDataError('');

      fetch('https://scan.pulsechain.com/version.json')
        .then(response => response.json())
        .then(data => {
          const ipfsAddress = data.ipfs_address;
          modifiedURL = `http://${ipfsAddress}.ipfs.dweb.link/#/tx/${inputURL}`;
          setConvertedURL(modifiedURL);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setFetchDataError('Error fetching data. Please try again.');
        })
        .finally(() => {
          setFetchingData(false);
        });
    }
    else if (inputURL.match(/^0x[a-fA-F0-9]{40}$/)) {
      setFetchingData(true);
      setFetchDataError('');

      fetch('https://scan.pulsechain.com/version.json')
        .then(response => response.json())
        .then(data => {
          const ipfsAddress = data.ipfs_address;
          modifiedURL = `http://${ipfsAddress}.ipfs.dweb.link/#/address/${inputURL}`;
          setConvertedURL(modifiedURL);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setFetchDataError('Error fetching data. Please try again.');
        })
        .finally(() => {
          setFetchingData(false);
        });
    }
        // Check if URL starts with "https://otter.pulsechain.com/"
        if (inputURL.startsWith('https://otter.pulsechain.com/')) {
          setFetchingData(true);
          setFetchDataError('');
    
          fetch('https://scan.pulsechain.com/version.json')
            .then(response => response.json())
            .then(data => {
              const ipfsAddress = data.ipfs_address;
              modifiedURL = `http://${ipfsAddress}.ipfs.dweb.link/#/${inputURL.split('https://otter.pulsechain.com/')[1]}`;
              setConvertedURL(modifiedURL);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
              setFetchDataError('Error fetching data. Please try again.');
            })
            .finally(() => {
              setFetchingData(false);
            });
        }
    else {
      setConvertedURL(inputURL);
      setFetchDataError('');
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
