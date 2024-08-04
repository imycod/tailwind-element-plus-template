/** hex转rgb */
const hexToRgb = (str) => {
  let hxs = str.replace('#', '').match(/../g)
  for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
  return hxs
}

/** rgb转hex */
const rgbToHex = (a, b, c) => {
  let hexs = [a.toString(16), b.toString(16), c.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`
  }
  return `#${hexs.join('')}`
}

/** 加深颜色值 */
export const darken = (color, level) => {
  let rgbc = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2])
}

/** 变浅颜色值 */
export const lighten = (color, level) => {
  let rgbc = hexToRgb(color)
  for (let i = 0; i < 3; i++)
    rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2])
}

export const hexToRgba = (hex, opacity) => {
  let rgb = hexToRgb(hex)
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`
}

/**
 *
 * @param colors { white:{200:'xxx',300:'xxx';black:{100:'xx',200:'xx',}} }
 * @param prefix
 * @returns {{  --white: 'xxx', --white-200:'xxx', --black:'xxx', --black-100:'xxx' }}
 */
export function convertColorsToCSSVariables(colors, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(colors)) {
    const newKey = prefix ? `${prefix}-${key}` : `--${key}`;
    if (typeof value === 'object') {
      Object.assign(result, convertColorsToCSSVariables(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
}