import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState(true);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setRefreshToken } = useContext(UserContext);

  const navigate = useNavigate();

  const user = {
    email: email,
    password: password,
  };

  const newUser = {
    username: username,
    email: email,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (email && password != "") {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          alert(response.status);
        }

        const data = await response.json();
        console.log(data);

        setRefreshToken(data);

        navigate(`/`);
      }
    } catch (error) {
      alert("Erreur de connexion au serveur" + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (username && email && password != "") {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          alert(response.status);
        }
        alert("Compte créer");
        window.location.reload();
      }
    } catch (error) {
      alert("Erreur de connexion au serveur" + error.message);
    }
  };

  return (
    <div>
      {login ? (
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
              setLogin(false);
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
              setLogin(true);
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
