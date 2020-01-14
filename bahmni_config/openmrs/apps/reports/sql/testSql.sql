SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'

       and Gender='M'
UNION ALL
SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'

       and Gender='F'
       UNION ALL
    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate< 1 and Gender='M'
  
UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate< 1 and Gender='F'
       
UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 1 and  AgeToDate<=4  and Gender='M'
       
       UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 1 and  AgeToDate<=4  and Gender='F'
       
              UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 5 and  AgeToDate<=9  and Gender='M'
       
                     UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 5 and  AgeToDate<=9  and Gender='F'
       
       
              UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 10 and  AgeToDate<=14  and Gender='M'  
       
                    UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 10 and  AgeToDate<=14  and Gender='F' 
       
                  UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 20 and  AgeToDate<=24  and Gender='M'  
       
                    UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 20 and  AgeToDate<=24  and Gender='F'  
       
                    UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 25 and  AgeToDate<=49  and Gender='M'  
       
                           UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate>= 25 and  AgeToDate<=49  and Gender='F'  
       
                           UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate> 50 and Gender='M'  
       
                             UNION ALL

    SELECT
   'Cumulative number of persons ever enrolled in care at this facility at
 beginning of the reporting quarter' AS 'indicator',
 1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         EnrollmentDate < '#startDate#'
         and
       AgeToDate> 50 and Gender='F' 
       
       
       UNION ALL

       SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'

       and Gender='M'
UNION ALL
SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'

       and Gender='F'
       UNION ALL
SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate< 1 and Gender='M'
  
UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate< 1 and Gender='F'
       
UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 1 and  AgeToDate<=4  and Gender='M'
       
       UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 1 and  AgeToDate<=4  and Gender='F'
       
              UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 5 and  AgeToDate<=9  and Gender='M'
       
                     UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 5 and  AgeToDate<=9  and Gender='F'
       
       
              UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 10 and  AgeToDate<=14  and Gender='M'  
       
                    UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 10 and  AgeToDate<=14  and Gender='F' 
       
                  UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 20 and  AgeToDate<=24  and Gender='M'  
       
                    UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 20 and  AgeToDate<=24  and Gender='F'  
       
                    UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 25 and  AgeToDate<=49  and Gender='M'  
       
                           UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate>= 25 and  AgeToDate<=49  and Gender='F'  
       
                           UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate> 50 and Gender='M'  
       
                             UNION ALL

SELECT
   'Number of persons NEWLY enrolled in HIV care at this facility during
 the reporting quarter (EXCLUDE TI)' AS 'indicator',
  1 as Value,
 Gender, 
 AgeToDate 
      FROM
         openmrs.ctc_reg_card 
      WHERE
         TransferIn IS NULL 
         AND EnrollmentDate >= '#startDate#' 
         AND EnrollmentDate <= '#endDate#'
         and
       AgeToDate> 50 and Gender='F' 
       
       
       