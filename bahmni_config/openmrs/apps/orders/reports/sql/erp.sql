SELECT 
    CASE WHEN care_setting is not NULL THEN care_setting
         ELSE 'N/A'
    END,
    count(distinct partner_id) as "Number of patient"
FROM sale_order
WHERE
    date_order >= '2015-01-01' and date_order <=  '2015-12-31'
    AND sale_order.state != 'cancel'
GROUP BY care_setting
ORDER BY care_setting;