export const getRandomDarkValue = () => {
  return Math.floor(Math.random() * 128)
}

export const getRandomDarkColor = () => {
  const r = getRandomDarkValue();
  const g = getRandomDarkValue();
  const b = getRandomDarkValue();
  return `rgb (${r}, ${g}, ${b})`;
}