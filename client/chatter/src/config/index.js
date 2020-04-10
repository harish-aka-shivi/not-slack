import { Platform } from 'react-native';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const IS_WEB = Platform.OS === 'web';

export const IS_ANDROID = Platform.OS === 'android';

export const DESKTOP_BREAKPOINT = 1024;
export const MOBILE_BREAKPOINT = 768;

export const MAX_WIDTH_RESPONSIVE = 600;
