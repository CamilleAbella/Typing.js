
document.addEventListener( 'DOMContentLoaded', async (event) => {

    // Create typing instance and link it to HTML element.
    const typing = new Typing({
        time : 80,      // latence of typing
        id : 'typing'   // #id of output HTMLElement
    })

    // Pitch.
    await typing.write('Hello everyone')
    await typing.write('Hello World !')

    // Break Xms.
    await typing.sleep(500)

    // The write method auto-escape HTML tags.
    await typing.write('<span class="pink"> Typing.js </span> is simple to use, and...')

    // Break again and pitch again...
    await typing.sleep(500)
    await typing.write('<span class="pink"> Typing.js </span> is simple to edit 😉')
    await typing.sleep(1000)
    await typing.write('<span class="pink"> Typing.js </span> use Promises and he is completely independent.')
    await typing.sleep(500)
    await typing.write('Thank for using <span class="pink"> Typing.js </span> !')

})