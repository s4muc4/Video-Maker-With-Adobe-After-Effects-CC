const express = require('express')
const google = require('googleapis').google
const youtube = google.youtube({version: 'v3'})
const OAuth2 = google.auth.OAuth2
const state = require('./state.js')
const fs = require('fs')


async function robot(){
<<<<<<< HEAD
    console.log('> [youtube-robot] Starting...')
=======
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
    const content = state.load()

    await authenticateWithOAuth()
    const videoInformation = await uploadVideo(content)
    await uploadThumbnail(videoInformation)

    async function authenticateWithOAuth(){
        const webServer = await startWebServer()
        const OAuthClient = await createOAuthClient()
        requestUserConsent(OAuthClient)
        const authorizationToken = await waitForGoogleCallback(webServer)
        await requestGoogleForAccessTokens(OAuthClient, authorizationToken)
        await setGlobalGoogleAuthentication(OAuthClient)
        await stopWebServer(webServer) 
        

        async function startWebServer(){
            return new Promise((resolve, reject)=>{
                const port = 5000
                const app = express()

                const server = app.listen(port, ()=>{
<<<<<<< HEAD
                    console.log(`> [youtube-robot] Listening on http://localhost:${port}`)
=======
                    console.log(`> Listening on http://localhost:${port}`)
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b

                    resolve({
                        app,
                        server
                    })
                })
            })
        }

        async function createOAuthClient(){
            const credentials = require('../credentials/google-youtube.json')

            const OAuthClient = new OAuth2(
                credentials.web.client_id,
                credentials.web.client_secret,
                credentials.web.redirect_uris[0]
            )
            return OAuthClient
        }

        function requestUserConsent(OAuthClient){
            const consentUrl = OAuthClient.generateAuthUrl({
                access_type: 'offline',
                scope: ['https://www.googleapis.com/auth/youtube']
            })
<<<<<<< HEAD
            console.log(`> [youtube-robot] Please give your consent: ${consentUrl}`)
=======
            console.log(`> Please give your consent: ${consentUrl}`)
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
        }

        async function waitForGoogleCallback(webServer){
            return new Promise((resolve, reject)=>{
<<<<<<< HEAD
                console.log('> [youtube-robot] Waiting for user consent...')

                webServer.app.get('/oauth2callback', (req, res)=>{
                    const authCode = req.query.code
                    console.log(`> [youtube-robot] Consent given: ${authCode}`)
=======
                console.log('>Waiting for user consent...')

                webServer.app.get('/oauth2callback', (req, res)=>{
                    const authCode = req.query.code
                    console.log(`> Consent given: ${authCode}`)
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b

                    res.send('<h1> Thank You!</h1><p>Now close this tab.</p>')
                    resolve(authCode)
                })
            })
        }

        async function requestGoogleForAccessTokens(OAuthClient, authorizationToken){
            return new Promise((resolve, reject)=>{
                OAuthClient.getToken(authorizationToken, (error, tokens)=>{
                    if(error){
                        return reject(error)
                    }
<<<<<<< HEAD
                    console.log('> [youtube-robot] Access tokens received: ')
=======
                    console.log('> Access tokens received: ')
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
                    console.log(tokens)

                    OAuthClient.setCredentials(tokens)
                    resolve()
                })
            })
        }

        function setGlobalGoogleAuthentication(OAuthClient){
            google.options({
                auth: OAuthClient
            })
        }

        async function stopWebServer(webServer){
            return new Promise((resolve, reject)=>{
                webServer.server.close(()=>{
                    resolve()
                })
            })
        }
    }

    async function uploadVideo(content){
        const videoFilePath = './content/output.mp4'
        const videoFileSize = fs.statSync(videoFilePath).size
        const videoTitle = `${content.prefix} ${content.searchTerm}`
        const videoTags = [content.searchTerm, ...content.sentences[0].keywords]
        const videoDescription = content.sentences.map((sentence)=>{
            return sentence.text
        }).join('\n\n')

        const requestParameters = {
            part: 'snippet, status',
            requestBody: {
                snippet:{
                    title: videoTitle,
                    description: videoDescription,
                    tags: videoTags
                },
                status: {
                    privacyStatus: 'unlisted'
                }
            },
            media: {
                body: fs.createReadStream(videoFilePath)
            }
        }
<<<<<<< HEAD
        console.log('> [youtube-robot] Starting to upload the video to YouTube')
=======

>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
        const youtubeResponse = await youtube.videos.insert(requestParameters, {
            onUploadProgress: onUploadProgress
        })

<<<<<<< HEAD
        console.log(`> [youtube-robot] Video available at: https://youtu.be/${youtubeResponse.data.id}`)
=======
        console.log(`> Video available at: https://youtu.be/${youtubeResponse.data.id}`)
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
        return youtubeResponse.data

        function onUploadProgress(event){
            const progress = Math.round((event.bytesRead/videoFileSize)*100)
<<<<<<< HEAD
            console.log(`> [youtube-robot] ${progress}% completed`)
=======
            console.log(`> ${progress}% completed`)
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
        }
    }

    async function uploadThumbnail(videoInformation){
        const videoId = videoInformation.id
        const videoThumbnailFilePath = './content/youtube-thumbnail.jpg'

        const requestParameters = {
            videoId: videoId,
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(videoThumbnailFilePath)
            }
        }
        const youtubeResponse = await youtube.thumbnails.set(requestParameters)
<<<<<<< HEAD
        console.log(`> [youtube-robot] Thumbnail uploaded`)
        console.log('--Finished!!! Video available--')
=======
        console.log(`> Thumbnail uploaded`)
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
    }
}

module.exports = robot

