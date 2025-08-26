@echo off
echo Installing dependencies for HabitTracker Frontend...
echo.

echo Installing npm packages...
npm install

echo.
echo Installing TypeScript types...
npm install --save-dev @types/react-native

echo.
echo Installing Expo CLI...
npm install -g @expo/cli

echo.
echo Fixing Expo dependencies...
npx expo install --fix

echo.
echo Done! You can now run: npm start
pause
