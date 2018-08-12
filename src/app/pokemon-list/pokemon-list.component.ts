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
  
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getAll("");
  }

  getAll(name){
    if (name != ""){
      this.getByName(name);
    }
    else {
      this.pokemonService.getAll().subscribe(data => this.pokemons = data["results"]);
    }
  }

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

  getByName(name){
    this.pokemonService.getByName(name).subscribe((data) => {
      this.pokemons = data["results"];
      console.log(data);
    });
  }
}
