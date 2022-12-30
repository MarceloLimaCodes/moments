import { Component } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';

import { Moment } from 'src/app/Moments';

import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allMoments: Moment[] = [];                // pegar todos os momentos do banco de dados
  moments: Moment[] = [];                   // fazer o filtro depois da busca
  baseApiUrl = environment.baseApiUrl;
  
  searchTerm: string = '';
  searchIcon = faSearch;

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      })
      
      this.allMoments = data;
      this.moments = data;
    })
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement             // event.target é um HTMLInputElement nesse contexto
    const value = target.value

    this.moments = this.allMoments.filter(moment => {
      return moment.title.toLowerCase().includes(value);
    })
  }
}

/**
 * O método "subscribe" funciona como se gosse o .then(response).catch(error) do axios, sua função recebe 3 parâmetros, o
 * primeiro é exatamente os valores que são retornados do response, o segundo é o tratamento do error e o último é uma função
 * gerada depois de tudo ser concluído:
 * 
 * subscribe(
 *  response => console.log(response),
 *  error => console.log(error),
 *  () => console.log("completed")
 * );
 * 
 * O subscribe vem em conjunto da classe Observable<tipo-response>
 * 
 * passamos "!" para o created_at pois na nossa interface do Moment declaramos esse campo como opcional, daí precisamos informar ao
 * typescript que esse dado vai vir com certeza usando a "!"
 * 
 * nessa função de subscrice, criamos a variável "data" pois nosso response vai vir com 2 chaves, message e data, usamos somente a data
 * para preencher essa variável, tratamos a propriedade Date colocando no padrão do pt-br depois preenchemos allMoments e moments com
 * cada item tratado corretamente
 * 
 * SEARCH:
 *  nosso parâmetro de evento é do tipo Event, através dele conseguimos acessar nosso valor do input, porém, o tipo Event não permite
 *  acessarmos esse valor, precisamos indicar que seu target, enviado pra variável "target" seja do tipo HTMLInputElement, assim, podemos
 *  acessar sua propriedade value e pegar exatamente o valor digitado pelo usuário. Ou seja, o event.target captura o evento e 
 *  transformamos ele num tipo HTMLInputElement para acessarmos sua propriedade value e fazer o método de filtro logo após.
 * 
 *  o "event.target" tem seu tipo inferido pelo compilador por padrão de contexto como "EventTarget | null", basta arrastar o mouse em
 *  cima da propriedade para poder ver, esse tipo é atribuido pra variável que recebe seu valor, porém precisamos nesse contexto
 *  atribuir outro tipo para a variável para que possamos usa-la como um valor de input, não como um evento padrão:
 * 
 *  const num = 123;                  // o tipo de num é inferido como number
 *  const str = num as string;        // o tipo de str é definido explicitamente como string para usarmos em um contexto específico
 *  
 * 
 *  pegamos o vetor de allMoments, onde está armazenado todos os momentos e fazemos um filter em cada elemento, quem passar na condição
 *  retorna o valor para o vetor de moments. 
 *  Para realizar a condição, forçamos o title de cada elemento pra caixa baixa/lowercase e comparamos usando o includes com o valor.
 *  o includes vai analizar se o valor no seu parâmetro é igual ao elemento de titulo em lowercase e retornará true ou false, populando
 *  o moments com a funcionalidade do filter recebendo elementos true na sua condição de retorno.
 */