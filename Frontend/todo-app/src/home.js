// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Layout from './layout';

// const Home = () => {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/todos`);
//         setTodos(response.data);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//       }
//     };

//     fetchTodos();
//   }, []);

//   const handleCompleteTodo = async (todoId) => {
//     try {
//       await axios.get(`http://127.0.0.1:8000/todos/complete/${todoId}`);
//       const updatedTodos = todos.map(todo => {
//         if (todo.id === todoId) {
//           return { ...todo, complete: !todo.complete };
//         }
//         return todo;
//       });
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.error('Error completing todo:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card text-center">
//         <div className="card-header">
//           Your Todos!
//         </div>
//         <div className="card-body">
//           <h5 className="card-title">List of your Todos!</h5>
//           <p className="card-text">Information regarding stuff that needs to be complete</p>

//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Info</th>
//                 <th scope="col">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {todos.map((todo, index) => (
//                 <tr key={todo.id} className={todo.complete ? 'pointer alert alert-success' : 'pointer'}>
//                   <td>{index + 1}</td>
//                   <td className={todo.complete ? 'strike-through-td' : ''}>{todo.title}</td>
//                   <td>
//                     <button onClick={() => handleCompleteTodo(todo.id)}
//                             type="button" className="btn btn-success">
//                       {todo.complete ? 'Undo' : 'Complete'}
//                     </button>
//                     <button onClick={() => window.location.href=`/todos/edit-todo/${todo.id}`}
//                             type="button" className="btn btn-info">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <a href="/todos/add-todo" className="btn btn-primary">Add a new Todo!</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// =======================================




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//           console.log("No token found in localStorage");
//           // Redirect to login or handle unauthorized access
//           return;
//         }
//         const response = await axios.get('http://127.0.0.1:8000/todos', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setTodos(response.data);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//         if (error.response && error.response.status === 401) {
//           // Handle unauthorized access, maybe redirect to login
//         } else {
//           setError('Failed to fetch todos. Please try again later.');
//         }
//       }
//     };

//     fetchTodos();
//   }, []);

//   const handleCompleteTodo = async (todoId) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         console.log("No token found in localStorage");
//         // Redirect to login or handle unauthorized access
//         return;
//       }
//       await axios.put(`http://127.0.0.1:8000/todos/complete/${todoId}`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const updatedTodos = todos.map(todo => {
//         if (todo.id === todoId) {
//           return { ...todo, complete: !todo.complete };
//         }
//         return todo;
//       });
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.error('Error completing todo:', error);
//       setError('Failed to complete todo. Please try again later.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card text-center">
//         <div className="card-header">
//           Your Todos!
//         </div>
//         <div className="card-body">
//           {error && <div className="alert alert-danger">{error}</div>}
//           <h5 className="card-title">List of your Todos!</h5>
//           <p className="card-text">Information regarding stuff that needs to be complete</p>

//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Info</th>
//                 <th scope="col">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {todos.map((todo, index) => (
//                 <tr key={todo.id} className={todo.complete ? 'pointer alert alert-success' : 'pointer'}>
//                   <td>{index + 1}</td>
//                   <td className={todo.complete ? 'strike-through-td' : ''}>{todo.title}</td>
//                   <td>
//                     <button onClick={() => handleCompleteTodo(todo.id)} type="button" className="btn btn-success">
//                       {todo.complete ? 'Undo' : 'Complete'}
//                     </button>
//                     <button onClick={() => window.location.href=`/todos/edit-todo/${todo.id}`} type="button" className="btn btn-info">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <a href="/todos/add-todo" className="btn btn-primary">Add a new Todo!</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// =====================cookie auth

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const token = document.cookie.split('; ').find(row => row.startsWith('access_token')).split('=')[1];
        
//         console.log(token);
//         if (!token) {
//            console.log("no cookies");
//           // Redirect to login or handle unauthorized access
//           return;
//         }
//          console.log(" token found in cookies 2");
//         // console.log(token) //======
//         const response = await axios.get('http://127.0.0.1:8000/todos/', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setTodos(response.data);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//         if (error.response && error.response.status === 401) {
//           // Handle unauthorized access, maybe redirect to login
//         } else {
//           setError('Failed to fetch todos. Please try again later.');
//         }
//       }
//     };

//     fetchTodos();
//   }, []);

//   const handleCompleteTodo = async (todoId) => {
//     try {
//       const token = document.cookie.split('; ').find(row => row.startsWith('access_token')).split('=')[1];
//       console.log(token)
//       if (!token) {
//         console.log("No token found in cookies");
//         // Redirect to login or handle unauthorized access
//         return;
//       }
//       console.log("token found in cookies 1 ");
//       await axios.put(`http://127.0.0.1:8000/todos/complete/${todoId}`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const updatedTodos = todos.map(todo => {
//         if (todo.id === todoId) {
//           return { ...todo, complete: !todo.complete };
//         }
//         return todo;
//       });
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.error('Error completing todo:', error);
//       setError('Failed to complete todo. Please try again later.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card text-center">
//         <div className="card-header">
//           Your Todos!
//         </div>
//         <div className="card-body">
//           {error && <div className="alert alert-danger">{error}</div>}
//           <h5 className="card-title">List of your Todos!</h5>
//           <p className="card-text">Information regarding stuff that needs to be complete</p>

//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Info</th>
//                 <th scope="col">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {todos.map((todo, index) => (
//                 <tr key={todo.id} className={todo.complete ? 'pointer alert alert-success' : 'pointer'}>
//                   <td>{index + 1}</td>
//                   <td className={todo.complete ? 'strike-through-td' : ''}>{todo.title}</td>
//                   <td>
//                     <button onClick={() => handleCompleteTodo(todo.id)} type="button" className="btn btn-success">
//                       {todo.complete ? 'Undo' : 'Complete'}
//                     </button>
//                     <button onClick={() => window.location.href=`/todos/edit-todo/${todo.id}`} type="button" className="btn btn-info">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <a href="/todos/add-todo" className="btn btn-primary">Add a new Todo!</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// =============





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState('');

// useEffect(() => {
//   const fetchTodos = async () => {
//     try {
//       const token = document.cookie.split('; ').find(row => row.startsWith('access_token')).split('=')[1];
      
//       console.log(token);
//       if (!token) {
//         console.log("no cookies");
//         // Redirect to login or handle unauthorized access
//         return;
//       }
      
//       console.log("token found in cookies 2");
      
//       const response = await fetch('http://127.0.0.1:8000/todos/', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch todos');
//       }

//       const data = await response.json();
//       setTodos(data);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//       if (error.response && error.response.status === 401) {
//         // Handle unauthorized access, maybe redirect to login
//       } else {
//         setError('Failed to fetch todos. Please try again later.');
//       }
//     }
//   };

//   fetchTodos();
// }, []);


// const handleCompleteTodo = async (todoId) => {
//   try {
//     const token = document.cookie.split('; ').find(row => row.startsWith('access_token')).split('=')[1];
//     if (!token) {
//       console.log("No token found in cookies");
//       // Redirect to login or handle unauthorized access
//       return;
//     }

//     await fetch(`http://127.0.0.1:8000/todos/complete/${todoId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({}) // Empty body as PUT request doesn't require data
//     });

//     const updatedTodos = todos.map(todo => {
//       if (todo.id === todoId) {
//         return { ...todo, complete: !todo.complete };
//       }
//       return todo;
//     });
//     setTodos(updatedTodos);
//   } catch (error) {
//     console.error('Error completing todo:', error);
//     setError('Failed to complete todo. Please try again later.');
//   }
// };


// return (
//   <div className="container">
//     <div className="card text-center">
//       <div className="card-header">
//         Your Todos!
//       </div>
//       <div className="card-body">
//         {error && <div className="alert alert-danger">{error}</div>}
//         <h5 className="card-title">List of your Todos!</h5>
//         <p className="card-text">Information regarding stuff that needs to be complete</p>

//         <table className="table table-hover">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Info</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todos.map((todo, index) => (
//               <tr key={todo.id} className={todo.complete ? 'pointer alert alert-success' : 'pointer'}>
//                 <td>{index + 1}</td>
//                 <td className={todo.complete ? 'strike-through-td' : ''}>{todo.title}</td>
//                 <td>
//                   <button onClick={() => handleCompleteTodo(todo.id)} type="button" className="btn btn-success">
//                     {todo.complete ? 'Undo' : 'Complete'}
//                   </button>
//                   <button onClick={() => window.location.href=`/todos/edit-todo/${todo.id}`} type="button" className="btn btn-info">
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <a href="/todos/add-todo" className="btn btn-primary">Add a new Todo!</a>
//       </div>
//     </div>
//   </div>
// );
// };

// export default Home;

// ++++++++++++++++++++++++


// import React, { useState, useEffect } from 'react';

// const Home = () => {
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
//         if (!token) {
//           console.log("No token found in localStorage");
//           // Redirect to login or handle unauthorized access
//           return;
//         }

//         const response = await fetch('http://127.0.0.1:8000/todos/', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch todos');
//         }

//         const data = await response.json();
//         setTodos(data);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//         if (error.response && error.response.status === 401) {
//           // Handle unauthorized access, maybe redirect to login
//         } else {
//           setError('Failed to fetch todos. Please try again later.');
//         }
//       }
//     };

//     fetchTodos();
//   }, []);

//   const handleCompleteTodo = async (todoId) => {
//     try {
//       const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
//       if (!token) {
//         console.log("No token found in localStorage");
//         // Redirect to login or handle unauthorized access
//         return;
//       }

//       await fetch(`http://127.0.0.1:8000/todos/complete/${todoId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({}) // Empty body as PUT request doesn't require data
//       });

//       const updatedTodos = todos.map(todo => {
//         if (todo.id === todoId) {
//           return { ...todo, complete: !todo.complete };
//         }
//         return todo;
//       });
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.error('Error completing todo:', error);
//       setError('Failed to complete todo. Please try again later.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card text-center">
//         <div className="card-header">
//           Your Todos!
//         </div>
//         <div className="card-body">
//           {error && <div className="alert alert-danger">{error}</div>}
//           <h5 className="card-title">List of your Todos!</h5>
//           <p className="card-text">Information regarding stuff that needs to be complete</p>

//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Info</th>
//                 <th scope="col">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {todos.map((todo, index) => (
//                 <tr key={todo.id} className={todo.complete ? 'pointer alert alert-success' : 'pointer'}>
//                   <td>{index + 1}</td>
//                   <td className={todo.complete ? 'strike-through-td' : ''}>{todo.title}</td>
//                   <td>
//                     <button onClick={() => handleCompleteTodo(todo.id)} type="button" className="btn btn-success">
//                       {todo.complete ? 'Undo' : 'Complete'}
//                     </button>
//                     <button onClick={() => window.location.href=`/todos/edit-todo/${todo.id}`} type="button" className="btn btn-info">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <a href="/todos/add-todo" className="btn btn-primary">Add a new Todo!</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// ===last 
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
        if (!token) {
          console.log("No token found in localStorage");
          // Redirect to login or handle unauthorized access
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/todos/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access, maybe redirect to login
        } else {
          setError('Failed to fetch todos. Please try again later.');
        }
      }
    };

    fetchTodos();
  }, []);

  const handleCompleteTodo = async (todoId) => {
    try {
      const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
      if (!token) {
        console.log("No token found in localStorage");
        // Redirect to login or handle unauthorized access
        return;
      }

      await fetch(`http://127.0.0.1:8000/todos/complete/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({}) // Empty body as PUT request doesn't require data
      });

      const updatedTodos = todos.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error completing todo:', error);
      setError('Failed to complete todo. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          Your Todos!
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <h5 className="card-title">List of your Todos!</h5>
          <p className="card-text">Information regarding stuff that needs to be complete</p>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Info</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id} className={todo.complete ? 'pointer alert alert-success' : 'pointer'}>
                  <td>{index + 1}</td>
                  <td className={todo.complete ? 'strike-through-td' : ''}>{todo.title}</td>
                  <td>
                    <button onClick={() => handleCompleteTodo(todo.id)} type="button" className="btn btn-success">
                      {todo.complete ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => window.location.href=`/todos/edit-todo/${todo.id}`} type="button" className="btn btn-info">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <a href="/todos/add-todo" className="btn btn-primary">Add a new Todo!</a>
        </div>
      </div>
    </div>
  );
};

export default Home;