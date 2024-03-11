import style from "./Button.module.scss";
// стиль прокидывается пропсом от родителя (там же импортирован).

/**
 * Компонент кнопки
 * принимает
 * @param children - текст кнопки
 * @param onClick - событие при клике
 * @param className - стили кнопки: белая или фиолетовая
 */

export const Button = ({ children, onClick, className }) => {

  return (
    <button onClick={onClick} className={style[className]}>
      {children}
    </button>
  );
};
