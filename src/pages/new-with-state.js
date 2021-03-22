/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { request } from 'graphql-request';

import React, { useState } from 'react';
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
  const [formValues, setFormState] = useState({
    name: '',
    imageUrl: '',
  });

  function updateField(e) {
    setFormState({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    return formValues;
  }

  function submitHandler(e) {
    e.preventDefault();

    const variables = { object: formValues };

    request(API, mutation, variables);
  }

  return (
    <div className={styles.parent}>
      <header>
        <Link href="/">
          <a>← Back</a>
        </Link>
        <h1>
          New with State and a custom Update Field Hook from hooks playground
        </h1>
      </header>

      <main>
        <>
          <form onSubmit={submitHandler}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="off"
                value={formValues.name}
                onChange={updateField}
                placeholder="Meal Name"
              />
            </label>
            <label htmlFor="imageUrl">
              Image URL
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                autoComplete="off"
                value={formValues.imageUrl}
                onChange={updateField}
                placeholder="Image URL"
              />
            </label>
            <button type="submit">Save</button>
          </form>
        </>
      </main>
    </div>
  );
}
