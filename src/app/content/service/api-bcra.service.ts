import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiBcraService {

    inflacionApiUrl = 'apibcra/inflacion_interanual_oficial';
    bearerToken = environment.BEARER_TOKEN_BCRA;

  constructor(private http: HttpClient) { }

  getInflacionInteranual():Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.bearerToken,
     });
    return this.http.get<any>(this.inflacionApiUrl, {headers});
  }
}
