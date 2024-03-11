import { Logo } from '../../UI/Logo/Logo';
import { Dropdown } from '../dropdown/Dropdown';
import style from './Header.module.scss';
export const Header = () => {
  return (
    <header className={style.header}>
      <Logo className={style.logo} />
      <Dropdown className={style.header_select} />
    </header>
  );
};
