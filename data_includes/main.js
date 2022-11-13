PennController.ResetPrefix(null);

var shuffleSequence = seq("filler")

var items = [
    ["filler" , "PennController", newTrial(
            newText("Hint: Press y for yes, n for no")
                .css("font-size", "12px")
                .print("center at 50vw", "middle at 60vh")
            ,
            newController("StopMakingSense",  {s: "Here's a silly filler sentence from our new component", 
                                  yesKeyCode: "89", noKeyCode:"78"})
                .print("center at 50vw", "middle at 50vh")
                .log()
                .wait()
            )
    ]
]

