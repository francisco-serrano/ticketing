import {PaymentCreatedEvent, Publisher, Subjects} from "@fs-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}