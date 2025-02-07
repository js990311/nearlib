CREATE EXTENSION pg_bigm;
CREATE INDEX libraries_name_gin ON libraries USING gin (name gin_bigm_ops);
