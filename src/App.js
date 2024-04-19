import './App.css';
import Welcome from './components/Welcome';
import Chatinterface from './components/Chatinterface';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className='app'>
      {!user ? <Welcome /> : <Chatinterface />}
    </div>
  );
}

export default App;
