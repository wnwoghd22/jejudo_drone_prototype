const admin = require('firebase-admin');

const anonymous = {
    id : "anon",
    name : "Anonymous"
}
const checkUser = (req, res, next) => {
    if(req.query.auth_token != undefined) {
        let idToken = req.query.auth_token;
        admin.auth().verifyIdToken(idToken).then(decodedToken => {
            let authUser = {
                id: decodedToken.user_id,
                name: decodedToken.name
            };
            req.user = authUser;
            next();
        }).catch(error => {
            console.log(error);
            //next();
        });
    }
    else {
        console.log(req.query.auth_token);
        //next();
    }
}

module.exports = checkUser;