export class OrderDetailModel {
    idDetail: number;
    idOrder:  number;
    itemCode: string;
    itemName: string;
    quantity: number;
    price:    number;
    lineTotal: number;

    constructor(data?: Partial<OrderDetailModel>) {
        if (data) {
          Object.assign(this, data);
        }
    }
}
