"use client";

import { useEffect, useRef } from 'react';
import { ColorType, createChart, CrosshairMode, ISeriesApi } from "lightweight-charts";

import { candleData, generateNextCandle } from '@/data/candleData';

const ChartComponent = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  useEffect(() => {

    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      overlayPriceScales: {
        ticksVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      layout: {
        background: {
          type: ColorType.Solid,
          color: "#000000",
        },
        textColor: "white",
      },
    });

    const candlestickSeries = chart.addCandlestickSeries();
    seriesRef.current = candlestickSeries;

    candlestickSeries.setData(candleData);

    const interval = setInterval(() => {
      const newCandle = generateNextCandle();
      candleData.push(newCandle);
      candlestickSeries.update(newCandle);
    }, 5000);

    return () => {
      clearInterval(interval);
      chart.remove();
    };

  }, []);

  return <div ref={chartContainerRef} style={{
    position: "relative",
    width: "100%",
    height: "90vh",
  }} />;
};

export default ChartComponent;