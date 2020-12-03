const notFoundHandler = ((req,res)=>{
    res.status(404).json({code:"404", message: "No existe la pagina"});
})

module.exports = notFoundHandler;