import { ApolloServer, gql } from 'apollo-server-micro';
import axios from 'axios';
// import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../firebase';

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// info Define your GraphQL schema
const typeDefs = gql`
  type Bok {
    titel: String
    forfattare: String
    alder: Int
  }

  type Bil {
    marke: String
    modell: String
    ar: Int
  }

  type Book {
    title: String
    author: Person
  }
  type Car {
    id: ID
    make: String
    modell: String
    color: String
    horsePower: Int
    description: String
    yearMade: Int
  }
  type Person {
    name: String
    age: Int
  }
  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
  }

  type Geo {
    lat: String
    lng: String
  }

  type Company {
    name: String
    catchPhrase: String
    bs: String
  }

  type getUsers {
    id: ID
    name: String
    username: String
    email: String
    address: Address
    phone: String
    website: String
    geo: Geo
    company: Company
  }

  type Query {
    books: [Book]
    bocker: [Bok]
    cars: [Car]
    persons: [Person]
    getUsers: [getUsers]
    bilar: [Bil]
  }

  type Mutation {
    addCar(
      id: ID
      make: String
      modell: String
      color: String
      horsePower: Int
      description: String
      yearMade: Int
    ): Car
    addBook(title: String, name: String, age: Int): Book
  }
`;

// info Define your data set
let bocker = [
  {
    titel: 'Bok title',
    forfattare: 'Bok författare',
    alder: 34,
  },
];

let bilar = [
  {
    marke: 'Toyota',
    modell: 'Supra',
    ar: 1998,
  },
];
// let cars = [
//   {
//     mark: 'Volvo',
//     yearMade: 1969,
//   },
//   {
//     mark: 'Saab',
//     yearMade: 1909,
//   },
// ];

let books = [
  {
    title: 'The Awakening',
    author: { name: 'JImmy', age: 20 },
  },
  {
    title: 'City of Glass',
    author: { name: 'Paul Auster', age: 40 },
  },
];

const persons = [
  {
    name: 'Vanessa',
    age: 22,
  },
  {
    name: 'Melody',
    age: 29,
  },
];

// info Define a resolver
const resolvers = {
  Query: {
    books: () => books,
    bocker: () => bocker,
    bilar: () => bilar,
    // cars: () => cars,
    cars: async () => {
      const q = query(collection(db, 'cars'), orderBy('make', 'asc'));
      const querySnapshot = await getDocs(q);
      let temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        temp.push(doc.data());
      });
      // console.log('temp', temp);
      return temp;
    },

    persons: () => persons,
    getUsers: async () => {
      try {
        const users = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        return users.data.map((user) => {
          return user;
        });
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    // addCar: (_, { mark, yearMade }, { dataSources }) => {
    //   const newCar = {
    //     mark,
    //     yearMade,
    //   };
    //   cars = [...cars, newCar];

    //   return newCar;
    // },
    addCar: async (
      _,
      { id, make, modell, color, horsePower, description, yearMade },
      { dataSources }
    ) => {
      console.log('dataSources >>>> ', dataSources);
      const newCar = {
        id,
        make,
        modell,
        color,
        horsePower,
        description,
        yearMade,
      };

      console.log('🚀 ~ file: graphql.js ~ line 197 ~ newCar', newCar);
      try {
        const docRef = await addDoc(collection(db, 'cars'), newCar);

        console.log('ADD CAR SERVER ==> Document written with ID: ', docRef.id);
      } catch (e) {
        console.error(' ADD CAR Server ==> Error adding document: ', e);
      }
      // cars = [...cars, newCar];

      return newCar;
    },
    addBook: (_, { title, name, age }, { dataSources }) => {
      console.log(
        '🚀 ~ file: graphql.js ~ line 219 ~ dataSources',
        dataSources
      );

      const newBook = {
        title,
        author: {
          name,
          age,
        },
      };
      books = [...books, newBook];

      return newBook;
    },
  },
};

// info Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

// https://spin.atomicobject.com/2020/03/29/next-js-graphql-api/
export const config = {
  api: {
    bodyParser: false,
  },
};
export default server.createHandler({ path: '/api/graphql' });
