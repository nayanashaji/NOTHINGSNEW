async function fetch_synonym(word)
{
    try
    {
        let response=await fetch(`https://api.datamuse.com/words?ml=${word}&max=5`);
        let data = await response.json();
        let singleWordSynonyms = data.filter(entry => !entry.word.includes(" ") && !entry.word.includes("-"));

        if (singleWordSynonyms.length > 0) {
            return singleWordSynonyms[Math.floor(Math.random() * singleWordSynonyms.length)].word;
        }
    }
    catch (error)
    {
        console.error("Error fetching synonym:",error);
    }
    return word;
    
}

    async function aiRandomWordChange(index)
    {
        if(index<words.length-1)
            {
                if(Math.random()<0.45)
                {
                    let new_word=await fetch_synonym(words[index+1]);
                    words[index+1]=new_word;
                    display();
                }
            }   
    }
    

