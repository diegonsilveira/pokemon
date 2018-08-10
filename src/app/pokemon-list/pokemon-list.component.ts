import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  
  pokemons: Array<any>;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getAll();
  }
  
  getAll(){
    this.pokemonService.getAll().subscribe(res => this.pokemons = res);
  }

}
