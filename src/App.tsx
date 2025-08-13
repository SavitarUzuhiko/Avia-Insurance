import { Main, Navbar, Tabs } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[linear-gradient(to_bottom,rgba(0,50,165,0.8),rgba(255,255,255)),url('./assets/Trees.png')] bg-cover bg-center w-full p-4 py-6 ">
        <Navbar />
        <Routes>
          <Route index element={<Main />} />
        </Routes>
        <Tabs />
      </div>
    </BrowserRouter>
  );
};

export default App;
