import React from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from "../context/auth";

const Home = () => {
  const [auth, setAuth] = useAuth();
  
  const { user } = auth || {};
  const { name, email, phone } = user || {};

  return (
    <Layout>
      <h1>Home Page</h1>
      <div>
        <h2>User Information</h2>
        <p><strong>Name:</strong> {name || ""}</p>
        <p><strong>Email:</strong> {email || ""}</p>
        <p><strong>Phone:</strong> {phone || ""}</p>
      </div>
    </Layout>
  );
}

export default Home;
