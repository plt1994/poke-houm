import requests 

def request(url):
    return requests.get(url).json()

def get_fst_gen_poke():
    pokes = set()
    url = "https://pokeapi.co/api/v2/generation/1/"
    res = request(url).get("pokemon_species")
    for p in res:
        pokes.add(p.get("name"))
    return pokes

def get_type_poke(a_type):
    pokes = set()
    url = "https://pokeapi.co/api/v2/type/"+a_type
    res = request(url).get("pokemon")
    for p in res:
        pokes.add(p.get("pokemon").get("name"))
    return pokes

    
def get_pokemons(url):  
    response = requests.get(url).json()
    return response.get("results"), response.get("next")

def get_poke_weight(pokemon_name):
    url = "https://pokeapi.co/api/v2/pokemon/"+pokemon_name
    res = request(url).get("weight")
    return res

#retorna true si "name" tiene la particula "at" y al menos
#2 veces la particula "a"
def contains_at_and_a(name):
    len_1 = len(name)
    len_2 = len(name.replace("at",""))
    diff = len_1-len_2
    if(diff>=4):
        #print("Especial!", name)
        return True
    if(diff>=2):
        len_3 = len(name.replace("a",""))
        diff = len_1-len_3
        if (diff>=2):
            return True
    return False

def count_poke(counter, url):
    if url is None:
        return counter
    c = counter
    pok, next_url = get_pokemons(url)
    for item in pok:
        if(contains_at_and_a(item.get("name"))):
            #print(item.get("name"))
            c+=1
    return count_poke(c, next_url)

def egg_group(pokename):
    url_species = "https://pokeapi.co/api/v2/pokemon-species/"
    url = url_species + pokename
    response = requests.get(url).json()
    return response.get("egg_groups")

def count_procreate(pokename):
    set_partners = set()
    egg_groups = egg_group(pokename)
    for eg in egg_groups:
        res = request(eg.get("url"))
        pokemon_species = res.get("pokemon_species")
        for poke in pokemon_species:
            set_partners.add(poke.get("name"))
    
    return len(set_partners) #asumiendo que se puede procrear con su misma especie

def fighters_fst_gen():
    fighters = get_type_poke("fighting")
    fst_gen = get_fst_gen_poke()
    res = fighters.intersection(fst_gen)
    return res

def max_min_weight():
    pokes = fighters_fst_gen()
    weights = []
    for p in pokes:
        weights.append(get_poke_weight(p))
    weights = sorted(weights)
    return [weights[-1], weights[0]]

    

url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100'
print(count_poke(0, url))

print(count_procreate("raichu"))

print(max_min_weight())