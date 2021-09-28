import Head from 'next/head';
import { doc, setDoc } from 'firebase/firestore';
import db from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useForm, FormProvider } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
} from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import { useEffect, useState } from 'react';
import CarForm from '../components/CarForm';

const GET_CARS = gql`
  query GetCars {
    cars {
      id
      make
      modell
      color
      horsePower
      description
      yearMade
    }
  }
`;
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
const HAMTA_BOCKER = gql`
  query hamtaBocker {
    bocker {
      titel
      forfattare
      alder
    }
  }
`;
const HAMTA_BILAR = gql`
  query hamtaBilar {
    bilar {
      marke
      modell
      ar
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

export default function Home({
  serverSideDataBooks,
  serverSideDataBocker,
  serverSideDataBilar,
  // serverSideDataUsers,
  serverSideDataCars,
}) {
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
  const [cars, setCars] = useState(serverSideDataCars);

  const [inputTitle, setInputTitle] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const methods = useForm();

  useEffect(() => {
    // info Add a new document in collection "cars"
    // const testGtefirebaseData = async () => {
    //   try {
    //     const docRef = await addDoc(collection(db, 'cars'), {
    //       make: 'Toyota',
    //       modell: 'Supra',
    //       color: 'Grön',
    //       horsePower: 1000,
    //       description:
    //         'Bilen är byggd av Dynotech & Blenco Ab. Motor byggd och tål över 1000HK, Men nu mappad till 520hk på hjulen. Nedan kommer en lista på vad som är bytt och gjort med bilen. 2JZ-GTE, Boostline wiseco Vevstakar, Topplockspackning cooperring, Bosch Motorsport 1200cc spridare, Aeromotive regulator a1000, AN8 stålomspunna slangar hela vägen från tank till maskin, Extern K&N catchtank till vevhusventilation med AN10, Japspeed 13 raders Oljekyl kitt, Torque 50mm Alu kyl med 2x elkyl fläktar med polerad platta, Spec Steg 5 koppling Specad till 1232nm, 4" DP/MP med v band 3" catback och HKS Ljuddämpare, Precision Wastegate med screampipe, D2 bromsar fram med 356mm skivor och 8 kolvs ok, HKS Hipermax coilovers. ',
    //       yearMade: 2017,
    //     });
    //     console.log('Document written with ID: ', docRef.id);
    //   } catch (e) {
    //     console.error('Error adding document: ', e);
    //   }
    // };
    // testGtefirebaseData();
    // info Below get cars from firestore
    // const testing = async () => {
    //   const querySnapshot = await getDocs(collection(db, 'cars'));
    //   let temp = [];
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, ' => ', doc.data());
    //     temp.push(doc.data());
    //   });
    //   console.log('temp', temp);
    // };
    // testing();
  }, []);

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
  const onSubmit = (data) => {
    console.log('🚀 ~ file: index.js ~ line 162 ~ onSubmit ~ data', data);
    console.log('Form is submitted');

    const testGtefirebaseData = async () => {
      try {
        const docRef = await addDoc(collection(db, 'cars'), {
          id: uuidv4(),
          make: data.mark,
          modell: data.modell,
          color: data.color,
          horsePower: Number(data.horsePower),
          description: data.description,
          yearMade: Number(data.year),
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };
    testGtefirebaseData();
  };

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
        {/* //info CARS */}
        <div className=" mx-auto mt-4 px-8 max-w-screen-lg">
          <FormProvider {...methods}>
            <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
              <CarForm />

              <div className="flex justify-end mt-6">
                <input
                  className="py-3 px-6 bg-blue-500 text-white"
                  type="submit"
                  value="Add Car"
                />
              </div>
            </form>
          </FormProvider>
        </div>
        <h1 className="text-4xl">Cars</h1>
        {cars?.map(
          (
            { make, modell, color, horsePower, description, yearMade, id },
            index
          ) => {
            return (
              <div
                key={id}
                className="flex flex-col  p-20 bg-blue-100 border border-black mb-4 w-full "
              >
                <h3 className="text-blue-400 mb-4 text-lg font-bold flex-grow">
                  Car Mark: {make}
                </h3>

                <div className="flex flex-col bg-white p-6 rounded-lg shadow-xl ">
                  <p className="text-black">
                    Modell: <span className="text-gray-500">{modell}</span>
                  </p>
                  <p className="text-black">
                    Year:<span className="text-gray-500"> {yearMade}</span>
                  </p>
                  <p className="text-black">
                    Color:<span className="text-gray-500"> {color}</span>
                  </p>
                  <p className="text-black">
                    Horsepower:
                    <span className="text-gray-500"> {horsePower}</span>
                  </p>
                  <p className="text-black">
                    Description:
                    <span className="text-gray-500"> {description}</span>
                  </p>
                </div>
              </div>
            );
          }
        )}
        {/* //info END CARS */}
        {/* //info Books */}
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
        {/* //info END Books */}
        {/*
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
        )} */}
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
  const serverSideDataBocker = await apolloClient.query({
    query: HAMTA_BOCKER,
  });

  const serverSideDataBilar = await apolloClient.query({
    query: HAMTA_BILAR,
  });

  const serverSideDataCars = await apolloClient.query({
    query: GET_CARS,
  });

  return {
    props: {
      serverSideDataBooks: serverSideDataBooks.data.books,
      serverSideDataBocker: serverSideDataBocker.data.bocker,
      serverSideDataBilar: serverSideDataBilar.data.bilar,
      serverSideDataCars: serverSideDataCars.data.cars,
      // serverSideDataUsers: serverSideDataUsers.data,
    },
  };
}
