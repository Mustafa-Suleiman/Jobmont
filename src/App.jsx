// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages
import { Landing, Error, Register } from './pages';
//dashboard
import { AllJobs, Profile, Stats, AddJob, SharedLayout, ProtectedRoute } from './pages/dashboard';
//toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />

        {/* nested */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='profile' element={<Profile />} />
          <Route path='add-job' element={<AddJob />} />
        </Route>
        {/* END nested */}

        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
      {/* toastify */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </BrowserRouter>
  );
}
