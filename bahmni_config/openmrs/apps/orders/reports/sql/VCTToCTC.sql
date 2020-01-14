SELECT
       v.date_started as  `Tarehe ya Kuja VCT`,
         MAX(IF(conp.name = 3788, conp.value, NULL))
       AS
       `Namba Ya Mteja VCT`,
	   pr.name as 'Jina la Mshahuri Nasaha',
      pp.date_enrolled as 'Tarehe ya Kujiunga CTC',
      ppa.value_reference as 'CTC ID'

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
         join patient_program pp ON pp.patient_id=v.patient_id and pp.program_id=1
         join patient_program_attribute ppa ON ppa.patient_program_id=pp.patient_program_id and ppa.attribute_type_id=1
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
             group by v.date_started
order by  v.date_started  desc
