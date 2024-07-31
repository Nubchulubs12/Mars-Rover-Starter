const Command = require("./command");
const Message = require("./message");

class Rover {
   // Write code here!
   constructor(position) {
      this.position = position,
         this.mode = "NORMAL"
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
         
      };

      for (let command of message.commands) {
         if (command.commandType === "STATUS_CHECK") {
            response.results.push({
               completed: true,
               roverStatus: {
                  position: this.position,
                  mode: this.mode,
                  generatorWatts: this.generatorWatts
               }
               
            });

         } else if (command.commandType === "MODE_CHANGE") {
            this.mode = command.value;
            response.results.push({ completed: true });


         } else if (command.commandType === "MOVE") {

            if (this.mode === "LOW_POWER") {
               response.results.push({ completed: false });

            } else {
               this.position = command.value;
               response.results.push({ completed: true });
            }

         } else {
            response.results.push({ completed: false });
         }
         
      }
      
      return response;
      
      

   }

}

let commands = [new Command("MOVE", 40), new Command("STATUS_CHECK")];
let message = new Message('Mr. Rover please move', commands);
let rover = new Rover(24);
let response = rover.receiveMessage(message);

console.log(response);



// / response.results.unshift({message: response.message});

module.exports = Rover;