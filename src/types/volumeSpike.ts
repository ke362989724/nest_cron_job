export type VolumeSpikeProps = {
  thresholdVolumePercent: number;
  thresholdPricePercent: number;
  window: number;
};

export interface VolumeSpikeResultProps {
  ticker_id: string;
  symbol: string;
  date: Date;
  open: number;
  close: number;
  volume: number;
  price_pct: number;
  avg_vol_window: number;
  volume_pct: number;
}

export interface saveVolumeSpikeResultProps {
  tickerId: string;
  window: number;
  thresholdPricePercent: number;
  thresholdVolumePercent: number;
  date: Date;
  finalVolume: number;
  finalPriceChange: number;
}
