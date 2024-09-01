import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { ReportPage } from "./pages/ReportPage";
import { ReleasePage } from "./pages/documentForms/release/ReleasePage";
import { OrderPage } from "./pages/OrderPage";
import { ListPage } from "./pages/ListPage";
import { ThemeProvider } from "./providers/ThemeProvider";
import { HeaderComponent } from "./components/header/HeaderComponent";
import { FooterComponent } from "./components/footer/FooterComponent";
import Loader from "./components/loader/Loader";
import { LoginPage } from "./pages/login/LoginPage";
import { AboutCreatorsPage } from "./pages/creators/AboutCreatorsPage";
import ProtectedRoute from "../src/ProtectedRoute";
import { useAuth } from "../src/hooks/useLogin";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { pathname } = useLocation(); //hook for set url pathname
  const { checkToken } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const authenticated = await checkToken();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    verifyToken();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      setLoading(true);
      clearTimeout(timeout);
    };
  }, [pathname]); //if location pathname changing -> useEffect start work

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <HeaderComponent />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={<HomePage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="report"
            element={
              <ProtectedRoute
                element={<ReportPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="release"
            element={
              <ProtectedRoute
                element={<ReleasePage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="order"
            element={
              <ProtectedRoute
                element={<OrderPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="list"
            element={
              <ProtectedRoute
                element={<ListPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="creators"
            element={
              <ProtectedRoute
                element={<AboutCreatorsPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </main>
      <FooterComponent />
    </ThemeProvider>
  );
}

export default App;
