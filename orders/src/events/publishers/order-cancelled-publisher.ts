import {OrderCancelledEvent, Publisher, Subjects} from "@fs-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}
