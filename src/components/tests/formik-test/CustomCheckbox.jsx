import { useField } from "formik";

const CustomCheckbox = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div>
        <input
            {...field}
            {...props}
            className={meta.touched && meta.error ? "input-error" : ""}
        />
        <span>Select checkbox</span>
      </div>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};

export default CustomCheckbox;
