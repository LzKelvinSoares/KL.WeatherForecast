import { Weather } from './weather.model';

export class ForecastDay {
    name: string;
    date: Date;
    weatherForecasts: Weather[];
}
