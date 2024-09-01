import { useContext } from "react";
import Stack from "@mui/material/Stack";
import logo from "../../Images/Raccoon.png";
import { Button } from "@mui/material";
import "../../components/header/Header.css";
import { ThemeContext } from "../../providers/ThemeProvider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAuth } from "../../hooks/useLogin";

export const HeaderComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth();

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="header-component">
      <Stack
        useFlexGap
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        paddingX={"10px"}
      >
        <img className="logo" src={logo} alt="Raccoon logo"></img>
        <h1 className="header-text">Документооборот Проектного направления</h1>
        <div className="button-section">
          <Button id="topic" variant="outlined" onClick={changeTheme}>
            {theme === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
          </Button>
          {isAuthenticated && (
            <>
              <Button id="Home-Back" variant="outlined" href={"/"}>
                На главную
              </Button>
              <Button id="account" variant="outlined" onClick={logout}>
                Выйти
              </Button>
            </>
          )}
        </div>
      </Stack>
    </header>
  );
};
