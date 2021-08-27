const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// info Define your GraphQL schema
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Car {
    mark: String
    yearMade: Int
  }
  type Query {
    books: [Book]
    cars: [Car]
  }
`;

// info Define your data set
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];
const cars = [
  {
    mark: 'Volvo',
    yearMade: 1969,
  },
  {
    mark: 'Saab',
    yearMade: 1909,
  },
];

// info Define a resolver
const resolvers = {
  Query: {
    books: () => books,
    cars: () => cars,
  },
};

// info Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
