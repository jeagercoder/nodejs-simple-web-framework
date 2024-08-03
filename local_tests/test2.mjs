function firstMid(req, res, next) {
    console.log('first mid before');
    next();
    console.log('first mid after');
}

function secondMid(req, res, next) {
    console.log('second mid before');
    next();
    console.log('second mid after');
}

function handler(req, res) {
    console.log('handler execute');
}

const middlewares = [firstMid, secondMid];


function runHandler(req, res) {
    console.log('runHandler');

    function runMiddlewares(middlewares, req, res, done) {
        let index = -1;

        function next(err) {
            if (err) {
                return done(err);
            }
            index++;
            if (index >= middlewares.length) {
                return done();
            }
            const middleware = middlewares[index];
            if (middleware) {
                middleware(req, res, next);
            } else {
                next();
            }
        }

        next();
    }

    // Run middlewares before handler
    runMiddlewares(middlewares, req, res, function(err) {
        if (err) {
            console.log('error');
            return;
        }

        // Execute handler
        handler(req, res);

        // Run middlewares after handler
        // runMiddlewares(middlewares, req, res, function() {
        //     console.log('done');
        // });
    });
}

const req = {
    req: "req"
};
const res = {
    res: "res"
};

runHandler(req, res);
