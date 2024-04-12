import { OrderDetailModel } from "./order-detail";

export class OrderModel {
    id:        number;
    docNum:    number;
    docEntry:  number;
    docDate:   Date;
    cardCode:  string;
    cardName: string;
    docTotal:  number;
    reference: string;
    createdBy: number;
    detail:    OrderDetailModel[];

    constructor(data?: Partial<OrderModel>) {
        if (data) {
          Object.assign(this, data);
        }else{
            this.detail =[];
        }
      }
}

