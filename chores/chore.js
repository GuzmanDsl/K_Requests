submit_btm = document.getElementById("submitbtn")
form = document.getElementById('chore-form')


submit_btm.addEventListener("click", function () {

    console.log("submit pressed")

 
    // form.submit()

    genMail()

})


function genMail() {

    // Request values
    const type = document.getElementById("type").value
    const date = document.getElementById("date").value
    const time = document.getElementById("time").value

    email = ""

    if (type === "dish") {
        email = 
        `You have a ${type} request.
        Date: ${date}
        Time: ${time} 
        
        Make sure to be ready and bring any necessary tools for the job!`
    }

    console.log(email)
}