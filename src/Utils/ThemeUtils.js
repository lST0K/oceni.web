import Cookies from 'js-cookie';

const THEME_COOKIE_KEY = 'themeMode';

export const getThemeModeFromCookie = () => {
  const themeMode = Cookies.get(THEME_COOKIE_KEY);
  return themeMode ; // Return 'light' as the default mode if not found in cookies
};

export const setThemeModeInCookie = (themeMode) => {
  Cookies.set(THEME_COOKIE_KEY, themeMode, { expires: 365 }); // Set the theme mode in a cookie for 1 year (365 days)
};
