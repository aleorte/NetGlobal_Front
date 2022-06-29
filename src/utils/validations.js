import * as Yup from 'yup'

const validationLogin = Yup.object().shape({
    email: Yup.string()
      .required('El email es requerido')
      .email('El email es inválido')
    ,password: Yup.string()
      .required('La contaseña es requerida')
    ,confirmpassword: Yup.string()
      .required('La confirmación de contraseña es requerida')
}); 

export { validationLogin }