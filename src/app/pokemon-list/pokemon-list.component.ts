import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: []
})
export class PokemonListComponent implements OnInit {

  pokemons: Array<any>;
  pokemon: {};
  data: {};
  types = [];
  abilities = [];
  img: String;
  favorite: boolean;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getAll("");
  }

  //retorna todos os pokemons
  getAll(name){
    if (name != ""){
      this.getByName(name);
    }
    else {
      this.pokemonService.getAll().subscribe(data => this.pokemons = data["results"]);
    }
  }

  //busca pela URL, utilizado para a modal detail
  getByUrl(url){
    this.pokemonService.getByUrl(url).subscribe((data) => {
      this.pokemon = data;
      this.types = [];
      this.abilities = [];
      this.pokemon['types'].forEach(element => {
        this.types.push(element.type.name);
      });
      this.pokemon['abilities'].forEach(element => {
        this.abilities.push(element.ability.name);
      });
      this.img = this.pokemon['sprites']['front_default'];
    });
  }

  //retorna somente o pokemon com o nome digitado na pesquisa
  getByName(name){
    this.pokemonService.getByName(name).subscribe((data) => {
      let url = "https://pokeapi.co/api/v2/pokemon/";
      data['url'] = url + data['id']
      this.pokemons = [data];
      console.log(this.pokemons);
    });
  }

  //adiciona o pokemon na localStorage do browser
  fav(name){
    if (localStorage.getItem('poke_' + name)) {
      localStorage.removeItem('poke_' + name);
      console.log('poke_' + name);
    } else {
      localStorage.setItem('poke_' + name, "TRUE");
    };
  };

  //verifica se o pokemon é favorito
  isFav(name){
    let poke = 'poke_' + name;
    return localStorage.getItem(poke) ? true : false;
  }
}
