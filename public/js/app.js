console.log('Client side javascript')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data) => {
//        console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=seoul').then((response)=>{
//     response.json().then((data) => {
//         if(data.error){
//         console.log(data)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//      })
// })

const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageSecond=document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading...'
    messageSecond.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            //console.log(data.error)
            messageOne.textContent=data.error
        } else {
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent=data.location
            messageSecond.textContent=data.forecast
        }
     })
})
})