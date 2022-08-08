import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from 'components/UI/Layout';
import Home from 'components/Home/Index';
import About from 'components/About/Index';



export default function App() {
  return ( 
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<About />} path='/about' />
          <Route element={<Home />} path='/' />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

