import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCbSPXGteow77NQV90fcvAgm4ZzMICaCIo",
    authDomain: "email-2-adfae.firebaseapp.com",
    projectId: "email-2-adfae",
    storageBucket: "email-2-adfae.appspot.com",
    messagingSenderId: "1002003033279",
    appId: "1:1002003033279:web:20d8576aaf56f222a8ea0a",
    measurementId: "G-CHHPFPKDTQ"
  };

  const db_key = "messages"

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

function createID(){
    const nums = "0123456789"
    var ret = ""

    for(var i = 0; i < 10; i++){
        ret += nums[Math.floor(Math.random() * nums.length)]
    }
    return ret
}

let url = new URL(window.location.href)
if (url.pathname == "/" || url.pathname == "/letter" || url.pathname == "/letter/"){
    let target = document.getElementById("target")
    let text = document.getElementById("text")

    let id = url.searchParams.get("id")
    if (id != null){
        const d = await getDoc(doc(db, db_key, id))

        if (d.exists()){
            text.innerText = d.data().message
        }
    }

    document.addEventListener("click", () => {
        if (!target.classList.contains("active")){
            target.classList.add("active")
        }
    })
} else if (url.pathname == "/edit.html" || url.pathname == "/letter/edit.html"){
    let target = document.getElementById("target")
    let btn = document.getElementById("send-btn")
    let text = document.getElementById("text-entry")
    btn.addEventListener("click", async() => {
        if (target.classList.contains("active")){
            const id = createID()
            await setDoc(doc(db, db_key, id), {
                message: text.innerText
            }).then(() => {
                target.classList.remove("active")
                console.log(`${url.origin}/letter?id=${id}`)
                navigator.clipboard.writeText(`${url.origin}/letter?id=${id}`)
            }).catch((err) => {
                console.log(err)
            })
            
        }
    })
}