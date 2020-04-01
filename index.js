const InputHandler = require( "./handlers/input" )
    .InputHandler
const inputs = require( "./inputs/inputs.js" )

let inputHandler = new InputHandler( inputs )
inputHandler.handleInputs()
