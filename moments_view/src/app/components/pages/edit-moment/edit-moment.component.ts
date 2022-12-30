import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

import { Moment } from 'src/app/Moments';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent {
  moment!: Moment
  btnText: string = "Editar";

  constructor(
    private momentService: MomentService, 
    private messageService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);
  }

  editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if(momentData.image) {
      formData.append('image', momentData.image);
    }

    this.momentService.updateMoment(id!, formData).subscribe();
    this.messageService.add(`Moment ${id} foi atualizado com sucesso`);

    this.router.navigate(['/']);

  }
}
