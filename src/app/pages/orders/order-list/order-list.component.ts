import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { OrderModel } from '../models/order-model';
import { Messages } from 'src/app/helpers/messages';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'ordenes',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    @ViewChild (OrderDialogComponent) OrderDialog: OrderDialogComponent;
    display: boolean = false;
    loading: boolean = false;
    orderList: OrderModel[] = [];
    title: string ="Listado de pedidos de compra";
    formFilter: FormGroup;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder

    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formFilter = this.fb.group({
        from: [ new Date().toISOString().substring(0,10), Validators.required ],
        to: [ new Date().toISOString().substring(0,10), Validators.required ]
    })
  }

  async getOrder(){

    try{

        this.loading = true;
        Messages.loading("Cargando...", "Espere un momento. ")
        this.orderList = await this.orderService.getOrdersByDate(
            this.formFilter.value.from,
            this.formFilter.value.to
        );
        Messages.closeLoading();
        this.loading = false;
        }  catch (ex){
            Messages.closeLoading();
            Messages.warning(ex);

        }
    }
    addOrder(){
        this.OrderDialog.showDialog(true);
    }

    orderModify(orderList: OrderModel[]){
        this.orderList = orderList;
    }
}
