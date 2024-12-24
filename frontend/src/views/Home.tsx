import Calendar from '../features/Calendar';
import '../styles/home.css';

interface HomeProps {
  onLogout: () => void;
}

const Home = ({ onLogout }: HomeProps) => {
  return (
    <div className="home-container">
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
      <Calendar />
    </div>
  );
};

export default Home;
