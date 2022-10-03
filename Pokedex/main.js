let search = document.querySelector('.text')
let button = document.querySelector('.btn')


const types = {
    fire: '#FF4136',
    normal: '#AAAAAA',
    water: '#0074D9',
    grass: '#2ECC40',
    electric: '#FFDC00',
    ice: '#7FDBFF',
    fighting: '#FF851B',
    poison: '#85144b',
    ground: '#FF851B',
    flying: '#7FDBFF',
    psychic: '#B10DC9',
    bug: '#01FF70',
    rock: '#FF851B',
    ghost: '#85144b',
    dark: '#111111',
    dragon: '#85144b',
    steel: '#DDDDDD',
    fairy: '#F012BE'
}



button.addEventListener('click', () =>{
    clearPokedex()
    renderPokemon()
})

function renderPokemon(){
  
        let pokemon = search.value.toLowerCase()
        console.log(pokemon)
        
        document.querySelector('.description').classList.remove('hide')
        
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then(res => {
            if(!res.ok){
                throw Error("Pokemon couldn't be found")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            document.querySelector('.error').classList.add('hide')

            for(let i = 11; i< data.flavor_text_entries.length; i++){
                if(data.flavor_text_entries[i].language.name === 'en'){
                    document.querySelector('.info').textContent     = 
                    data.flavor_text_entries[i].flavor_text
                    
                    break
                }
            }
            
        
        })
        .catch(err => {
            console.log(err)
            document.querySelector('.error').classList.remove('hide')
            document.querySelector('.pokemon').classList.add('hide')
        })

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(res => {
                if(!res.ok){
                    throw Error("Pokemon couldn't be found")
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                document.querySelector('.pokemon').classList.remove('hide')

                document.querySelector('.description-box').classList.remove('hide')
                document.querySelector('.pokemon-image').innerHTML = 
                `
                <img class='sprite' src= '${data.sprites.other["official-artwork"].front_default}'></img>
                `
                document.querySelector('.pokemon-name').textContent = data.name

                document.querySelector('.type').textContent = data.types[0].type.name
                document.querySelector('.type').style.backgroundColor = types[data.types[0].type.name]

                if(data.types[1].type.name){
                    document.querySelector('.type2').textContent = data.types[1].type.name
                    document.querySelector('.type2').style.backgroundColor = types[data.types[1].type.name]
                }
                console.log(data.types[0].type.name)

                document.querySelector('.height').textContent = data.height
                document.querySelector('.weight').textContent = data.weight
                document.querySelector('.hp').textContent = data.stats[0].base_stat
                document.querySelector('.attack').textContent = data.stats[1].base_stat
                document.querySelector('.defense').textContent = data.stats[2].base_stat
                document.querySelector('.spatk').textContent = data.stats[3].base_stat
                document.querySelector('.spdef').textContent = data.stats[4].base_stat
                document.querySelector('.speed').textContent = data.stats[5].base_stat
            })
            .catch(err => console.log(err))
               
        }
       
    
 function clearPokedex(){
    document.querySelector('.type2').textContent = ''
    document.querySelector('.type2').style.backgroundColor = ''

 }

        
