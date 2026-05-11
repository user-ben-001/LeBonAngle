import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginForm, setLoginForm] = useState(true);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login, register } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate(`/`);
    } catch (error) {
      alert("Erreur de connexion au serveur" + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await register(username, email, password);

      if (!response.ok) {
        alert(response.status);
      }
      alert("Compte créer");
      window.location.reload();
    } catch (error) {
      alert("Erreur de connexion au serveur" + error.message);
    }
  };

  return (
    <div>
      {loginForm ? (
        <div>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="exemple@email.com"
              autoFocus
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <input
              type="password"
              name="pass"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">Valider</button>
          </form>
          <button
            onClick={() => {
              setLoginForm(false);
            }}
          >
            Register
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <input
              type="email"
              name="email"
              placeholder="exemple@email.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <input
              type="password"
              name="pass"
              placeholder="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <button type="submit">Valider</button>
          </form>
          <button
            onClick={() => {
              setLoginForm(true);
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
