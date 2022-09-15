import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note, OCTAVE } from '../musical';

@Component({
  selector: 'app-piano-key',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <button 
      *ngIf="!note.sharp; else sharp" 
      class="key white" 
      [ngStyle]="{'margin-left': note.name !== 'F' && note.name !== 'C' ? '-6%' : '0'}"
      (click)="this.playKey.emit(note)"
    >
      {{ note.name }}
    </button>
    <ng-template #sharp>
      <button class="key black"
       (click)="this.playKey.emit(note)"
      >
        {{ note.name }}#
      </button>
    </ng-template>
  `,
  styles: [`
    @import "../../theme";

    .key {
      position: relative;

      display: inline-flex;
      align-items: flex-end; 
      justify-content: center;

      padding-bottom: 1rem;
      
      font-family: 'Oswald', sans-serif;
    }
    
    .white {
      color: $purple;
      background: $white;
  
      width: clamp(30px, 10vw, 170px);
      height: clamp(240px, 50vh, 450px);

      font-size: clamp(30px, 6vw, 150px);
      
      border: 3px solid $lime;
      border-radius: 0 0 5px 5px;
    }

    .white:active {
      background-image: radial-gradient($pink 30%, transparent 30%);
      background-color: $teal;
      background-position: 0 0, 30px 30px;
      background-size: 30px 30px;
    }

    .black {
      z-index: 2;
      color: $white;
      background: $purple;

      width: clamp(15px, 6vw, 100px);
      height: clamp(120px, 30vh, 250px);

      font-size: clamp(15px, 4vw, 100px);

      border: 3px solid $pink;
      border-radius: 0 0 2px 2px;

      left: -3%;
      vertical-align: top;
    }

    .black:active {
      opacity: 1;
      background-image:  linear-gradient(135deg, $pink 25%, transparent 25%), linear-gradient(225deg, $pink 25%, transparent 25%), linear-gradient(45deg, $pink 25%, transparent 25%), linear-gradient(315deg, $pink 25%, $lime 25%);
      background-position:  20px 0, 20px 0, 0 0, 0 0;
      background-size: 20px 20px;
      background-repeat: repeat;
    }
  `],
})
export class PianoKeyComponent {
  @Input() note: Note = OCTAVE[0];
  @Output() playKey = new EventEmitter<Note>();
}
