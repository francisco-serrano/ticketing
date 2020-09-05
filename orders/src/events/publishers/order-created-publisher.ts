import {OrderCreatedEvent, Publisher, Subjects} from "@fs-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}
