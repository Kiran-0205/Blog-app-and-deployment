import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import  Signup from './pages/Signup'
import Signin  from './pages/Signin'
import Blogs from './pages/Blogs'
import { Blog } from './pages/Blog'
import { AppBar } from './components/Appbar'
import Publish from './pages/Publish'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <div className="flex-1">
        <Outlet /> 
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="publish" element={<Publish />} />
        <Route element={<Layout />}>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App