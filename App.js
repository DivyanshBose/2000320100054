import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState([]);
  const [result, setResult] = useState([]);

  const handleUrlChange = (e, index) => {
    const newUrls = [...urls];
    newUrls[index] = e.target.value;
    setUrls(newUrls);
  };

  const addUrlInput = () => {
    setUrls([...urls, '']);
  };

  const removeUrlInput = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const fetchNumbers = async () => {
    try {
      const response = await axios.get('/numbers', {
        params: { url: urls },
      });
      setResult(response.data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <h1>Number Management Frontend</h1>
      <div>
        {urls.map((url, index) => (
          <div key={index}>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e, index)}
              placeholder="Enter URL"
            />
            <button onClick={() => removeUrlInput(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addUrlInput}>Add URL</button>
      </div>
      <div>
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      {result.length > 0 && (
        <div>
          <h2>Merged and Sorted Numbers:</h2>
          <ul>
            {result.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
