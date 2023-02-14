AFRAME.registerComponent("buttonKey",{
    init: function(){
        var button1 = document.createElement("button");
        button1.innerHTML="order summary"
        button1.setAttribute("id","summary")
        button1.setAttribute("class","btn btn-warning")

        var button2 = document.createElement("button");
        button2.innerHTML="order now"
        button2.setAttribute("id","order")
        button2.setAttribute("class","btn btn-warning")

        var buttonDiv = document.getElementById("button-div")

        buttonDiv.appendChild(button1)

        buttonDiv.appendChild(button2)
    }
})