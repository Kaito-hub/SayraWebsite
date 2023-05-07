import "./stylesheet.css"
import app from "./firebase"
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

const artContainer = document.querySelector(".artContainer")
// const db = getDatabase(app);
// console.log(db);
function downloadImage(userId, name, email, imageUrl) {
  const dbRef = ref(getDatabase(app));
  get(child(dbRef,'arts')).then((snapshot)=>{
    if(snapshot.exists()){
      const arts = Object.values(snapshot.val())
      arts.forEach((art)=>{
        createArtElements(art.image,art.name)
      })
    }else{
      console.log("no data");
    }
  }).catch((error)=>{
    console.log(error);
  })
}

downloadImage()

// html script cant recognise the new divs
// create art divs
const createArtElements = (imgURL,imgName) => {
  const artDiv = document.createElement("div")
  artDiv.classList.add("art")
  const imgEl = document.createElement("img")
  imgEl.src = imgURL
  imgEl.alt = imgName
  artDiv.appendChild(imgEl)
  artContainer.appendChild(artDiv)

}
