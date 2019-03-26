import React, { Component, Fragment } from 'react';
import * as Survey from 'survey-react';
import "survey-react/survey.css";

import API from '../../utils/API';
import * as ROUTES from '../../constants/routes';

Survey
    .StylesManager
    .applyTheme("default");

export default class SurveyPage extends Component {

    state = {
        disciplines: [],
        cat: ''
    }

    json = {

        title: "Kiyapp Survey",
        pages: [
            {
                name: "Experience",
                elements: [
                    {
                        type: "dropdown",
                        name: "Familiar",
                        title: "With which martial art are you most familiar?",
                        isRequired: true,
                        choices: [
                            // "Hapkido",
                            // "Taekwondo",
                            // "Karate",
                            // "Krav Maga"
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

    componentWillMount() {

        API.getDisciplines()
        .then(result=>{
            this.setState({disciplines: result.data.map(d=>d.Name)})
            // console.log('result: ', result.data.map(d=>d.Name));
        })
    }

    //Define a callback methods on survey complete
    onComplete(survey, history, options) {

        history.push(ROUTES.SIGN_UP)

        // TODO: Write survey results into database
        console.log("Survey results: " + JSON.stringify(survey.data));

    }

    render() {
        const { disciplines } = this.state;

        const choices = find(this.json, ['pages', 0, 'elements', 0, 'choices' ]);
        disciplines.forEach(d=>choices.push(d));

        var model = new Survey.Model(this.json);

        return (
            <Fragment>
                {!disciplines && <Fragment/>}
                {(disciplines && disciplines.length > 0) &&
                    <Survey.Survey model={model} onComplete={(survey) => this.onComplete(survey, this.props.history)}/>
                }
            </Fragment>
        );
    }
}

const find = (object, paths) => {
    return paths.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, object);
}

// More to implement!

// Ratings:
// https://surveyjs.io/Examples/Library/?id=custom-widget-barrating&platform=jQuery&theme=default

// Tags:
// https://surveyjs.io/Examples/Library/?id=custom-widget-select2-tagbox&platform=jQuery&theme=default

// Sortable Box:
// https://surveyjs.io/Examples/Library/?id=custom-widget-sortablejs&platform=jQuery&theme=default

