PennController.ResetPrefix(null);

var shuffleSequence = seq( 
                            "setcounter",
                            followEachWith("sep", seq(rshuffle(
                                startsWith("mklo"),
                                startsWith("gp")
                            )))
                            
                      )

var showProgressBar = false;


Template("Experiment.csv", row => {
   items.push(
    [[row.cond1, row.item], "PennController", newTrial(
        newText("Reminder: Press f for yes, j for no")
                .print("center at 50vw", "middle at 30vh")
            ,
        newController("StopMakingSense", {
            s: row.sentence,
            yesKeyCode: "70", 
            noKeyCode:"74",
            // - 1 since .csv is not 0 indexed 
            smsIndex: row.sms ? row.sms - 1 : null
        })
            .print("center at 50vw", "middle at auto")
            .log()
            .wait()
    )
    .log("counter", __counter_value_from_server__)
    .log("label", row.cond1)
    .log("latinitem", row.item)
    ] 
   );
   return newTrial('_dummy_',null);
})

var items = [

    ["setcounter", "__SetCounter__", { }],
    ["sep", "Separator", {transfer: 1500, normalMessage: "Please wait for the next item."}]    
    
]

