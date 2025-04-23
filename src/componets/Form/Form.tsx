
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import styles from "./Form.module.css"
import { IUserValidate } from "../../types/IUserValidate"
import { userSchema } from "../../schemas/formSchema"
import Swal from "sweetalert2"

export const Form = () => {
  const defaultValues: IUserValidate = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  const defaultValuesErros: IUserValidate = {
    name: "p",
    email: "p",
    password: "p",
    confirmPassword: "p"
  }
  const valuesNameArray = ["name", "email", "password", "confirmPassword"]

  const [user, setUser] = useState<IUserValidate>(defaultValues)

  const [userErrors, setUserErrors] = useState<IUserValidate>(defaultValuesErros)

  const [isValidated, setIsValidated] = useState(false)


  const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setUser((prev) => ({ ...prev, [`${name}`]: value }))
  }

  const validateForm = () => {
    valuesNameArray.map((valueName) => {
      userSchema.validateAt(valueName, user).
        then(() => {
          setUserErrors((prev) => ({ ...prev, [valueName]: "" }))
        }).catch((err) => {
          setUserErrors((prev) => ({ ...prev, [valueName]: err.errors[0] }))
        })
    })
  }
  const setCurrentValidation = () => {
    if (userErrors.name == "" && userErrors.email == "" && userErrors.password == "" && userErrors.confirmPassword == "") {
      setIsValidated(true)
    } else {
      setIsValidated(false)
    }
  }
  useEffect(() => {
    validateForm()
  }, [user])

  useEffect(() => {
    setCurrentValidation()
  }, [userErrors])

  return (

    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>

        <Input label="Nombre:" inputText={user.name} onChange={handleChangeInputs} inputName="name" inputPlaceholder="John Doe" />

        <p className={styles.errorMessage}>{userErrors.name}</p>

        <Input label="Correo:" inputText={user.email} onChange={handleChangeInputs} inputName="email" inputPlaceholder="example@gmail.com" />

        <p className={styles.errorMessage}>{userErrors.email}</p>

        <Input label="Contraseña:" inputText={user.password} onChange={handleChangeInputs} inputName="password" inputPlaceholder="" />

        <p className={styles.errorMessage}>{userErrors.password}</p>

        <Input label="Confirmar contraseña:" inputText={user.confirmPassword} onChange={handleChangeInputs} inputName="confirmPassword" inputPlaceholder="" />

        <p className={styles.errorMessage}>{userErrors.confirmPassword}</p>

        <Button buttonText="Enviar" action={() => {
          Swal.fire({
            title: "¡Gracias por registrarte!",
            html: `Tu informacion:
          <br>Nombre:${user.name}
          <br>Email:${user.email}
          <br>Contraseña:${user.password}`,
            icon: "success"
          });
          setUser(defaultValues)
        }} styleSet1={isValidated} />
      </div>
    </div>
  )
}
