import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Moment } from 'src/app/Moments';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    this.momentForm.patchValue({ image: file });
  }

  submit() {
    if(this.momentForm.invalid) {
      return;
    }

    this.onSubmit.emit(this.momentForm.value);
  }
}

/**
 * ngOnInit():
 *  nessa função instanciamos um formGroup que vai retornar todos os valores dos inputs para a propriedade momentForm, cada campo precisa
 *  de um FormControl para podermos fazer o controle de cada campo. Usamos o Validators.required para validar o input exigindo que ele
 *  seja obrigatório, ele irá refletir no title.invalid que colocamos no HTML, isso também serve para description.
 * 
 *  a "!" significa que o valor será iniciado com null mas você dá a certeza que ele será preenchido em algum momento.
 * 
 *  PEGANDO VALOR DE ARQUIVO/IMAGEM: (  onFileSelected()  )
 *    usamos o método no input type file que é o change, evento que escuta uma alteração e dispara um método.
 *    Com o método disparado, chamamos essa função (  onFileSelected($event)  ) com o evento em seu parâmetro.
 *    Sua execução consiste em pegar o target.files[0] do evento e armazena-lo em uma variável chamada 'file'.
 *    Depois, usamos uma função do FormGroup(momentForm) chamada 'patchValue' que atualiza os valores dos campos desejados 
 *    do formulário. No nosso caso foi o campo 'image', atribuindo através de um objeto chave: valor a variável file,
 *    atualizando nosso input e deixando preparado para mandar uma requisição.
 * 
 *  No fim, emitimos um evento através do 'EventEmitter', chamamos de onSubmit, passando nossa entidade Moment
 *  validada para que o componente pai "new-moment" possa acessar esse valor através da função "createHandle($event)" 
 *  que é disparada através do onSubmit.emit() mandando o dado do emitter pelo parâmetro.
 */