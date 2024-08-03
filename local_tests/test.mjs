




function firstmid(req, res, next) {
    console.log('first mid before')
    next()
    console.log('first mid after')
}

function secondmid(req, res, next) {
    console.log('second mid before')
    next()
    console.log('second mid after')
}



function handler(req, res) {
    console.log('handler execute')
}




const middlewares = [firstmid, secondmid]


function runHandler(req, res) {
    console.log('runHandler')
    function runMid(mids, req, res, done) {
        let index = -1
        function next(err) {
            if (err) {
                return done(err)
            }
            index++
            if (index >= mids.length) {
                return done()
            }
            const mid = mids[index]
            if (mid) {
                mid(req, res, next)
            } else {
                next()
            }
        }
        next()
    }

    runMid(req, res, middlewares, function(err) {
        if (err) {
            console.log('error')
            return
        }
        runMid(req, res, middlewares, function() {
            console.log('here')
            return 'here'
        })
        console.log('done')
        return
    })

}

const req = {
    req: "req"
}
const res = {
    res: "res"
}

runHandler(req, res)
