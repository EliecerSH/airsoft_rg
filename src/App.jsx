import Footer_1 from './component/Footer_1';
import Hoober_1 from './component/Hoober_1';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function App() {

  return (
    <div>
      <Hoober_1></Hoober_1>
      <Footer_1></Footer_1>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"/>

    </div>
    
  )
}

export default App
