import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rentals } from '@modules/rentals/infra/typeorm/entities/Rentals';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalRepositoryFake implements IRentalsRepository {
  rentals: Rentals[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rentals> {
    const rental = new Rentals();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async findById(id: string): Promise<Rentals> {
    return this.rentals.find(rental => rental.id === id);
  }
  async findByUser(user_id: string): Promise<Rentals[]> {
    return this.rentals.filter(user => user.id === user_id);
  }
}

export { RentalRepositoryFake };
