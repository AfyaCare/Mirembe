SELECT pi.identifier as PatientID,
       v.date_started as  `Tarehe`,
       pr.name as 'Jina la Mshahuri Nasaha',
       MAX(IF(conp.name = 3788, conp.value, NULL))
       AS
       `Namba Ya Mteja`,
         MAX( IF(conp.name = 3789, conp.value, NULL))
       AS
       `Namba Ya Mwenzi`,
          MAX(IF(conp.name = 3790, conp.value, NULL))
       AS
       `Aina ya Hudhurio`,
              p.gender as 'Jinsia',
              Floor(Datediff(Curdate(), p.birthdate) / 365)
       AS 'Umri wa Mteja',
        pa.address3 as 'Wilaya/Kata Anayotoka',
         pea.value as 'Hali ya Ndoa',
          MAX(IF(conp.name = 3791, conp.value, NULL))
       AS
       `Hali Ya Ujauzito` ,
          MAX(IF(conp.name = 3793, conp.value, NULL))
       AS
       `Aina Ya Ushauri Nasaha`,
          MAX(IF(conp.name = 3794, conp.value, NULL))
       AS
       `Amekubali Kupima Hali ya uambukizi wa VVU`,
       MAX(IF(conp.name = 3794, conp.value, NULL))
       AS
       `Ushauri Nasaha baada ya Kupima na Kupata Majibu`,
         MAX( IF(conp.name = 5094, conp.value, NULL))
       AS
       `Majibu ya hali ya uambukizi wa VVU`,
         MAX( IF(conp.name = 3796, conp.value, NULL))
       AS
       `Kushirikisha Majibu`,
         MAX( IF(conp.name = 3797, conp.value, NULL))
       AS
       `Kuchunguza Kifua Kikuu`,
          MAX(IF(conp.name = 3798, conp.value, NULL))
       AS
       `Hali ya Uambukizi wa Kifua Kikuu`,
          MAX(IF(conp.name = 3799, conp.value, NULL))
       AS
       `Rufaa ya Kwenda`,
         MAX( IF(conp.name = 3800, conp.value, NULL))
       AS
       `Amepewa Kondomu`,
         MAX( IF(conp.name = 3801, conp.value, NULL))
       AS
       `Maoni`
FROM   visit v
       JOIN person_name pn
         ON v.patient_id = pn.person_id  and pn.person_id in (select person_id from obs where concept_id=3787)
            AND pn.voided = 0
       JOIN patient_identifier pi
         ON v.patient_id = pi.patient_id
       JOIN encounter en
         ON en.visit_id = v.visit_id  and en.encounter_id in (select encounter_id from obs where concept_id=3787)
       JOIN patient_identifier_type pit
         ON pi.identifier_type = pit.patient_identifier_type_id
       JOIN global_property gp
         ON gp.property = 'bahmni.primaryIdentifierType'
            AND gp.property_value = pit.uuid
       JOIN person p
         ON p.person_id = v.patient_id
         JOIN encounter_provider ep
         ON ep.encounter_id=en.encounter_id
         JOIN provider pr
         ON pr.provider_id=ep.provider_id
         JOIN person_address pa
         ON pa.person_id=p.person_id
       LEFT JOIN (SELECT cv.concept_id                             AS
                         name,
                         o.obs_group_id,
                         o.encounter_id                                   AS
                                                              encounter_id,
                          Coalesce( answer_concept.concept_full_name,
                         o.value_datetime, o.value_numeric, o.value_text) AS
                         value
                  FROM   obs o

                         JOIN concept_view cv
                           ON cv.concept_id = o.concept_id
                              AND o.voided = 0
                         LEFT JOIN concept_view answer_concept
                                ON answer_concept.concept_id = o.value_coded
                  WHERE  cv.concept_id IN (
                         3788,
                         3789,
					     3790,
						 3791,
                         3792,
                         3793,
                         3794,
                         3795,
                         3796,
                         3797,
                         3798,
                         3799,
                         3800,
                         3801,
                         5094,
                         6325)
                       ) conp
              ON conp.encounter_id = en.encounter_id
       LEFT OUTER JOIN visit_attribute va
                    ON va.visit_id = v.visit_id
	LEFT OUTER JOIN person_attribute pea
         on pea.person_id=p.person_id and pea.person_attribute_type_id=37
         where CAST(v.date_started AS DATE) BETWEEN '#startDate#' AND '#endDate#'
             group by v.date_started
order by  v.date_started  desc
