import axios from "axios";
import { flow, types } from "mobx-state-tree";
import { Logger } from "utils/Logger";

const ENDPOINT = `http://localhost:1337/bugs`

export const Bug = types.model("Bug", {
    id: types.string,
    message: types.string,
    resolved: types.maybeNull(types.boolean),
})
    .actions(self => ({
        toggleResolved: flow(function* () {

            console.log('self.resolved (before)', self.resolved)
            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                url: `${ENDPOINT}/${self.id}`,
            } as any;
            const response = yield axios.put(config.url, { ...self, resolved: !self.resolved }, config)
            console.log('response', response)
            const bug = response.data
            console.log('updated bug :>> ', bug)
            self.resolved = bug.resolved
            console.log('self.resolved (after)', self.resolved)
        })
    }))
    .views(self => ({
        get isResolved() {
            return self.resolved
        }
    }))

export const BugStore = types.model("BugStore", {
    loaded: types.maybeNull(types.boolean),
    endpoint: ENDPOINT,
    bugs: types.array(Bug)
})
    .views(self => {
        return {
            get completedBugs() {
                return self.bugs.filter(t => t.resolved)
            },
            // findBugsByUser(user) {
            // TODO: Later...
            //     // return self.bugs.filter(t => t.assignee === user)
            // }
        }
    })
    .actions(self => {
        return {
            saveBug: flow(function* (error, friendlyMessage = "", screenshot = null) {

                if (!error) return;

                const endpoint = `${process.env.ENDPOINT || "http://localhost:1337"}/bugs`;

                console.error(error);

                let message = `## Bug Report\n### The Following Error Occurred in your App:\n*${friendlyMessage}*\n### Stack Trace\n${error}`;

                const response = yield axios.post(
                    endpoint, {
                    message,
                    screenshot: null,
                })

                console.log('response.data', response.data)

                if (response.error)
                    console.error('Bug could not be saved.  Please contact your administrator' + error)
                else
                    console.info('Bug saved successfully')
                // .then(_ => console.info('Bug saved successfully'))
                // .catch(_ => console.error('Bug could not be saved.  Please contact your administrator' + error));

                self.bugs.push({
                    message,
                    resolved: false,
                })
            })
        }
    })

export default Bug;