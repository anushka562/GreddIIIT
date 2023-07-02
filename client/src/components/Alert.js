import { useAppContext } from "../context/appContext"

const Alert = (nonMargin) => {
  const {alertType, alertText} = useAppContext()
  return (
    <div className={`alert alert-${alertType} ${nonMargin}`}>
        {alertText}
    </div>
  )
}

export default Alert
