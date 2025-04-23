import { object, ref, string } from "yup";

export let userSchema=object({
    name:string().min(3,"Los nombres deben tener minimo 3 caracteres").required("El nombre es un campo obligatorio"),
    email:string().email("El email ingresado no es valido").required("El correo es un campo obligatorio"),
    password:string().min(6,"La contraseña debe tener minimo 6 caracteres").required("La contraseña es un campo obligatorio"),
    confirmPassword:string().equals([ref("password")],"Las contraseñas deben coincidir").required("La confirmacion de contraseña es un campo obligatorio")
})