let { buildSchema, GraphQLScalarType, Kind } = require("graphql");
let { User } = require("../../../models");
let Crypter = require("../../../utils/crypter/crypterservice");
let functiones = {};

const dateValue = (value) => {
  if (value instanceof Date) {
    return +value;
  }
}
const DateType = new GraphQLScalarType({
  name: 'Date',
  serialize: dateValue,
  parseValue: dateValue,
  parseLiteral(ast) {
    return dateValue(ast.value);
  }
});
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    currentDate: {
      type: DateType,
      resolve: () => {
        return new Date();
      }
    }
  }
});
const schemaDate = new graphql.GraphQLSchema({ query: queryType });

const schemaUser = buildSchema(`
  type User{
    id: Int
    name: String
    lastname: String
    username: String
    password: String
    photo: String
    phone: String
    token: String
    last_activity_at: Date
    enabled: Boolean
    role_id: Int
    company_id: Int
    created_at: Date
  }
  input UserInput{
    id: Int
    name: String
    lastname: String
    username: String
    password: String
    photo: String
    phone: String
    token: String
    last_activity_at: Date
    enabled: Boolean
    role_id: Int
    company_id: Int
    created_at: Date
  }
  type Query{
    get(id: id): User
    getAll(): [User]
  }
  type Mutation {
    create(obj: UserInput): User
  }
`);

// URL para hacer el requerst creando un nuevo User.
// http:localhost:3000/graphql?query=mutation{create(id:1,name:"Esteban",lastname:"Gonzalez",username:"EstebanG",password:"estebangon",photo:"http://blablabla.photo",phone:"0303456",token:"supertoken",last_activity_at:Date.now(),enabled:true,role_id:72,company_id:765,created_at:Date.now())}

// URL para hacer el request get y getAll.
// http:localhost:3000/graphql?query=query{get(id:1)}
// http:localhost:3000/graphql?query=query{getAll()}

functiones.getAll = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    console.log(error);
  }
}

functiones.get = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    console.log(error);
  }
}

functiones.create = async (obj) => {
  try {
    let { password } = obj;
    password = await Crypter.encryptPassword(password);
    delete obj.password;
    console.log("SADASD", obj);
    return await User.create({ ...obj, password });
  } catch (error) {
    console.log(error);
  }
}

module.exports = [schemaUser, schemaDate, functiones];
