export const toNormalState = (str: string): string => {
  if (str?.length == 0) {
    return str;
  }
  return (
    str[0].toUpperCase() +
    str
      .split('_')
      .reduce((v, c) => v + ' ' + c[0].toUpperCase() + c.slice(1))
      .slice(1)
  );
};

type toNormalizeOptionsProps =
  | {
      name?: string;
      u_name?: string;
      email?: string;
      id: number | string;
    }
  | undefined
  | string 
  | Array<{
      name?: string;
      u_name?: string;
      email?: string;
      id: number | string;
    }>;

export const toNormalizeOptions = (value: toNormalizeOptionsProps) => {
  if (value === null) {
    return undefined;
  }
  switch (typeof value) {
    case 'object': {
      return Array.isArray(value)
        ? value.map(item => {
            return { value: item.id, label: item.name || item.u_name, data: item.email || '' };
          })
        : { value: value.id, label: value.name || value.u_name, data: value.email || '' };
    }
    case 'undefined': {
      return value;
    }
    default: {
      return { value: value, label: toNormalState(value + ''), data: '' };
    }
  }
};
