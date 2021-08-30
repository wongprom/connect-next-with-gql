import Head from 'next/head';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

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
    }
  }
`;

export default function Home() {
  // Make multible requests
  const {
    loading: loadingBooks,
    error: errorBooks,
    data: dataBooks,
  } = useQuery(GET_BOOKS);
  console.log('🚀 ~ file: index.js ~ line 28 ~ Home ~ ataBooks', dataBooks);
  const {
    loading: loadingUsers,
    error: errorUsers,
    data: dataUsers,
  } = useQuery(GET_USERS);
  console.log('🚀 ~ file: index.js ~ line 30 ~ Home ~ dataUsers', dataUsers);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {dataBooks?.books.map(({ title, author: { name, age } }) => {
        return (
          <div className=" flex flex-col  p-20 bg-blue-100 border border-black mb-4 w-full ">
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
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"></main>

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
