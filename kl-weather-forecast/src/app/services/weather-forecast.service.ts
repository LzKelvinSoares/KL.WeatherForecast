import { Injectable } from '@angular/core';
import { ForecastDay } from '../models/forecast-day.model';
import { Weather } from '../models/weather.model';
import { ConfigService } from './http/config.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  fullAddress: string;
  forecastDays: ForecastDay[] = [];
  loading = false;
  errorText: string;

  constructor(private configService: ConfigService) { }

  searchForecast(): void {
    this.forecastDays = [];
    this.loading = true;
    this.errorText = '';
    this.configService.getWeatherForecast(this.fullAddress)
    .subscribe(
      list => {
        this.forecastDays = this._loadForecastsByDate(list);
        this.loading = false;
      },
      error => {
        if (error.status === 404 || error.status === 400) {
          this.errorText = error.error;
        } else {
          this.errorText = 'An error has occured';
        }
        this.loading = false;
      });
  }

  _loadForecastsByDate(list: Weather[]): ForecastDay[] {
    const forecastDays = [];
    list.forEach((weather: Weather) => {
      if (forecastDays.some((f: ForecastDay) => this._compareDates(f.date, weather.startTime))) {
        forecastDays
          .find((f: ForecastDay) =>  this._compareDates(f.date, weather.startTime))
          .weatherForecasts.push(weather);
      } else {
        const newDay = new ForecastDay();
        newDay.date = weather.startTime;
        newDay.name = weather.name.toLocaleLowerCase() != 'this afternoon' ? weather.name : 'Today';
        newDay.weatherForecasts = [weather];
        forecastDays.push(newDay);
      }
    });
    return forecastDays;
  }

  _compareDates(date1: Date, date2: Date): boolean {
    return new Date(date1).setHours(0) === new Date(date2).setHours(0);
  }
}
