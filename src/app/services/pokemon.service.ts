import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonUrl = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Array<any>>(this.pokemonUrl);
  }

}
