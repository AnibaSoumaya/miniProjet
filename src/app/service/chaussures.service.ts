import { Injectable } from '@angular/core';
import { LieuCreationChaussure } from '../model/LieuCreationChaussure';
import { chaussure } from '../model/chaussure';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LieuWrapper } from '../model/LieuWrapped.model';

const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )};

@Injectable({
  providedIn: 'root'
})
export class ChaussuresService {

  apiURL: string = 'http://localhost:8080/chaussure/api';
  apiURLLieu: string = 'http://localhost:8080/chaussure/lieu';
  chaussures! : chaussure[]; //un tableau de chaînes de caractères 
  chaussure! :chaussure;
  lieu! : LieuCreationChaussure[];
  constructor(private http : HttpClient) 
  { /*
    this.lieu = [
      {idLieu:1 , pays : "france" , codeBar:123 },
      {idLieu:2 , pays : "États-Unis" , codeBar:321 }
    ]
    this.chaussures = 
    [ 
      {idChaussure : 1,  nomChaussure : "Addidas", prixChaussure: 300.600 , pointureChaussure: 38,couleurChaussure: "Blanc",
       lieuC : {idLieu:1 , pays : "france" , codeBar:123 }}, 
      {idChaussure : 2,  nomChaussure : "Nike", prixChaussure : 450 , pointureChaussure: 39, couleurChaussure:"Noir" , 
      lieuC : {idLieu:1 ,pays : "france" , codeBar:123 }}, 
      {idChaussure : 3,  nomChaussure :"Puma", prixChaussure : 250.999,pointureChaussure: 37, couleurChaussure: "Rouge" ,
       lieuC : {idLieu:2 , pays : "États-Unis" , codeBar:321 }},
      
    ];  */
  } 


  listeChaussures():  Observable<chaussure[]>
  {
    return this.http.get<chaussure[]>(this.apiURL);
  } 

  ajouterChaussure(chauss: chaussure):Observable<chaussure>{
    return this.http.post<chaussure>(this.apiURL, chauss, httpOptions);
  
  }

  listelieu(): Observable<LieuCreationChaussure[]> {
    return this.http.get<LieuCreationChaussure[]>(this.apiURL + '/lieu');
  }

  consulterlieu( codeBar: number)
  {
    return this.lieu.find(lieu => lieu.codeBar == codeBar)!;
  }

  supprimerChaussure( id: number){ 
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
   } 


   consulterChaussure(id: number): Observable<chaussure> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<chaussure>(url); 
    }


    updateChaussure(chauss: chaussure): Observable<chaussure>
    {
    return this.http.put<chaussure>(this.apiURL, chauss, httpOptions);
    }


    trierChaussure(){ 
      this.chaussures = this.chaussures.sort((n1, n2) => {
        const idChaussure1 = n1.idChaussure ?? 0; // Utilisez 0 comme valeur par défaut si idProduit est undefined
        const idChaussure2 = n2.idChaussure ?? 0;
        
        if (idChaussure1 > idChaussure2) {
          return 1;
        }
        if (idChaussure1 < idChaussure2) {
          return -1;
        }
        return 0;
      });
   
    } 

      rechercherParCategorie(idLieu: number):Observable< chaussure[]> {
        const url = `${this.apiURL}/chausslieu/${idLieu}`;
        return this.http.get<chaussure[]>(url);
      }

      rechercherParNom(nom: string):Observable< chaussure[]> {
        const url = `${this.apiURL}/chaussByName/${nom}`;
        return this.http.get<chaussure[]>(url);
        }
        /*aaaa*/

   




   
}
