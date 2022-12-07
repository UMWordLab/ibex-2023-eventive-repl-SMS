PennController.ResetPrefix(null);

var shuffleSequence = seq( 
                            "setcounter",
                            followEachWith("sep", seq(rshuffle(
                                startsWith("mklo"),
                                startsWith("gp"),
                                startsWith("psych")
                            )))
                            
                      )

var showProgressBar = false;


Template("Experiment.csv", row => {
   items.push(
       
    [[row.cond1, row.cond2], "PennController", newTrial(
        newText("Reminder: Press y for yes, n for no")
                .print("center at 50vw", "middle at 30vh")
            ,
        newController("StopMakingSense", {
            s: row.sentence,
            yesKeyCode: "89", 
            noKeyCode:"78",
            smsIndex: row.smsAt ? row.smsAt : null
        })
            .print("center at 50vw", "middle at auto")
            .log()
            .wait()
    )
        .log("counter", __counter_value_from_server__)
        .log("label", row.label)
        .log("latinitem", row.item)
    ] 
   
   );
   return newTrial('_dummy_',null);
})

var items = [

    ["setcounter", "__SetCounter__", { }],
    ["sep", "Separator", {transfer: 1500, normalMessage: "Please wait for the next item."}]

    
    
]

