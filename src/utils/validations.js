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
    .matches(/\b(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]/g,"El cuit es incorrecto")
  ,number: Yup.string()
    .required("La altura es requerida")
  ,location: Yup.string()
    .required('La provincia es requerida')
  ,street: Yup.string()
    .required("La dirección es requerida")
  ,legalName: Yup.string()
    .required("El nombre es requerido")
  ,state: Yup.string()
    .required("La ciudad es requerida")
});

const validationGuard = Yup.object().shape({
  cuil: Yup.string()
    .required('El cuil es requerido')
    .matches(/\b(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]/g,"El cuil es incorrecto")
  ,number: Yup.string()
    .required("La altura es requerida")
  ,location: Yup.string()
    .required('La provincia es requerida')
  ,street: Yup.string()
    .required("La dirección es requerida")
  ,name: Yup.string()
    .required("El nombre es requerido")
  ,province: Yup.string()
    .required("La ciudad es requerida")
  ,email: Yup.string()
    .required("El email es requerido")
    .email("El email ingresado no es válido")
}); 

export { validationLogin,validationCompany,validationGuard }