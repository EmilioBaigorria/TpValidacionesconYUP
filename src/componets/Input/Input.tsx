import { FC } from "react"
import styles from "./Input.module.css"

interface Input{
  label:string,
  inputText:string,
  onChange:any,
  inputName:string,
  inputPlaceholder:string
}
export const Input:FC<Input> = ({label,inputText,onChange,inputName,inputPlaceholder}) => {
  return (
    <div className={styles.inputContainer}>
        <label className={styles.labelStyles} htmlFor={inputName}>{label}</label>
        <input type="text" 
        className={styles.inputStyle} 
        name={inputName} 
        onChange={onChange} 
        id={inputName}
        placeholder={inputPlaceholder}
        value={inputText}/>
    </div>
  )
}
