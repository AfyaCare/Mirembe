SELECT
    concept_full_name AS Ugonjwa,
    COALESCE(c.col1, 0) AS '1 month<,ME',
    COALESCE(c.col2, 0) AS '1 month<,KE',
    COALESCE(c.colSum1, 0) AS 'Jumla',
    COALESCE(c.col3, 0) AS '1 month><1 year,ME',
    COALESCE(c.col4, 0) AS '1 month><1 year,KE',
    COALESCE(c.colSum2, 0) AS 'Jumla',
    COALESCE(c.col5, 0) AS '1 year><5 years,ME',
    COALESCE(c.col6, 0) AS '1 year><5 years,KE',
    COALESCE(c.colSum3, 0) AS 'Jumla',
    COALESCE(c.col7, 0) AS '5 year><60 years,ME',
    COALESCE(c.col8, 0) AS '5 year><60 years,KE',
    COALESCE(c.colSum4, 0) AS 'Jumla',
    COALESCE(c.col9, 0) AS 'over 60 years,ME',
    COALESCE(c.col10, 0) AS 'over <60 years,KE',
    COALESCE(c.colSum5, 0) AS 'Jumla',
    COALESCE(c.total, 0) AS 'Jumla Kuu'
FROM
    openmrs.diagnosis_concept_view dcv
        LEFT JOIN
    (SELECT
        cn.name,
            c.concept_id AS id,
            SUM(IF(ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE())) < 1
                AND p.gender = 'M', 1, 0)) AS col1,
            SUM(IF(ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE())) < 1
                AND p.gender = 'F', 1, 0)) AS col2,
            SUM(IF(ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE())) < 1, 1, 0)) AS colSum1,
            SUM(IF(ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE())) < 12
                AND (ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE()))) > 1
                AND p.gender = 'M', 1, 0)) AS col3,
            SUM(IF(ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE())) < 12
                AND (ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE()))) > 1
                AND p.gender = 'F', 1, 0)) AS col4,
            SUM(IF(ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE())) < 12
                AND (ROUND(TIMESTAMPDIFF(MONTH, birthdate, CURDATE()))) > 1, 1, 0)) AS colSum2,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) < 5
                AND ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 1
                AND p.gender = 'M', 1, 0)) AS col5,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) < 5
                AND ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 1
                AND p.gender = 'F', 1, 0)) AS col6,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) < 5
                AND ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 1, 1, 0)) AS colSum3,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) < 60
                AND ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 5
                AND p.gender = 'M', 1, 0)) AS col7,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) < 60
                AND ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 5
                AND p.gender = 'F', 1, 0)) AS col8,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) < 60
                AND ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 5, 1, 0)) AS colSum4,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 60
                AND p.gender = 'M', 1, 0)) AS col9,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 60
                AND p.gender = 'F', 1, 0)) AS col10,
            SUM(IF(ROUND(FLOOR(DATEDIFF(CURDATE(), p.birthdate) / 365.25) - 0.4999) > 60, 1, 0)) AS colSum5,
            COUNT(cn.name) AS total
    FROM
        visit v
    JOIN person_name pn ON v.patient_id = pn.person_id
        AND pn.voided = 0
        AND v.voided = 0
    JOIN patient_identifier pi ON v.patient_id = pi.patient_id
    JOIN patient_identifier_type pit ON pi.identifier_type = pit.patient_identifier_type_id
    JOIN person p ON v.patient_id = p.person_id
    JOIN encounter e ON v.visit_id = e.visit_id
    JOIN obs o ON e.encounter_id = o.encounter_id
    JOIN concept c ON o.value_coded = c.concept_id
        AND c.concept_id IN (SELECT
            concept_id
        FROM
            openmrs.diagnosis_concept_view)
    JOIN concept_name cn ON cn.concept_id = c.concept_id
    WHERE
         v.date_created between '#startDate#' and '#endDate#' and v.visit_type_id=3
    GROUP BY cn.name
    ORDER BY cn.name DESC) AS c ON c.id = dcv.concept_id;