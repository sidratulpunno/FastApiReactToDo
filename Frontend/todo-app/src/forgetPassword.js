import React, { useState } from 'react';

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://127.0.0.1:8000/auth/forgetPass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(response => {
            if (response.ok) {
                alert('Password reset email sent.');
            } else {
                alert('Failed to send password reset email.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    Reset Password
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
