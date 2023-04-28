// API
// ----------------------------------------------------------------------
export const HOST_API =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.REACT_APP_HOST_API_KEY;

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: PRODUCT_NAME === 'tct' ? 'blue' : 'default',
  themeLayout: 'horizontal',
  themeStretch: false,
};
