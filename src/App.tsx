import Router from './router/router';
import { UserContextProvider } from './context/userContext';

const App = () => {
  return (
    <div className='App'>
      <UserContextProvider>
        <header></header>
        <main>
          <Router />
        </main>
        <footer></footer>
      </UserContextProvider>
    </div>
  );
};

export default App;
