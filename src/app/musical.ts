export type Note = {
  name: string;
  sharp: boolean;
  octaveOffset?: number;
};

export const OCTAVE: Note[] = [
  {
    name: "F",
    sharp: false,
    octaveOffset: -1
  },
  {
    name: "F",
    sharp: true,
    octaveOffset: -1
  },
  {
    name: "G",
    sharp: false,
    octaveOffset: -1
  },
  {
    name: "G",
    sharp: true,
    octaveOffset: -1
  },
  {
    name: "A",
    sharp: false
  },
  {
    name: "A",
    sharp: true
  },
  {
    name: "B",
    sharp: false
  },
  {
    name: "C",
    sharp: false
  },
  {
    name: "C",
    sharp: true
  },
  {
    name: "D",
    sharp: false
  },
  {
    name: "D",
    sharp: true
  },
  {
    name: "E",
    sharp: false
  }
];

export const getHz = (note: Note = OCTAVE[0]) => {
  const A4 = 440;
  const octave = (note.octaveOffset || 0) + 3
  let N = 0;
  if (!note.sharp) {
    switch (note.name) {
      default:
      case "A":
        N = 0;
        break;
      case "B":
        N = 2;
        break;
      case "C":
        N = 3;
        break;
      case "D":
        N = 5;
        break;
      case "E":
        N = 7;
        break;
      case "F":
        N = 8;
        break;
      case "G":
        N = 10;
        break;
    }
  }
  else {
    switch (note.name) {
      default:
        case "A":
          N = 1;
          break;
        case "C":
          N = 4;
          break;
        case "D":
          N = 6;
          break;
        case "F":
          N = 9;
          break;
        case "G":
          N = 11;
          break;
    }
  }
  N += 12 * (octave - 4);
  return A4 * Math.pow(2, N / 12);
};

export const playNote = (note: Note, audioContext: AudioContext) => {

  const osc = audioContext.createOscillator();
  const noteGainNode = audioContext.createGain();
  noteGainNode.connect(audioContext.destination);

  const zeroGain = 0.00001;
  const maxGain = 0.5;
  const sustainedGain = 0.001;

  noteGainNode.gain.value = zeroGain;

  const setAttack = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      maxGain,
      audioContext.currentTime + 0.01
    );
  const setDecay = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      sustainedGain,
      audioContext.currentTime + 1
    );
  const setRelease = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      zeroGain,
      audioContext.currentTime + 2
    );

  setAttack();
  setDecay();
  setRelease();

  osc.connect(noteGainNode);
  osc.type = "triangle";

  const freq = getHz(note);

  if (Number.isFinite(freq)) {
    osc.frequency.value = freq;
  }

  // keys[key].element.classList.add("pressed");
  // pressedNotes.set(key, osc);
  // pressedNotes.get(key).start();
  osc.start()
};