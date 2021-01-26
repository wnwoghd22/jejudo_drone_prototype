const admin = require('firebase-admin');

const anonymous = {
    id : "anon",
    name : "Anonymous"
}
const CheckUser = (req, res, next) => {
    req.user = anonymous;
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
            next();
        });
    }
    else {
        console.log(req.query.auth_token);
        next();
    }
}

module.exports = CheckUser;