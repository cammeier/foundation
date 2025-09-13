import React, { useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton, useAuth } from '@clerk/clerk-react';
import './App.css';

function HomePage() {
  const [count, setCount] = useState(0);
  const [lists, setLists] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const fetchLists = async () => {
    setLoading(true);
    setError(null);
    setLists(null);

    try {
      const token = await getToken();
      
      // Debug: Log the token (first 20 chars for security)
      console.log('🔑 Token received:', token ? `${token.substring(0, 20)}...` : 'No token');
      
      if (!token) {
        throw new Error('No authentication token available. Please sign in again.');
      }
      
      const response = await fetch('http://localhost:3001/lists', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setLists(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching lists:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="user-controls">
          <UserButton afterSignOutUrl="/" />
        </div>
        
        <h1>Welcome to Foundation Frontend</h1>
        <p>A basic React app built with Webpack</p>
        
        <div className="counter-section">
          <h2>Counter Demo</h2>
          <p>Current count: <span className="count">{count}</span></p>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)}>
              Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
              Decrement
            </button>
            <button onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </div>

        <div className="api-section">
          <h2>API Demo</h2>
          <p>Test the connection to your NestJS backend</p>
          <button 
            onClick={fetchLists} 
            disabled={loading}
            className="api-button"
          >
            {loading ? 'Loading...' : 'Fetch Lists from API'}
          </button>

          {error && (
            <div className="error-message">
              <h3>❌ Error:</h3>
              <p>{error}</p>
            </div>
          )}

          {lists && (
            <div className="api-response">
              <h3>✅ API Response:</h3>
              <div className="response-content">
                <p><strong>Status:</strong> {lists.success ? 'Success' : 'Failed'}</p>
                <p><strong>Message:</strong> {lists.message}</p>
                <p><strong>User:</strong> {lists.user?.email} (ID: {lists.user?.id})</p>
                <p><strong>Lists Found:</strong> {lists.data?.length || 0}</p>
                
                {lists.data && lists.data.length > 0 && (
                  <div className="lists-preview">
                    <h4>Lists Preview:</h4>
                    <ul>
                      {lists.data.slice(0, 3).map((list, index) => (
                        <li key={index}>
                          <strong>{list.name}</strong> - {list.description}
                          <br />
                          <small>Items: {list.items?.length || 0}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <details className="raw-response">
                <summary>View Raw JSON Response</summary>
                <pre>{JSON.stringify(lists, null, 2)}</pre>
              </details>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <HomePage />
      </SignedIn>
      <SignedOut>
        <div className="login-container">
          <div className="login-content">
            <h1>Welcome to Foundation</h1>
            <p>Please sign in to continue</p>
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
                  card: 'bg-white shadow-lg rounded-lg p-6',
                  headerTitle: 'text-2xl font-bold text-gray-800',
                  headerSubtitle: 'text-gray-600',
                }
              }}
            />
          </div>
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;

