const db = firebase.firestore();
const nettsideColl = db.collection("Nettside");
const nettsideDiv = document.querySelector("#nettsider");



function lagHTML(nettsideData,id){
  nettsideDiv.innerHTML += `
<a href="Produktdetaljer.html?id=${id}"><section>
  <img src="${nettsideData["Bilde"]}">
  <b>${nettsideData["Navn"]}</b>
  <div>${nettsideData["Pris"]},-</div>
</section></a>

  `
}

const selType = document.querySelector("#selType");

selType.onchange = async () => {
    const svar = await nettsideColl.where("Farge","==",selType.value).where("Type", "==", "Undertøy").get();
    nettsideDiv.innerHTML = ``;
    for (const nettside of svar.docs) {
        lagHTML(nettside.data(),nettside.id, );
    }
}

selType.onchange = async () => {
    let svar; // Oppretter en "tom"-variabel

    if(selType.value === "alle"){
        // Hvis svar er lik "alle" gjør følgende:
        hentData()
    }
    else{
        // Ellers gjør følgende:
        svar = await nettsideColl.where("Farge","==",selType.value).where("Type", "==", "Undertøy").get();
        nettsideDiv.innerHTML = ``;
        for (const nettside of svar.docs) {
            lagHTML(nettside.data(),nettside.id);
        }
      }


}

hentData();
