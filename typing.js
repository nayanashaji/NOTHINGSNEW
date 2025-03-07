let org="An elf loved his pet ant. He tried to feed him the best he could. The ant gobbled whatever the elf would feed him. As time passed and as the ant kept gobbling, it got bigger and bigger till he couldn't fit in the room. Reluctantly, the elf gave the ant to the zoo. Everyone knew the elf's ant at the zoo, and over time, the ant became known as the 'elephant.' Today, when people go to see the elephant in the zoo, they don't know the story behind its odd name."
let words=org.split(" ")
let current_index=0
let timer=null

const text_box=document.getElementById("text-box")
const input_field=document.getElementById("input-field")
const wpm_counter=document.getElementById("wpm-counter")

function display()
{
    text_box.innerHTML=words.map((word,index) => 
        index==current_index? 
        <span class= "highlight"> ${word}</span>:word).join(" ");
}
function updatewpm()
{
    if(!timer) return;
    let elapsed_time=
}