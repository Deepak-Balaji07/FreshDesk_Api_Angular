import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FreshdeskService {

  private domain = 'https://kceac7617.freshdesk.com';
  private apiKey = 'qcII7pTgGYzZ2zVe0o4a';

  constructor(private http: HttpClient) {}

  private headers() {
    return new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.apiKey + ':X'),
      'Content-Type': 'application/json'
    });
  }

  getTickets() {
    return this.http.get(
      `${this.domain}/api/v2/tickets?include=requester`,
      { headers: this.headers() }
    );
  }

  createTicket(data: any) {
    return this.http.post(
      `${this.domain}/api/v2/tickets`,
      data,
      { headers: this.headers() }
    );
  }

  updateTicket(ticketId: number, data: any) {
    return this.http.put(
      `${this.domain}/api/v2/tickets/${ticketId}`,
      data,
      { headers: this.headers() }
    );
  }

  addReply(ticketId: number, message: string) {
    return this.http.post(
      `${this.domain}/api/v2/tickets/${ticketId}/reply`,
      { body: message },
      { headers: this.headers() }
    );
  }

  deleteTicket(ticketId: number) {
    return this.http.delete(
      `${this.domain}/api/v2/tickets/${ticketId}`,
      { headers: this.headers() }
    );
  }
}
