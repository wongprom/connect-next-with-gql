import Head from 'next/head';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="text-2xl text-center mb-10">Books, hard coded values</h2>
        {serverSideDataBooks?.books.map(({ title, author: { name, age } }) => {
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
      serverSideDataBooks: serverSideDataBooks.data,
      serverSideDataUsers: serverSideDataUsers.data,
    },
  };
}
