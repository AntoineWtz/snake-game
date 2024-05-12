// App.js
import './App.css';
import SnakeGame from './components/SnakeGame';

function App() {
  const generateFood = () => {
    return { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
  };

  return (
    <div className="App">
      <SnakeGame generateFood={generateFood} />
    </div>
  );
}

export default App;
