// code away!
const server = require("./server.js");

server.listen(process.env.PORT || 4000, () => {
    console.log(`\n ** Server listening on port:4000 **\n`)
})

