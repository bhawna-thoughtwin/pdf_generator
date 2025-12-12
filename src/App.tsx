import './App.css'
import PdfGenrator from './pages/PdfGenrator'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <div className="bg-blue-500 text-white p-3 text-center text-2xl">
           PDF Generator
    </div>
     <Toaster position="top-right" />
      <PdfGenrator/>
    
    </>
  )
}

export default App
