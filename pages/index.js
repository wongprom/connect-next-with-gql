import Head from 'next/head';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
} from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import { useState } from 'react';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author {
        name
        age
      }
    }
  }
`;
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      name
      username
      email
      company {
        name
        catchPhrase
      }
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation AddBook($title: String, $name: String, $age: Int) {
    addBook(title: $title, name: $name, age: $age) {
      title
      author {
        name
        age
      }
    }
  }
`;

export default function Home({ serverSideDataBooks, serverSideDataUsers }) {
  // !Make multible client side query requests
  // const {
  //   loading: loadingBooks,
  //   error: errorBooks,
  //   data: dataBooks,
  // } = useQuery(GET_BOOKS);

  // const {
  //   loading: loadingUsers,
  //   error: errorUsers,
  //   data: dataUsers,
  // } = useQuery(GET_USERS);
  const [updateBook] = useMutation(UPDATE_BOOK);

  const [renderBooks, setRenderBooks] = useState(serverSideDataBooks);

  const [inputTitle, setInputTitle] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');

  // const handleInputTitle = (event) => {
  //   event.preventDefault();
  //   setInputTitle(event.target.value);
  // };
  // const handleInputName = (event) => {
  //   event.preventDefault();
  //   setInputName(event.target.value);
  // };
  // const handleInputAge = (event) => {
  //   event.preventDefault();
  //   setInputAge(event.target.value);
  // };

  const handlerAddBook = (event) => {
    event.preventDefault();
    updateBook({
      variables: {
        title: inputTitle,
        name: inputName,
        age: Number(inputAge),
      },
    }).then(({ data: { addBook } }) => {
      console.log(
        '🚀 ~ file: index.js ~ line 98 ~ handlerAddBook ~ addBook',
        addBook
      );

      console.log(' ==> ', renderBooks);

      setRenderBooks([...renderBooks, addBook]);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="text-2xl text-center mb-10">Books, hard coded values</h2>
        <form>
          <input
            type="text"
            value={inputTitle}
            onChange={(event) => setInputTitle(event.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={inputName}
            onChange={(event) => setInputName(event.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={inputAge}
            onChange={(event) => setInputAge(event.target.value)}
            placeholder="Age"
          />
          <button
            className="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white"
            onClick={(event) => handlerAddBook(event)}
          >
            Mutation = basically add a new book...
          </button>
        </form>
        {renderBooks?.map(({ title, author: { name, age } }) => {
          return (
            <div
              key={title}
              className="flex flex-col  p-20 bg-blue-100 border border-black mb-4 w-full "
            >
              <h3 className="text-blue-400 mb-4 text-lg font-bold flex-grow">
                Book Title: {title}
              </h3>

              <div className="flex flex-col bg-white p-6 rounded-lg shadow-xl ">
                <h2 className="mb-2 font-bold text-2xl text-gray-600">
                  Auther Info
                </h2>
                <p className="text-gray-500">Name: {name}</p>
                <p className="text-gray-500">Age: {age}</p>
              </div>
            </div>
          );
        })}
        <h2 className="text-2xl text-center mb-10">
          Users, from placeholder api
        </h2>

        {serverSideDataUsers?.getUsers.map(
          ({ name, email, username, company: { name: companyName } }) => {
            return (
              <div
                key={email}
                className=" flex flex-col  p-20 bg-blue-100 border border-black mb-4 w-full "
              >
                <div className="flex flex-col bg-white p-6 rounded-lg shadow-xl ">
                  <h2 className="mb-2 font-bold text-2xl text-gray-600">
                    User info
                  </h2>
                  <p className="text-gray-500">Name:{name} </p>
                  <p className="text-gray-500">username:{username} </p>
                  <p className="text-gray-500">Email:{email} </p>
                  <p className="text-gray-500">Company name:{companyName} </p>
                </div>
              </div>
            );
          }
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();

  const serverSideDataBooks = await apolloClient.query({
    query: GET_BOOKS,
  });
  const serverSideDataUsers = await apolloClient.query({
    query: GET_USERS,
  });
  console.log(
    '🚀 ~ file: index.js ~ line 132 ~ getServerSideProps ~ serverSideDataBooks',
    serverSideDataBooks
  );

  return {
    props: {
      serverSideDataBooks: serverSideDataBooks.data.books,
      serverSideDataUsers: serverSideDataUsers.data,
    },
  };
}
