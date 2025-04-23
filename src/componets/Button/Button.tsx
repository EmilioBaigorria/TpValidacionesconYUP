import { FC } from "react"
import styles from "./Button.module.css"
interface Button{
  buttonText:string
  action:Function
  styleSet1:boolean
}
export const Button: FC<Button> = ({buttonText,action,styleSet1}) => {
  return (
    <div className={styleSet1?styles.buttonContainer_1:styles.buttonContainer_2}>
      <button disabled={!styleSet1}  className={styleSet1?styles.buttonStyles_1:styles.buttonStyles_2} onClick={()=>{
        action()
      }}>{buttonText}</button>
    </div>
  )
}
