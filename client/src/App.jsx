
import { HashRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainRouter />
      </Router>
    </AuthProvider>
  );
}

export default App;
