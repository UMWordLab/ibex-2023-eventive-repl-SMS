PennController.ResetPrefix(null);

var shuffleSequence = seq("filler")
var showProgressBar = false;

var items = [
    ["filler" , "PennController", newTrial(
            newText("Reminder: Press y for yes, n for no")
                .css("font-family", "Helvetica, sans-serif")
                .css("font-size", "12px")
                .print("center at 50vw", "middle at 30vh")
            ,
            newController("StopMakingSense",  {s: "I am eating a kicked icecream", 
                                  yesKeyCode: "89", noKeyCode:"78", smsIndex:4})
                                  
                .print("center at 50vw", "middle at auto")
                .log()
                .wait()
            )
    ]
]

