import React, { Component } from 'react'
import { Main } from "./Main"

export class Buscar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: "",
            pokemons: [],
            isLoaded: false,
            total: 1,
            next: null,
            previous: null,
        }
    }

    componentDidMount() {
        this.setState({ url: sessionStorage.getItem("url") })
    }

    getData() {
        fetch(this.state.url)
            .then(response => response.json())
            .then(types => {
                let auxPokeList = [];
                var poke;
                for (poke of types.pokemon) {
                    auxPokeList.push(poke.pokemon);
                }
                this.setState({
                    pokemons: auxPokeList,
                    isLoaded: true,
                })
            });
    }

    render() {
        this.getData();
        if (this.state.isLoaded === false) {
            return <p> loading ...</p>
        }
        return (
            <Main
                data={this.state}
            />
        )
    }
}

export default Buscar
