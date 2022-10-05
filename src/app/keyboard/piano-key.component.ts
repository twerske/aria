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
      (mousedown)="this.playKey.emit(note)"
      (keydown)="this.playKey.emit(note)"
    >
      {{ note.name }}
    </button>
    <ng-template #sharp>
      <button class="key black"
      (mousedown)="this.playKey.emit(note)"
      (keydown)="this.playKey.emit(note)"
      >
        {{ note.name }}♯
        {{ note.flat?.name }}♭
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
  
      width: 8%;
      height: 40vh;

      font-size: clamp(16px, 6vw, 150px);
      
      border: 3px solid $lime;
      border-radius: 0 0 5px 5px;
    }

    .white:active {
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: $white;

      background-image: radial-gradient($pink 30%, transparent 30%);
      background-color: $teal;
      background-position: 0 0, 30px 30px;
      background-size: 30px 30px;
    }

    .black {
      z-index: 2;
      color: $white;
      background: $purple;

      width: 6%;
      height: 25vh;

      font-size: clamp(16px, 3.5vw, 50px);

      border: 3px solid $pink;
      border-radius: 0 0 2px 2px;

      left: -3%;
      vertical-align: top;
    }

    .black:active {
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: $purple;

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
