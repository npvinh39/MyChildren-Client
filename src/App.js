import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer } from './components';
import Pages from './components/Pages';

function App() {
    const isPage = window.location.pathname === '/login' || window.location.pathname === '/register';
    return (
        <Router>
            <div className="App">
                {isPage ? null : <Header />}
                <Pages />
                {isPage ? null : <Footer />}
            </div>
        </Router>
    );
}

export default App;
