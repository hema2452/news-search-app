const searchButton = document.getElementById('button');
const inputValue = document.getElementById('search');
const apiKey = 'f4b8f43fa5fa44d2a6bf6fc97e9a901f';
const blogContainer = document.querySelector('.placeholder-card');

async function fetchRandom(){
    try{
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`
        const data =  await fetch(apiurl);
        const result = await data.json();            
        return result.articles;                
    } catch (error) {
        console.log("Error fectching random news",error)
        return [];        
    }
}

async function fetchNewsQuery(query){
    try{
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
        const data =  await fetch(apiurl);
        console.log(data);
        const res = await data.json();   
        console.log(res);         
        return res.articles;                
    } catch (error) {
        console.log("Error fectching random news",error)
        return [];        
    }

}


searchButton.addEventListener('click',async () => {
    const query = inputValue.value.trim();
    if (query !== ''){
        try {
             const fetchData = await fetchNewsQuery(query);
             displayCards(fetchData);
        } 
        catch (error) {
            console.log(error);            
        }
    }
})


function displayCards(cards) {
    blogContainer.innerHTML="";
    if(cards.length>1){
        cards.forEach((item) => {   
        
            const Blogcard = document.createElement("div");
            Blogcard.classList.add('card');
            const blogImage = document.createElement("div");
            const image = document.createElement("img");
            image.src=item.urlToImage;
            image.alt = item.title;
            const blogtitle = document.createElement("div");
            const title = document.createElement('h1');
            const trimmed = item.title.length > 40 ? item.title.slice(0,40) + "..." : item.title;
            title.textContent = trimmed;
            const description = document.createElement("p");
            const trimmedPara = item.description.length > 40 ? item.description.slice(0,300) + "..." : item.description;
            description.textContent = trimmedPara; 
            blogImage.appendChild(image);
            blogtitle.appendChild(title);
            blogtitle.appendChild(description);
            Blogcard.appendChild(blogImage);
            Blogcard.appendChild(blogtitle);
            Blogcard.addEventListener('click',() => {
                window.open(item.url , "_blank");
            });
            if(item.title !== '[Removed]'){           
                blogContainer.appendChild(Blogcard);
            }    
            
    })};   
    if(cards.length === 0){
        const displayContent = document.createElement('h1');
        displayContent.textContent = "Please use different query";      
        blogContainer.appendChild(displayContent);
    }    
    
    


}

(async() => {
    try{
        const cards = await(fetchRandom());
        displayCards(cards);
    }
    catch(error){
        console.log(error);

    }
})()




