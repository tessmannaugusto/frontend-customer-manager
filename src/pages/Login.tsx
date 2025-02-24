import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage(null); // Reseta o erro ao tentar novamente

    try {
      const response = await fetch("https://sua-api.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email ou senha incorretos.");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message || "Ocorreu um erro ao fazer login.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="border p-2 mb-2 w-80"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-80"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-80 hover:bg-blue-600 transition"
        onClick={handleLogin}
      >
        Entrar
      </button>

      {errorMessage && (
        <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default LoginPage;
