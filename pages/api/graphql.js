import { ApolloServer, gql } from 'apollo-server-micro';
const { default: axios } = require('axios');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// info Define your GraphQL schema
const typeDefs = gql`
  type Book {
    title: String
    author: Person
  }
  type Car {
    mark: String
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
    cars: [Car]
    persons: [Person]
    getUsers: [getUsers]
  }

  type Mutation {
    addCar(mark: String, yearMade: Int): Car
    addBook(title: String, name: String, age: Int): Book
  }
`;

// info Define your data set
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

let cars = [
  {
    mark: 'Volvo',
    yearMade: 1969,
  },
  {
    mark: 'Saab',
    yearMade: 1909,
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
    cars: () => cars,
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
    addCar: (_, { mark, yearMade }, { dataSources }) => {
      const newCar = {
        mark,
      };
      cars = [...cars, newCar];

      return newCar;
    },
    addBook: (_, { title, name, age }, { dataSources }) => {
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
export const config = {
  api: {
    bodyParser: false,
  },
};
export default server.createHandler({ path: '/api/graphql' });
