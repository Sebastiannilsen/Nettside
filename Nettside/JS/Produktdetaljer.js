var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

const db = firebase.firestore();
const nettsideColl = db.collection("Nettside").doc(id);
const alleVarer = db.collection("Nettside");
const nettsideDiv = document.querySelector("#nettsider1");
const handlekurv = db.collection("varerIHandlekurv");
const selSize = document.querySelector("#selSize");
const liknendeVarer = document.querySelector("#liknendeVarer")

async function hentData(){
  const nettsider = await nettsideColl.get();
  lagHtml(nettsider.data(),nettsider.id)
  const type = await nettsider.data().Type;
  const tilsvarende = await alleVarer.where("Type", "==",type).limit(4).get();
  for (const andreVarer of tilsvarende.docs){
    const nyId = andreVarer.id
    liknendeVarer.innerHTML +=`

    <a href="Produktdetaljer.html?id=${nyId}"><section>
      <img id="kanskjeBilde" src="${andreVarer.data()["Bilde"]}">
      <b>${andreVarer.data()["Navn"]}</b>
      <div>${andreVarer.data()["Pris"]},-</div>
    </section></a>
    `
  }
  }

  function lagHtml(nettsideData,id){
    nettsideDiv.innerHTML += `
    <section id="Grid">
      <img id="Bilde" src="${nettsideData["Bilde"]}">
      <div>
        <b>${nettsideData["Navn"]}</b>
        <div>${nettsideData["Pris"]},-</div>
        <div>Farge: ${nettsideData["Farge"]}</div>
        <div id="Kjøp_grid">
          <select id="selSize" name="velgStørrelse">
            <option value="" disabled selected hidden>Velg størrelse</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <button id="Kjøp" onclick="leggIHandlekurv('${id}')">Kjøp</button>
        </div>
      </div>
    </section>
    </div>

    `
  }

  const leggIHandlekurv = async (id) => {
    try{
        await handlekurv.add({
          vareId: id,
          Størrelse: document.getElementById("selSize").value,
          tid: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Vare lagt til i handlekurven");
    }
    catch(err){
          alert("Vare kunne ikke legges til i handlekurv");
        }
    }

    hentData();
