async function fetch_synonym(word)// Function to fetch a synonym for a given word using Datamuse API
{
    try
    {
        let response=await fetch(`https://api.datamuse.com/words?ml=${word}&max=5`);// Fetch synonyms
        let data = await response.json(); // Convert response to JSON
        let singleWordSynonyms = data.filter(entry => !entry.word.includes(" ") && !entry.word.includes("-"));// Filter out multi-word synonyms, keeping only single words

        if (singleWordSynonyms.length > 0) {// Return a random synonym from the filtered list
            return singleWordSynonyms[Math.floor(Math.random() * singleWordSynonyms.length)].word;
        }
    }
    catch (error)
    {
        console.error("Error fetching synonym:",error);// Log error if fetching fails
    }
    return word; // If no synonym found, return the original word
    
}

    async function aiRandomWordChange(index)// Function to randomly change a word to its synonym with 45% probability
    {
        if(index<words.length-1)// Ensure we're not at the last word
            {
                if(Math.random()<0.45)
                {
                    let new_word=await fetch_synonym(words[index+1]);
                    words[index + 1] = new_word;// Replace the word with its synonym
                    display();// Update the displayed text
                }
            }   
    }
    

