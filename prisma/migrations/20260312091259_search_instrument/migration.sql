-- This is an empty migration.

CREATE OR REPLACE FUNCTION instrument_search_update_search_vector()
RETURNS trigger AS $$
BEGIN
    NEW.search_vector := 
        to_tsvector('english', 
            coalesce(NEW.symbol, '') || ' ' || 
            coalesce(NEW.name, '') || ' ' || 
            coalesce(NEW.instrument_type::text, '')
        );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Attach BEFORE trigger (runs on INSERT & UPDATE)
DROP TRIGGER IF EXISTS trig_instrument_search_search_vector ON instrument_search;
CREATE TRIGGER trig_instrument_search_search_vector
    BEFORE INSERT OR UPDATE OF symbol, name, instrument_type
    ON instrument_search
    FOR EACH ROW
    EXECUTE FUNCTION instrument_search_update_search_vector();

-- 3. (Very important!) Backfill existing rows
UPDATE instrument_search
SET search_vector = 
    to_tsvector('english', 
        coalesce(symbol, '') || ' ' || 
        coalesce(name, '') || ' ' || 
        coalesce(instrument_type::text, '')
    )
WHERE search_vector IS NULL;   -- or just run it on everything