const apiKey = "880b5f8b5eeec0e48826a828"; // Replace with your API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;

//const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  let fromCurr = document.querySelector(".from select");
  let toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");


  /*
  for(code in countryList){
    console.log(code);
  }*/

    for(let select of dropdowns){
        for(currCode in countryList){
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if(currCode === "INR" && select.name === "from"){
                newOption.selected = "selected";
            }

            if(currCode === "VND" && select.name === "to"){
                newOption.selected = "selected";
            }
            select.append(newOption);
        }

        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
    }


    const updateFlag = (element) => {
        //console.log(element);
        let currCode = element.value;
        //console.log(currCode);
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img  = element.parentElement.querySelector("img");
        img.src = newSrc;
    };

    btn.addEventListener("click", async (evt)=>{
        evt.preventDefault();
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        
        if(amtVal === "" || amtVal < 0 ){
            alert("Enter valid amount");
            return;
        }

        // console.log(fromCurr.value,toCurr);
        const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
        let response = await fetch(URL);
        // console.log(URL,"/n",response);
        let data = await response.json();
        // console.log(data.conversion_rate);

        const convAmt =  amtVal*data.conversion_rate;

        const newMsg = `${amtVal} ${fromCurr.value} = ${convAmt} ${toCurr.value}`;
        msg.innerText = newMsg;
    }); 