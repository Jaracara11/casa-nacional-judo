import './styles/App.css';
import Router from './router/router';
import { UserContextProvider } from './context/userContext';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

const App = () => {
  return (
    <div className='App'>
      <UserContextProvider>
        <header>
          <Navbar />
        </header>
        <main>
          <Router />
        </main>
        <footer>
          <Footer />
        </footer>
      </UserContextProvider>
    </div>
  );
};

export default App;
