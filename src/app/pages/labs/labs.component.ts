import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'todoapp';
  lista = ['task1','task2','task3','task4'];
  botonActivo = false;
  nombreSignal = signal('cristhian')
  persona = {
    nombre: 'cristian',
    edad:'100',
    img:'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
  }

  colorControl = new FormControl();
  widthControl = new FormControl('50');

  constructor() {
    this.colorControl.valueChanges.subscribe(valor => console.log(valor));
  }


  mostarAlerta(texto:string){
    alert(texto)
  }

  cambioNumero(event:Event){
    const input = event.target as HTMLInputElement
    this.persona.edad = input.value
  }

  cambioNombre(event:Event){
    const input = event.target as HTMLInputElement
    this.nombreSignal.set(input.value)
  }

}
