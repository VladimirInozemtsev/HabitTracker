import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useResponsive = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  // Определяем размеры экрана
  const isMobile = screenWidth <= 640;
  const isTablet = screenWidth <= 991;  // Исправляем логику - планшет до 991px
  const isDesktop = screenWidth > 991;

  // Определяем ориентацию
  const isPortrait = screenHeight > screenWidth;
  const isLandscape = screenWidth > screenHeight;

  // Слушатель изменений размеров экрана
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    });

    return () => subscription?.remove();
  }, []);

  // Получение размеров для компонентов
  const getResponsiveValue = <T,>(
    mobile: T,
    tablet: T,
    desktop: T
  ): T => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Получение количества колонок для сетки
  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  // Получение размера шрифта
  const getFontSize = (baseSize: number) => {
    if (isMobile) return baseSize;
    if (isTablet) return baseSize * 1.1;
    return baseSize * 1.2;
  };

  // Получение отступов
  const getSpacing = (baseSpacing: number) => {
    if (isMobile) return baseSpacing;
    if (isTablet) return baseSpacing * 1.2;
    return baseSpacing * 1.5;
  };

  return {
    screenWidth,
    screenHeight,
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape,
    getResponsiveValue,
    getGridColumns,
    getFontSize,
    getSpacing,
  };
};
