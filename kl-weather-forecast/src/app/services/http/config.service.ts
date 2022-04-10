import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    @Inject('env') private environment: any,
    private http: HttpClient
  ) { }

  getWeatherForecast(fullAddress: string): Observable<Weather[]> {
    const apiEndpoint = this.environment.weatherApiEndpoint;
    return this.http.get<Weather[]>(`${apiEndpoint}/weatherforecast/${fullAddress}`);
  }
}
