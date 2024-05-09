import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'todoapp';
  lista = ['task1','task2','task3','task4'];
  botonActivo = false;
  persona = {
    nombre: 'cristian',
    edad:'100',
    img:'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
  }

  mostarAlerta(texto:string){
    alert(texto)
  }

  cambioNumero(event:Event){
    const input = event.target as HTMLInputElement
    this.persona.edad = input.value
  }

}
