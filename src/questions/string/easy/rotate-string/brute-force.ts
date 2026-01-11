function isRotationBruteForce(s: string, goal: string): boolean {
  if (s.length !== goal.length) return false;
  const n = s.length;
  for (let i = 0; i < n; i++) {
    // rotate by i: take suffix starting at i and prepend the prefix before i
    const rotated = s.slice(i) + s.slice(0, i);
    if (rotated === goal) return true;
  }
  return false;
}