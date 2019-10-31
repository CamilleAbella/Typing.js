class Typing {

    constructor( options = {} ){
        this.id = options.id || 'typing'
        this.time = options.time || 80
        this.input = 'Hello World'
        this.output = ''
        this.outputElement = null
    }

    async write(input){
        const regex = /<\/?[\S^/>]+?[^>]*>/mg
        this.inputTags = []
        this.outputTags = []
        this.input = input || this.input
        this.outputElement = this.getOutput()
        this.output = this.outputElement.innerHTML
        this.input = this.input.replace(/\s+/gm,' ')

        // detection des balises
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

        // execution
        try{
            await this.untype()
            await this.type()
        }catch( error ){
            throw error
        }

        return this
    }

    async untype(){
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
    
    async type(){
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

    sleep( time ){
        return new Promise( resolve => {
            setTimeout( resolve, time )
        })
    }

    getOutput(){
        return document.getElementById( this.id )
    }
}