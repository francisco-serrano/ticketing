import {ExpirationCompleteEvent, Publisher, Subjects} from "@fs-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}