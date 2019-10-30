
class Typing {

    constructor( options = {} ){
        this.id = options.id || 'typing'
        this.time = options.time || 80
        this.input = ''
        this.output = ''
        this.outputElement = null
    }

    async write(input){
        this.input = input || this.input
        this.outputElement = this.getOutput()
        this.output = this.outputElement.innerHTML
        try{
            await this.untype()
            await this.type()
        }catch( error ){
            console.error( error )
        }
    }

    async untype(){
        let first = true
        await this.sleep( this.time + Math.floor(Math.random() * (this.time)) )
        while(this.output.length > 0 && !this.input.startsWith(this.output)){
            this.output = this.output.slice(0,this.output.length-1).trim()
            this.outputElement.innerHTML = this.output
            if(first){
                await this.sleep( this.time * 2 + Math.floor(Math.random() * (this.time * 2)) )
                first = false
            }else{
                await this.sleep( this.time / 2 )
            }
        }
    }
    
    async type(){
        while(this.input.length > this.output.length){
            await this.sleep( this.time / 2 + Math.floor(Math.random() * this.time) )
            const char = this.input[this.output.length]
            this.output += char
            this.outputElement.innerHTML = this.output
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
