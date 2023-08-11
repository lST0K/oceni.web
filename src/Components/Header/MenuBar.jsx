import { Toolbar,  Button } from '@mui/material';
import styles from './MenuBar.module.css';
import { ThemeToogler } from '../ui/ThemeToogler';
import Logo from '../ui/Logo';
import { User } from 'components';

const MenuBar = () => {

  return (
    <div position="static">
      <Toolbar className={styles.menuBar}>
          <Logo className={styles.logo}/>
          <div className={styles.inline}>
            <User/>
            <ThemeToogler/>
          </div>
      </Toolbar>
    </div>
  );
};

export { MenuBar };
