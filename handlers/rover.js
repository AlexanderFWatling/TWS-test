class Rover {
    constructor() {
        this.directions = [ "N", "E", "S", "W" ]
        this.currentPosition = []
        this.currentDirection = 0
        this.finalPosition = []
        this.maxPosition = []
    }

    get getCurrentPosition() {
        if ( this.currentPosition.length < 1 ) {
            return "There is no rover"
        }
        else {
            return this.currentPosition
        }
    }

    get getFinalPosition() {
        if ( this.currentPosition.length < 1 ) {
            return "There is no rover"

        }
        else {
            this.finalPosition = this.currentPosition
            return this.finalPosition
        }
    }

    set setInitialPosition( input ) {
        this.currentPosition = input
        this.currentDirection = this.directions.indexOf( this.currentPosition[ 2 ] )
    }

    set setMaxPosition( maxPosition ) {
        this.maxPosition = maxPosition
    }

    movementInstruction( instruction ) {

        if ( instruction === "M" ) {
            this.moveRover()
        }
        else if ( instruction === "L" || instruction === "R" ) {
            this.rotateRover( instruction )
        }
        else {
            throw new Error( "Invalid Instruction" )
        }
    }

    moveRover() {
        switch ( this.currentPosition[ 2 ] ) {
            case "N":
                this.currentPosition[ 1 ] += 1
                break
            case "S":
                this.currentPosition[ 1 ] -= 1
                break
            case "E":
                this.currentPosition[ 0 ] += 1
                break
            case "W":
                this.currentPosition[ 0 ] -= 1
                break
        }
    }

    rotateRover( instruction ) {
        if ( instruction === "R" ) {
            if ( this.currentDirection < 3 ) {
                this.currentDirection++
                this.currentPosition[ 2 ] = this.directions[ this.currentDirection ]
            }
            else {
                this.currentDirection = 0
                this.currentPosition[ 2 ] = this.directions[ this.currentDirection ]
            }
        }
        else {
            if ( this.currentDirection > 0 ) {
                this.currentDirection--
                this.currentPosition[ 2 ] = this.directions[ this.currentDirection ]
            }
            else {
                this.currentDirection = 3
                this.currentPosition[ 2 ] = this.directions[ this.currentDirection ]
            }
        }
    }
}

module.exports = {
    Rover: Rover
}
