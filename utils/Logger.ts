import axios from 'axios';
import { notify } from './Toasts'

export const Logger = {
    Log(error: string, friendlyMessage = 'An Error occurred!') {
        if (!error) return;

        const endpoint = `${process.env.ENDPOINT || "http://localhost:1337"}/bugs`;
        // notify(friendlyMessage); // FIXME: idk what's wrong here.

        console.error(error);
        // TODO: Screen grab
        axios.post(
            endpoint, {
            message:
                `## Bug Report\n### The Following Error Occurred in your App:\n*${friendlyMessage}*\n### Stack Trace\n${error}`,
            screenshot: null,
        })
            .then(_ => console.info('Bug saved successfully'))
            .catch(_ => console.error('Bug could not be saved.  Please contact your administrator' + error));
    }
};
