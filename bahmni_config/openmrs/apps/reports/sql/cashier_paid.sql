select  concat(pn.given_name,' ',ifnull(pn.middle_name,''),' ', ifnull(pn.family_name,'')) as name,
order_id, date_ordered, date_payed, discount, total_amount
from wh_order_sumUp wo
 inner join person_name pn on pn.person_id  = wo.patient_id
where wo.date_payed >= '#startDate#' 
 and  wo.date_payed <='#endDate#  23:59:59' 
 and paid_status = 1 and cancelled_statues = 0
 
 UNION
 select  "***** Total Amount *****",
" ", " ", " ", " ", sum(total_amount) as total_amount
from wh_order_sumUp wo
 inner join person_name pn on pn.person_id  = wo.patient_id
where wo.date_payed >= '#startDate#' 
 and  wo.date_payed <='#endDate# 23:59:59' 
 and paid_status = 1 and cancelled_statues = 0