/* eslint-disable no-plusplus */
import { inline } from 'react-native-web/dist/exports/StyleSheet/compile';
import { decamelize } from 'humps';
import { IS_WEB, DESKTOP_BREAKPOINT } from '../config';

export const WHITE = '#fff';
export const GRAY = '#1D1C1D';
export const BLACK = '#1D1C1D';
export const LIGHT_GRAY = '#F5F5F5';
export const MEDIUM_GRAY = '#9E9E9E';
export const TRANSPARENT = 'transparent';

export const SLACK_LIGHT_PRIMARY = '#7C2852';
export const SLACK_LOGIN = '#185F34';
export const SLACK_ORANGE_ACCENT = '#F2606A';

export const DRAWER_WIDTH = 300;


export const onWebStyle = style => (IS_WEB ? style : {});


// -----------------------responsiveness

let id = 0;
const styleObj = [];
let styleElement;

if (IS_WEB) {
  styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  document.head.appendChild(styleElement);
}

const prefixKey = str => {
  if (/^webkit|ms/.test(str)) {
    return `-${str}`;
  }

  return str;
};

const transformStyle = style => {
  const str = inline(style);

  return Object.keys(str).reduce((result, key) => ({
    ...result,
    [prefixKey(decamelize(key, { separator: '-' }))]: `${str[key]}!important`,
  }), {});
};

export const createId = style => {
  const styleStr = JSON.stringify(style);
  const shallReuse = styleObj.find(s => s.style === styleStr);

  if (shallReuse) {
    return shallReuse.id;
  }

  const styleId = `css-${id++}`;
  styleObj.push({ style: styleStr, id: styleId });

  styleElement.appendChild(
    document.createTextNode(`@media screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
      [data-responsive-element="${styleId}"] ${JSON.stringify(transformStyle(style)).replace(/"/g, '').replace(/,/g, ';')}
    }`),
  );

  return styleId;
};

export const onDesktop = style => {
  if (!IS_WEB) {
    return {};
  }
  const styleId = createId(style);
  return {
    'data-responsive-element': styleId,
  };
};

export const useResponsiveParamsFromProps = props => {
  if (!props['data-responsive-element']) {
    return {};
  }

  return {
    'data-responsive-element': props['data-responsive-element'],
  };
};
