PennController.ResetPrefix(null);

var shuffleSequence = seq( 
                            "setcounter",
                            followEachWith("sep", seq(rshuffle(startsWith("mklo"))))
                            
                      )

var showProgressBar = false;


Template("Experiment.csv", row => {
   items.push(
       
    [[row.cond1, row.cond2], "PennController", newTrial(
        newController("StopMakingSense", {
            s: row.sentence,
            yesKeyCode: "89", 
            noKeyCode:"78",
            smsIndex: row.smsAt ? row.smsAt : null
        })
            .print()
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

