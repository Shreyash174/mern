import React from 'react';
import Layout from '../Components/Layout/Layout';
import { useAuth } from '../context/auth';

const Homepage = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
}

export default Homepage;
