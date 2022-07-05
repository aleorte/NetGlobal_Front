import * as Yup from 'yup'

const validationAddCompany = Yup.object().shape({
    cuit:Yup.number()
    .required("Campo requerido"),
    legalName:Yup.string()
    .required('Campo requerido'),
      street:Yup.string()
      .required('Campo requerido'),
      number:Yup.number()
      .required('Campo requerido'),
      location:Yup.string()
      .required('Campo requerido'),
      logo:Yup.string()
      .required('Campo requerido'),
}); 

export { validationAddCompany}