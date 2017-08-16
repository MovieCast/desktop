import zeroFill from 'zero-fill';

export default function formatTime(time) {
  if (typeof time !== 'number' || Number.isNaN(time)) {
    return '0:00';
  }

  const hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  if (hours > 0) {
    minutes = zeroFill(2, minutes);
  }
  const seconds = zeroFill(2, Math.floor(time % 60));

  return `${(hours > 0 ? `${hours}:` : '') + minutes}:${seconds}`;
}
