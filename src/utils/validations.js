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

const validationCompany = Yup.object().shape({
  cuit: Yup.string()
    .required('El cuit es requerido')
    .min(11,'El cuit debe tener 11 digitos exactos')
    .max(11,'El cuit debe tener 11 digitos exactos')
    .matches(/^[0-9]*$/g,"El cuit solo debe contener digitos")
  ,number: Yup.string()
    .required("La altura es requerida")
    .matches(/^[0-9]*$/g,"El cuit solo debe contener digitos")
  ,location: Yup.string()
    .required('La provincia es requerida')
  ,street: Yup.string()
    .required("La dirección es requerida")
  ,legalName: Yup.string()
    .required("El nombre es requerido")
});

export { validationLogin,validationCompany }