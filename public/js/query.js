


const form=document.querySelector('form');
const searchInput=document.querySelector('#searchBox');
var messageBoxOne=document.querySelector('#messageOne')
var messageBoxTwo=document.querySelector('#messageTwo')
// const search=searchInput.value;
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageBoxOne.textContent='Loading...',
    messageBoxTwo.textContent='';
    // console.log(searchInput.value)
    fetch('http://localhost:3000/weather?address='+searchInput.value)
    .then((response)=>{
             response.json().then((data)=>{
                if(data.error){
                    messageBoxOne.textContent=data.error;
                   
                }else{
                   messageBoxOne.textContent=data.forecast;
                   messageBoxTwo.textContent=data.location;
                   searchInput.value=''
                   
                }
            })
        })

})
