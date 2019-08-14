const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')


const watsonApiKey = require('../credentials/watson-nlu.json').apikey
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const nlu = new NaturalLanguageUnderstandingV1({
  iam_apikey: watsonApiKey,
  version: '2018-04-05',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
})

const state = require('./state.js')



async function robot (){
<<<<<<< HEAD
    console.log('> [text-robot] Starting...')
=======
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
    const content = state.load()

    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)
    limitMaximumSentences(content)
    await fetchKeywordsOfAllSentences(content)

    state.save(content)

    async function fetchContentFromWikipedia(content){
<<<<<<< HEAD
        console.log('> [text-robot] Fetching content from Wikipedia')
=======
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponse.get()
        
        content.sourceContentOriginal = wikipediaContent.content
<<<<<<< HEAD
        console.log('> [text-robot] Fetching done!')
=======
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
    }

    function sanitizeContent(content){
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParantheses(withoutBlankLinesAndMarkdown)

        content.sourceContentSanitized = withoutDatesInParentheses
        

        function removeBlankLinesAndMarkdown(text){
            const allLines = text.split('\n')

            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith('=')){
                    return false
                }
                return true
            })
            return withoutBlankLinesAndMarkdown.join(' ')
        }
    }

    function removeDatesInParantheses(text){
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }
    
    function breakContentIntoSentences(content){
        content.sentences = []

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence)=>{
            content.sentences.push({
                text: sentence,
                keywords:[],
                images: []
            })
        })
    }

    function limitMaximumSentences(content){
        content.sentences = content.sentences.slice(0,content.maximumSentences)
    }

    async function fetchKeywordsOfAllSentences(content){
<<<<<<< HEAD
        console.log('> [text-robot] Starting to fetch keywords from Watson')

        for(const sentence of content.sentences){
            console.log(`> [text-robot] Sentence: "${sentence.text}"`)
            sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text)
            console.log(`> [text-robot] Keywords: ${sentence.keywords.join(', ')}\n`)
        }
    }
//
=======
        for(const sentence of content.sentences){
            sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text)
        }
    }

>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
    async function fetchWatsonAndReturnKeywords(sentence){
        return new Promise((resolve, reject)=>{
            nlu.analyze({
                text: sentence,
                features: {
                    keywords: {}
                }
            }, (error, response)=>{
                if(error){
                    reject(error)
                    return
                }

                const keywords = response.keywords.map((keyword) =>{
                    return keyword.text
            })

            resolve(keywords)
            })
        })
    }

}

module.exports = robot