export const emailFieldValidation = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
export const Required = value => value ? undefined : 'Required'
export const phoneNumberPattern = value => (value && !/^[0-9]{10}$/i.test(value)) ? "Valid phone is required" : undefined // /(7|8|9)\d{9}/
