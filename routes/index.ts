
const userRoute = require("./userRoute");
function route(app) {
    app.use('/user', userRoute);

}

module.exports = route;