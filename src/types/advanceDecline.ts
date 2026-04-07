import { overlayContentProps } from './common';
import { TimeFrame } from '@prisma/client';

export type SectorRecordProps = {
  date: Date;
  sector_id: string;
  id: string;
  name: string;
  time_frame: TimeFrame;
  total_advance_number: bigint;
  total_decline_number: bigint;
  net_advance_decline: bigint;
  advance_percent: number;
  percent: number;
  count_positive_changes: bigint;
  count_negative_changes: bigint;
  positive_change_ratio: number;
};

export type AdvanceDeclineProps = {
  percent: number;
  timeFrame: TimeFrame;
  period: string;
};

export type SectorAdvanceDeclineProps = AdvanceDeclineProps & {
  sectorId: string;
  overlayContent: overlayContentProps[];
};

export type MarketAdvanceDeclineProps = AdvanceDeclineProps & {
  overlayContent: overlayContentProps[];
};

export type CalculateIgnoreCapitalSectorAdvanceDeclineProps =
  AdvanceDeclineProps & {
    sectorId: string;
  };

export type CalculateMultipleAdvanceDeclineMovingAverageProps = {
  date: Date;
  advanceNumber: number;
  declineNumber: number;
  advancePercent: number;
};
