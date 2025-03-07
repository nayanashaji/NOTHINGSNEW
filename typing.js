let org="An elf loved his pet ant. He tried to feed him the best he could. The ant gobbled whatever the elf would feed him. As time passed and as the ant kept gobbling, it got bigger and bigger till he couldn't fit in the room. Reluctantly, the elf gave the ant to the zoo. Everyone knew the elf's ant at the zoo, and over time, the ant became known as the 'elephant.' Today, when people go to see the elephant in the zoo, they don't know the story behind its odd name."
let words=org.split(" ")
let current_index=0
let timer=null

const text_box=document.getElementById("text-box")
const input_field=document.getElementById("input-field")
const wpm_counter=document.getElementById("wpm-counter")

function display()
{
    text_box.innerHTML=words
    .map((word,index) => 
        index===current_index? 
        `<span class= "highlight">${word}</span>`:word)
    .join(" ");
}
function updatewpm()
{
    if(!timer) return;
    let elapsed_time=(Date.now()-timer)/60000;
    let wpm=Math.round((current_index/elapsed_time)||0);
    wpm_counter.textContent= `WPM: ${wpm}`;
}
input_field.addEventListener("keydown",async function (event)
{
    if(event.key===" "&& input_field.value.trim()===words[current_index])
    {
        event.preventDefault();
        if(!timer)timer=Date.now();
        await aiRandomWordChange(current_index);
        current_index++
        input_field.value="";
        display();
        updatewpm()
    }
    
})
display()