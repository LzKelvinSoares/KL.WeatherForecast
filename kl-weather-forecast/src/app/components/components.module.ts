import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherForecastService } from '../services/weather-forecast.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ForecastTableComponent,
    SearchBarComponent
  ],
  providers: [
    WeatherForecastService
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ForecastTableComponent,
    SearchBarComponent
  ]
})
export class ComponentsModule {
    static configure(env: any): ModuleWithProviders<ComponentsModule> {
      return {
          ngModule: ComponentsModule,
          providers: [
              {
                  provide: 'env',
                  useValue: env,
              },
          ],
      };
  }
}
