/*
31/01/2021
Form managed using formik, mutation done uisng graphql-request onSubmit

Currently working

31/01/201
Changelog
- Refactoring into seperate onSubmit function

*/

/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { Formik } from 'formik';
import { request } from 'graphql-request';

import styles from '../styles/Home.module.css';

const API = 'https://jtc-nextjs-course.herokuapp.com/v1/graphql';

const mutation = `
  mutation addNewRecipe($object: recipes_insert_input!) {
    insert_recipes_one(object: $object) {
     id
     name
     imageUrl
    }
  }
`;

export default function New() {
  // Sets the form default values to 0
  const initialValues = {
    name: '',
    imageUrl: '',
  };

  function submitHandler(values) {
    console.log(values);
    const variables = { object: values };

    request(API, mutation, variables);
  }

  return (
    <div className={styles.parent}>
      <header>
        <Link href="/">
          <a>← Back</a>
        </Link>
        <h1>New FORMIK</h1>
      </header>

      <main>
        <div>
          <Formik initialValues={initialValues} onSubmit={submitHandler}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  Name
                  <input
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Recipe Name"
                  />
                </label>
                <label htmlFor="imageUrl">
                  Image URL
                  <input
                    id="imageUrl"
                    value={values.imageUrl}
                    onChange={handleChange}
                    placeholder="Recipe URL"
                  />
                </label>
                <button type="submit">Save</button>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
