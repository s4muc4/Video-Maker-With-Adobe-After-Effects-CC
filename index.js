const robots = {
    input: require('./robots/input.js'),
    text: require('./robots/text.js'),
    state: require('./robots/state.js'),
    image: require('./robots/image.js'),
    video: require('./robots/video.js'),
    youtube: require('./robots/youtube.js')
}

async function start(){
    
    robots.input()
    await robots.text()
    await robots.image()
    await robots.video()
    await robots.youtube()
<<<<<<< HEAD
    
  
}

start()

=======
  
}

start()
>>>>>>> 5975550efc6d0c1d4c6d886e36c8d5981ae5e15b
