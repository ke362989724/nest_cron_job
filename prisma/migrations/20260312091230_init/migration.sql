-- CreateEnum
CREATE TYPE "public"."TimeFrame" AS ENUM ('MIN_15', 'HOUR_1', 'DAY_1', 'REAL_TIME');

-- CreateEnum
CREATE TYPE "public"."InstrumentType" AS ENUM ('TICKER', 'ETF', 'INDEX');

-- CreateTable
CREATE TABLE "public"."sectors" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."industries" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sector_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."exchanges" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "exchanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."income_statements" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "reported_currency" TEXT,
    "cik" TEXT,
    "filing_date" TIMESTAMPTZ(3) NOT NULL,
    "accepted_date" TIMESTAMPTZ(3) NOT NULL,
    "fiscal_year" TEXT,
    "period" TEXT,
    "revenue" DOUBLE PRECISION,
    "cost_of_revenue" DOUBLE PRECISION,
    "gross_profit" DOUBLE PRECISION,
    "research_and_development_expenses" DOUBLE PRECISION,
    "general_and_administrative_expenses" DOUBLE PRECISION,
    "selling_and_marketing_expenses" DOUBLE PRECISION,
    "selling_general_and_administrative_expenses" DOUBLE PRECISION,
    "other_expenses" DOUBLE PRECISION,
    "operating_expenses" DOUBLE PRECISION,
    "cost_and_expenses" DOUBLE PRECISION,
    "net_interest_income" DOUBLE PRECISION,
    "interest_income" DOUBLE PRECISION,
    "interest_expense" DOUBLE PRECISION,
    "depreciation_and_amortization" DOUBLE PRECISION,
    "ebitda" DOUBLE PRECISION,
    "ebit" DOUBLE PRECISION,
    "non_operating_income_excluding_interest" DOUBLE PRECISION,
    "operating_income" DOUBLE PRECISION,
    "total_other_income_expenses_net" DOUBLE PRECISION,
    "income_before_tax" DOUBLE PRECISION,
    "income_tax_expense" DOUBLE PRECISION,
    "net_income_from_continuing_operations" DOUBLE PRECISION,
    "net_income_from_discontinued_operations" DOUBLE PRECISION,
    "other_adjustments_to_net_income" DOUBLE PRECISION,
    "netIncome" DOUBLE PRECISION,
    "net_income_deductions" DOUBLE PRECISION,
    "bottom_line_net_income" DOUBLE PRECISION,
    "eps" DOUBLE PRECISION,
    "eps_diluted" DOUBLE PRECISION,
    "weighted_average_shs_out" DOUBLE PRECISION,
    "weighted_average_shs_out_dil" DOUBLE PRECISION,
    "ticker_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "income_statements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."balance_sheets" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "reported_currency" TEXT NOT NULL,
    "cik" TEXT,
    "filing_date" TIMESTAMPTZ(3) NOT NULL,
    "accepted_date" TIMESTAMPTZ(3) NOT NULL,
    "fiscal_year" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "cash_and_cash_equivalents" DOUBLE PRECISION,
    "short_term_investments" DOUBLE PRECISION,
    "cash_and_short_term_investments" DOUBLE PRECISION,
    "net_receivables" DOUBLE PRECISION,
    "accounts_receivables" DOUBLE PRECISION,
    "other_receivables" DOUBLE PRECISION,
    "inventory" DOUBLE PRECISION,
    "prepaids" DOUBLE PRECISION,
    "other_current_assets" DOUBLE PRECISION,
    "total_current_assets" DOUBLE PRECISION,
    "property_plant_equipment_net" DOUBLE PRECISION,
    "goodwill" DOUBLE PRECISION,
    "intangible_assets" DOUBLE PRECISION,
    "goodwill_and_intangible_assets" DOUBLE PRECISION,
    "long_term_investments" DOUBLE PRECISION,
    "tax_assets" DOUBLE PRECISION,
    "other_non_current_assets" DOUBLE PRECISION,
    "total_non_current_assets" DOUBLE PRECISION,
    "other_assets" DOUBLE PRECISION,
    "total_assets" DOUBLE PRECISION,
    "total_payables" DOUBLE PRECISION,
    "account_payables" DOUBLE PRECISION,
    "other_payables" DOUBLE PRECISION,
    "accrued_expenses" DOUBLE PRECISION,
    "short_term_debt" DOUBLE PRECISION,
    "capital_lease_obligations_current" DOUBLE PRECISION,
    "tax_payables" DOUBLE PRECISION,
    "deferred_revenue" DOUBLE PRECISION,
    "other_current_liabilities" DOUBLE PRECISION,
    "total_current_liabilities" DOUBLE PRECISION,
    "long_term_debt" DOUBLE PRECISION,
    "deferred_revenue_non_current" DOUBLE PRECISION,
    "deferred_tax_liabilities_non_current" DOUBLE PRECISION,
    "other_non_current_liabilities" DOUBLE PRECISION,
    "total_non_current_liabilities" DOUBLE PRECISION,
    "other_liabilities" DOUBLE PRECISION,
    "capital_lease_obligations" DOUBLE PRECISION,
    "total_liabilities" DOUBLE PRECISION,
    "treasury_stock" DOUBLE PRECISION,
    "preferred_stock" DOUBLE PRECISION,
    "common_stock" DOUBLE PRECISION,
    "retained_earnings" DOUBLE PRECISION,
    "additional_paid_in_capital" DOUBLE PRECISION,
    "accumulated_other_comprehensive_income_loss" DOUBLE PRECISION,
    "other_total_stockholders_equity" DOUBLE PRECISION,
    "total_stockholders_equity" DOUBLE PRECISION,
    "total_equity" DOUBLE PRECISION,
    "minority_interest" DOUBLE PRECISION,
    "total_liabilities_and_total_equity" DOUBLE PRECISION,
    "total_investments" DOUBLE PRECISION,
    "total_debt" DOUBLE PRECISION,
    "net_debt" DOUBLE PRECISION,
    "capital_lease_obligations_non_current" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "ticker_id" UUID NOT NULL,

    CONSTRAINT "balance_sheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."industry_market_size_advance_declines" (
    "id" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "advance_number" INTEGER NOT NULL,
    "decline_number" INTEGER NOT NULL,
    "advance_percent" DOUBLE PRECISION,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "capital" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "industry_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "industry_market_size_advance_declines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sector_market_size_advance_decline" (
    "id" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "advance_number" INTEGER NOT NULL,
    "decline_number" INTEGER NOT NULL,
    "capital" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "sector_id" UUID NOT NULL,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "advance_percent" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "sector_market_size_advance_decline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."prices" (
    "id" UUID NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "vwap" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "change_percent" DOUBLE PRECISION,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "ticker_id" UUID,
    "sector_etf_id" UUID,
    "index_id" UUID,
    "instrument_type" "public"."InstrumentType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tickers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "is_actively_trading" BOOLEAN NOT NULL,
    "country" TEXT NOT NULL,
    "sector_id" UUID NOT NULL,
    "exchange_id" UUID NOT NULL,
    "industry_id" UUID NOT NULL,
    "market_cap" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tickers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sector_etfs" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "sector_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "sector_etfs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."indexes" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "indexes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CustomIndex" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "CustomIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rs_rankings" (
    "id" UUID NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "rank" DOUBLE PRECISION NOT NULL,
    "ticker_id" UUID NOT NULL,
    "weighted_score" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "rs_rankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chart_patterns" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isBull" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chart_patterns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chart_pattern_prices" (
    "id" UUID NOT NULL,
    "chart_pattern_id" UUID NOT NULL,
    "df_start" TIMESTAMPTZ(3) NOT NULL,
    "df_end" TIMESTAMPTZ(3) NOT NULL,
    "start" TIMESTAMPTZ(3) NOT NULL,
    "end" TIMESTAMPTZ(3) NOT NULL,
    "points" JSONB NOT NULL,
    "ticker_id" UUID NOT NULL,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chart_pattern_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ticker_prices" (
    "id" UUID NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "vwap" DOUBLE PRECISION,
    "change" DOUBLE PRECISION,
    "change_percent" DOUBLE PRECISION,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "ticker_id" UUID,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ticker_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sector_ETF_prices" (
    "id" UUID NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "vwap" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "change_percent" DOUBLE PRECISION,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "sector_ETF_id" UUID NOT NULL,

    CONSTRAINT "sector_ETF_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."index_prices" (
    "id" UUID NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "vwap" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "change_percent" DOUBLE PRECISION,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "index_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "index_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."custom_index_prices" (
    "id" UUID NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "vwap" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "change_percent" DOUBLE PRECISION,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "custom_index_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "custom_index_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."instrument_search" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instrument_type" "public"."InstrumentType" NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "search_vector" tsvector,

    CONSTRAINT "instrument_search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."volume_spikes" (
    "id" UUID NOT NULL,
    "ticker_id" UUID NOT NULL,
    "window" INTEGER NOT NULL,
    "threshold_volume" DOUBLE PRECISION NOT NULL,
    "threshold_price_percent" DOUBLE PRECISION NOT NULL,
    "final_volume" DOUBLE PRECISION NOT NULL,
    "final_price_percent" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "volume_spikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."new_highs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "time_frame" "public"."TimeFrame" NOT NULL,
    "window" INTEGER NOT NULL,
    "new_high_number" INTEGER NOT NULL,
    "new_low_number" INTEGER NOT NULL,
    "diff" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "new_highs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sectors_name_key" ON "public"."sectors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "industries_name_key" ON "public"."industries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "exchanges_symbol_key" ON "public"."exchanges"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "income_statements_period_ticker_id_date_key" ON "public"."income_statements"("period", "ticker_id", "date");

-- CreateIndex
CREATE INDEX "balance_sheets_ticker_id_period_idx" ON "public"."balance_sheets"("ticker_id", "period");

-- CreateIndex
CREATE UNIQUE INDEX "balance_sheets_ticker_id_date_period_key" ON "public"."balance_sheets"("ticker_id", "date", "period");

-- CreateIndex
CREATE INDEX "industry_market_size_advance_declines_date_idx" ON "public"."industry_market_size_advance_declines"("date");

-- CreateIndex
CREATE UNIQUE INDEX "industry_market_size_advance_declines_industry_id_date_capi_key" ON "public"."industry_market_size_advance_declines"("industry_id", "date", "capital");

-- CreateIndex
CREATE UNIQUE INDEX "sector_market_size_advance_decline_sector_id_date_capital_t_key" ON "public"."sector_market_size_advance_decline"("sector_id", "date", "capital", "time_frame");

-- CreateIndex
CREATE INDEX "prices_date_idx" ON "public"."prices"("date");

-- CreateIndex
CREATE INDEX "prices_time_frame_idx" ON "public"."prices"("time_frame");

-- CreateIndex
CREATE INDEX "prices_ticker_id_idx" ON "public"."prices"("ticker_id");

-- CreateIndex
CREATE INDEX "prices_sector_etf_id_idx" ON "public"."prices"("sector_etf_id");

-- CreateIndex
CREATE INDEX "prices_index_id_idx" ON "public"."prices"("index_id");

-- CreateIndex
CREATE INDEX "prices_instrument_type_idx" ON "public"."prices"("instrument_type");

-- CreateIndex
CREATE UNIQUE INDEX "tickerId_date_timeFrame_unique" ON "public"."prices"("ticker_id", "date", "time_frame");

-- CreateIndex
CREATE UNIQUE INDEX "sectorETFId_date_timeFrame_unique" ON "public"."prices"("sector_etf_id", "date", "time_frame");

-- CreateIndex
CREATE UNIQUE INDEX "indexId_date_timeFrame_unique" ON "public"."prices"("index_id", "date", "time_frame");

-- CreateIndex
CREATE UNIQUE INDEX "tickers_symbol_key" ON "public"."tickers"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "sector_etfs_symbol_key" ON "public"."sector_etfs"("symbol");

-- CreateIndex
CREATE INDEX "rs_rankings_date_idx" ON "public"."rs_rankings"("date");

-- CreateIndex
CREATE UNIQUE INDEX "rs_rankings_ticker_id_date_key" ON "public"."rs_rankings"("ticker_id", "date");

-- CreateIndex
CREATE INDEX "chart_pattern_prices_chart_pattern_id_idx" ON "public"."chart_pattern_prices"("chart_pattern_id");

-- CreateIndex
CREATE UNIQUE INDEX "chart_pattern_prices_df_start_df_end_chart_pattern_id_ticke_key" ON "public"."chart_pattern_prices"("df_start", "df_end", "chart_pattern_id", "ticker_id");

-- CreateIndex
CREATE INDEX "ticker_prices_date_idx" ON "public"."ticker_prices"("date");

-- CreateIndex
CREATE INDEX "ticker_prices_time_frame_idx" ON "public"."ticker_prices"("time_frame");

-- CreateIndex
CREATE INDEX "ticker_prices_ticker_id_idx" ON "public"."ticker_prices"("ticker_id");

-- CreateIndex
CREATE UNIQUE INDEX "ticker_price_tickerId_date_timeFrame_unique" ON "public"."ticker_prices"("ticker_id", "date", "time_frame");

-- CreateIndex
CREATE INDEX "sector_ETF_prices_date_idx" ON "public"."sector_ETF_prices"("date");

-- CreateIndex
CREATE INDEX "sector_ETF_prices_time_frame_idx" ON "public"."sector_ETF_prices"("time_frame");

-- CreateIndex
CREATE UNIQUE INDEX "ETF_id_date_timeFrame_unique" ON "public"."sector_ETF_prices"("sector_ETF_id", "date", "time_frame");

-- CreateIndex
CREATE INDEX "index_prices_date_idx" ON "public"."index_prices"("date");

-- CreateIndex
CREATE INDEX "index_prices_time_frame_idx" ON "public"."index_prices"("time_frame");

-- CreateIndex
CREATE UNIQUE INDEX "index_id_date_timeFrame_unique" ON "public"."index_prices"("index_id", "date", "time_frame");

-- CreateIndex
CREATE INDEX "custom_index_prices_date_idx" ON "public"."custom_index_prices"("date");

-- CreateIndex
CREATE INDEX "custom_index_prices_time_frame_idx" ON "public"."custom_index_prices"("time_frame");

-- CreateIndex
CREATE UNIQUE INDEX "custom_index_id_date_timeFrame_unique" ON "public"."custom_index_prices"("custom_index_id", "date", "time_frame");

-- CreateIndex
CREATE INDEX "instrument_search_instrument_type_idx" ON "public"."instrument_search"("instrument_type");

-- CreateIndex
CREATE INDEX "instrument_search_symbol_idx" ON "public"."instrument_search"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "instrument_search_symbol_instrument_type_key" ON "public"."instrument_search"("symbol", "instrument_type");

-- CreateIndex
CREATE UNIQUE INDEX "volume_spikes_ticker_id_date_window_key" ON "public"."volume_spikes"("ticker_id", "date", "window");

-- CreateIndex
CREATE INDEX "new_highs_date_idx" ON "public"."new_highs"("date");

-- CreateIndex
CREATE INDEX "new_highs_time_frame_idx" ON "public"."new_highs"("time_frame");

-- CreateIndex
CREATE UNIQUE INDEX "new_highs_date_time_frame_window_key" ON "public"."new_highs"("date", "time_frame", "window");

-- AddForeignKey
ALTER TABLE "public"."industries" ADD CONSTRAINT "industries_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "public"."sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."income_statements" ADD CONSTRAINT "income_statements_ticker_id_fkey" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."balance_sheets" ADD CONSTRAINT "balance_sheets_ticker_id_fkey" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."industry_market_size_advance_declines" ADD CONSTRAINT "industry_market_size_advance_declines_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "public"."industries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sector_market_size_advance_decline" ADD CONSTRAINT "sector_market_size_advance_decline_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "public"."sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prices" ADD CONSTRAINT "prices_index_id_fkey" FOREIGN KEY ("index_id") REFERENCES "public"."indexes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."prices" ADD CONSTRAINT "prices_sector_etf_id_fkey" FOREIGN KEY ("sector_etf_id") REFERENCES "public"."sector_etfs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."prices" ADD CONSTRAINT "prices_ticker_id_fkey" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tickers" ADD CONSTRAINT "tickers_exchange_id_fkey" FOREIGN KEY ("exchange_id") REFERENCES "public"."exchanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickers" ADD CONSTRAINT "tickers_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "public"."industries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickers" ADD CONSTRAINT "tickers_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "public"."sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sector_etfs" ADD CONSTRAINT "sector_etfs_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "public"."sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rs_rankings" ADD CONSTRAINT "rs_rankings_ticker_id_fkey" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chart_pattern_prices" ADD CONSTRAINT "chart_pattern_prices_chart_pattern_id_fkey" FOREIGN KEY ("chart_pattern_id") REFERENCES "public"."chart_patterns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chart_pattern_prices" ADD CONSTRAINT "chart_pattern_prices_ticker_id_fkey" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ticker_prices" ADD CONSTRAINT "ticker_prices_ticker_id_fkey" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sector_ETF_prices" ADD CONSTRAINT "sector_ETF_prices_sector_ETF_id_fkey" FOREIGN KEY ("sector_ETF_id") REFERENCES "public"."sector_etfs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."index_prices" ADD CONSTRAINT "index_prices_index_id_fkey" FOREIGN KEY ("index_id") REFERENCES "public"."indexes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."custom_index_prices" ADD CONSTRAINT "custom_index_prices_custom_index_id_fkey" FOREIGN KEY ("custom_index_id") REFERENCES "public"."CustomIndex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."volume_spikes" ADD CONSTRAINT "volume_spikes_ticker_id_fkey" FOREIGN KEY ("ticker_id") REFERENCES "public"."tickers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
