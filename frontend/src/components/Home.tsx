
interface HomeProps {
  onLogout: () => void;
}

const Home = ({ onLogout }: HomeProps) => {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page!</h1>
      <p>This is the main dashboard after login.</p>
      <button onClick={onLogout} className="input-button">
        Logout
      </button>
    </div>
  );
};

export default Home;
