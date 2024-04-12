import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataModel } from '../models/data-model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
    @Output() itemSelect = new EventEmitter<DataModel>();
    display: boolean = false;
    itemList: DataModel[]=[];
    title: string = "Listado de articulos";
    loading: boolean = false;

  constructor(private orderService: OrderService ) { }

  ngOnInit(): void {
  }

  showDialog(){
    this.display = true;
    this.getItem();
  }

  async getItem(){
    this.loading = true;
    this.itemList = await this.orderService.getItem();
    this.loading = false;
  }

  selectItem(item: DataModel){
    this.display = false;
    this.itemSelect.emit(item);
  }
}
