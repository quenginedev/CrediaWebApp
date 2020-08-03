const { server : { secret }} = require('../configs')
module.exports = (req, res, next)=>{
    if(req.headers.authorization === secret){
        next()
    }else {
        res.status(401).json({
            message: 'authorization key invalid'
        })
    }
}