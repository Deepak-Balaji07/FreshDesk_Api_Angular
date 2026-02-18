import { Component, OnInit } from '@angular/core';
import { FreshdeskService } from '../freshdesk.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  email = '';
  subject = '';
  description = '';

  tickets: any[] = [];

  editingTicketId: number | null = null;
  editSubject = '';
  editStatus = 2;
  replyText = '';

  constructor(private freshdesk: FreshdeskService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.freshdesk.getTickets().subscribe({
      next: (data: any) => this.tickets = data,
      error: err => console.error(err)
    });
  }

  createTicket() {
    const data = {
      email: this.email,
      subject: this.subject,
      description: this.description,
      priority: 1,
      status: 2
    };

    this.freshdesk.createTicket(data).subscribe({
      next: () => {
        alert('Ticket created');
        this.email = '';
        this.subject = '';
        this.description = '';
        this.loadTickets();
      },
      error: err => console.error(err)
    });
  }

  editTicket(ticket: any) {
    if (ticket.status === 5) {
      alert('Closed tickets cannot be edited');
      return;
    }

    this.editingTicketId = ticket.id;
    this.editSubject = ticket.subject;
    this.editStatus = ticket.status;
    this.replyText = '';
  }

  updateTicket() {
    if (!this.editingTicketId) return;

    const updateData = {
      subject: this.editSubject,
      status: this.editStatus
    };

    this.freshdesk.updateTicket(this.editingTicketId, updateData).subscribe({
      next: () => {
        alert('Ticket updated');
        this.cancelEdit();          // ✅ close modal
        this.loadTickets();         // ✅ refresh table
      },
      error: err => console.error(err)
    });
  }

  addReply() {
    if (!this.editingTicketId || !this.replyText.trim()) {
      alert('Reply cannot be empty');
      return;
    }

    this.freshdesk.addReply(this.editingTicketId, this.replyText).subscribe({
      next: () => {
        alert('Reply added');
        this.replyText = '';
        this.loadTickets();
      },
      error: err => console.error(err)
    });
  }

  deleteTicket(ticketId: number) {
    if (!confirm('Delete this ticket?')) return;

    this.freshdesk.deleteTicket(ticketId).subscribe({
      next: () => this.loadTickets(),
      error: err => console.error(err)
    });
  }

  cancelEdit() {
    this.editingTicketId = null;
    this.editSubject = '';
    this.editStatus = 2;
    this.replyText = '';
  }

  // ✅ NEW: status text helper
  getStatusText(status: number): string {
    switch (status) {
      case 2: return 'Open';
      case 3: return 'Pending';
      case 4: return 'Resolved';
      case 5: return 'Closed';
      default: return 'Unknown';
    }
  }
}
