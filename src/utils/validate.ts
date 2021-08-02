import regulars from './regulars';

const validate = {
  required: (v: string | number) => (!v || v.toString().trim() === '' ? 'required' : undefined),
  requiredEmail: (v: string) => (!v || v.trim() === '' ? 'required' : regulars.email.test(v) ? 'invalid' : undefined),
  requiredSelect: (
    v:
      | { value: string | number; label: string | undefined; data: string }
      | Array<{ value: string | number; label: string | undefined; data: string }>,
  ) => (!v ? 'required' : undefined),
};

export default validate;
 