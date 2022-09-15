import { Component } from '@angular/core';
import { KeyboardComponent } from './keyboard/keyboard.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    KeyboardComponent
  ],
  template: `
    <app-keyboard></app-keyboard>
  `,
})
export class AppComponent {}
