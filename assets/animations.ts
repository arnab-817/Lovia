
/**
 * Local Lottie Animation Registry
 * In a real production environment, these would be .json files imported directly.
 * For this environment, we represent them as objects to ensure stability and "local" behavior.
 */

// Simplified representative Lottie JSON structures for performance and stability
// Fix: Changed color parameter type from string to number[] to match actual usage in ANIMATIONS (Lottie fill color is an array of normalized RGBA values)
const baseLottie = (color: number[]) => ({
  v: "5.5.7", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Heart", ddd: 0,
  assets: [],
  layers: [{
    ddd: 0, ind: 1, ty: 4, nm: "Shape", sr: 1, ks: {
      o: { a: 0, k: 100 },
      r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [360] }] },
      p: { a: 0, k: [50, 50, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ t: 0, s: [100, 100] }, { t: 30, s: [120, 120] }, { t: 60, s: [100, 100] }] }
    },
    shapes: [{
      ty: "gr", it: [{
        ty: "sh", nm: "Path", ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0]], v: [[0, -20], [20, 0], [0, 20], [-20, 0]], c: true } }
      }, {
        ty: "fl", c: { a: 0, k: color }, o: { a: 0, k: 100 }
      }]
    }]
  }]
});

export const ANIMATIONS = {
  rose: baseLottie([0.83, 0.08, 0.35, 1]), // #D4145A
  heart: baseLottie([1, 0.72, 0.77, 1]), // #FFB7C5
  chocolate: baseLottie([0.48, 0.25, 0.15, 1]), // #7B4026
  teddy: baseLottie([0.76, 0.60, 0.42, 1]), // #C2996B
  hug: baseLottie([0.29, 0.56, 0.89, 1]), // #4A90E2
  kiss: baseLottie([0.96, 0.26, 0.21, 1]), // #F44336
  propose: baseLottie([1, 0.84, 0, 1]), // #FFD700
  valentine: baseLottie([0.91, 0.12, 0.39, 1]), // #E91E63
  cute: baseLottie([1, 0.75, 0.8, 1]),
  deep: baseLottie([0.2, 0.1, 0.4, 1]),
  playful: baseLottie([1, 0.6, 0.2, 1]),
  intense: baseLottie([0.7, 0, 0, 1]),
};
