import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Moment } from 'src/app/Moments';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText: string = 'Compartilhar'

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe();            // mandamos os valores do formulário pro banco de dados
    this.messagesService.add("Momento adicionado com sucesso");       // printamos a mensagem do sistema sinalizando que enviamos
    this.router.navigate(['/']);                                      // navegamos para a rota home principal da página
  }
}
