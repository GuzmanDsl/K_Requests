submit_btm = document.getElementById("submitbtn")
form = document.getElementById('chore-form')

submit_btm.addEventListener("click", (e)=>{
    e.preventDefault()

    form.requestSumbit()
    
})