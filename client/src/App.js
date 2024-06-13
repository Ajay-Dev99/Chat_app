import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes';
// import ProductRoutes from './Routes/ProductRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notfound from './components/Notfound';



function App() {
  return (
    <>
  <Router>
    <Routes>
      <Route path="/*" element={<UserRoutes/>} />
      <Route path="*" element={<Notfound />} />
    </Routes>
    <ToastContainer />
  </Router>
    </>
  );
}

export default App;
