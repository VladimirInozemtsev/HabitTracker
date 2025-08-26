// Базовые типы для React Native
declare module 'react-native' {
  import { Component } from 'react';
  
  export interface ViewStyle {
    [key: string]: any;
  }
  
  export interface TextStyle {
    [key: string]: any;
  }
  
  export interface ImageStyle {
    [key: string]: any;
  }
  
  export type StyleProp<T> = T | T[] | undefined;
  
  export interface ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export interface TouchableOpacityProps extends ViewProps {
    onPress?: () => void;
    disabled?: boolean;
    activeOpacity?: number;
  }
  
  export interface TextProps {
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export interface ScrollViewProps extends ViewProps {
    showsVerticalScrollIndicator?: boolean;
    [key: string]: any;
  }
  
  export interface ModalProps {
    visible?: boolean;
    animationType?: 'none' | 'slide' | 'fade';
    presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
    [key: string]: any;
  }
  
  export interface StyleSheetStatic {
    create<T extends Record<string, any>>(styles: T): T;
  }
  
  export const View: React.ComponentType<ViewProps>;
  export const TouchableOpacity: React.ComponentType<TouchableOpacityProps>;
  export const Text: React.ComponentType<TextProps>;
  export const ScrollView: React.ComponentType<ScrollViewProps>;
  export const Modal: React.ComponentType<ModalProps>;
  export const StyleSheet: StyleSheetStatic;
}

// Типы для React Native Paper
declare module 'react-native-paper' {
  export interface TextInputProps {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    style?: any;
    [key: string]: any;
  }
  
  export interface ButtonProps {
    mode?: 'text' | 'outlined' | 'contained';
    onPress?: () => void;
    disabled?: boolean;
    style?: any;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export interface IconButtonProps {
    icon: string;
    iconColor?: string;
    size?: number;
    onPress?: () => void;
    style?: any;
    [key: string]: any;
  }
  
  export interface TextProps {
    style?: any;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export const Text: React.ComponentType<TextProps>;
  export const TextInput: React.ComponentType<TextInputProps>;
  export const Button: React.ComponentType<ButtonProps>;
  export const IconButton: React.ComponentType<IconButtonProps>;
}
