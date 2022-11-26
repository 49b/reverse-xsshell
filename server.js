var socket = new WebSocket("ws://<ip>:<port>/");

socket.onopen = function() {
    console.log("Connected!");
};

socket.onmessage = function(event) {
    try {
        /* console.log feature
        let originalLog = console.log;
        
        console.log = function(){
            socket.send(
                socket.send(
                    Object.values(arguments).join(" ")
                )
            );
        }*/
        
        let output = eval(event.data);

        switch(typeof output){
            case "object":
                output = JSON.stringify(output);
            case "number":
                output = Number(output);
            case "function":
                output = output + [];
            case "string":
                output = JSON.stringify(output);
            case "boolean":
                output = output + [];
            case "undefined":
                output = output + [];
        }

        socket.send(output);
    } catch(e) {
        socket.send("Uncaught " + e.stack);
    }
};
