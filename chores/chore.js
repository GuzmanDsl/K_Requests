submit_btm = document.getElementById("submitbtn")
form = document.getElementById('chore-form')

submit_btm.addEventListener("click", function(){
    console.log(e)
    console.log("submit pressed")
    e.preventDefault()

    form.requestSumbit()
    
})