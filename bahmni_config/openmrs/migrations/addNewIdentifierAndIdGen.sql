INSERT INTO idgen_identifier_source (uuid, name, description, identifier_type, creator, date_created)
VALUES (UUID(), 'HFR-ID', 'HFR ID for Tanzania Implementation', 3, 1, NOW());

SELECT id INTO @IdentifierSource FROM idgen_identifier_source WHERE name = 'HFR-ID';
INSERT INTO idgen_seq_id_gen (id, base_character_set, first_identifier_base, prefix)
VALUES (@IdentifierSource, 0123456789, 1, '111531-0-');