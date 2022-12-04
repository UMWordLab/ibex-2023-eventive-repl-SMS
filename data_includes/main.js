PennController.ResetPrefix(null);

var shuffleSequence = seq( 
                            sepWith("sep", "filler")
                      )
var showProgressBar = false;


// this code will eventually be changed
// once we have a CSV of stimuli, we will do something similar
// to what we did in the Maize Task

// this is just test / placeholder code.
var items = [
    ["filler" , "PennController", newTrial(
            newText("Reminder: Press y for yes, n for no")
                .css("font-family", "Helvetica, sans-serif")
                .css("font-size", "12px")
                .print("center at 50vw", "middle at 30vh")
            ,
            newController("StopMakingSense",  {s: "I am eating a kicked icecream", 
                                  yesKeyCode: "89", noKeyCode:"78", smsIndex:2})
                                  
                .print("center at 50vw", "middle at auto")
                .log()
                .wait()
            )
    ],
    ["filler" , "PennController", newTrial(
            newText("Reminder: Press y for yes, n for no")
                .css("font-family", "Helvetica, sans-serif")
                .css("font-size", "12px")
                .print("center at 50vw", "middle at 30vh")
            ,
            newController("StopMakingSense",  {s: "This is another example!", 
                                  yesKeyCode: "89", noKeyCode:"78"})
                                  
                .print("center at 50vw", "middle at auto")
                .log()
                .wait()
            )
    ],
    ["sep", "Separator", {transfer: 1500, normalMessage: "Please wait for the next item."}]
]

