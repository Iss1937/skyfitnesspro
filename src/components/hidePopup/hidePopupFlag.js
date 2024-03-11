export const hidePopupFlag = (e, type) => {
  switch (type) {
    case 'mouse':
      const popupEl = document.getElementById('#popup');
      if (!popupEl.contains(e.target)) return true;
      break;
    case 'kbd':
      if (e.key === 'Escape') return true;
      break;
    default:
      return false;
  }
};
