/*
31/01/2021

This looks like I was trying to rewrite the formik form into using useCallback, maybe from the useEffect Dave Ceddia tutorial??

*/

/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { Formik } from 'formik';
import { request } from 'graphql-request';
import React from 'react';

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
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');

  // const submit = React.useCallback((value) => {
  //   // ... you'll implement this 🔜
  // }, []);

  const { values } = [name, url];

  console.log(values);

  const submit = () => {
    const variables = { object: values };
    request(API, mutation, variables);
  };

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
          <Formik
            initialValues={{
              name: '',
              imageUrl: '',
            }}
            onSubmit={(values) => {
              const variables = { object: values };
              request(API, mutation, variables);
            }}
          >
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
