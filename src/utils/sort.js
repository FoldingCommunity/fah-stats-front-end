/* eslint-disable import/prefer-default-export */
export const dotCompare = (a, b) => {
  const a1 = a?.split('.');
  const b1 = b?.split('.');

  for (let i = 0; i < a1.length && i < b1.length; i += 1) {
    const x = parseInt(a1[i], 10) - parseInt(b1[i], 10);
    if (x) return x;
  }

  return a1.length - b1.length;
};
