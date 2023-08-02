import { Toolbar,  Button } from '@mui/material';
import styles from './MenuBar.module.css';
import { ThemeToogler } from '../UI/ThemeToogler';
import Logo from '../UI/Logo';


const MenuBar = () => {
  return (
    <div position="static">
      <Toolbar className={styles.menuBar}>
          <Logo className={styles.logo}/>
          <div className={styles.inline}>
            <Button>Prijavi me</Button>
            <ThemeToogler/>
          </div>
      </Toolbar>
    </div>
  );
};

export default MenuBar;
