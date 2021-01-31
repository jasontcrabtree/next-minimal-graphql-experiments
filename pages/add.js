/*
31/01/2021

Doesn't work at all, not sure what's going on

Using request, useSWR, mutate, trigger
*/

import request from 'graphql-request';
import Link from 'next/link';
import React from 'react';
import useSWR, { mutate, trigger } from 'swr';

import styles from '../styles/Home.module.css';

const API = 'https://jtc-nextjs-course.herokuapp.com/v1/graphql';

const AddNew = (props) => {
  //   const [name, setName] = React.useState('');
  //   const [url, setUrl] = React.useState('');

  const query = `{
      recipes(order_by: { name: asc }) {
        id
        name
        imageUrl
      }
    }
  `;

  const getData = async (...args) => /* await  */ fetch(query);

  const [text, setText] = React.useState('');

  const { data } = useSWR(query, getData);

  async function handleSubmit(event) {
    event.preventDefault();
    // mutate current data to optimistically update the UI
    mutate(
      query,
      { users: [...data.users, { name: text }] },

      false
    );
    // send text to the API
    const mutation = `
        mutation addNewRecipe($object: recipes_insert_input!) {
            insert_recipes_one(object: $object) {
            id
            name
            imageUrl
            },
            'variables': { object: object}
        };
    `;

    await fetch(mutation);
    // revalidate;
    trigger(mutation);
    setText('');
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
        <h1>Return </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <button type="submit">Create</button>
        </form>
      </main>
    </div>
  );
};

export default AddNew;
