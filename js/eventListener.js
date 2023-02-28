var uid = null;

AFRAME.registerComponent("marker-handler",{
init: async function(){


  if(uid === null){
    this.askuid()
  }
this.el.addEventListener("markerFound", ()=>{
  if(uid !== null){
console.log("marker is found!")
  this.handleMarkerFound()

  }
})
  
this.el.addEventListener("markerLost", ()=>{
console.log("marker is lost!")
  this.handleMarkerLost()
})
},
  
askuid: function(){

  var iconurl = "toy.jpg"

  swal({
    title:"",
    icon:iconurl,
    content:{
      element:"input",
      attributes:{
        placeholder: "type your uid Ex.(U01)",
        type: "string",
        min: 1
      }
    },
    closeOnClickOutside: false
  }).then(inputValue =>{
    uid = inputValue
  })
},

handleMarkerFound: function(toys, markerId){

   // Getting today's day
   var todaysDate = new Date();
   var todaysDay = todaysDate.getDay();
   
   // Sunday - Saturday : 0 - 6
   var days = [
     "sunday",
     "monday",
     "tuesday",
     "wednesday",
     "thursday",
     "friday",
     "saturday"
   ];

   var toy = toys.filter(toy => toys.filter === markerId)[0]

   if (toy.unavailable_days.includes(days[todaysDay])) {
    swal({
      icon: "warning",
      title: toy.toy_name.toUpperCase(),
      text: "This toy is not available today!!!",
      timer: 2500,
      buttons: false
    });
  } else {
     // Changing Model scale to initial scale
    var model = document.querySelector(`#model-${toy.id}`);
    model.setAttribute("position", toy.model_geometry.position);
    model.setAttribute("rotation", toy.model_geometry.rotation);
    model.setAttribute("scale", toy.model_geometry.scale);

    //Update UI conent VISIBILITY of AR scene(MODEL , INGREDIENTS & PRICE)

    model.setAttribute("visible", true);
    

    var ingredientsContainer = document.querySelector(`#main-plane-${toy.id}`);

    ingredientsContainer.setAttribute("visible", true);

    var pricePlane = document.querySelector(`#price-plane-${toy.id}`);

    pricePlane.setAttribute("visible", true);


        var buttonDiv = document.getElementById("button-div")

        buttonDiv.style.display = "flex"
          
        var ratingButton = document.getElementById("summary")

        var orderButton = document.getElementById("order")

        ratingButton.addEventListener("click", function(){
          swal({
          icon:"warning",
          title:"rate toy",
          text:"work in progress"
          })
        })
        
        orderButton.addEventListener("click", function(){
        swal({
        icon:"warning",
        title:"Thanks for ordering!",
        text:"It will be delivered soon!"
        })
      })

    }

    
          
        
 },

 handleOrder: function(tNumber, toy) {
  firebase.firestore().collection("tables").doc(tNumber).get().then((doc) =>{
   var details = doc.data()

   if(details["current_orders"][toy.id]){
     details["current_orders"][toy.id]["quantity"]+=1
     var currentQuantity = details["current_orders"][toy.id]["quantity"]
     details["current_orders"][toy.id]["subtotal"]= currentQuantity*toy.price
   }else{
     details["current_orders"][toy.id]={
       item: toy.toy_name,
       price: toy.price,
       quantity: 1,
       subtotal: toy.price*1
     }
   }

   details.total_bill += toy.price
   firebase.firestore().collection("users").doc(doc.id).update(details)
  })
 },

 getToys: async function(){
  return await firebase
  .firestore()
  .collection("toys")
  .get()
  .then(snap => {
    return snap.docs.map(doc => doc.data())
  })
 },

 handleMarkerLost: function(){
  var buttonDiv = document.getElementById("button-div")

  buttonDiv.style.display = "none";
}   
 
})
