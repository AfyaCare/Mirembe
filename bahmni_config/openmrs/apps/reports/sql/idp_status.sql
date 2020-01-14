SELECT 'Idadi ya vitanda' as 'maelezo', 0 as 'wadi ya wazazi', count(bed_id) as 'IPD' FROM openmrs.bed
union
select 'Idadi ya Waliolazwa' as 'maelezo', 0 as 'wadi ya wazazi', count(visit_id) as 'IPD' from  visit_attribute 
where attribute_type_id = 2 and voided = 0 and value_reference = "Admitted" and
visit_attribute.date_created  between '2018-10-01' and '2018-10-31 23:59:59'
