
SELECT DISTINCT
    CONCAT(pn.given_name, ' ', pn.family_name) AS 'Patient Name',
    pi.identifier AS 'Patient Identifier',
    e.date_created as 'Discharge Date'
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
WHERE
    v.date_stopped IS NULL
        AND et.name = 'DISCHARGE'
        AND v.voided = 0
                AND e.date_created  between '#startDate#' and '#endDate#'
ORDER BY e.date_created;