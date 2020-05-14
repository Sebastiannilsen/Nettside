//html referanser

const inpNavn = document.querySelector("#inpNavn");



// firestore
/*
const db = firebase.firestore();
*/
const mail = db.collection("Nyhetsbrev");


function leggTilMeld(){
  try{
  mail.add({
    Mail: inpNavn.value
  });
  alert("Tusen takk!");
}
catch(err){
  alert("Her skjedde det noe feil")
}
}
