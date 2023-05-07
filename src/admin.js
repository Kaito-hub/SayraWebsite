import "./admin.css"
import app from "./firebase"
import { getDatabase, ref, set, get, child, onValue, remove } from "firebase/database";

// progress bar to be added
const fileInput = document.querySelector(".imageInput")
const fileText = document.querySelector(".fileText")
const uploadImagebtn = document.querySelector(".uploadImage")
const progressModal = document.querySelector(".progressModal")
const adminBody = document.querySelector(".adminBody")
const openUploadModal = document.querySelector(".openUploadModal")
const uploadBody = document.querySelector(".uploadBody")
const closeUploadModal = document.querySelector(".closeUploadModal")

openUploadModal.addEventListener("click", () => {
    uploadBody.classList.add("open")
})

closeUploadModal.addEventListener("click", () => {
    uploadBody.classList.remove("open")
})

window.onkeydown = (e) => {
    if (e.keyCode == 27) {
        uploadBody.classList.remove("open")
    }
}

document.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".deleteBtn")
    const editBtn = e.target.closest(".editBtn")
    if (deleteBtn) {
        const deleteBtn = e.target.closest(".deleteBtn")
        const fileNameToBeDeleted = deleteBtn.parentElement.querySelector(".artName").textContent;
        remove(ref(getDatabase(app), `arts/art${fileNameToBeDeleted}`))
    }else if(editBtn){
        console.log("edit");
    }

})

let file;
let numberOfArts

const dbRef = ref(getDatabase(app), 'arts');
onValue(dbRef, (snapshot) => {
    const arts = Object.values(snapshot.val())
    numberOfArts = arts.length;
    arts.map((art) => {
        createAdminArtElements(art.image, art.name)
    })
})
//   get(child(dbRef,'arts')).then((snapshot)=>{
//     if(snapshot.exists()){
//       const arts = Object.values(snapshot.val())
//       numberOfArts = arts.length;
//     }else{
//       console.log("no data");
//     }
//   }).catch((error)=>{
//     console.log(error);
//   })

// Showing the filename
if (fileInput) {
    fileInput.addEventListener("change", (e) => {
        file = e.target.files[0];
        fileText.textContent = file.name.split(".")[0]
        // console.log(file.name);
    })
}


// art name to be changed accordingly
function uploadImage(artNumber) {
    const reader = new FileReader()
    reader.readAsDataURL(file);
    let imageURL;
    reader.onload = (readerEvent) => {
        imageURL = readerEvent.target.result;
        const db = getDatabase(app);
        // const dbRef =
        const filename = file.name.split(".")[0]
        // console.log(filename);
        set(ref(db, 'arts/' + `art${filename}`), {
            name: `${filename}`,
            image: readerEvent.target.result
        }).then((snapshot) => {
            progressModal.classList.remove("open")
            fileText.textContent = ""

        })
    }

}

if (uploadImagebtn) {
    uploadImagebtn.addEventListener("click", () => {
        if (numberOfArts) {
            uploadImage(numberOfArts + 1)
            progressModal.classList.add("open")
        } else {
            alert("Please Wait")
        }

        // console.log("conpleted");
    })
}

const createAdminArtElements = (src, name) => {
    const adminArt = document.createElement("article")
    adminArt.classList.add("adminArt")
    const adminImg = document.createElement("img")
    adminImg.classList.add("adminImg")
    adminImg.src = src
    const artName = document.createElement("h3")
    artName.classList.add("artName")
    artName.textContent = name
    adminArt.appendChild(adminImg)
    adminArt.appendChild(artName)
    const editBtn = document.createElement("p")
    editBtn.classList.add("editBtn")
    editBtn.textContent = "Edit"
    const deleteBtn = document.createElement("p")
    deleteBtn.classList.add("deleteBtn")
    deleteBtn.textContent = "Delete"
    adminArt.appendChild(editBtn)
    adminArt.appendChild(deleteBtn)
    adminBody.appendChild(adminArt)
}


const removeRef = remove(ref(getDatabase(app), 'arts/art10'));
