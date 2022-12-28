import { Component } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  faTimesIcon = faTimes;

  constructor(public messagesService: MessagesService) {}       // declaramos como público para podermos ter acesso no template HTML
  



}
