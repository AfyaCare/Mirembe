SELECT
    v.date_started AS `Tarehe ya Kuja VCT`,
    MAX(IF(conp.name = 3788, conp.value, NULL)) AS `Namba Ya Mteja VCT`,
    pr.name AS 'Jina la Mshahuri Nasaha',
    CONCAT(pn.given_name, ' ', pn.family_name) AS 'Jina la Mteja',
    p.gender AS Jinsia,
    FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365) AS Umri,
    pad.address2 AS 'Anuani',
    MAX(IF(peat.person_attribute_type_id = 51,
        peat.value,
        NULL)) AS 'Mawasiliano ya Mteja',
    CONCAT(MAX(IF(peat.person_attribute_type_id = 44,
                peat.value,
                NULL)),
            ' (',
            MAX(IF(peat.person_attribute_type_id = 45,
                peat.value,
                NULL)),
            ')') AS 'Ndugu',
    pp.date_enrolled AS 'Tarehe ya Kujiunga CTC',
    ppa.value_reference AS 'CTC ID'
FROM
    visit v
        JOIN
    person_name pn ON v.patient_id = pn.person_id
        AND pn.person_id IN (SELECT
            person_id
        FROM
            obs
        WHERE
            concept_id = 3787)
        AND pn.voided = 0
        JOIN
    person_address pad ON pad.person_id = pn.person_id
        JOIN
    patient_identifier pi ON v.patient_id = pi.patient_id
        JOIN
    encounter en ON en.visit_id = v.visit_id
        AND en.encounter_id IN (SELECT
            encounter_id
        FROM
            obs
        WHERE
            concept_id = 3787)
        JOIN
    patient_identifier_type pit ON pi.identifier_type = pit.patient_identifier_type_id
        JOIN
    global_property gp ON gp.property = 'bahmni.primaryIdentifierType'
        AND gp.property_value = pit.uuid
        JOIN
    person p ON p.person_id = v.patient_id
        JOIN
    encounter_provider ep ON ep.encounter_id = en.encounter_id
        JOIN
    provider pr ON pr.provider_id = ep.provider_id
        JOIN
    person_address pa ON pa.person_id = p.person_id
        LEFT JOIN
    person_attribute peat ON peat.person_id = pn.person_id
        AND peat.person_attribute_type_id IN (51 , 44, 45, 46, 37)
        LEFT JOIN
    patient_program pp ON pp.patient_id = v.patient_id
        AND pp.program_id = 1
        LEFT JOIN
    patient_program_attribute ppa ON ppa.patient_program_id = pp.patient_program_id
        AND ppa.attribute_type_id = 1
        LEFT JOIN
    (SELECT
        cv.concept_id AS name,
            o.obs_group_id,
            o.encounter_id AS encounter_id,
            COALESCE(answer_concept.concept_full_name, o.value_datetime, o.value_numeric, o.value_text) AS value
    FROM
        obs o
    JOIN concept_view cv ON cv.concept_id = o.concept_id
        AND o.voided = 0
    LEFT JOIN concept_view answer_concept ON answer_concept.concept_id = o.value_coded
    WHERE
        cv.concept_id IN (3788 , 3789, 3790, 3791, 3792, 3793, 3794, 3795, 3796, 3797, 3798, 3799, 3800, 3801, 5094, 6325)) conp ON conp.encounter_id = en.encounter_id
        LEFT OUTER JOIN
    visit_attribute va ON va.visit_id = v.visit_id
WHERE
    CAST(v.date_started AS DATE) BETWEEN '#startDate#' AND '#endDate#'
        AND en.encounter_id IN (SELECT
            o.encounter_id
        FROM
            obs o
                JOIN
            concept_view cv ON cv.concept_id = o.concept_id
                AND o.voided = 0
                LEFT JOIN
            concept_view answer_concept ON answer_concept.concept_id = o.value_coded
        WHERE
            o.value_coded = 3816)
GROUP BY v.date_started
ORDER BY v.date_started DESC
