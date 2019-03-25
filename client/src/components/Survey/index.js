import React, { Component } from 'react';
import * as Survey from 'survey-react';
import "survey-react/survey.css";

import API from '../../utils/API';


Survey
    .StylesManager
    .applyTheme("default");

export default class SurveyPage extends Component {
    state = {
        disciplines: []
    }
    json = {

        title: "Kiyapp Survey",
        pages: [
            {
                name: "Experience",
                elements: [
                    {
                        type: "dropdown",
                        name: "Favorite",
                        title: "Which is your favorite martial art?",
                        isRequired: true,
                        choices: [
                            "Hapkido",
                            "Taekwondo",
                            "Karate",
                            {
                            value: "KravMaga",
                            text: "Krav Maga"
                            }
                        ]
                    }
                ],
                title: "Your Experience"
            },
            // {
            //     name: "Top Picks",
            //     elements: [
            //         {
            //             type: "tagbox",
            //             isRequired: true,
            //             choicesByUrl: {
            //                 url: "https://restcountries.eu/rest/v1/all"
            //             },
            //             name: "countries",
            //             title: "Please select all countries you have been for the last 3 years."
            //         }
            //     ],
            // }
        ],
        // cookieName: "kiyapp",
        sendResultOnPageNext: true,
        showNavigationButtons: "top",
        showPageNumbers: true,
        startSurveyText: "Start",
        pagePrevText: "Previous",
        pageNextText: "Next",
        completeText: "Complete"



        // questions: [
        //     {
        //         name: "name",
        //         type: "text",
        //         title: "Please enter your name:",
        //         placeHolder: "Jon Snow",
        //         isRequired: true
        //     },
        //     // {
        //     //     name: "birthdate",
        //     //     type: "text",
        //     //     inputType: "date",
        //     //     title: "Your birthdate:",
        //     //     isRequired: true
        //     // },
        //      {
        //         name: "color",
        //         type: "text",
        //         inputType: "color",
        //         title: "Your favorite color:"
        //     }, {
        //         name: "email",
        //         type: "text",
        //         inputType: "email",
        //         title: "Your e-mail:",
        //         placeHolder: "jon.snow@nightwatch.org",
        //         isRequired: true,
        //         validators: [
        //             {
        //                 type: "email"
        //             }
        //         ]
        //     }
        // ]
    };

    componentDidMount(){
        console.log('survey has mounted')
        API.getDisciplines()
        .then(result=>this.setState({disciplines:result}))
    }

    //Define a callback methods on survey complete
    onComplete(survey, options) {

    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
   }
  render() {
    var model = new Survey.Model(this.json);
    return (<Survey.Survey model={model} onComplete={this.onComplete}/>);
  }
}

// More to implement!

// Ratings:
// https://surveyjs.io/Examples/Library/?id=custom-widget-barrating&platform=jQuery&theme=default

// Tags:
// https://surveyjs.io/Examples/Library/?id=custom-widget-select2-tagbox&platform=jQuery&theme=default

// Sortable Box:
// https://surveyjs.io/Examples/Library/?id=custom-widget-sortablejs&platform=jQuery&theme=default

