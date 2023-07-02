const notFoundMiddleware = (req, res)=>{
    res.status(404).send('Route does not exists please')
}

export default notFoundMiddleware;