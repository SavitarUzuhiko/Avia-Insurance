import { Main, Navbar, Tabs } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router';

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-[50vh] bg-[linear-gradient(to_bottom,rgba(0,50,165,0.8),rgba(255,255,255)),url('./assets/Trees.png')] bg-cover bg-center w-full p-4 pt-6">
        <Navbar />
        <div className='mb-18'>
          <Routes>
            <Route index element={<Main />} />
          </Routes>
        </div>
        <Tabs />
      </div>
    </BrowserRouter>
  );
};

export default App;
