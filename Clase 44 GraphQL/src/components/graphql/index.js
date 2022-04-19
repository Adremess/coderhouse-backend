const { Router } = require("express");
const { graphqlHTTP } = require("express-graphql");
const router = Router();
let [schemaUser, schemaDate, graphqlFunctions] = require("./controllers/useGraphql");

module.exports = app =>{
    app.use("/graphql", graphqlHTTP({
      schema: schemaDate, schemaUser,
      rootValue: {
        ...graphqlFunctions
      },
      graphiql: false
    }));
    
}