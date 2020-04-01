class InputHandler {
    constructor( inputs ) {
        this.Rover = require( "./rover" )
            .Rover
        this.rover = new this.Rover
        this.inputs = inputs
        this.currentInput
        this.parsedInput
    }

    handleInputs() {
        this.inputs.forEach( ( input, i ) => {
            this.currentInput = input
            this.parseInput()
            this.handleCurrentInput()
        } )

    }

    handleCurrentInput() {
        if ( this.parsedInput.includes( "N" ) ||
            this.parsedInput.includes( "E" ) ||
            this.parsedInput.includes( "S" ) ||
            this.parsedInput.includes( "W" ) ) {
            this.inputInitialPosition()
        }
        else if (
            this.parsedInput.includes( "M" ) ||
            this.parsedInput.includes( "R" ) ||
            this.parsedInput.includes( "L" )
        ) {
            this.inputMovement()
        }
        else {
            this.inputPlaneMax()
        }
    }

    parseInput() {
        this.parsedInput = this.currentInput.split( "" )
            .filter( currentInput => {
                return currentInput != " "
            } )

        this.parsedInput = this.parsedInput.map( item => {
            if ( isNaN( parseInt( item, 10 ) ) ) {
                return item
            }
            else {
                return parseInt( item, 10 )
            }
        } )
    }

    inputInitialPosition() {
        this.rover.setInitialPosition = this.parsedInput
    }

    inputMovement() {
        this.parsedInput.forEach( ( instruction ) => {
            this.rover.movementInstruction( instruction )
        } )
        console.log( this.rover.getFinalPosition )
    }

    inputPlaneMax() {
        this.rover.setMaxPosition = this.parsedInput
    }
}



module.exports = {
    InputHandler: InputHandler
}
