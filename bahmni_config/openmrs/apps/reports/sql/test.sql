SELECT 
    'Cumulative number of persons ever enrolled in care at this facility at
    beginning of the reporting quarter' AS 'indicator',
    COUNT(*) AS 'Total',
    'M' as Gender,
    IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        *
    FROM
        ctc_reg_card
    WHERE
        EnrollmentDate < '#startDate#'  AND Gender = 'M') AS tperiod 
        
        UNION ALL
        
        SELECT 
    'Cumulative number of persons ever enrolled in care at this facility at
    beginning of the reporting quarter' AS 'indicator',
    COUNT(*) AS 'Total',
    'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        *
    FROM
        ctc_reg_card
    WHERE
        EnrollmentDate < '#startDate#'  AND Gender = 'F') AS tperiod 
UNION ALL 

SELECT 
    'Number of persons NEWLY enrolled in HIV care at this facility during
    the reporting quarter (EXCLUDE TI)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        *
    FROM
        ctc_reg_card
    WHERE
        TransferIn IS NULL
            AND EnrollmentDate >= '#startDate#'
            AND EnrollmentDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
            UNION ALL 

SELECT 
    'Number of persons NEWLY enrolled in HIV care at this facility during
    the reporting quarter (EXCLUDE TI)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        *
    FROM
        ctc_reg_card
    WHERE
        TransferIn IS NULL
            AND EnrollmentDate >= '#startDate#'
            AND EnrollmentDate <= '#endDate#'
            AND Gender='F') AS tperiod 
            
UNION ALL SELECT 
    'Cumulative number of clients ever enrolled in care at this facility at
    the end of the reporting quarter' AS 'indicator',
    COUNT(*) AS 'Total',
      'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        *
    FROM
        ctc_reg_card
    WHERE
        EnrollmentDate <= '#endDate#'
        AND Gender='M') AS tperiod 
        
        UNION ALL SELECT 
    'Cumulative number of clients ever enrolled in care at this facility at
    the end of the reporting quarter' AS 'indicator',
    COUNT(*) AS 'Total',
      'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        *
    FROM
        ctc_reg_card
    WHERE
        EnrollmentDate <= '#endDate#'
        AND Gender='F') AS tperiod 
        
UNION ALL SELECT 
    'Number of persons who received care during the reporting quarter' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
            
            UNION ALL SELECT 
    'Number of persons who received care during the reporting quarter' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Number of persons who received CPT during the reporting
    quarter (subset of receieved care)' AS 'indicator',
    COUNT(*) AS 'Total',
      'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        OIMedicine = 'Cotrimoxazole'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
            UNION ALL SELECT 
    'Number of persons who received CPT during the reporting
    quarter (subset of receieved care)' AS 'indicator',
    COUNT(*) AS 'Total',
      'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        OIMedicine = 'Cotrimoxazole'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Number of persons screened for TB in the reporting quarter (subset of
    received care)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        TBScreening IS NOT NULL
            AND TBScreening != 'NS = Not Screened'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
            UNION ALL SELECT 
    'Number of persons screened for TB in the reporting quarter (subset of
    received care)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        TBScreening IS NOT NULL
            AND TBScreening != 'NS = Not Screened'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
            
UNION ALL SELECT 
    'Number of persons who started on TB treatment (Pre ART and ART)
    (subset of received care)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID,
            AgeToDate,
            Gender,
            visitStartDate,
            IPTStatus,
            TBRxStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        TBRxStatus = 'Start TB - Start TB Rx'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            and Gender='M') AS tperiod 
            
            
            UNION ALL SELECT 
    'Number of persons who started on TB treatment (Pre ART and ART)
    (subset of received care)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID,
            AgeToDate,
            Gender,
            visitStartDate,
            IPTStatus,
            TBRxStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        TBRxStatus = 'Start TB - Start TB Rx'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
            
UNION ALL SELECT 
    'Number of persons who started on Isoniazid PreventiveTherapy
    (IPT) during the reporting quarter (Pre ART and ART)' AS 'indicator',
    COUNT(*) AS 'Total',
      'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, IPTStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        IPTStatus = 'Start IPT - Start IPT Rx'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
            UNION ALL SELECT 
    'Number of persons who started on Isoniazid PreventiveTherapy
    (IPT) during the reporting quarter (Pre ART and ART)' AS 'indicator',
    COUNT(*) AS 'Total',
      'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, IPTStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        IPTStatus = 'Start IPT - Start IPT Rx'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
            
UNION ALL SELECT 
    'Number of HIV positive clinically malnourished persons identified
    during the quarter (subset of received care)' AS 'indicator',
    COUNT(*) AS 'Total',
        'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, NutritionStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        NutritionStatus IN ('MOD - Moderate Malnourished' , 'MOD - Severely Malnourished', 'OB - Obesity')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 

UNION ALL SELECT 
    'Number of HIV positive clinically malnourished persons identified
    during the quarter (subset of received care)' AS 'indicator',
    COUNT(*) AS 'Total',
        'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, NutritionStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        NutritionStatus IN ('MOD - Moderate Malnourished' , 'MOD - Severely Malnourished', 'OB - Obesity')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
            
UNION ALL SELECT 
    'Number of HIV positive clinically malnourished received therapeutic
    and/or supplementary food (subset of malnourished)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID,
            AgeToDate,
            Gender,
            visitStartDate,
            NutritionSupplement
    FROM
        openmrs.ctc_visit_form
    WHERE
        NutritionSupplement IN ('TF - Therapeutic Food' , 'CTC - SF - Supplemental Food')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 

UNION ALL SELECT 
    'Number of HIV positive clinically malnourished received therapeutic
    and/or supplementary food (subset of malnourished)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID,
            AgeToDate,
            Gender,
            visitStartDate,
            NutritionSupplement
    FROM
        openmrs.ctc_visit_form
    WHERE
        NutritionSupplement IN ('TF - Therapeutic Food' , 'CTC - SF - Supplemental Food')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
            
UNION ALL SELECT 
    'Number of clients enrolled into CARE and not started ARV' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID,
            AgeToDate,
            Gender,
            visitStartDate,
            NutritionSupplement
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus = 'Not started ARV'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
UNION ALL SELECT 
    'Number of clients enrolled into CARE and not started ARV' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID,
            AgeToDate,
            Gender,
            visitStartDate,
            NutritionSupplement
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus = 'Not started ARV'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod          
UNION ALL SELECT 
    'Cumulative number of persons ever started ART at this facility at beginning of the reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
      'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus = 'Start ARV'
            AND visitStartDate < '#startDate#'
            AND Gender='M') AS tperiod 
            
UNION ALL SELECT 
    'Cumulative number of persons ever started ART at this facility at beginning of the reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
      'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus = 'Start ARV'
            AND visitStartDate < '#startDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Persons newly initiated on ART at this facility during the reporting quarter (EXCLUDE TI on ART)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        cvf.CTCID, cvf.AgeToDate, cvf.Gender, cvf.visitStartDate
    FROM
        openmrs.ctc_visit_form cvf
    JOIN ctc_reg_card crc ON crc.CTCID = cvf.CTCID
        AND crc.TransferIn IS NULL
    WHERE
        cvf.ARVStatus = 'Start ARV'
            AND cvf.visitStartDate >= '#startDate#'
            AND cvf.visitStartDate <= '#endDate#'
            AND cvf.Gender='M') AS tperiod 
            
UNION ALL SELECT 
    'Persons newly initiated on ART at this facility during the reporting quarter (EXCLUDE TI on ART)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        cvf.CTCID, cvf.AgeToDate, cvf.Gender, cvf.visitStartDate
    FROM
        openmrs.ctc_visit_form cvf
    JOIN ctc_reg_card crc ON crc.CTCID = cvf.CTCID
        AND crc.TransferIn IS NULL
    WHERE
        cvf.ARVStatus = 'Start ARV'
            AND cvf.visitStartDate >= '#startDate#'
            AND cvf.visitStartDate <= '#endDate#'
            AND cvf.Gender='F') AS tperiod 
            
UNION ALL SELECT 
    'Cumulative number of persons ever started on ART at this facility at the end of the reporting quarter' AS 'indicator',
    COUNT(*) AS 'Total',
      'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus = 'Start ARV'
            AND visitStartDate < '#endDate#') AS tperiod 
            
UNION ALL SELECT 
    'Cumulative number of persons ever started on ART at this facility at the end of the reporting quarter' AS 'indicator',
    COUNT(*) AS 'Total',
      'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus = 'Start ARV'
            AND visitStartDate < '#endDate#'
            AND Gender='M') AS tperiod 
            
UNION ALL SELECT 
    'Number of persons on ART and already enrolled in the program who transferred into facility during the reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        *
    FROM
        ctc_reg_card
    WHERE
        TransferIn IS NOT NULL
            AND EnrollmentDate >= '#startDate#'
            AND EnrollmentDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Cummulative number of clients ever on ART at this facility at the end of this period' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
UNION ALL SELECT 
    'Cummulative number of clients ever on ART at this facility at the end of this period' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
            
UNION ALL SELECT 
    'Number of clients who are on 1st line regimen during reporting period (INCLUDE TI ON ART)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
            
UNION ALL SELECT 
    'Number of clients who are on 1st line regimen during reporting period (INCLUDE TI ON ART)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Number of clients who are on 2nd line regimen during reporting period (INCLUDE TI ON ART)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
    UNION ALL SELECT 
    'Number of clients who are on 2nd line regimen during reporting period (INCLUDE TI ON ART)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod
            
UNION ALL SELECT 
    'Number of clients who are on 3rd line regimen during reporting period (INCLUDE TI ON ART)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
    UNION ALL SELECT 
    'Number of clients who are on 3rd line regimen during reporting period (INCLUDE TI ON ART)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Current number of clients on ART at the end of quater (Total of 1st, 2nd and 3rd line regimen)' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
UNION ALL SELECT 
    'Current number of clients on ART at the end of quater (Total of 1st, 2nd and 3rd line regimen)' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Start ARV' , 'Continue ARV', 'Restart')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Total number of HVL tests < 1000 copies/ml during reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ViralLoad < 1000
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
UNION ALL SELECT 
    'Total number of HVL tests < 1000 copies/ml during reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ViralLoad < 1000
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Total number of HVL tests < 50 copies/ml during reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ViralLoad < 50
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
UNION ALL SELECT 
    'Total number of HVL tests < 50 copies/ml during reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ViralLoad < 50
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Total number of HVL tests >= 1000 copies/ml during reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ViralLoad >= 1000
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
UNION ALL SELECT 
    'Total number of HVL tests >= 1000 copies/ml during reporting period' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT 
        CTCID, AgeToDate, Gender, visitStartDate
    FROM
        openmrs.ctc_visit_form
    WHERE
        ViralLoad >= 1000
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Stopped ART' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, ARVStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        ARVStatus IN ('Stop')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#') AS tperiod 
UNION ALL SELECT 
    'Transferred Out' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, FollowUpStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        FollowUpStatus = 'TO - Transfer out'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
UNION ALL SELECT 
    'Transferred Out' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, FollowUpStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        FollowUpStatus = 'TO - Transfer out'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Death' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, FollowUpStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        FollowUpStatus = 'Dead - Patient Died'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
            
UNION ALL SELECT 
    'Death' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, FollowUpStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        FollowUpStatus = 'Dead - Patient Died'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Lost to Follow Up/ Unkown' AS 'indicator',
    COUNT(*) AS 'Total',
       'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, FollowUpStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        FollowUpStatus = 'LTF - Lost to Follow up'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod 
UNION ALL SELECT 
    'Lost to Follow Up/ Unkown' AS 'indicator',
    COUNT(*) AS 'Total',
       'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, FollowUpStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        FollowUpStatus = 'LTF - Lost to Follow up'
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod 
UNION ALL SELECT 
    'Total' AS 'indicator',
    COUNT(*) AS 'Total',
      'M' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, FollowUpStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        (FollowUpStatus IN ('LTF - Lost to Follow up' , 'Dead - Patient Died', 'TO - Transfer out')
            OR ARVStatus = 'Stop')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='M') AS tperiod
            
            
    UNION ALL SELECT 
    'Total' AS 'indicator',
    COUNT(*) AS 'Total',
      'F' as Gender,
   IFNULL(SUM(IF(tperiod.AgeToDate < 1
                ,1,
                0)),
            0) AS '<1 Year',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 1
                    AND tperiod.AgeToDate <= 4
               , 1,
                0)),
            0) AS '1-4 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 5
                    AND tperiod.AgeToDate <= 14
                ,1,
                0)),
            0) AS '5-14 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 15
                    AND tperiod.AgeToDate <= 19
                ,1,
                0)),
            0) AS '15-19 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 20
                    AND tperiod.AgeToDate <= 24
                ,1,
                0)),
            0) AS '20 - 24 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 25
                    AND tperiod.AgeToDate <= 49
                ,1,
                0)),
            0) AS '25 - 49 Years',
    IFNULL(SUM(IF(tperiod.AgeToDate >= 50
                ,1,
                0)),
            0) AS '>= 50 Years'
FROM
    (SELECT DISTINCT
        CTCID, AgeToDate, Gender, visitStartDate, FollowUpStatus
    FROM
        openmrs.ctc_visit_form
    WHERE
        (FollowUpStatus IN ('LTF - Lost to Follow up' , 'Dead - Patient Died', 'TO - Transfer out')
            OR ARVStatus = 'Stop')
            AND visitStartDate >= '#startDate#'
            AND visitStartDate <= '#endDate#'
            AND Gender='F') AS tperiod