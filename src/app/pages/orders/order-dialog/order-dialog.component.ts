import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { OrderModel } from "../models/order-model";
import { OrderDetailModel } from "../models/order-detail";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/service/users/auth.service";
import { SupplierListComponent } from '../supplier-list/supplier-list.component';
import { DataModel } from '../models/data-model';
import { ItemListComponent } from '../item-list/item-list.component';
import { Messages } from 'src/app/helpers/messages';
import { OrderService } from '../services/order.service';




@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
    @ViewChild(SupplierListComponent) SupplierList: SupplierListComponent;
    @ViewChild(ItemListComponent) ItemList: ItemListComponent;
    @Output() OrderModify = new EventEmitter<OrderModel[]>();
    display: boolean = false;
    loading: boolean = false;
    order: OrderModel = new OrderModel();
    orderDetail: OrderDetailModel[]=[];
    formOrder: FormGroup;
    isAdd: boolean = false;
    user: User;
    totalQty: number = 0;
    total: number = 0;

  constructor(

    private formBuilder: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService
    ) {
        this.user = this.authService.UserValue;
     }

  ngOnInit(): void {}

  showDialog(isAdd: boolean){
    this.isAdd = isAdd;
    this.display = true;
    this._createForm();
  }

  _createForm(){
    this.formOrder = this.formBuilder.group({
        id: [this.order.id?? 0],
        cardCode: [this.order.cardCode?? '', Validators.required],
        cardName: [this.order.cardName?? ''],
        docTotal: [this.order.docTotal?? 0, Validators.required],
        reference: [this.order.reference?? '', Validators.required],

        createdBy: [this.user.userId?? 0],
        detail: []
    });
  }

  showDialogSupplier(){
    this.SupplierList.showDialog()
  }

  selectSupplier(supplier: DataModel){
    this.order.cardCode = supplier.code;
    this.order.cardName = supplier.name;
    this._createForm();
  }

  showDialogItem(){
    this.ItemList.showDialog();
  }

  selectItem(item: DataModel){
    this.orderDetail.push(new OrderDetailModel({
        itemCode: item.code,
        itemName: item.name,
        quantity: 1,
        price: 0,
        lineTotal:0

    }));
  }

  calculate(){
    setTimeout(()=>{
        this.orderDetail.forEach(x => x.lineTotal = x.quantity * x.price);
        this.totalQty = this.orderDetail.reduce((accum, item) =>accum + item.quantity, 0)
        this.total = this.orderDetail.reduce((accum, item) =>accum + item.lineTotal, 0)
    },500)
  }

  async add(){

    try{
        if(this.formOrder.valid){
            Messages.loading("Agregando", "Espere un momento")
            let newEntry = this.formOrder.value as OrderModel;
            newEntry.detail = this.orderDetail;
            newEntry.docTotal = this.total;
            let result = await this.orderService.AddOrder(newEntry);
            this.display = false;
            this.orderDetail = [];
            this.OrderModify.emit(result);
            Messages.closeLoading();
        }
    }catch(e){
        Messages.closeLoading();
        Messages.warning(e);
    }
  }
}
