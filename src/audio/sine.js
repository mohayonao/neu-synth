"use strict";

import * as NeuSynth from "../synth";
import NeuNode from "../node";

/// ## neu.Sine()
/// ### Instance properties
///   - `frequency`
//    - `detune`

export class NeuSine extends NeuNode {
  constructor() {
    super({
      klass: "Sine",
      params: { frequency: 440, detune: 0 }
    });
  }
}

NeuSynth.register("Sine", NeuSine);

export default NeuSine;
