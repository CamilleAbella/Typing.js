
document.addEventListener( 'DOMContentLoaded', async (event) => {

    // Create typing instance
    const typing = new Typing({
        time : 80,      // latence of typing
        id : 'typing'   // #id of output HTMLElement
    })

    // Pitch
    await typing.write('Hello everyone')
    await typing.write('Hello World !')

    // Break X ms
    await typing.sleep(500)

    // Pitch again and break again...
    await typing.write('Typing.js is simple to use, and...')
    await typing.sleep(500)
    await typing.write('Typing.js is simple to edit 😉')
    await typing.sleep(1000)
    await typing.write('Typing.js use Promises and he is completely independent.')
    await typing.sleep(500)
    await typing.write('Thank to use Typing.js !')
    
})