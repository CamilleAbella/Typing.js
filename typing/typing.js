
/** 
 * Class represents an HTML element of output  
 * @typedef {Object} Typing 
 * @property {string} id Id attribute of target HTML element
 * @property {number} time Approximate milliseconds break between each letter typed
 * @property {string} input Input text to resolve and write
 * @property {string} output Current content of target HTML element
 * @property {HTMLElement} outputElement Output HTML element
 * @property {array} inputTags HTML tags found inner current input text
 * @property {array} outputTags HTML tags found inner current output HTML element
 */

class Typing {

    /**
     * Construct link between target HTML element and Typing methods
     * @param {object} [options={}] Constructor options
     * @param {string} [options.id='typing'] Id attribute of target HTML element
     * @param {number} [options.time=80] Approximate milliseconds break between each letter typed
     */

    constructor( options = {} ){
        this.id = options.id || 'typing'
        this.time = options.time || 80
        this.input = 'Hello World'
        this.output = ''
        this.outputElement = null
    }

    /**
     * Resolve inputs and applies a succession of write method for each
     * @async
     * @function thread
     * @param {Array} inputs Inputs text to resolve and write
     * @param {number} [sleepTime] Optional milliseconds of end breaks
     * @returns {Promise} Promise of current Typing instance
     */

    async thread(inputs, sleepTime){
        for(const input of inputs){
            await this.write(input, sleepTime)
        }
        return this
    }

    /**
     * Resolve input, erase and write to target HTML element
     * @async
     * @function write
     * @param {string} [input=this.input] Input text to resolve and write
     * @param {number} [sleepTime] Optinal milliseconds of end break
     * @returns {Promise} Promise of current Typing instance
     */

    async write(input, sleepTime){
        const regex = /<\/?[\S^/>]+?[^>]*>/mg
        this.inputTags = []
        this.outputTags = []
        this.input = input || this.input
        this.outputElement = this._getOutput()
        this.output = this.outputElement.innerHTML
        this.input = this.input.replace(/\s+/gm,' ')

        // detect input tags
        if(regex.test(this.input)){
            regex.lastIndex = 0
            const tags = Array.from(this.input.matchAll(regex))
            this.inputTags = tags.map(group => {
                return {
                    index : this.input.indexOf(group[0]),
                    length : group[0].length,
                    content : group[0]
                }
            })
        }
        
        // detect output tags
        if(regex.test(this.output)){
            regex.lastIndex = 0
            const tags = Array.from(this.output.matchAll(regex))
            this.outputTags = tags.map(group => {
                return {
                    index : this.output.indexOf(group[0]),
                    length : group[0].length,
                    content : group[0]
                }
            })
        }

        // write
        try{
            await this._untype()
            await this._type()
            if( sleepTime )
            await this.sleep( sleepTime )
        }catch( error ){
            throw error
        }

        return this
    }

    /**
     * Sleep function for wait between async/await actions
     * @async
     * @function sleep
     * @param {number} time Milliseconds to spread
     * @returns {Promise} Promise of the end of the break
     */

    sleep( time ){
        return new Promise( resolve => {
            setTimeout( resolve, time )
        })
    }

    /**
     * Write input to target HTML element
     * @async
     * @private
     * @function _untype
     */

    async _untype(){
        let first = true
        await this.sleep( this.time + Math.floor(Math.random() * (this.time)) )
        while(this.output.length > 0 && !this.input.startsWith(this.output)){

            this.output = this.output.slice(0,this.output.length-1).trim()

            const innerTag = this.outputTags.some(tag => {
                return (
                    this.output.length > tag.index && 
                    this.output.length < tag.index + tag.length
                )
            })

            if(!innerTag){
                this.outputElement.innerHTML = this.output
                if(first){
                    await this.sleep( this.time * 2 + Math.floor(Math.random() * (this.time * 2)) )
                    first = false
                }else{
                    await this.sleep( this.time / 2 )
                }
            }
        }
    }

    /**
     * Erase inner target HTML element
     * @async
     * @private
     * @function _type
     */
    
    async _type(){
        while(this.input.length > this.output.length){

            const innerTag = this.inputTags.some(tag => {
                return (
                    this.output.length > tag.index - 1 && 
                    this.output.length < tag.index + tag.length - 1
                )
            })

            if(!innerTag){
                await this.sleep( this.time / 2 + Math.floor(Math.random() * this.time) )
            }

            this.output += this.input[this.output.length]

            if(!innerTag){
                this.outputElement.innerHTML = this.output
            }
        }
    }

    /**
     * Get target HTML element
     * @private
     * @function _getOutput
     */

    _getOutput(){
        return document.getElementById( this.id )
    }
}