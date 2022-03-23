import logo from './assets/lendlord.png'
import './App.css';
import List from './components/list/list.component';

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
