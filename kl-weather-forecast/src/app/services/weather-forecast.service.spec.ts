import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { ForecastDay } from '../models/forecast-day.model';
import { Weather } from '../models/weather.model';

import { WeatherForecastService } from './weather-forecast.service';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: 'env',
          useValue: environment,
        }
      ]
    });
    service = TestBed.inject(WeatherForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should compare dates', () => {
    const date = new Date();
    const forecast = new ForecastDay();
    forecast.date = date;
    const weather = new Weather();
    weather.startTime = date;

    expect(service._compareDates(forecast, weather)).toBeTruthy();
  });

  it('should load forecasts by date', () => {
    const date1 = new Date();
    date1.setHours(7);
    const date2 = new Date();
    date2.setHours(15);
    const date3 = new Date();
    date3.setDate(11);

    const weather1 = new Weather();
    weather1.startTime = date1;
    const weather2 = new Weather();
    weather2.startTime = date2;
    const weather3 = new Weather();
    weather3.startTime = date3;

    const list = [weather1, weather2, weather3];
    const forecasts = service._loadForecastsByDate(list);

    expect(forecasts.length).toEqual(2);
    expect(forecasts[0].weatherForecasts[0].startTime.getDate()).toEqual(date1.getDate());
    expect(forecasts[0].weatherForecasts[1].startTime.getDate()).toEqual(date1.getDate());
    expect(forecasts[1].weatherForecasts[0].startTime.getDate()).toEqual(date3.getDate());
  });
});
