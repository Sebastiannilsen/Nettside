

const nettsideDiv = document.querySelector("#nettsider3");





const db = firebase.firestore();
const nettsideColl = db.collection("Nettside");


async function hentData(){
  nettsideDiv.innerHTML = ``;
  const nettsider = await nettsideColl.where("Populær", "==", "ja").get();
  for(const nettside of nettsider.docs){
  lagHTML(nettside.data(),nettside.id)
  }
}

function lagHTML(nettsideData,id){
  nettsideDiv.innerHTML += `
<a href="Produktdetaljer.html?id=${id}"><section>
  <img src="${nettsideData["Bilde"]}">
  <b>${nettsideData["Navn"]}</b>
  <div>${nettsideData["Pris"]},-</div>
</section></a>

  `
}


hentData();
