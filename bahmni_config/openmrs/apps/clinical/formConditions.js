Bahmni.ConceptSet.FormConditions.rules = {
    'Systolic Data': function(formName, formFieldValues, patient) {

        var conditions = {
            show: [],
            hide: []
        };
        if (patient['gender'] == 'F' ) {
            conditions.show.push("Posture")
        } else {
            conditions.hide.push("Posture")
        }

        return conditions;
    },
      'HTC - Hali ya Ujauzito': function(formName, formFieldValues, patient) {
            var conditions = {
                show: [],
                hide: []
            };
            var haliYaUjauzito = "HTC - Hali ya Ujauzito";
           console.log("Circular");
            if (patient['gender'] == 'F' && patient['age'] > 10) {
                conditions.show.push(haliYaUjauzito);
            } else {
                conditions.hide.push(haliYaUjauzito);
            }

            return conditions;
        },
       'Regista ya Huduma ya Upimaji na Ushauri': function(formName, formFieldValues, patient) {

            var conditions = {
                show: [],
                hide: []
            };
            console.log("Here");
            if (patient['gender'] == 'F' && patient['age'] > 10) {
                conditions.show.push("HTC - Hali ya Ujauzito")
            } else {
                conditions.hide.push("HTC - Hali ya Ujauzito")
            }

            return conditions;
        },
		'Patient Type': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var patientCategory = formFieldValues['Patient Type'];
        var payCat = 'Payment Category';

        if (patientCategory == "DIAGNOSTIC PATIENT") {
            conditions.show.push(payCat);
        } 
		else if (patientCategory == "GENERAL OPD") {
            conditions.show.push(payCat);
        } 
		else if (patientCategory == "CTC PATIENT") {
            conditions.show.push(payCat);
        } 
		else {
            conditions.hide.push(payCat);
        }
        return conditions;
    },
    'Payment Category': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var paymentCategory = formFieldValues['Payment Category'];
        var insuranceID = 'Insurance ID';
        var InsuranceType = 'Insurance Type';
        var cashScheme = 'Cash scheme';

        if (paymentCategory == "Insurance") {
            conditions.show.push(insuranceID);
            conditions.show.push(InsuranceType);
            conditions.hide.push(cashScheme);

        } else if(paymentCategory == "Cash") {
            conditions.hide.push(insuranceID);
            conditions.hide.push(InsuranceType);
            conditions.show.push(cashScheme);
        }
        else{
            conditions.hide.push(insuranceID);
            conditions.hide.push(InsuranceType);
            conditions.hide.push(cashScheme);
        }
        return conditions;
    },
    'ANC - Mimba ya ngapi': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['ANC - Mimba ya ngapi'];
        var variable = 'ANC - Amezaa mara ngapi';
        var variable2 = 'ANC - Watoto walio hai';
        var variable3 = 'ANC - Mimba zilizoharibika';
        console.log(other);
        if (other > 1) {
            conditions.show.push(variable);
            conditions.show.push(variable2);
            conditions.show.push(variable3);
        } else {
            conditions.hide.push(variable);
            conditions.hide.push(variable2);
            conditions.hide.push(variable3);
        }
        return conditions;
    },



    'ANC - Chupa imepasuka(Ndio/Hapana)': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['ANC - Chupa imepasuka(Ndio/Hapana)'];
        var variable = 'ANC - Chupa imepasuka(tarehe)';
        console.log(other);
        if (other == 'ANC - Ndiyo') {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions;
    },

    'ANC - Njia ya kujifungua': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['ANC - Njia ya kujifungua'];
        var variable = 'ANC - Kama amepasuliwa: Sababu ya kupasuliwa';
        console.log(other);
        if (other == 'ANC - Caesarian section') {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions;
    },

    'ANC - Msamba': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['ANC - Msamba'];
        var variable = 'ANC - Maelezo ya aliyeshona msamba';
        console.log(other);
        if (other == 'ANC - Ulichanwa (Episiotomy)') {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions;
    },

    'ANC - PMTCT/ART': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['ANC - PMTCT/ART'];
        var variable1 = 'ANC - Dawa: (ART)';
        var variable2 = 'ANC - Uhusiano na huduma ya CTC';
        var variable3 = 'ANC - Ushauri juu ya lishe ya mtoto';
        var variable4 = 'ANC - Ufuasi (Adhere)';
        console.log(other);
        if (other == 'ANC - 1') {
            conditions.show.push(variable1);
            conditions.show.push(variable2);
            conditions.show.push(variable3);
            conditions.show.push(variable4);
        } else {
            conditions.hide.push(variable1);
            conditions.hide.push(variable2);
            conditions.hide.push(variable3);
            conditions.hide.push(variable4);
        }
        return conditions;
    },

    'Tests and Examinations': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var cd4Percentage = "CTC - CD4 Percentage";
        var cd4Count = "CTC - CD4 Count"
        if (patient['age'] > 15) {
            conditions.show.push(cd4Count);
            conditions.hide.push(cd4Percentage);

        } else {
            conditions.show.push(cd4Percentage);
            conditions.hide.push(cd4Count);


        }

        return conditions;
    },



    'HIV Vitals': function(formName, formFieldValues, patient) { //'Chief Complaint Data' concept when edited, triggers this function
        var conditions = {
            show: [],
            hide: []
        };
        var height = formFieldValues['HEIGHT'];
        var variable = "HEIGHT";
        if (patient['age'] > 15) {

            conditions.hide.push(variable)
        } else {
            conditions.show.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'Patient refered from': function(formName, formFieldValues, patient) { //'Chief Complaint Data' concept when edited, triggers this function
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['Patient refered from'];
        var variable = "Other Referred from";
        if (other == "Patient refered from, Other") {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'Patient Joined Community Support Organisation': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var name = "Name of Community Support Organisation";
        var conditionConcept = formFieldValues['Patient Joined Community Support Organisation'];
        if (conditionConcept) {
            conditions.show.push(name)
        } else {
            conditions.hide.push(name)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'Patient Referred From': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = "Patient Referred From - Other Specify";
        var conditionConcept = formFieldValues['Patient Referred From'];
        if (conditionConcept == "Patient Referred From - Other") {
            conditions.show.push(other)
        } else {
            conditions.hide.push(other)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },




    'ANC, HIV Testing': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = "ANC, HIV Test Date";
        var HIVTestResult = "ANC, HIV Test Result";
        var conditionConcept = formFieldValues['ANC, HIV Testing'];
        if (conditionConcept) {
            conditions.show.push(other)
        } else {
            conditions.hide.push(HIVTestResult)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },



    'HTC, Pregnancy Status': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var edd = "HCT, EDD Date";
        var anc = "HCT, ANC Number";
        var family_plan = "Family Planning Template";
        var conditionConcept = formFieldValues['HTC, Pregnancy Status'];
        if (conditionConcept == "Yes") {
            conditions.show.push(edd)
            conditions.show.push(anc)
            conditions.hide.push(family_plan)

        } else {
            conditions.hide.push(edd)
            conditions.hide.push(anc)
            conditions.show.push(family_plan)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'ART Adherence Status Poor': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = "ART Adherence Status, Other Specify";
        var conditionConcept = formFieldValues['ART Adherence Status Poor'];
        if (conditionConcept == "ART Adherence Status, Other") {
            conditions.show.push(other)
        } else {
            conditions.hide.push(other)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'CTC - Pregnant Y/N': function(formName, formFieldValues) {
        var edd = "CTC - EDD";
        var ancNumber = "CTC - ANC Number";
        var familyPlanning = "CTC - Family Planning Template";


        var conditions = {
            show: [],
            hide: []
        };

        var conditionConcept = formFieldValues['CTC - Pregnant Y/N'];

        console.log(conditionConcept);
        if (conditionConcept) {

            return {
                show: [edd, ancNumber],
                hide: [familyPlanning]
            }

        } else {
            return {
                hide: [edd, ancNumber],
                show: [familyPlanning]
            }
        }
    },
    'CTC - Function Reproductive': function(formName, formFieldValues, patient) {
        console.log(patient);
        var conditions = {
            show: [],
            hide: []
        };
        if (patient['gender'] == 'F' && patient['age'] > 10) {
            conditions.show.push("CTC - Function Reproductive");

        } else {
            conditions.hide.push("CTC - Function Reproductive");


        }

        return conditions;
    },
    'CTC - ARV Status': function(formName, formFieldValues) {



        var conditions = {
            show: [],
            hide: []
        };

        var arvStatus = formFieldValues['CTC - ARV Status'];

        var arvNotStarted = "CTC - ARV Status, Not started ARV";
        var startARV = "CTC - ARV Status, Start ARV";
        var continueARV = "CTC - ARV Status, Continue ARV";
        var changeARV = "Change";
        var stopARV = "CTC - ARV Status, Stop";
        var restartARV = "CTC - ARV Status, Restart";
        var substitutionARV = "CTC - ARV Substitution";
        var switchTo2ndLine = "Switch to 2nd line";
        var switchTo3rdLine = "Switch to 3rd line";


         console.log(arvStatus);

        var reasonNoStart = "CTC - ARV Reason - No Start";
        var reasonStartARV = "CTC - ARV Start";
        var reasonStopARV = "CTC - ARV Reason - Stop";
        var reasonRestartARV = "CTC - ARV Reason - Restart";
        var reasonSubARV = "CTC - ARV Reasons - for Substitution";
        var reasonRegimenChange = "CTC - ARV Reason - Reason for Regimen Switch";
        var specifyOtherReason = "CTC - ARV Specify Other Reason";


        if (arvStatus == arvNotStarted) {

            conditions.show.push(reasonNoStart);
            conditions.hide.push(reasonStartARV);
            conditions.hide.push(reasonStopARV);
            conditions.hide.push(reasonRestartARV);
            conditions.hide.push(reasonSubARV);
            conditions.hide.push(reasonRegimenChange);
             conditions.show.push(specifyOtherReason);


        } else if (arvStatus == startARV) {
            conditions.show.push(reasonStartARV);
            conditions.hide.push(reasonNoStart);
            conditions.hide.push(reasonStopARV);
            conditions.hide.push(reasonRestartARV);
            conditions.hide.push(reasonSubARV);
            conditions.hide.push(reasonRegimenChange);
             conditions.show.push(specifyOtherReason);

        } else if (arvStatus == continueARV) {
            conditions.hide.push(reasonNoStart);
            conditions.hide.push(reasonStartARV);
            conditions.hide.push(reasonStopARV);
            conditions.hide.push(reasonRestartARV);
            conditions.hide.push(reasonSubARV);
            conditions.hide.push(reasonRegimenChange);
            conditions.hide.push(specifyOtherReason);

        } else if (arvStatus == stopARV) {


            conditions.show.push(reasonStopARV);
            conditions.hide.push(reasonNoStart);
            conditions.hide.push(reasonRestartARV);
            conditions.hide.push(reasonSubARV);
            conditions.hide.push(reasonRegimenChange);
             conditions.show.push(specifyOtherReason);

        } else if (arvStatus == restartARV) {
            conditions.show.push(reasonRestartARV);
            conditions.hide.push(reasonNoStart);
            conditions.hide.push(reasonStopARV);
            conditions.hide.push(reasonSubARV);
            conditions.hide.push(reasonRegimenChange);
            conditions.show.push(specifyOtherReason);

        } else if (arvStatus == substitutionARV) {
            conditions.show.push(reasonSubARV);
            conditions.hide.push(reasonNoStart);
            conditions.hide.push(reasonStopARV);
            conditions.hide.push(reasonRestartARV);
            conditions.hide.push(reasonRegimenChange);
             conditions.show.push(specifyOtherReason);

        } else if (arvStatus == switchTo2ndLine || arvStatus == switchTo3rdLine) {
            conditions.show.push(reasonRegimenChange);
            conditions.hide.push(reasonNoStart);
            conditions.hide.push(reasonStopARV);
            conditions.hide.push(reasonRestartARV);
            conditions.hide.push(reasonSubARV);
             conditions.show.push(specifyOtherReason);


        } else {

            conditions.hide.push(reasonNoStart);
            conditions.hide.push(reasonStartARV);
            conditions.hide.push(reasonStopARV);
            conditions.hide.push(reasonRestartARV);
            conditions.hide.push(reasonSubARV);
            conditions.hide.push(reasonRegimenChange);
            conditions.hide.push(specifyOtherReason);
        }
        return conditions; //Return object SHOULD be a map with 'enable' and 'disable' arrays having the concept names
    },
    'ARV Reason - No Start': function(formName, formFieldValues) {

        var conditions = {
            show: [],
            hide: []
        };
        var arvReason = formFieldValues['ARV Reason - No Start'];

        if (arvReason == "99 - Patient fulfils criteria but does not start for other reason") {
            conditions.show.push("ARV Specify other reason");

        } else {
            conditions.hide.push("ARV Specify other reason");
        }
        return conditions; //Return object SHOULD be a map with 'enable' and 'disable' arrays having the concept names
    },
    'CTC - ARV Adherence Status': function(formName, formFieldValues) {
        var conditions = {
            show: [],
            hide: []
        };

        var arvAdherencestatus = formFieldValues['CTC - ARV Adherence Status'];
  console.log(arvAdherencestatus);

        if (arvAdherencestatus == "2 P(Poor)- Less than 95% of adherence") {
            conditions.show.push("CTC - Reasons for Poor ARV Adherence");

        } else {
            conditions.hide.push("CTC - Reasons for Poor ARV Adherence");
        }
        return conditions; //Return object SHOULD be a map with 'enable' and 'disable' arrays having the concept names
    },
    'CTC - Reasons for Poor ARV Adherence': function(formName, formFieldValues) {
        var conditions = {
            show: [],
            hide: []
        };

        var poorARVAdherence = formFieldValues['CTC - Reasons for Poor ARV Adherence'];

        if (poorARVAdherence == "13 - Other (Specify)") {
            conditions.show.push("CTC - Other Reasons for Poor ARV Adherence");

        } else {
            conditions.hide.push("CTC - Other Reasons for Poor ARV Adherence");
        }
        return conditions; //Return object SHOULD be a map with 'enable' and 'disable' arrays having the concept names
    },
    'Referral to': function(formName, formFieldValues) {
        var conditions = {
            show: [],
            hide: []
        };
        var referralTo = formFieldValues['Referral to'];

        if (referralTo == "10 - Other") {
            conditions.show.push("Other Referral to");

        } else {
            conditions.hide.push("Other Referral to");
        }
        return conditions; //Return object SHOULD be a map with 'enable' and 'disable' arrays having the concept names
    },


    'ARV Regimens - First Line Adult': function(formName, formFieldValues) {
        var firstLineAdult = "ARV Regimens - First Line Adult";
        var secondLineAdult = "ARV Regimens - Second Line Adult";
        var firstLinePediatric = "ARV Regimens - First Line Pediatric";
        var secondLinePediatric = "ARV Regimens - Second Line Pediatric";
        var conditionConcept = formFieldValues['ARV Regimens - First Line Adult'];
        if (conditionConcept != null) {
            return {
                disable: [secondLineAdult, firstLinePediatric, secondLinePediatric]
            }
        } else {
            return {
                enable: [secondLineAdult, firstLinePediatric, secondLinePediatric]
            }
        }
    },
    'TB - Reason for Examination': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var examinationReason = formFieldValues['TB - Reason for Examination'];
        var diagnosis = "TB - Reason for Examination, Diagnosis Option";
        var followup = "TB - Reason for Examination, Follow-up, Month";

        console.log(examinationReason);

        if (examinationReason == "TB - Reason for Examination, Diagnosis") {
            conditions.show.push(diagnosis);
            conditions.hide.push(followup);

        } else {
            conditions.show.push(followup);
            conditions.hide.push(diagnosis);
        }
        return conditions; //Return object SHOULD be a map with 'enable' and 'disable' arrays having the concept names
    },




    'HIV Vitals': function(formName, formFieldValues, patient) {
        //'Chief Complaint Data' concept when edited, triggers this function
        var conditions = {
            show: [],
            hide: []
        };
        var height = formFieldValues['HEIGHT'];
        var variable = "HEIGHT";
        if (patient['age'] > 15) {

            conditions.hide.push(variable)
        } else {
            conditions.show.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'TB - Reffered by': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['TB - Reffered by'];
        var variable = "TB - Specify";
        if (other == "Others(Specify below)") {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'TB - CPT': function(formName, formFieldValues, patient) {
        //'Chief Complaint Data' concept when edited, triggers this function
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['TB - CPT'];
        var variable = "TB - CPT - Start Date";
        if (other == "TB - CPT - Yes") {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'TB - ART drugs': function(formName, formFieldValues, patient) {
        //'Chief Complaint Data' concept when edited, triggers this function
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['TB - ART drugs'];
        var variable = "TB - ART - Start Date";
        if (other == "TB - ART - Yes") {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },

    'TB - Classification by history of treatment': function(formName, formFieldValues, patient) {
        //'Chief Complaint Data' concept when edited, triggers this function
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['TB - Classification by history of treatment'];
        var variable = "TB - Classification by history - Specify";
        if (other == "Others(Specify below)") {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'Patient refered from': function(formName, formFieldValues, patient) { //'Chief Complaint Data' concept when edited, triggers this function
        var conditions = {
            show: [],
            hide: []
        };
        var other = formFieldValues['Patient refered from'];
        var variable = "Other Referred from";
        if (other == "Patient refered from, Other") {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'Patient Joined Community Support Organisation': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var name = "Name of Community Support Organisation";
        var conditionConcept = formFieldValues['Patient Joined Community Support Organisation'];
        if (conditionConcept) {
            conditions.show.push(name)
        } else {
            conditions.hide.push(name)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'Patient Referred From': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var other = "Patient Referred From - Other Specify";
        var conditionConcept = formFieldValues['Patient Referred From'];
        if (conditionConcept == "Patient Referred From - Other") {
            conditions.show.push(other)
        } else {
            conditions.hide.push(other)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'HTC, Pregnancy Status': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var edd = "HCT, EDD Date";
        var anc = "HCT, ANC Number";
        var family_plan = "Family Planning Template";
        var conditionConcept = formFieldValues['HTC, Pregnancy Status'];
        if (conditionConcept == "Yes") {
            conditions.show.push(edd)
            conditions.show.push(anc)
            conditions.hide.push(family_plan)

        } else {
            conditions.hide.push(edd)
            conditions.hide.push(anc)
            conditions.show.push(family_plan)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'TB - list 5 years household - Screened': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var tb = "TB - list 5 years household - outcome";
        if (formFieldValues['TB - list 5 years household - Screened']) {

            conditions.show.push(tb);
        } else {
            conditions.hide.push(tb);
        }

        return conditions;
    },
    'TB - list 5 years household - outcome': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var tb = "TB - IPT";
        if (formFieldValues['TB - list 5 years household - outcome'] == 'No TB') {

            conditions.show.push(tb);
        } else {
            conditions.hide.push(tb);
        }

        return conditions;
    },

    'TB - IPT': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var REJESTA = "TB - REJESTA YA TIBA KINGA YA KIFUA KIKUU";
        if (formFieldValues['TB - IPT']) {

            conditions.show.push(REJESTA);

        } else {
            conditions.hide.push(REJESTA);
        }

        return conditions;
    },
    'Breast feeding': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var name = "Breast feeding";
        if (patient['gender'] == 'F') {
            conditions.show.push("CTC - Why Eligible - Pregnancy");
            conditions.show.push("Breast feeding");
        } else {
            conditions.hide.push("CTC - Why Eligible - Pregnancy");
            conditions.hide.push("Breast feeding");
        }

        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'HTC - Amekubali na Kupimwa hali ya Uambukizi wa VVU': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var validation = "HTC - Amekubali na Kupimwa hali ya Uambukizi wa VVU";
        var majibu = "HTC - Majibu ya hali ya Uambukizi wa VVU";
        if (validation) {
            conditions.show.push(majibu)
        } else {
            conditions.hide.push(majibu)
        }

        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },

    'exp-infant - Infant NVP at birth': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var ans = formFieldValues['exp-infant - Infact NVP at birth'];
        var variable = "exp-infant - Number of Days Dispensed";
        if (ans) {
            conditions.show.push(variable)
        } else {
            conditions.hide.push(variable)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    'HTC - Kuchunguzwa Kifua Kikuu': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var validation = "HTC - Kuchunguzwa Kifua Kikuu";
        var majibu = "HTC - Hali ya Uambukizi wa Kifua Kikuu";

        if (validation) {
            conditions.show.push(majibu)
        } else {
            conditions.hide.push(majibu)
        }

        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },

    'Exposed Infant - CTX(Yes/No)': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var validation = formFieldValues['Exposed Infant - CTX(Yes/No)'];
        var majibu = "Exposed Infant - CTX Yes";
        var noOfDays = "Exposed Infant - CTX No of Days Dispensed";

        console.log(validation);
        if (validation == majibu) {
            conditions.show.push(noOfDays)
        } else {
            conditions.hide.push(noOfDays)
        }

        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },
    //conditions for Transfer/Referrals
    'transfer Choose Type': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var transferType = formFieldValues['transfer Choose Type'];
        var type_referral = "Type of Referral";
        var name_facility = "Name of Facility To be Transfer";
        var Referral_Programs = "Referral Programs";
        var Facility_District = "Facility District";
        var curent_location = "Makazi ya Sasa";
        var new_location = "Makazi Mapya";

        var address ="Address of Referred Facility";
        var address2 ="Address of Referred Facility 2";
        if(transferType == "Transfer Outside") {
			conditions.show.push(address2)
			conditions.show.push(address)
			conditions.show.push(name_facility)
            conditions.hide.push(Referral_Programs)
             conditions.show.push(Facility_District)
            conditions.hide.push(curent_location)
            conditions.show.push(type_referral);
            conditions.hide.push(new_location)

        } else if(transferType == "Transfer")
        {
			conditions.hide.push(address2)
			conditions.hide.push(address)
			conditions.hide.push(name_facility)
            conditions.show.push(Referral_Programs)
            conditions.hide.push(type_referral);
             conditions.hide.push(Facility_District)
            conditions.hide.push(curent_location)
            conditions.hide.push(new_location)

        }
        
        else {
			conditions.hide.push(address2)
			conditions.hide.push(address)
			conditions.hide.push(name_facility)
          conditions.hide.push(type_referral);
            conditions.hide.push(Referral_Programs)
            conditions.hide.push(Facility_District)
            conditions.hide.push(curent_location)
            conditions.hide.push(new_location)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },


    'TB - Request and Report, Previously Treated': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var previousTreated = formFieldValues['TB - Request and Report, Previously Treated'];
        var specimentType = "TB - Previous Treated";
        var testRequested = "TB - Test Requested";
        if (previousTreated) {
            conditions.show.push(specimentType)
            conditions.show.push(testRequested)
        } else {
            conditions.hide.push(specimentType)
            conditions.hide.push(testRequested)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },

    'TB - DOT - Phase Type': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var phaseType = formFieldValues['TB - DOT - Phase Type'];
        var RHZE = "TB - DOT - RHZE";
        var RH = "TB - DOT - RH";
        var S = "TB - DOT - S(Streptomycin)";
        var RETRRHZE = "TB - DOT - RETR - RHZE";
        var RHE = "TB - DOT - RHE";
        var RHZ = "TB - DOT - Children - RHZ";
        var E = "TB - DOT - Children - E";
        var RH = "TB - DOT - RH";

        console.log(phaseType);
        if (phaseType == "Intensive Phase") {
            conditions.show.push(RHZE)
            conditions.show.push(S)

            conditions.show.push(E)



            conditions.hide.push(RH)
            conditions.hide.push(RHE)


        } else if (phaseType == "Continuation Phase") {

            conditions.show.push(RH)
            conditions.show.push(RHZ)

            conditions.hide.push(RHZE)
            conditions.hide.push(S)

            conditions.hide.push(E)

        } else {
            conditions.hide.push(RHZE)
            conditions.hide.push(S)
            conditions.hide.push(RH)
            conditions.hide.push(RHE)
            conditions.hide.push(E)
            conditions.hide.push(RHZ)
        }
        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },

    'TB - Medicine Option': function(formName, formFieldValues, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        var phaseType = formFieldValues['TB - Medicine Option'];

        var NewCase = "TB - DOT - New Case";
        var Retreatment = "Retreatment";
        var Children = "TB - DOT - Children";

        var NewCaseSection = "TB - New Case";
        var RetreatmentSection = "TB - Retreatment";
        var ChildrenSection = "TB - Children";

        console.log(phaseType);

        switch (phaseType) {
            case NewCaseSection:
                conditions.show.push(NewCase);
                conditions.hide.push(Retreatment);
                conditions.hide.push(Children);
                break;
            case RetreatmentSection:
                conditions.hide.push(NewCase);
                conditions.show.push(Retreatment);
                conditions.hide.push(Children);
                break;
            case ChildrenSection:
                conditions.hide.push(NewCase);
                conditions.hide.push(Retreatment);
                conditions.show.push(Children);
                break;
            default:
                conditions.hide.push(NewCase)
                conditions.hide.push(Retreatment)
                conditions.hide.push(Children)

        }


        return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
    },

         'HTC - Amekubali na Kupimwa hali ya Uambukizi wa VVU': function(formName, formFieldValues, patient) {
             var conditions = {
                 show: [],
                 hide: []
             };
             var amekubaliKupimaVVU = formFieldValues['HTC - Amekubali na Kupimwa hali ya Uambukizi wa VVU'];

             var haliYaUambukizi = "HTC - Majibu ya hali ya Uambukizi wa VVU";
             var kushirikishaMajibu ="HTC - Kushirikisha Majibu";

             console.log(amekubaliKupimaVVU);

 if(amekubaliKupimaVVU=="HTC - Ndiyo")
 {
 conditions.show.push(haliYaUambukizi);
 conditions.show.push(kushirikishaMajibu);
 }else
 {
 conditions.hide.push(haliYaUambukizi);
 conditions.hide.push(kushirikishaMajibu);
 }


             return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
         },

          'HTC - Kuchunguzwa Kifua Kikuu': function(formName, formFieldValues, patient) {
                      var conditions = {
                          show: [],
                          hide: []
                      };
                      var amekubaliKupimaKKU = formFieldValues['HTC - Kuchunguzwa Kifua Kikuu'];

                      var haliYaUambukizi = "HTC - Hali ya Uambukizi wa Kifua Kikuu";




          if(amekubaliKupimaKKU=="HTC - Ndiyo")
          {
          conditions.show.push(haliYaUambukizi);

          }else
          {
          conditions.hide.push(haliYaUambukizi);

          }


                      return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
                  },

          'HTC - Sampuli imepelekwa kwa ajili ya uhakiki wa ubora': function(formName, formFieldValues, patient) {
                      var conditions = {
                          show: [],
                          hide: []
                      };
                      var uhakikiUbora = formFieldValues['HTC - Sampuli imepelekwa kwa ajili ya uhakiki wa ubora'];

                      var matokeo = "HTC - Matokeo ya uhakiki wa ubora";




          if(uhakikiUbora)
          {
          conditions.show.push(matokeo);

          }else
          {
          conditions.hide.push(matokeo);

          }


                      return conditions; //Return object SHOULD be a map with 'show' and 'hide' arrays having the concept names
                  },
'Je, una maradhi/magonjwa yoyote sugu ambayo yanaingiliana na maisha yako?': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Je, una maradhi/magonjwa yoyote sugu ambayo yanaingiliana na maisha yako?'];
        var taja = "Taja";

       if (conditionConcept == "Taja - Ndiyo")
           {
            conditions.show.push(taja);
           } else
           {
             conditions.hide.push(taja);
            }
        return conditions;
    },
'Je, umeshawahi kupima kubaini kama una maambukizi ya kifua kikuu?(Dalili, makohozi, CXRay)': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Je, umeshawahi kupima kubaini kama una maambukizi ya kifua kikuu?(Dalili, makohozi, CXRay)'];
        var dodoso = "Dodoso la TB screening";

       if (conditionConcept == "dodoso - ndiyo")
           {
            conditions.hide.push(dodoso);
           } else
           {
             conditions.show.push(dodoso);
            }
        return conditions;
    },
'MAT - Je, kuna mtu anachangia kwa kiasi kikubwa kujikimu kwako?': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['MAT - Je, kuna mtu anachangia kwa kiasi kikubwa kujikimu kwako?'];
        var taja = "MAT - Taja";

       if (conditionConcept == "Kujikimu - Ndiyo")
           {
            conditions.show.push(taja);
           } else
           {
             conditions.hide.push(taja);
            }
        return conditions;
    },
'dawa - Pombe (kwa matumizi yoyote katika siku 30 zilizopita)': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['dawa - Pombe (kwa matumizi yoyote katika siku 30 zilizopita)'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
    },
'Pombe – kiwango cha kulewa sana hadi kupata madhara': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Pombe – kiwango cha kulewa sana hadi kupata madhara'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Heroini/Unga': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Heroini/Unga'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'dawa - Methadone': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['dawa - Methadone'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Kokeni.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Kokeni.'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Mirungi/Miraa.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Mirungi/Miraa.'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Bangi.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Bangi.'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Cigarette (Sigara).': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Cigarette (Sigara).'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Cigar.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Cigar.'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Shisha.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Shisha.'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Electronic cigarette.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Electronic cigarette.'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Dawa mpya za kulevya/NPS.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Dawa mpya za kulevya/NPS.'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},
'Zaidi ya dawa moja (pamoja na pombe).': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Zaidi ya dawa moja (pamoja na pombe).'];
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "dawa - Ndiyo")
           {
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }
        return conditions;
},

'Other opioids': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Other opioids'];
        var taja = "Taja";
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "opioids - ndiyo")
           {
            conditions.show.push(taja);
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(taja);
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }

        return conditions;
    },
'Smokeless': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Smokeless'];
        var taja = "Taja";
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "opioids - ndiyo")
           {
            conditions.show.push(taja);
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(taja);
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }

        return conditions;
    },

'Dawa za usingizi': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Dawa za usingizi'];
        var taja = "Taja";
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "opioids - ndiyo")
           {
            conditions.show.push(taja);
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(taja);
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }

        return conditions;
    },
'Viyeyusho': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Viyeyusho'];
        var taja = "Taja";
        var siku = "Siku 30 zilizopita";
        var miaka = "Maishani (miaka)";
        var ROA = "Njia ya utumiaji (ROA)";

       if (conditionConcept == "opioids - ndiyo")
           {
            conditions.show.push(taja);
            conditions.show.push(siku);
            conditions.show.push(miaka);
            conditions.show.push(ROA);
           } else
           {
             conditions.hide.push(taja);
             conditions.hide.push(siku);
             conditions.hide.push(miaka);
             conditions.hide.push(ROA);
            }

        return conditions;
    },
'Wizi.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Wizi.'];
        var miaka = "Maishani (miaka)";
        var siku = "Siku 30 zilizopita";

       if (conditionConcept == "sheria - Ndiyo")
           {
      
            conditions.show.push(miaka);
            conditions.show.push(siku);
           } else
           {
             
             conditions.hide.push(miaka);
             conditions.hide.push(siku);
            }
        return conditions;
},
'Kosa la jinai linalohusu madawa ya kulevya.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Kosa la jinai linalohusu madawa ya kulevya.'];
        var miaka = "Maishani (miaka)";
        var siku = "Siku 30 zilizopita";

       if (conditionConcept == "sheria - Ndiyo")
           {

            conditions.show.push(miaka);
            conditions.show.push(siku);
           } else
           {

             conditions.hide.push(miaka);
             conditions.hide.push(siku);
            }
        return conditions;
},
'Biashara za ngono.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Biashara za ngono.'];
        var miaka = "Maishani (miaka)";
        var siku = "Siku 30 zilizopita";

       if (conditionConcept == "sheria - Ndiyo")
           {

            conditions.show.push(miaka);
            conditions.show.push(siku);
           } else
           {

             conditions.hide.push(miaka);
             conditions.hide.push(siku);
            }
        return conditions;
},
'Je, kwa sasa unasubiri mashtaka, kesi au kuhukumiwa?': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Je, kwa sasa unasubiri mashtaka, kesi au kuhukumiwa?'];
        var sababu = "Eleza sababu ya hayo mashtaka";
     

       if (conditionConcept == "Ndiyo")
           {

            conditions.show.push(sababu);
           
           } else
           {

             conditions.hide.push(sababu);
            
            }
        return conditions;
},
'Je, una watoto?': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Je, una watoto?'];
        var watoto = "Je, una watoto wangapi?";
        var miaka = "Je, wangapi kati ya watoto wako wana miaka chini ya 18?";


       if (conditionConcept == "Ndiyo")
           {

            conditions.show.push(watoto);
            conditions.show.push(miaka);

           } else
           {

             conditions.hide.push(watoto);
             conditions.hide.push(miaka);

            }
        return conditions;
},
'daktari - pombe': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['daktari - pombe'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var score = "pombe - score";
        var severity = "pombe - severity";

       if (conditionConcept == "pombe - ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            }
        return conditions;
},
'daktari - Heroini/Unga': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['daktari - Heroini/Unga'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var score = "Heroini/Unga - score";
        var severity = "Heroini/Unga - Severity";
        var days = "Use in last 30 days";
   

       if (conditionConcept == "Heroini/Unga - Ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(days);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(days);
            }
        return conditions;
},
'Methadone.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Methadone.'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var score = "Methadone - Score";
        var severity = "Methadone - Severity";
        var days = "Use in last 30 days";

       if (conditionConcept == "Methadone - Ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(days);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(days);
            }
        return conditions;
},
'daktari - kokeni': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['daktari - kokeni'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var score = "kokeni - score";
        var severity = "kokeni - severity";
        var days = "Use in last 30 days";

       if (conditionConcept == "kokeni - ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(days);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(days);
            }
        return conditions;
},
'Miraa.': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Miraa.'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var score = "miraa - score";
        var severity = "miraa - severity";
        var days = "Use in last 30 days";

       if (conditionConcept == "miraa - ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(days);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(days);
            }
        return conditions;
},
'daktari - Bangi': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['daktari - Bangi'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var score = "bangi - score";
        var severity = "bangi - severity";
        var days = "Use in last 30 days";

       if (conditionConcept == "bangi - ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(days);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(days);
            }
        return conditions;
},
'daktari - tumbaku': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['daktari - tumbaku'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var score = "tumbaku - score";
        var severity = "tumbaku - Severity";
        var days = "Use in last 30 days";

       if (conditionConcept == "Tumbaku - ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(days);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(days);
            }
        return conditions;
},
'Opioids': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['Opioids'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var taja = "Taja";
        var score = "opioids - Score";
        var severity = "opioids - Severity";
        var days = "Use in last 30 days";

       if (conditionConcept == "Ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(days);
            conditions.show.push(taja);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(taja);
            conditions.hide.push(days);
            }
        return conditions;
},
'Have you ever been treated for addiction problem in the past': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
		console.log("test nn");
        var conditionConcept = formFieldValues['Have you ever been treated for addiction problem in the past?'];
		
        var taja = "Which was the primary drug treated for?";
        console.log(conditionConcept);

       if (conditionConcept == "Yes")
           {
            conditions.show.push(taja);
           } else
           {
             conditions.hide.push(taja);
            }
        return conditions;
    },
'daktari - Dawa za usingizi': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['daktari - Dawa za usingizi'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var taja = "Taja";
        var score = "Dawa za usingizi - score";
        var severity = "Dawa za usingizi - severity";
        var days = "Use in last 30 days";

       if (conditionConcept == "Ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(taja);
            conditions.show.push(days);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(taja);
            conditions.hide.push(days);
            }
        return conditions;
},
'daktari - Viyeyusho': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['daktari - Viyeyusho'];
        var age = "Age Of Onset";
        var amount = "Amount per Day";
        var frequency = "MAT - Frequency Per Day";
        var route = "MAT - Route";
        var duration = "Last use (duration)";
        var status = "MAT - Status";
        var table = "DSM V Table";
        var taja = "Taja";
        var score = "viyeyusho - score";
        var severity = "viyeyusho - severity";
        var days = "Use in last 30 days";

       if (conditionConcept == "daktari - ndiyo")
           {
            conditions.show.push(age);
            conditions.show.push(amount);
            conditions.show.push(frequency);
            conditions.show.push(route);
            conditions.show.push(duration);
            conditions.show.push(status);
            conditions.show.push(table);
            conditions.show.push(score);
            conditions.show.push(severity);
            conditions.show.push(taja);
            conditions.show.push(days);
           } else
           {
            conditions.hide.push(age);
            conditions.hide.push(amount);
            conditions.hide.push(frequency);
            conditions.hide.push(route);
            conditions.hide.push(duration);
            conditions.hide.push(status);
            conditions.hide.push(table);
            conditions.hide.push(score);
            conditions.hide.push(severity);
            conditions.hide.push(taja);
            conditions.hide.push(days);
            }
        return conditions;
},
'MOOD': function(formName, formFieldValues, patient){
       var conditions = {
            show: [],
            hide: []
        };
        var conditionConcept = formFieldValues['MOOD'];
        var specify = "MAT - Specify";

       if (conditionConcept == "MAT - Other")
           {
            conditions.show.push(specify);
           } else
           {
             conditions.hide.push(specify);
            }
        return conditions;
}
};
