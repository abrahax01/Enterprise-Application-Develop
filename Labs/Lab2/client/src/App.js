import logo from './components/images/logo.svg';
import './components/styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="/">Home</a>
      </header>
    </div>
  );
}

export default App;
