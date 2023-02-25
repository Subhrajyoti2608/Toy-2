AFRAME.registerComponent("marker-handler",{
init: async function(){
this.el.addEventListener("markerFound", ()=>{
console.log("marker is found!")
  this.handleMarkerFound()
})
  
this.el.addEventListener("markerLost", ()=>{
console.log("marker is lost!")
  this.handleMarkerLost()
})
},
  
handleMarkerFound: function(){
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

var toy = toys.filter(toy => toy.id === markerId)[0]

var model = document.querySelector(`#model-${toy.id}`)
model.setAttribute("position",toy.model_geometry.position)
model.setAttribute("rotation",toy.model_geometry.rotation)
model.setAttribute("scale",toy.model_geometry.scale)
},
  
 handleMarkerLost: function(){
 var buttonDiv = document.getElementById("button-div")

 buttonDiv.style.display = "none";
 },

 getToys: async function(){
  return await firebase
  .firestore()
  .collection("toys")
  .get()
  .then(snap => {
    return snap.docs.map(doc => doc.data())
  })
 }
})
