import { UTCTimestamp } from 'lightweight-charts';

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  time: UTCTimestamp;
}

export const candleData: CandleData[] = [];
let lastClose = 100; // Starting price
let lastTime = new Date(2023, 0, 1).getTime() / 1000; // Start from January 1, 2023

export function generateNextCandle(): CandleData {
  const time = (lastTime + 86400) as UTCTimestamp; // Daily candles (1 day in seconds)
  const open = lastClose + (Math.random() - 0.5) * 2;
  const high = open + Math.random() * 2;
  const low = open - Math.random() * 2;
  const close = low + Math.random() * (high - low);

  const newCandle: CandleData = {
    open: parseFloat(open.toFixed(2)),
    high: parseFloat(high.toFixed(2)),
    low: parseFloat(low.toFixed(2)),
    close: parseFloat(close.toFixed(2)),
    time: time,
  };

  lastClose = close;
  lastTime = time;

  return newCandle;
}

for (let i = 0; i < 1000; i++) {
  candleData.push(generateNextCandle());
}

function startCandleGeneration() {
  setInterval(() => {
    const newCandle = generateNextCandle();
    candleData.push(newCandle);
  }, 5000);
}

startCandleGeneration();