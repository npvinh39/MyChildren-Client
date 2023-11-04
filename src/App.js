import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Header, Footer } from './components';
import Pages from './components/Pages';

function App() {
    return (
        <Router>
            <MainPages />
        </Router>
    );
}

const MainPages = () => {
    const location = useLocation();
    const isPage = location.pathname === '/login' || location.pathname === '/register';
    if (isPage) {
        return (
            <div className="App">
                <Pages />
            </div>
        );
    }
    return (
        <div className="App">
            <Header />
            <Pages />
            <Footer />
        </div>
    );
}

export default App;
