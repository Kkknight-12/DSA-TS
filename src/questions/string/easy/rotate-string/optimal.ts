function isRotationOptimal(s: string, goal: string): boolean {
  if (s.length !== goal.length) return false;
  // Edge case: both empty strings are rotations of each other
  if (s === '' && goal === '') return true;
  return (s + s).includes(goal);
}