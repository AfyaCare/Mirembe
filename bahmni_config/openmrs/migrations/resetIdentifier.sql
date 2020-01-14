TRUNCATE idgen_seq_id_gen;
TRUNCATE idgen_log_entry;
DELETE FROM idgen_identifier_source;
ALTER TABLE idgen_identifier_source AUTO_INCREMENT=1;