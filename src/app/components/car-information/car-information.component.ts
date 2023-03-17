import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/cars.model';
import { CarService } from 'src/app/car.service';

@Component({
  selector: 'app-car-information',
  templateUrl: './car-information.component.html',
  styleUrls: ['./car-information.component.css']
})
export class CarInformationComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.displayCars();
  }

  displayCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.cars;
      console.log('opgave 1:')

      console.log(this.cars);

      console.log('opgave 2:');

      const filteredCarBrands = this.cars.map(x => x.Name.split(' ')[0]);
      const amountOfCarBrands = new Map<string,number>();

      filteredCarBrands.forEach(x => {
        let value = amountOfCarBrands.get(x);
        if(value !== undefined){
          value +=1;
        }
        else {
          value = 0;
        }
        amountOfCarBrands.set(x, value)
      } );

      console.log(amountOfCarBrands);

      console.log('opgave 3:')
  
      const filteredCars = this.cars.filter((car) => car.Name.split(' ')[0] === 'ford' && new Date(car.Year) > new Date('1980-01-01'));

      console.log(filteredCars);
      console.log('amount of them:');
      console.log(filteredCars.length);

      console.log('opgave 4: ')

      const horsepowerByOrigin = new Map<string, number[]>();

      this.cars.forEach((car) => {
        const origin = car.Origin;
        const horsepower = car.Horsepower;

        if (origin && horsepower) {
          const horsepowerArray = horsepowerByOrigin.get(origin) || [];
          horsepowerArray.push(horsepower);
          horsepowerByOrigin.set(origin, horsepowerArray);
        }
      });

      const averageHorsepowerByOrigin: [string, number][] = [];

      for (const [origin, horsepowerArray] of horsepowerByOrigin) {
        const averageHorsepower = horsepowerArray.reduce((a, b) => a + b) / horsepowerArray.length;
        averageHorsepowerByOrigin.push([origin, averageHorsepower]);
      }

      console.log(averageHorsepowerByOrigin);
    })
  }
}
