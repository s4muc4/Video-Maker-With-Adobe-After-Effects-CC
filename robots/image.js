const imageDownloader = require('image-downloader')
<<<<<<< HEAD
=======
const gm = require('gm').subClass({imageMagick: true})
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
const google =require('googleapis').google
const customSearch = google.customsearch('v1')
const state = require('./state.js')

const googleSearchCredentials = require('../credentials/google-search.json')

async function robot(){
<<<<<<< HEAD
    console.log('> [image-robot] Starting...')
=======
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
    const content = state.load()
    
   

    await fetchImagesOfAllSentences(content)
    await downloadAllImages(content) 
    state.save(content)

    async function fetchImagesOfAllSentences(content){
<<<<<<< HEAD
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length;sentenceIndex++){
            let query

            if(sentenceIndex === 0){
                query = `${content.searchTerm}`
            }else{
                query = `${content.searchTerm} ${content.sentences[sentenceIndex].keywords[0]}`
            }

            
            console.log(`> [image-robot] Queryng Google Images with: "${query}"`)
            
            content.sentences[sentenceIndex].images = await fetchGoogleAndReturnImagesLinks(query)
            content.sentences[sentenceIndex].googleSearchQuery = query
=======
        for (const sentence of content.sentences){
            const query = `${content.searchTerm} ${sentence.keywords[0]}`
            sentence.images = await fetchGoogleAndReturnImagesLinks(query)

            sentence.googleSearchQuery = query
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
        }
    }

    async function fetchGoogleAndReturnImagesLinks(query) {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            searchType: 'image',
            num: 2
        })
        
        const imagesUrl = response.data.items.map((item)=>{
            return item.link
        })
        return imagesUrl
    }
    
    async function downloadAllImages(content){
        content.downloadedImages = [] 
        

        for(let sentenceIndex = 0; sentenceIndex < content.sentences.length;sentenceIndex++)
        {
            
            const images = content.sentences[sentenceIndex].images
            for(let imageIndex = 0;imageIndex<images.length;imageIndex++){
                const imageUrl = images[imageIndex]

                try{
                    if(content.downloadedImages.includes(imageUrl)){
<<<<<<< HEAD
                        throw new Error('Image already downloaded')
                    }
                    await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
                    content.downloadedImages.push(imageUrl)
                    console.log(`> [image-robot] [${sentenceIndex}][${imageIndex}] Image successfully downloaded: ${imageUrl}`)
                    break
                }catch(error){
                    console.log(`> [image-robot] [${sentenceIndex}][${imageIndex}] Error download (${imageUrl}): ${error}`)
=======
                        throw new Error('Imagem já foi baixada')
                    }
                    await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
                    content.downloadedImages.push(imageUrl)
                    console.log(`> [${sentenceIndex}][${imageIndex}] Baixou imagem com sucesso: ${imageUrl}`)
                    break
                }catch(error){
                    console.log(`> [${sentenceIndex}][${imageIndex}] Erro ao baixar (${imageUrl}): ${error}`)
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
                }
                
            }
        }
    }

    async function downloadAndSave(url, fileName){
        return imageDownloader.image({
<<<<<<< HEAD
            url: url,
=======
            url, url,
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
            dest: `./content/${fileName}`
        })
    }

<<<<<<< HEAD
    //
=======
    
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
}
module.exports = robot