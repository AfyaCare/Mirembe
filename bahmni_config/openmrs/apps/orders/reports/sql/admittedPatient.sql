
SELECT DISTINCT
    CONCAT(pn.given_name, ' ', pn.family_name) AS 'Patient Name',
    pi.identifier AS 'Patient Identifier',
    b.bed_number as 'Bed Number',
    l.name as 'Ward',
    e.date_created as 'Admitted Date'
FROM
    encounter e
        JOIN
    visit v ON e.visit_id = v.visit_id
        JOIN
    person_name pn ON v.patient_id = pn.person_id
        AND pn.voided = 0
        JOIN
    patient_identifier pi ON v.patient_id = pi.patient_id
        JOIN
    person p ON v.patient_id = p.person_id
        JOIN
    encounter_type et ON et.encounter_type_id = e.encounter_type
        JOIN
    bed_patient_assignment_map bpam ON bpam.patient_id = v.patient_id
        JOIN
    bed b ON b.bed_id = bpam.bed_id and b.status='OCCUPIED'
    JOIN
    bed_location_map blm on blm.bed_id=b.bed_id
    JOIN
    location l on l.location_id=blm.location_id
WHERE
    v.date_stopped IS NULL
        AND et.name = 'ADMISSION'
        AND v.voided = 0
        AND e.patient_id NOT IN (SELECT DISTINCT
            enc.patient_id
        FROM
            encounter enc
                JOIN
            encounter_type ent ON enc.encounter_type = ent.encounter_type_id
        WHERE
            ent.name = 'DISCHARGE'
                AND enc.patient_id = v.patient_id
                AND enc.visit_id = v.visit_id)

                AND e.date_created  between '#startDate#' AND '#endDate#'
ORDER BY e.date_created;