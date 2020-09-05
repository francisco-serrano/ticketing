import {Publisher, Subjects, TicketUpdatedEvent} from "@fs-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
