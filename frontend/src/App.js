import logo from './assets/lendlord.png'
import './App.css';
import List from './components/List/List.component';
const BASE_URL = process.env.REACT_APP_BASE_URL;
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width={'200px'} alt={'logo'} />
      </header>
      <List></List>
    </div>
  );
}

export default App;
