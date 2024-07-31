const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
    test("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(11);
    expect(rover.position).toEqual(11);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
    
  });
//test8
  test("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("test message", commands);
    let rover = new Rover(12);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("test message");
  });
//test9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command("MODE_CHANGE"), new Command("STATUS_CHECK")];
    let message = new Message("test message", commands);
    let rover = new Rover(12);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
//test10
  test("responds correctly to the status check command", function() {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("test message", commands);
    let rover = new Rover(12);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[0].roverStatus).toEqual({
      mode: "NORMAL",
      generatorWatts: 110,
      position: 12,
  });
  });
  //test11
  test("responds correctly to the mode change command",function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("test message", commands);
    let rover = new Rover(12);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(rover.mode).toEqual("LOW_POWER");
  });
  //test12
    test("responds with a false completed value when attempting to move in LOW_POWER mode",function() {
      let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 12)];
      let message = new Message("test message", commands);
      let rover = new Rover(12);
      let response = rover.receiveMessage(message);
      expect(response.results[1].completed).toEqual(false);
      expect(rover.position).toEqual(12);
      expect(rover.mode).toEqual("LOW_POWER");
    });
    //test13
    test("responds with the position for the move command", function() {
      let commands = [ new Command("MODE_CHANGE", "NORMAL"), new Command("MOVE", 24)];
      let message = new Message("test message", commands);
      let rover = new Rover(12);
      let response = rover.receiveMessage(message);
      expect(response.results[1].completed).toEqual(true);
      expect(rover.position).toEqual(24);
    });
    });
















// // Test 12: responds with a false completed value when attempting to move in LOW_POWER mode
// it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
//   let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)];
//   let message = new Message('Test message attempting to move in LOW_POWER', commands);
//   let rover = new Rover(98382);
//   let response = rover.receiveMessage(message);
//   expect(response.results[1].completed).toBeFalse();
//   expect(rover.position).toEqual(98382);
// });

// // Test 13: responds with the position for the move command
// it("responds with the position for the move command", () => {
//   let commands = [new Command('MOVE', 12000)];
//   let message = new Message('Test message with move command', commands);
//   let rover = new Rover(98382);
//   let response = rover.receiveMessage(message);
//   expect(response.results[0].completed).toBeTrue();
//   expect(rover.position).toEqual(12000);
// });
// });