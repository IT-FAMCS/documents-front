import { useContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import logo from '../../Images/Raccoon.png';
import { Button, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import '../../components/header/Header.css';
import { ThemeContext } from '../../providers/ThemeProvider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from '../../hooks/useLogin';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export const HeaderComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/creators');
  };

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <List>
      <ListItem button onClick={changeTheme}>
        <ListItemText primary="Сменить тему" />
        {theme === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
      </ListItem>
      <ListItem button onClick={handleButtonClick}>
        <ListItemText primary="О создателях" />
      </ListItem>
      {isAuthenticated && (
        <>
          <ListItem button component="a" href="/">
            <ListItemText primary="На главную" />
          </ListItem>
          <ListItem button onClick={logout}>
            <ListItemText primary="Выйти" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <header className="header-component">
      <Stack
        useFlexGap
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        paddingX={'10px'}
      >
        <img className="logo" src={logo} alt="Raccoon logo"></img>
        <h1 className="header-text">DOC-FAMCS</h1>
        <div className="button-section">
          <Button id="topic" variant="text" onClick={changeTheme}>
            {theme === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
          </Button>
          {isAuthenticated && (
            <>
              <Button id="Home-Back" variant="outlined" href={'/'}>
                На главную
              </Button>
              <Button id="account" variant="outlined" onClick={logout}>
                Выйти
              </Button>
            </>
          )}
        </div>
        <IconButton
          edge="end"
          color="default"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {menuItems}
      </Drawer>
    </header>
  );
};
