
export const DEV_MODE = process.argv.some(val => val === '--dev')
export const PROD_MODE = process.argv.some(val => val === '--prod')
export const DEBUG_MODE = process.argv.some(val => val === '--debug')


export interface WindowConfig {
  title?: string;

  width?: number;
  height?: number;

  frame?: boolean;
  fullscreen?: boolean;
  resizable?: boolean;
  titleBarStyle?: string;

  backgroundColor?: string;

  type?: string;
  source?: string;
}
