const translate=document.querySelector("button");

//prima lingua
const select_before = document.getElementById('lang-before');

//seconda lingua
const select_after = document.getElementById('lang-after');

//testo 
let text=document.getElementById("testo");
let text_area_trad=document.getElementById("trad");

//mic e audio fisrt
const mics=document.getElementsByClassName("mic");
const audios=document.getElementsByClassName("audio");

//mic e audio second

//const mic_second=document.getElementsByClassName("mic second");
//const audio_second=document.getElementsByClassName("audio second");

const languages={
  it:"it-IT",
  en:"en-US"  
}

for (const mic of mics) {
  mic.addEventListener('click', function onClick() {
    console.log(mic.name);
  });
}

for (const audio of audios) {
  audio.addEventListener('click', function onClick() {
    talk(audio.name);
  });
}

select_before.addEventListener("change",function () {
  text.value="";
  text_area_trad.value="";

  });
select_after.addEventListener("change",function () {
  text.value="";
  text_area_trad.value="";
  });

text.addEventListener("input",async function () {
   /* if(text.value.trim().length>0){
      const options = {
        method: 'POST',
        url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '87964fc5d5msh3405a626f6d2779p179385jsnfd1db8124919',
          'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
        },
        data: '{"from":"'+select_before.value+'","to":"'+select_after.value+'","e":"","q":"'+text.value+'"}'
      };
      console.log(options);
      
      axios.request(options).then(function (response) {
        console.log(response);
        text_area_trad.textContent=response.data[0];
      }).catch(function (error) {
        console.error(error);
      });
    }*/
    text_area_trad.value=text.value;
    

  });
  //ascolta e prende testo
  function listen(){
    return 0;
  }
  //riproduce audio
  function talk(audio) {
    if(audio=="audio 1"){
      console.log(audio);
      utter(text.value,select_before.value);
    }
    else if(audio=="audio 2"){
      utter(text_area_trad.value,select_after.value);
    }
  }
  function utter(testo, lan){
    const utterance= new SpeechSynthesisUtterance(testo);
    utterance.volume=1;
    if(languages[lan]==undefined)
      lan="en";

    const lang=languages[lan];
    console.log(lan);
    utterance.lang=lang;
    speechSynthesis.speak(utterance);
    utterance.addEventListener("start", function () {
      text.disabled=true;
      select_after.disabled=true;
      select_before.disabled=true;
    });
    utterance.addEventListener("end", function () {
      text.disabled=false;
      select_after.disabled=false;
      select_before.disabled=false;
    });
  }