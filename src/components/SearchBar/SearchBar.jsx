import { Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  return (
    <header>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          if (values.query.trim() === '') {
            toast.error('Enter your request!');
          } else {
            onSubmit(values.query);
          }
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button className={css.btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      <Toaster />
    </header>
  );
}
