
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './static/todo/css/bootstrap.css';

import Layout from './layout';
import LoginPage from './login';
import RegisterPage from './register';
import HomePage from './home';
import Navbar from './navbar';
import ResetPassword from './forgetPassword';
import EditTodo from './editTodo';
import AddTodo from './add-todo';
import ResetNewPassword from './resetPassword';

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Navbar />
      <Routes>
        {/* Routes accessible before login */}
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgetPass" element={<ResetPassword />} />
        <Route path="/auth/reset-password" element={<ResetNewPassword />} />
        



        {/* Routes accessible after login */}
        <Route
          path="/todos"
          element={<HomePage />}
        />
        <Route
          path="/todos/add-todo"
          element={<AddTodo />}
        />
        <Route
          path="/todos/edit-todo/:todoId"
          element={<EditTodo />}
        />
        {/* Add more routes here */}
      </Routes>
    </Layout>
  </BrowserRouter>,
  document.getElementById('root')
);
