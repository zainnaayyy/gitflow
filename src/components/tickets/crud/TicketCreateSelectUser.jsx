import { useField } from "formik"

const TicketCreateSelectUser = ({ label, ...props}) => {
    const [field, meta] = useField(props)
    
  return (
    <>
        <label>{label}</label>
        <select
          {...field}
          {...props}

        />
    </>
  )
}

export default TicketCreateSelectUser
