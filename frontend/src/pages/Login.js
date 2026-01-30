import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Form, Button, Card } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    login(res.data);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
      <Card className="p-4 bg-dark text-white" style={{width:'400px'}}>
        <h2 className="mb-3">Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control className="mb-2" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
          <Form.Control className="mb-3" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
          <Button type="submit" variant="danger">Login</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;