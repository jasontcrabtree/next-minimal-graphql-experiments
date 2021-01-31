/* eslint-disable no-nested-ternary */
import Head from 'next/head';
import { request } from 'graphql-request';
import useSWR from 'swr';
import React from 'react';

import Link from 'next/link';
import styles from '../styles/Home.module.css';

const API = 'https://jtc-nextjs-course.herokuapp.com/v1/graphql';
const fetcher = (query) => request(API, query);

export default function Home() {
  const { data } = useSWR(
    `{
      recipes(order_by: { name: asc }) {
        id
        name
        imageUrl
      }
    }
  `,
    fetcher
  );

  return (
    <div className={styles.parent}>
      <Head>
        <title>Graphql-Request Next JS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav>
          <ul>
            <li>
              <Link href="/new">
                <a>New</a>
              </Link>
            </li>
            <li>
              <Link href="/create">
                <a>Create</a>
              </Link>
            </li>
          </ul>
        </nav>
        <h1>Coffee With That?</h1>

        <section>
          {(console.log(data), [])}
          {!data ? (
            <p>Loading …</p>
          ) : data.recipes.length === 0 ? (
            <p>No recipes!</p>
          ) : (
            <ul>
              {data.recipes.map((food, i) => (
                <li key={i}>
                  <p>{food.name}</p>
                  <img src={food.imageUrl} alt={food.name} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
