let userApi = require("../components/users");
let clase42Api = require("../components/clase42");
let authApi = require("../components/auth");
let graphqlApi = require("../components/graphql");

module.exports = app =>{
    userApi(app);
    clase42Api(app);
    authApi(app);
    graphqlApi(app);

    app.get("/", (req, res)=> res.send("Todo ok!!!"));
}