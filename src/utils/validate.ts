import regulars from './regulars';

const validate = {
  required: (v: string | number) => (!v || v.toString().trim() === '' ? 'required' : undefined),
  requiredEmail: (v: string) =>
    !v || v.trim() === '' ? 'required' : !regulars.email.test(v) ? 'email invalid' : undefined,
};

export default validate;
