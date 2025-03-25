import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import Header from './layouts/Header'
import FullArticlePage from './pages/FullArticlePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SearchPage from './pages/SearchPage/SearchPage'
import CreateArticlePage from './pages/CreateArticlePage/CreateArticlePage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import { ToastContainer } from "react-toastify";

function App() {
  return (  
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/article/:id" element={<FullArticlePage />} />
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/create-article" element={<CreateArticlePage/>} />
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </>
  )
}

export default App

