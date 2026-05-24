let sharedAudioContext: AudioContext | null = null;
let sharedAnalyser: AnalyserNode | null = null;

export function getAudioContext() {
  if (typeof window === "undefined") return { context: null, analyser: null };

  if (!sharedAudioContext) {
    sharedAudioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    sharedAnalyser = sharedAudioContext.createAnalyser();
    // FFT size determines the number of sound bars (e.g., 256 gives 128 data points)
    sharedAnalyser.fftSize = 256;
  }

  return { context: sharedAudioContext, analyser: sharedAnalyser };
}
