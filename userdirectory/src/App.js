import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) <p>Loading...</p>;
  if (error) <p>Failed to fetch users {error.message}</p>;

  return (
    <div>
      <h1>Simple User Directory</h1>
      <h2>USERS:</h2>
      <div className='users'>
        {user.slice(0,5).map((user) => (
          <div className='details' key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Company Name: {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
