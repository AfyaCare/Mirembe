Bahmni.Clinical.Program.FormConditions.rules = {
 'Transfer In': function (patientProgramAttributes, patient) {
        var conditions = {
            show: [],
            hide: []
        };
     if (typeof patient !== "undefined") {
        if(patient.gender == 'M')
          {
         conditions.hide.push('Breast Feeding');  
         conditions.hide.push('Pregnant');  
        }else
        {
              conditions.show.push('Breast Feeding');
              conditions.show.push('Pregnant');
        }
      }

        if (patientProgramAttributes['Transfer In'] == 'WITH RECORDS' ||patientProgramAttributes['Transfer In'] == 'NO RECORDS AVAILABLE' || patientProgramAttributes['Transfer In'] == 'IN CARE' || patientProgramAttributes['Transfer In'] == 'ON ART' ) {
            conditions.show.push('WHO Stage');  
            conditions.show.push('Prior ARV Exposure');     
            conditions.show.push('Date Ready to Start ARV');    
            conditions.show.push('Date Start ARV');     
            conditions.show.push('CD4 Count');    
        } else  {
             conditions.hide.push('WHO Stage');
              conditions.hide.push('Prior ARV Exposure');
              conditions.hide.push('Date Ready to Start ARV'); 
              conditions.hide.push('Date Start ARV');  
              conditions.hide.push('CD4 Count');   
             }

        return conditions;
},
  'DOT Option': function (patientProgramAttributes, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        if (patientProgramAttributes['DOT Option'] == 'Home-based DOT') {

            conditions.show.push('Name of Treatment Supporter');
            conditions.show.push('Tel No of Treatment Supporter');
            conditions.show.push('Physical Address of Treatment Supporter');
            conditions.show.push('Name of Community Support Organisation');
        } else if (patientProgramAttributes['DOT Option'] == 'Health Facility DOT') {
            conditions.hide.push('Name of Treatment Supporter');
            conditions.hide.push('Tel No of Treatment Supporter');
            conditions.hide.push('Physical Address of Treatment Supporter');
            conditions.hide.push('Name of Community Support Organisation');
        }else
        {
            conditions.hide.push('Name of Treatment Supporter');
            conditions.hide.push('Tel No of Treatment Supporter');
            conditions.hide.push('Physical Address of Treatment Supporter');
            conditions.hide.push('Name of Community Support Organisation');  
        }
        return conditions;
    },
    'Classification by site': function (patientProgramAttributes, patient) {
        var conditions = {
            show: [],
            hide: []
        };
      console.log(patientProgramAttributes);
        if (patientProgramAttributes['Classification by site'] == 'Extra-pulmonary') {

            conditions.show.push('Site');
        } else
        {
            conditions.hide.push('Site');
        }
        return conditions;
    },

    'HIV Status': function (patientProgramAttributes, patient) {
        var conditions = {
            show: [],
            hide: []
        };
        console.log(patientProgramAttributes['HIV Status'] );
        if (patientProgramAttributes['HIV Status'] == 'Positive') {
            
           conditions.show.push('CPT');
            conditions.show.push('CPT Start Date');
            conditions.show.push('ART drugs');
            conditions.show.push('ART Start Date');
            conditions.show.push('HIV Care registration number');

        } else  {
  

            conditions.hide.push('CPT');
            conditions.hide.push('CPT Start Date');
            conditions.hide.push('ART drugs');
            conditions.hide.push('ART Start Date');
            conditions.hide.push('HIV Care registration number');
        }
        return conditions;
    },


    'Place of Work': function (patientProgramAttributes, patient) {
        var conditions = {
            show: [],
            hide: []
        };

        if (patientProgramAttributes['Place of Work'] == 'Other') {

            conditions.show.push('Place of Work-Other');
        }else
        {
            conditions.hide.push('Place of Work-Other');
        }
        return conditions;
    },
 'Reffered by': function (patientProgramAttributes, patient) {
        var conditions = {
            show: [],
            hide: []
        };

        if (patientProgramAttributes['Reffered by'] == 'Other') {

            conditions.show.push('Reffered by-Other');
        }else
        {
            conditions.hide.push('Reffered by-Other');
        }
        return conditions;
    },
 'ANC number': function (patientProgramAttributes, patient) {
        var conditions = {
            show: [],
            hide: []
        };

         if (typeof patient !== "undefined") {
        if(patient.gender == 'M')
          {
            conditions.hide.push('HIE Number');
            conditions.hide.push('Name of Mother');
            conditions.hide.push('ANC No of Mother');
            conditions.hide.push('Infact NVP at Birth');
            conditions.hide.push('ARV Drugs Taken by Mother During L&D');
            conditions.hide.push('Number of Days Dispensed');
            conditions.hide.push('Infact Feeding Practice Birth');
          }else
          {
           conditions.show.push('HIE Number');
            conditions.show.push('Name of Mother');
            conditions.show.push('ANC No of Mother');
            conditions.show.push('Infact NVP at Birth');
            conditions.show.push('ARV Drugs Taken by Mother During L&D');
            conditions.show.push('Number of Days Dispensed');
            conditions.show.push('Infact Feeding Practice Birth');

          }
       
    }

     return conditions;
}
};