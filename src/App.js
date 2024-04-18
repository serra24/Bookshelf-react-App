import logo from './logo.svg';
import './App.css';
import Register from './pages/auth/Register';
function App() {

    const handleRegister = () => {
        console.log('User registered');
    };

    return (
        <div>
            <h1>Bookshelf App</h1>
            <Register onRegister={handleRegister} />
        </div>
    );
};

export default App;




