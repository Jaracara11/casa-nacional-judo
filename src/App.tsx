import './styles/App.css';
import { Router } from './routes/router';
import { UserContextProvider } from './context/userContext';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

export const App = () => {
    return (
        <div className='App'>
            <UserContextProvider>
                <header>
                    <Navbar />
                </header>
                <main className='container-fluid'>
                    <Router />
                </main>
                <footer>
                    <Footer />
                </footer>
            </UserContextProvider>
        </div>
    );
};
