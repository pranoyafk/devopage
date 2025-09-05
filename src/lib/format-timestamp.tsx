import { formatDistanceToNow } from 'date-fns';

export function formatTimestamp(date: Date) {
  const fullText = formatDistanceToNow(date, { addSuffix: true });

  return fullText
    .replace('about ', '')
    .replace(' hours', ' hrs')
    .replace(' hour', ' hr')
    .replace(' minutes', ' mins')
    .replace(' minute', ' min')
    .replace(' seconds', ' secs')
    .replace(' second', ' sec')
    .replace('less than a min ago', 'just now');
}
