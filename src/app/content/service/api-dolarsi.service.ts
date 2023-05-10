import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDolarsiService {

    dolarApiUrl = 'https://www.dolarsi.com/api/api.php?type=dolar';

    constructor(private http: HttpClient) { }

    getValoresDolar():Observable<any> {
      return this.http.get<any>(this.dolarApiUrl);
    }
  }

