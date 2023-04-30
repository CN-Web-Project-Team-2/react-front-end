// routes
import Router from './routes';
import CacheBuster from 'react-cache-buster';

// theme
import ThemeProvider from './theme';


// ----------------------------------------------------------------------

export default function App() {
  const isProduction = process.env.NODE_ENV === 'production';
  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={isProduction} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      loadingComponent={<LoadingScreen fullScreen />} //If not pass, nothing appears at the time of new version check.
    >
      <ThemeProvider>
        <ThemeColorPresets>    
          <Router />             
        </ThemeColorPresets>
      </ThemeProvider>
    </CacheBuster>
  );
}
