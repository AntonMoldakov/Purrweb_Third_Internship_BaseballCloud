export const ToNormalState = (str: string): string => {
  return (
    str[0].toUpperCase() +
    str
      .split('_')
      .reduce((v, c) => v + ' ' + c[0].toUpperCase() + c.slice(1))
      .slice(1)
  );
};
