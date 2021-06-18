const admin = require('firebase-admin');

const anonymous = {
    id : "anon",
    name : "Anonymous"
}
const checkUser = (req, res, next) => {
    //console.log(req);
    //console.log('\n\n\n\n\nbody: ', req.body);
    //console.log('\n\n\n\n\nsession: ', req.session);
    //console.log('\n\n\n\n\nquery: ', req.query);

    if(req.query.idToken != undefined) {
        let idToken = req.query.idToken;
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
        console.log(req.query.idToken);
        return; //next();
    }
}

module.exports = checkUser;