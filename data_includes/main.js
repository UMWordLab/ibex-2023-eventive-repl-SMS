PennController.ResetPrefix(null);
DebugOff();

var shuffleSequence = seq( "consent", "IDentry", "demo", "intro",
                            "startpractice",
                                            
                            followEachWith("sep",seq("practice")),

                            "setcounter",
                            "starter",

                            followEachWith("sep",seq(rshuffle(
                                startsWith("mklo"),
                                startsWith("gp")
                            ))),

                            "sendresults",
                            "completion"
                            
                      )

var showProgressBar = false;


Template("Experiment.csv", row => {
   items.push(
    [[row.label, row.item], "PennController", newTrial(
        newText("Reminder: Press f for yes, j for no")
                .print("center at 50vw", "middle at 30vh")
            ,
        newController("StopMakingSense", {
            s: row.sentence,
            yesKeyCode: "70", 
            noKeyCode:"74",
            smsIndex: row.sms != 0 ? row.sms - 1 : null
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

Header(
   newVar("partID").global()   
)
.log( "partid" , getVar("partID") )


newTrial("IDentry",
   newText("instr", "Please enter your Prolific ID:").print()
   ,
   newHtml("partpage", "<input type='text' id='partID' name='participant ID' min='1' max='120'>").print()
   ,
   newButton("Next").print().wait(
       getVar("partID").set( v=>$("#partID").val() ).testNot.is('')
   )
)

newTrial("practice",
        newText("Reminder: Press f for yes, j for no")
                .print("center at 50vw", "middle at 30vh")
            ,
        newController("StopMakingSense", {
            s: "The carpenter ordered food from the restaurant",
            yesKeyCode: "70", 
            noKeyCode:"74",
            // - 1 since .csv is not 0 indexed 
            smsIndex: null
        })
            .print("center at 50vw", "middle at auto")
            .log()
            .wait()
)

newTrial("practice",
        newText("Reminder: Press f for yes, j for no")
                .print("center at 50vw", "middle at 30vh")
            ,
        newController("StopMakingSense", {
            s: "The cat has the played",
            yesKeyCode: "70", 
            noKeyCode:"74",
            // - 1 since .csv is not 0 indexed 
            smsIndex: 4
        })
            .print("center at 50vw", "middle at auto")
            .log()
            .wait()
)

newTrial("practice",
        newText("Reminder: Press f for yes, j for no")
                .print("center at 50vw", "middle at 30vh")
            ,
        newController("StopMakingSense", {
            s: "A tired man the for hours",
            yesKeyCode: "70", 
            noKeyCode:"74",
            // - 1 since .csv is not 0 indexed 
            smsIndex: 3
        })
            .print("center at 50vw", "middle at auto")
            .log()
            .wait()
)

newTrial("demo",
   newHtml("Form", "demo.html")
       .log()
       .print()
   ,
   newButton("continue", "Submit")
       .css("font-size","medium")
       .center()
       .print()
       .wait(   
           getHtml("Form").test.complete()
           .failure( getHtml("Form").warn())
           ,
           newTimer("waitDemo", 500)
               .start()
               .wait()
           )
)

var items = [

    ["sep", "Separator", {transfer: 1500, normalMessage: "Please wait for the next item."}],

    ["startpractice", Message, {consentRequired: false,
        html: ["div",
               ["p", "First you can do three practice sentences."]
              ]}],

    ["setcounter", "__SetCounter__", { }],
    ["sendresults", "__SendResults__", { }],

    ["consent", "Form", { html: { include: "consent.html" } } ],

    ["starter", Message, {consentRequired: false,
        html: ["div",
               ["p", "Time to start the main portion of the experiment!"]
              ]}],
             
      
     ["completion", "Form", {continueMessage: null, html: { include: "completion.html" } }]
    
]

