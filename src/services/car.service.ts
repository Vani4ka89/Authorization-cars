import {ICar, IPagination} from "../interfaces";
import {IRes} from "../types";
import {urls} from "../constants";
import {apiService} from "./api.service";

class CarService {
    getAll(): IRes<IPagination<ICar>> {
        return apiService.get(urls.cars.base)
    }

    create(car: ICar): IRes<ICar> {
        return apiService.post(urls.cars.base, car)
    }

    getById(id: number): IRes<ICar> {
        return apiService.get(urls.cars.byId(id))
    }

    updateById(id: number, car: ICar): IRes<ICar> {
        return apiService.put(urls.cars.byId(id), car)
    }

    deleteById(id: number): IRes<void> {
        return apiService.delete(urls.cars.byId(id));
    }

    addPhoto(id: number, photo: FormData): IRes<ICar> {
        return apiService.put(urls.cars.photoById(id), photo);
    }
}

export const carService = new CarService();