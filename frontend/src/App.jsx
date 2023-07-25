import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { LostPassword } from './pages/LostPassword';
import { NewPassword } from './pages/NewPassword';
import { ConfirmAcount } from './pages/ConfirmAcount';

function App() {
  return (
    <BrowserRouter>
      {/* Area publica */}
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='lost-password' element={<LostPassword />} />
          <Route path='forget-password/:token' element={<NewPassword />} />
          <Route path='confirm/:token' element={<ConfirmAcount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
