import React, { useState } from 'react';

const CreateUser = () => {
    const [userName, setUserName] = useState('');
    const [surName, setSurName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const userData = {
            userName: userName,
            surName: surName,
            password: password,
            email: email
        };
        console.log(userData);
        // You can now use the userData object to perform any necessary actions, such as sending it to an API endpoint or storing it in a database.
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User Name:
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Surname:
                <input
                    type="text"
                    value={surName}
                    onChange={(e) => setSurName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};

export default CreateUser;