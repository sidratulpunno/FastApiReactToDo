

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const EditTodo = () => {
//   const { todoId } = useParams();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchTodo = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//           console.log("no token");
//           return;
//         }
        
//         const response = await fetch(`http://127.0.0.1:8000/todos/${todoId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch todo');
//         }
//         const data = await response.json();
//         setTitle(data.title);
//         setDescription(data.description);
//         setPriority(data.priority);
//       } catch (error) {
//         console.error('Error fetching todo:', error);
//         setMessage('Failed to fetch todo. Please try again later.');
//       }
//     };
//     fetchTodo();
//   }, [todoId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         console.log("no token");
//         return;
//       }

//       const response = await fetch(`http://127.0.0.1:8000/todos/edit-todo/${todoId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ title, description, priority })
//       });
//       if (!response.ok) {
//         throw new Error('Failed to edit todo');
//       }
//       window.location.href = '/todos/';
//     } catch (error) {
//       console.error('Error editing todo:', error);
//       setMessage('Failed to edit todo. Please try again later.');
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         console.log("no token");
//         return;
//       }

//       const response = await fetch(`http://127.0.0.1:8000/todos/delete/${todoId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete todo');
//       }
//       window.location.href = '/todos/';
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//       setMessage('Failed to delete todo. Please try again later.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <div className="card-header">
//           Let's edit your todo!
//         </div>
//         <div className="card-body">
//           {message && <div className="alert alert-danger">{message}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Title</label>
//               <input type="text" className="form-control" value={title}
//                      onChange={(e) => setTitle(e.target.value)} required />
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <textarea className="form-control" value={description}
//                         onChange={(e) => setDescription(e.target.value)} rows="3" required />
//             </div>
//             <div className="form-group">
//               <label>Priority</label>
//               <select className="form-control" value={priority}
//                       onChange={(e) => setPriority(e.target.value)}>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary mr-2">Edit your todo</button>
//             <button onClick={handleDelete} type="button" className="btn btn-danger">Delete</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditTodo;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditTodo = () => {
  const { todoId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('1'); // Default priority
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.log("No token found");
          return;
        }
        
        const response = await fetch(`http://127.0.0.1:8000/todos/${todoId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch todo');
        }
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setPriority(data.priority.toString());
      } catch (error) {
        console.error('Error fetching todo:', error);
        setMessage('Failed to fetch todo. Please try again later.');
      }
    };
    fetchTodo();
  }, [todoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/todos/edit-todo/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, priority: parseInt(priority) })
      });
      if (!response.ok) {
        throw new Error('Failed to edit todo');
      }
      window.location.href = '/todos/';
    } catch (error) {
      console.error('Error editing todo:', error);
      setMessage('Failed to edit todo. Please try again later.');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/todos/delete/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      window.location.href = '/todos/';
    } catch (error) {
      console.error('Error deleting todo:', error);
      setMessage('Failed to delete todo. Please try again later.');
    }
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/complete/${todoId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }
      window.location.href = '/todos/';
    } catch (error) {
      console.error('Error completing todo:', error);
      setMessage('Failed to complete todo. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Let's edit your todo!
        </div>
        <div className="card-body">
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mr-2">
              Edit your todo
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger mr-2"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;

