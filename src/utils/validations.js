import * as Yup from 'yup'

const validationLogin = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
    ,password: Yup.string()
      .required('Password is required')
}); 

export { validationLogin }