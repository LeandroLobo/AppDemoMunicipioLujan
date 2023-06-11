import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDolarsiService {

    dolarApiUrl = 'https://www.dolarsi.com/api/api.php?type=dolar';
    ambitoURL = 'https://mercados.ambito.com//dolarrava/mep/grafico/';
    // ambitoURL = 'https://mercados.ambito.com//dolarrava/mep/grafico/2023-05-03/2023-06-04';

    constructor(private http: HttpClient) { }

    getValoresDolar():Observable<any> {
      return this.http.get<any>(this.dolarApiUrl);
    }

    getDolarMep(diaAnterior = false):Observable<any> {
        const options: any = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const dateObject = new Date();
        if (diaAnterior) dateObject.setDate(dateObject.getDate() - 1);
        const formatedDate = dateObject.toLocaleDateString('en', options).replace(/\//g, '-');
        return this.http.get<any>(this.ambitoURL + formatedDate +'/' + formatedDate);
      }
  }

