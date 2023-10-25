import { useField } from "formik"

const TicketCreateSelectCategory = ({ label, ...props}) => {
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

export default TicketCreateSelectCategory