import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderService } from '../services/order.service';

import { DataModel } from '../models/data-model';


@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
    @Output() SupplierSelect = new EventEmitter<DataModel>();
    display: boolean = false;
    supplierList: DataModel[]=[];
    title: string = "Listado de proveedores";
    loading: boolean = false;

  constructor(private orderService: OrderService ) { }

  ngOnInit(): void {
  }

  showDialog(){
    this.display = true;
    this.getSupplier();
  }

  async getSupplier(){
    this.loading = true;
    this.supplierList = await this.orderService.getSuppliers();
    this.loading = false;
  }

  selectSupplier(supplier: DataModel){
    this.display = false;
    this.SupplierSelect.emit(supplier);
  }
}
