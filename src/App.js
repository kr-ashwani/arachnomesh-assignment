import './App.css';
import Awards from './components/Awards/Awards';
import Benefits from './components/Benefits/Benefits';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="homepage">
      <Nav />
      <div className="mainContainer">
        <Awards />
        <Benefits />
      </div>
    </div>
  );
}

export default App;
