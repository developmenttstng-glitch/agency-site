import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Work from './pages/Work'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

export default function App() {
  const [page, setPage] = useState('home')

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [page])

  function renderPage() {
    switch (page) {
      case 'home':     return <Home     onNav={setPage} />
      case 'about':    return <About    onNav={setPage} />
      case 'services': return <Services onNav={setPage} />
      case 'work':     return <Work     onNav={setPage} />
      case 'blog':     return <Blog />
      case 'contact':  return <Contact />
      default:         return <Home     onNav={setPage} />
    }
  }

  return (
    <div style={{ paddingTop: '64px' }}>
      <Nav currentPage={page} onNav={setPage} />
      <main>{renderPage()}</main>
      <Footer onNav={setPage} />
    </div>
  )
}
