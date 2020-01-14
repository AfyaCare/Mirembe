SELECT pi.identifier as patient_id,concat(pn.given_name,' ',ifnull(pn.middle_name,''),' ',  ifnull(pn.family_name,'')) as full_name, qty, 
cn.name as service_name, item_type as service_type,
 amount , (qty * amount) as total_amount, date_orderTed 
 FROM openmrs.wh_order_line wo
inner join person_name pn on pn.person_id = wo.patient_id
inner join patient_identifier pi on pi.patient_id = wo.patient_id
inner join concept_name cn on cn.concept_id = item_id
order by full_name, service_type,church_name LIMIT 100;                                                                                                                                                                                                        ,