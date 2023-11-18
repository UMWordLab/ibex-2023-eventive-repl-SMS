PennController.ResetPrefix(null);
DebugOff();

var shuffleSequence = seq( "consent", "IDentry", "demo", "instructions",
                            "startpractice",
                                            
                            followEachWith("sep",seq("practice")),

                            "setcounter",
                            "starter",

                            followEachWith("sep",seq(rshuffle(
                                startsWith("mklo"),
                                startsWith("gp"),
                                startsWith("misc")
                            ))),

                            "sendresults",
                            "completion"
                            
                      )

var showProgressBar = false;
var yeskey = 70; // 70 = f
var nokey = 74; // 74 = j
var keyremindertext = "<html> <head> <style> table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; } th:nth-child(1), td:nth-child(1) { width: 20%; } th:nth-child(2), td:nth-child(2) { width: 60%; } th:nth-child(3), td:nth-child(3) { width: 20%; } </style> </head> <body> <table> <tr> <th>YES</th> <th> </th> <th>NO</th> </tr> <tr> <td>f</td> <td> </td> <td>j</td> </tr> </table> </body> </html>"

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

Template("practice.csv", row =>
    newTrial("practice",
            newText("Does the last word make sense? Press f to start:<br>Respond as quick as possible - this screen will only be available for 10 seconds.")
                .print("center at 50vw", "middle at 8vh")
                ,
             newText("keyreminder", keyremindertext)
                .css("font-family", "Helvetica, sans-serif")
                .css("font-size", "16px")
                .print("center at 50vw", "middle at 35vh"),
            newController("StopMakingSense", {
                s: row.sentence,
                yesKeyCode: yeskey, 
                noKeyCode: nokey,
                // - 1 since .csv is not 0 indexed 
                smsIndex: null
            })
                .print("center at 50vw", "middle at 20vh")
                .log()
                .wait()
                ,
            getText("keyreminder")
                .text(row.feedback)
              //  .wait()
              ,
            newButton("continue","continue")
                .print("center at 50vw", "middle at 50vh")
                .wait()
    )
)

Template("experiment.csv", row => {
   items.push(
    [[row.label, row.item], "PennController", newTrial(
        newText("Does the last word make sense? Press f to start:<br><br>Respond as quickly AND carefully as possible - you have 20 seconds for each sentence.")
            .print("center at 50vw", "middle at 8vh")
            ,   
        newText("keyreminder", keyremindertext)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50vw", "middle at 35vh")
            ,
        // 20ms timer for full sentence. Due to callback failure with controller need to use this 'fake' timer method
        newTimer("deadline", 20000).start()
        ,
        newTimer("fake", 1)
            .callback(
                newController("StopMakingSense", {
                    s: row.sentence,
                    yesKeyCode: yeskey,  
                    noKeyCode: nokey,     
                    // - 1 since .csv is not 0 indexed 
                    smsIndex: row.sms != 0 ? row.sms - 1 : null
                })
                    .print("center at 50vw", "middle at 20vh")
                    .log()
                    .wait(),
                getTimer("deadline").stop()
            )
            .start()
            ,
        getTimer("deadline").wait()
    )
    .log("counter", __counter_value_from_server__)
    .log("label", row.cond1)
    .log("latinitem", row.item)
    ] 
   );
   return newTrial('_dummy_',null);
})

// this is where native ibex items are defined. think this needs to stay at the end of the script.
var items = [

    ["sep", "Separator", {transfer: 1500, normalMessage: "Please wait for the next item."}],

// messages
    ["startpractice", Message, {consentRequired: false,
        html: ["div",
               ["p", "First you can do three practice sentences."]
              ]}],
    ["starter", Message, {consentRequired: false,
        html: ["div",
               ["p", "Time to start the main portion of the experiment!"]
              ]}],

// html pages
    ["consent", "Form", { html: { include: "consent.html" } } ],
    ["instructions", "Form", { html: { include: "instructions.html" } } ],
    ["completion", "Form", {continueMessage: null, html: { include: "completion.html" } }],

    ["setcounter", "__SetCounter__", { }],
    ["sendresults", "__SendResults__", { }]

]

