import './App.css'
import PdfGenrator from './pages/PdfGenrator'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    
     <Toaster position="top-right" />
      <PdfGenrator/>
    
    </>
  )
}

export default App
