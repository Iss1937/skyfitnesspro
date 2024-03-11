import { Link } from "react-router-dom";
import { ReactComponent as LogoSVG } from "./logo.svg";
import style from "./Logo.module.scss";
/**
 * Компонент большего логотипа,
 * является ссылкой на главную страницу
 * @param className - класс для компонента
 */

export const Logo = ({ className }) => {
  return (
      <Link to="/" className={style.mainLogo} >
        <LogoSVG className={className} />
      </Link>
  );
};
