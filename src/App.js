import { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'GET' // GET, PUT, POST, UPDATE, DELETE, PATCH
    })

    if (response.status === 200) {
      const newUsers = await response.json()
      console.log({ newUsers })
      if (newUsers.length > 0) {
        setUsers(newUsers)
      }
    }
  }

  const getPosts = async (userId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)

    if (response.status === 200) {
      const posts = await response.json()
      console.log({ posts })
      if (posts.length > 0) {
        setPosts(posts)
      }
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      margin: '32px'
    }}>
      <div style={{
        width: '300px',
        height: '100%'
      }}>
        {
          users.map(user => (
            <div
                key={`user-${user.id}`} style={{ border: '1px solid black', padding: '8px', borderRadius: '3px', marginBottom: '8px', cursor: 'pointer' }}
                onClick={() => getPosts(user.id)}
            >
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{user.username}</div>
              <div style={{ fontSize: '12px', marginTop: '8px' }}>{user.website}</div>
            </div>
          ))
        }
      </div>
      <div style={{
        flexGrow: '1',
        height: '100%',
        width: 'min-content',
        margin: '32px'
      }}>
        {
          posts.map(post => (
            <div key={`post-${post.userId}-${post.id}`} style={{ margin: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: '500' }}>{post.title}</div>
              <div style={{ fontSize: '12px' }}>{post.body}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
