function fetchAndCacheImage(url) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('error fetching image');
        }
            caches.open("images")
            
            .then(cache => {
             cache.put(url, response)
            .then(() => {
            return response;
                 
                
            });
        });
     });
}

async function getImage(url) {
    const cache = await caches.open("images");
    const resposeObj = await cache.match(url);
    
    if (resposeObj) {
        return resposeObj.blob();
    } else {
        const response = fetchAndCacheImage(url);
    }
}

const apiUrl = 'https://picsum.photos/v2/list?page=2&limit=50';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("error fetching img");
        }
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
        data.forEach(displayImages => {
            const imageUrl = displayImages.download_url;
            getImage(imageUrl)
               
            .catch(err =>{
            console.error("error:", err);
            });
        });
    })

