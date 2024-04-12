import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { OrderModel } from '../models/order-model';
import { environment } from 'src/environments/environment';
import { DataModel } from '../models/data-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http: HttpClient ) {}



  getOrders(){
    return firstValueFrom(
        this.http.get<OrderModel[]>(
            `${ environment.uriLogistic}/api/Orders/GetOrders`
            )
        );
  }

  getOrdersByDate(from: Date, to: Date){
    return firstValueFrom(
        this.http.get<OrderModel[]>(
            `${ environment.uriLogistic}/api/Orders/GetOrderByDate${from}/${to}`
            )
        );
  }

  getSuppliers(){
    return firstValueFrom(
        this.http.get<DataModel[]>(
            `${ environment.uriLogistic}/api/DataMaster/GetSupplier`
    ))
  }
  getItem(){
    return firstValueFrom(
        this.http.get<DataModel[]>(
            `${ environment.uriLogistic}/api/DataMaster/GetItems`
    ))
  }
  AddOrder(newEntry: OrderModel) {
    return firstValueFrom(
        this.http.post<OrderModel[]>(
            `${ environment.uriLogistic}/api/Orders`, newEntry
        )
    )
}


}
