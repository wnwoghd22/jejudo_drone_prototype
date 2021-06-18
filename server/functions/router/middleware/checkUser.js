const admin = require('firebase-admin');

const anonymous = {
    id : "anon",
    name : "Anonymous"
}
const checkUser = (req, res, next) => {
    console.log(req);
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
            return; //next();
        });
    }
    else {
        console.log(req.query.auth_token);
        return; //next();
    }
}

module.exports = checkUser;