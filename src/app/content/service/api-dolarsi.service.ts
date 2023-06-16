import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDolarsiService {

    dolarApiUrl = 'https://www.dolarsi.com/api/api.php?type=dolar';
    ambitoURL = 'https://mercados.ambito.com///dolarrava/mep/variacion';

    constructor(private http: HttpClient) { }

    getValoresDolar():Observable<any> {
      return this.http.get<any>(this.dolarApiUrl);
    }

    getDolarMep():Observable<any> {
        return this.http.get<any>(this.ambitoURL);
    }
  }

