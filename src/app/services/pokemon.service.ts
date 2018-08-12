import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: Http) { }

  getAll(): Observable<any[]> {
    return this.http.get(this.pokemonUrl).pipe(map(res => res.json()));
  }

  getByUrl(url): Observable<any[]> {
    return this.http.get(url).pipe(map(res => res.json()));
  }

  getByName(name): Observable<any[]>{
    return this.http.get(this.pokemonUrl + name).pipe(map(res => res.json()));
  }

}
