const chai = require( 'chai' )
const assert = chai.assert
const Rover = require( "../handlers/rover" )
    .Rover
const InputHandler = require( "../handlers/input" )
    .InputHandler
const inputs = require( "../inputs/inputs.js" )

let inputHandler
let roverHandler

describe( "Construct  handler objects", function () {
    it( "should construct the input handler object needed to handle inputs", function () {
        inputHandler = new InputHandler( inputs )
        assert.isObject( inputHandler, "inputHandler is an object" )
    } )
    it( "should Construct the rover handler object needed to handle rover movements", function () {
        roverHandler = new Rover;
        assert.isObject( roverHandler, "roverHandler is an object" )
    } )
} )

describe( "test each function of the rover", function () {
    it( "should return there is no rover when I get current position before initialising a rover position", function () {
        assert.strictEqual( roverHandler.getCurrentPosition, "There is no rover", "The rover has a position before initialisation" )
    } )
    it( "should return there is no rover when I get final position before initialising a rover position", function () {
        assert.strictEqual( roverHandler.getFinalPosition, "There is no rover", "The rover has a final position before being moved or initlised" )
    } )
    it( "should set the initial position of the rover", function () {
        let testInput = [ 1, 2, "N" ]
        roverHandler.setInitialPosition = testInput
        assert.strictEqual( roverHandler.getCurrentPosition, testInput, "Setting initial position of the rover failed" )
        assert.strictEqual( roverHandler.currentDirection, 0, "current direction is not correct" )
    } )
    it( "should set the maxPosition of the rover", function () {
        let testInput = [ 5, 5 ]
        roverHandler.setMaxPosition = testInput
        assert.strictEqual( roverHandler.maxPosition, testInput, "Max position not being set correctly" )
    } )
    it( "should move the rover based on the instruction", function () {
        roverHandler.movementInstruction( "M" );
        assert.strictEqual( roverHandler.getCurrentPosition[ 1 ], 3, "Forward movement didn't go as expected" )
        roverHandler.movementInstruction( "L" )
        assert.strictEqual( roverHandler.getCurrentPosition[ 2 ], "W", "Rotating left didn't go as expected" )
        roverHandler.movementInstruction( "R" )
        assert.strictEqual( roverHandler.getCurrentPosition[ 2 ], "N", "Rotating right didn't go as expected" )
    } )
    it( "should throw an error on invalid movement instruction", function () {
        assert.throws( () => roverHandler.movementInstruction( "Z" ), Error, "Invalid Instruction" )
    } )
    it( "should move the rover forwards in the current direction", function () {
        roverHandler.moveRover()
        let expectedValue = [ 1, 4, "N" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, expectedValue + " expected but Didn't equal " + roverHandler.getCurrentPosition )
        roverHandler.setInitialPosition = [ 1, 2, "E" ]
        roverHandler.moveRover();
        expectedValue = [ 2, 2, "E" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, expectedValue + " expected but Didn't equal " + roverHandler.getCurrentPosition )
        roverHandler.setInitialPosition = [ 1, 2, "W" ]
        roverHandler.moveRover();
        expectedValue = [ 0, 2, "W" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, expectedValue + " expected but Didn't equal " + roverHandler.getCurrentPosition )
        roverHandler.setInitialPosition = [ 1, 2, "S" ]
        roverHandler.moveRover();
        expectedValue = [ 1, 1, "S" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, expectedValue + " expected but Didn't equal " + roverHandler.getCurrentPosition )
    } )
    it( "shoudl rotate the rover to its new heading based on the input", function () {
        roverHandler.setInitialPosition = [ 1, 2, "N" ]
        roverHandler.rotateRover( "R" )
        let expectedValue = [ 1, 2, "E" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, "didn't rotate to the right correctly" )
        roverHandler.rotateRover( "R" )
        expectedValue = [ 1, 2, "S" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, "didn't rotate to the right correctly" )
        roverHandler.rotateRover( "R" )
        expectedValue = [ 1, 2, "W" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, "didn't rotate to the right correctly" )
        roverHandler.rotateRover( "R" )
        expectedValue = [ 1, 2, "N" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, "didn't rotate to the right correctly" )
        roverHandler.rotateRover( "L" )
        expectedValue = [ 1, 2, "W" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, "Didn't rotate left correctly" )
        roverHandler.rotateRover( "L" )
        expectedValue = [ 1, 2, "S" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, "Didn't rotate left correctly" )
        roverHandler.rotateRover( "L" )
        expectedValue = [ 1, 2, "E" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, "Didn't rotate left correctly" )
        roverHandler.rotateRover( "L" )
        expectedValue = [ 1, 2, "N" ]
        assert.deepEqual( roverHandler.getCurrentPosition, expectedValue, "Didn't rotate left correctly" )

    } )
} )

describe( "test each function of the input handler handleInputs()", function () {
    it( "should loop though each input handling them, the last input in inputs should be the final currentInput", function () {
        inputHandler.handleInputs()
        assert.strictEqual( inputHandler.currentInput, "MMRMMRMRRM", "Final input doesn't match with expected" )
    } )

    it( "should parse the current input into an array without whitespaces, where numbers are convered to ints parseInput()", function () {
        inputHandler.currentInput = "MMRMMRMRRM"
        let expectedValue = [ "M", "M", "R", "M", "M", "R", "M", "R", "R", "M" ]
        inputHandler.parseInput()
        assert.deepEqual( inputHandler.parsedInput, expectedValue, "Input did not parse as expected" )
        inputHandler.currentInput = "5 5"
        expectedValue = [ 5, 5 ]
        inputHandler.parseInput()
        assert.deepEqual( inputHandler.parsedInput, expectedValue, "Input did not parse as expected" )
        inputHandler.currentInput = "1 2 N"
        expectedValue = [ 1, 2, "N" ]
        inputHandler.parseInput()
        assert.deepEqual( inputHandler.parsedInput, expectedValue, "Input did not parse as expected" )

    } )

    it( "should send the current input off to be handled by the right function. handleCurrentInput()", function () {
        inputHandler.rover.setInitialPosition = [ 3, 3, "E" ]
        inputHandler.parsedInput = [ "M", "M", "R", "M", "M", "R", "M", "R", "R", "M" ]
        inputHandler.handleCurrentInput()
        let expectedValue = [ 5, 1, "E" ]
        assert.deepEqual( inputHandler.rover.finalPosition, expectedValue, "Movement Input was handled incorrectly" )

        inputHandler.rover.setInitialPosition = [ 1, 2, "N" ]
        inputHandler.parsedInput = [ "L", "M", "L", "M", "L", "M", "L", "M", "M" ]
        inputHandler.handleCurrentInput()
        expectedValue = [ 1, 3, "N" ]
        assert.deepEqual( inputHandler.rover.finalPosition, expectedValue, "Movement Input was handled incorrectly" )

        inputHandler.parsedInput = [ 5, 5 ]
        inputHandler.handleCurrentInput()
        expectedValue = [ 5, 5 ]
        assert.deepEqual( inputHandler.rover.maxPosition, expectedValue, "Max Position input was handled incorrectly" )

        inputHandler.parsedInput = [ 1, 2, "N" ]
        inputHandler.handleCurrentInput()
        expectedValue = [ 1, 2, "N" ]
        assert.deepEqual( inputHandler.rover.getCurrentPosition, expectedValue, "Initial position input was handled incorrectly" )

        inputHandler.parsedInput = [ 3, 3, "E" ]
        inputHandler.handleCurrentInput()
        expectedValue = [ 3, 3, "E" ]
        assert.deepEqual( inputHandler.rover.getCurrentPosition, expectedValue, "Initial position input was handled incorrectly" )

    } )

    it( "should take the initial position input and set the rovers intial position inputInitialPosition()", function () {
        inputHandler.parsedInput = [ 1, 2, "N" ]
        inputHandler.inputInitialPosition()
        let expectedValue = [ 1, 2, "N" ]
        assert.deepEqual( inputHandler.rover.getCurrentPosition, expectedValue, "Initial position was not set correctly" )
        inputHandler.parsedInput = [ 3, 3, "E" ]
        inputHandler.inputInitialPosition()
        expectedValue = [ 3, 3, "E" ]
        assert.deepEqual( inputHandler.rover.getCurrentPosition, expectedValue, "Initial position was not set correctly" )

    } )

    it( "should take a movement instruction, looping through and executing the movement. inputMovement()", function () {
        inputHandler.rover.setInitialPosition = [ 1, 2, "N" ]
        let expectedValue = [ 1, 3, "N" ]
        inputHandler.parsedInput = [ "L", "M", "L", "M", "L", "M", "L", "M", "M" ]
        inputHandler.inputMovement()
        assert.deepEqual( inputHandler.rover.getFinalPosition, expectedValue, "movement input was not handled correctly " )


        inputHandler.rover.setInitialPosition = [ 3, 3, "E" ]
        expectedValue = [ 5, 1, "E" ]
        inputHandler.parsedInput = [ "M", "M", "R", "M", "M", "R", "M", "R", "R", "M" ]
        inputHandler.inputMovement()
        assert.deepEqual( inputHandler.rover.getFinalPosition, expectedValue, "movement input was not handled correctly " )

    } )

    it( "should set the plane max position inputPlaneMax()", function () {
        inputHandler.parsedInput = [ 5, 5 ]
        inputHandler.inputPlaneMax()
        let expectedValue = [ 5, 5 ]
        assert.deepEqual( inputHandler.rover.maxPosition, expectedValue, "the max plane was not set correctly " )
    } )
} )
