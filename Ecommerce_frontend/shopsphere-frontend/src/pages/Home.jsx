import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCTA = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "ADMIN") {
      navigate("/admin");
    }
  };

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="home-hero">
        <h1>ShopSphere</h1>
        <p>Everything you need, one sphere</p>

        <button className="home-cta-btn" onClick={handleCTA}>
          {user ? "Go to Dashboard" : "Get Started"}
        </button>
      </section>

      {/* FEATURES */}
      <section className="home-features">
        <div className="feature-card">
          <span>🔐</span>
          <h4>Secure Authentication</h4>
          <p>JWT based login & role access</p>
        </div>

        <div className="feature-card">
          <span>⚡</span>
          <h4>Fast Backend</h4>
          <p>Spring Boot powered API</p>
        </div>

        <div className="feature-card">
          <span>🧱</span>
          <h4>Scalable Design</h4>
          <p>Built to grow module by module</p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      {!user && (
        <section className="home-bottom">
          <h3>Create your account</h3>
          <button onClick={() => navigate("/register")}>
            Register Now
          </button>
        </section>
      )}
    </div>
  );
};

export default Home;
