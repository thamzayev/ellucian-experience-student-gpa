module.exports = {
    "name": "Student GPA",
    "publisher": "ADA University",
    "cards": [{
        "type": "EllucianExperienceStudentGpaCard",
        "source": "./src/cards/EllucianExperienceStudentGpaCard",
        "title": "Student Overall and Term GPA",
        "displayCardType": "EllucianExperienceStudentGpa Card",
        "description": "This card shows student GPA information",
        "configuration": {
            "client": [{
              "key": "buttonUrl",
              "label": "Card redirect button URL",
              "type":"url",
              "required":true
            },
            {
              "key": "buttonLabel",
              "label": "Card redirect button Label",
              "type":"text",
              "required":true
            }]
          },
          "queries": {
              "gpa-data": [{
                  "resourceVersions": {
                      "studentGradePointAverages": { min: 1 },
                      "persons": { min: 12 }
                  },
                  "query": `query getStudentGpa($personId:ID)
                  {
                    studentGradePointAverages1(
                      filter: {
                        student12: { id: { EQ: $personId } }
                        periodBased:{academicSource:{EQ:"all"}}
                        cumulative:{academicSource:{EQ:"all"}}
                      }
                    ) {
                      edges {
                        node {
                          periodBased{
                            academicPeriod16{
                              code
                              title
                            }
                            academicLevel6{
                              code
                              title
                            }
                            academicSource
                            value
                            attemptedCredits
                            earnedCredits
                          }
                          cumulative{
                            academicLevel6{
                              code
                              title
                            }
                            academicSource
                            value
                            attemptedCredits
                            earnedCredits
                          }
                        }
                      }
                    }
                  }`
              }]
          }
    }]
}