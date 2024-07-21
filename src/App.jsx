
import '/src/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';







const App= () => (
  <Router>
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-[1600px] mx-auto">
      <Header />
      <main className="flex flex-col items-center  p-6">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/features" element={<div>Features Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="*" element={<div>404 Page Not Found</div>} /> 
        </Routes>
      </main>
      <footer className="w-full py-4 bg-blue-600 text-gray-400 text-center">
        © 2024 <span className='text-lg text-white font-bold'>HAPPYCHILD</span> All Rights Reserved
      </footer>
    </div>
  </Router>
);

export default App;





