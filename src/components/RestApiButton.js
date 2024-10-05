import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners'; // Import the spinner you want to use
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for toast

const RestApiButton = ({ url, payload, method = 'POST', buttonText, onSuccessMessage = 'Operation successful', onError, className }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiCall = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...payload.headers, // Spread any additional headers
        },
        body: JSON.stringify(payload.body), // Send payload body as JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success(onSuccessMessage); // Show success toast
    } catch (err) {
      setError(err.message);
      if (onError) {
        onError(err);
      }
      toast.error(`Error: ${err.message}`); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleApiCall} disabled={loading} className={className}>
        {loading ? <ClipLoader size={24} color={"#3498db"} loading={loading} /> : buttonText}
      </button>
    </div>
  );
};

export default RestApiButton;
