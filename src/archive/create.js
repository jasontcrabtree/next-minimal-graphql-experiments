/*
31/01/2021

Doesn't work right not, trying to use useState

*/

import request from 'graphql-request';
import Link from 'next/link';
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

/* const number = 32;
const number1 = '32';

console.log(typeof number, typeof number1); */

const CreateLink = (props) => {
  console.log(props);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  // const submit = React.useCallback((value) => {
  //   // ... you'll implement this 🔜
  // }, []);

  const { values } = [name, url];

  function submitHandler(e) {
    e.preventDefault();
    const variables = { object: values };
    console.log(variables);
    request(API, mutation, variables);
  }

  return (
    <div className={styles.parent}>
      <header>
        <Link href="/">
          <a>← Back</a>
        </Link>
        <h1>Create VANILLA STATE</h1>
      </header>

      <main>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="A name for the link"
            />
          </label>
          <label htmlFor="url">
            <input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              placeholder="The URL for the link"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default CreateLink;
