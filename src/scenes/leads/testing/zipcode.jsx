import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  zipCode: Yup.string()
    .matches(/^\d{5}$/, 'Invalid zip code')
    .required('Zip code is required'),
});

const SearchForm = () => {
  // Function to handle form submission
  const handleSubmit = (values) => {
    // Call an API or perform the necessary logic to check the street name based on the zip code
    console.log('Submitted:', values);
  };

  return (
    <Formik
      initialValues={{ zipCode: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="zipCode">Zip Code:</label>
            <Field type="text" id="zipCode" name="zipCode" />
            <ErrorMessage name="zipCode" component="div" />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default SearchForm;


/* 
import React from 'react';
import SearchForm from './SearchForm';

const App = () => {
  return (
    <div>
      <h1>Search Form</h1>
      <SearchForm />
    </div>
  );
};

export default App;

*/