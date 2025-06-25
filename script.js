
const inputs=document.querySelectorAll("input"),
button=document.querySelector('button'),
mobile=document.getElementById('mobile'),
expire=document.getElementById('expire');

let OTP="",expireInterval=""; //global values
function generateOTP(){
    clearInterval(expireInterval); //clearing any previous timer if it is working in the background
    expire.innerText=30;
     OTP=
     Math.floor(Math.random()*10)+""+  //generating random number
     Math.floor(Math.random()*10)+""+
     Math.floor(Math.random()*10)+""+
     Math.floor(Math.random()*10);
 
     alert("Your OTP is "+ OTP);
    inputs[0].focus();
    timer();
};

function timer(){
    expire.innerText=30;
    expireInterval=setInterval(function(){
         --expire.innerText;
        if(expire.innerText==0)  //if time limit expires it will clear the input section and ask to request again
            {clearInterval(expireInterval);
            alert("Request again!");
            clearOTP();
           }  
    },1000);
}

inputs.forEach((input,index)=>{
    input.addEventListener('keyup',function(e){  //the e in function is a placeholder for event object
        const currInput=input,
        nextInput=input.nextElementSibling,
        prevInput=input.previousElementSibling;
    

     if(nextInput && nextInput.hasAttribute("disabled") && currInput.value!==""){ //focus moves to next object if next next input box is there and previous one is filled
        nextInput.removeAttribute("disabled",true);
        nextInput.focus();
     }

     if(e.key==="backspace"){
        inputs.forEach((input,index1)=>{
            if(index<=index1 && prevInput){
                input.setAttribute("disabled",true);
                prevInput.focus();
                prevInput.value="";
                
            }
        });
     };

     if(!inputs[3].disabled && inputs[3].value!=""){
        inputs[3].blur(); //will remove the focus
        button.classList.add("active"); //class
        return;
     };
     button.classList.remove("active");
     
  });

});

window.addEventListener("load", function number(){
   
  let x= prompt("Please enter your mobile number to verify account");
    if(x){
     if(x.length==10){
       mobile.innerText=x;
       generateOTP();
       }
     else
    {alert("Invalid mobile number");
        number();
       
   }
 }
});

button.addEventListener("click",()=>{
    let verify="";
    inputs.forEach((input)=>{    //to check if user entered otp is similar to generated otp
        verify+=input.value;
    });
    if(verify===OTP)
    {alert("Your account has been verified successfully");
       clearOTP();
    }
    else{
        alert("Verification failed");
    }
});

function clearOTP(){
    inputs.forEach((input,i)=>{
        input.value="";
        if(i==0){     //first input box will be focused
            input.removeAttribute("disabled");
        }
        if(i!=0)
        {input.setAttribute("disabled",true);} //others will remain diabled
    });
    
     //timer will be stopped
      clearInterval(expireInterval);
     expire.innerText=0;
    button.classList.remove("active");
}



