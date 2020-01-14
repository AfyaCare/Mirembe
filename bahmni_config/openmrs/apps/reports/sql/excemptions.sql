select  concat(pn.given_name,' ',ifnull(pn.middle_name,''),' ', ifnull(pn.family_name,'')) as name,
cn.name as category, order_id, date_ordered, date_payed,total_amount, discount
from wh_order_sumUp wo
 inner join person_name pn on pn.person_id  = wo.patient_id
 inner join concept_name cn on cn.concept_id = discount_id
where wo.date_payed >= '#startDate#' 
 and  wo.date_payed <='#endDate#  23:59:59' 
 and paid_status = 1 and cancelled_statues = 0 and discount_id > 0
 
 UNION
 select  "***** Total Exemption *****",
" ", " ", " ", " "," ", sum(discount) as discount
from wh_order_sumUp wo
 inner join person_name pn on pn.person_id  = wo.patient_id
where wo.date_payed >= '#startDate#' 
 and  wo.date_payed <='#endDate# 23:59:59' 
 and paid_status = 1 and cancelled_statues = 0 
 and discount_id > 0