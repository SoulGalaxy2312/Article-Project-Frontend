import { Route, Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './layouts/Header'
import FullArticlePage from './pages/FullArticlePage'

function App() {
  return (  
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/article/:id" element={<FullArticlePage />} />
      </Routes>
    </>
  )
}

export default App

