import React from 'react'
import { useFormik } from 'formik'
import { basicSchema } from './schema'

const onSubmit = async (values, actions) => {
	console.log('values', values)
	console.log('actions:', actions)
	await new Promise((resolve) => setTimeout(resolve, 1000));
	actions.resetForm()
}

const BasicForm = () => {
    const {values, handleChange, errors, touched, isSubmitting, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",

        },
        validationSchema: basicSchema,
        onSubmit,
    })

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
        <label htmlFor='email'> Email </label>
        <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder='Enter your Email'
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error": ""}
        />

					{errors.email && touched.email && <p className='errors'>{errors.email}</p>}
				
        <input
            value={values.username}
            onChange={handleChange}
            id="username"
            type="text"
            placeholder='Enter your Username'
            onBlur={handleBlur}
						className={errors.username && touched.username ? "input-error": ""}
        />

					{errors.username && touched.username && <p className='errors'>{errors.username}</p>}

        <input
            value={values.password}
            onChange={handleChange}
            id="password"
            type="password"
            placeholder='Enter your Password'
            onBlur={handleBlur}
        />
        <input
            value={values.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            type="password"
            placeholder='Confirm your Password'
            onBlur={handleBlur}
        />
        <button disabled={isSubmitting} type='submit'>Submit</button>
    </form>
  )
}

export default BasicForm
