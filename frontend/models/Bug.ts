import axios from "axios";
import { update } from "lodash";
import { toJS } from "mobx";
import { destroy, flow, getParent, IAnyStateTreeNode, onPatch, types } from "mobx-state-tree";
import { isDev } from "utils/environment";
import { Logger } from "utils/Logger";

const ENDPOINT = `http://localhost:1337/bugs`

export const Bug = types.model("Bug", {
    id: types.identifier,
    message: types.string,
    resolved: types.maybeNull(types.boolean),
})
    .actions(self => ({
        toggleResolved: flow(function* () {

            // console.log('self.resolved (before)', self.resolved)
            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                url: `${ENDPOINT}/${self.id}`,
            } as any;
            // console.log('config', config)
            const response = yield axios.put(config.url, { ...self, resolved: !self.resolved }, config)
            // console.log('response', response)
            const bug = response.data
            // console.log('updated bug :>> ', bug)
            self.resolved = bug.resolved
            // console.log('self.resolved (after)', self.resolved)

            // (getParent(self, 2) as IAnyStateTreeNode).putBug(toJS(self))
        }),
        // toggleResolved() {
        //     // (getParent(self, 2) as IAnyStateTreeNode).putBug(self)
        // },
        delete() {
            (getParent(self, 2) as IAnyStateTreeNode).deleteBug(self)
        },
        update(patch) {
            (getParent(self, 2) as IAnyStateTreeNode).putBug(patch)
        },
    }))
    .views(self => ({
        get isResolved() {
            return self.resolved
        },
    }))

export const BugStore = types.model("BugStore", {
    loaded: types.maybeNull(types.boolean),
    endpoint: ENDPOINT,
    bugs: types.array(Bug)
})
    .actions(self => ({
        postBug: flow(function* (error, friendlyMessage = "", screenshot = null) {

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

            console.log('response.data', response.data)
            self.bugs.push({ ...response.data } as typeof Bug)
        }),
        deleteBug: flow(function* (bug) {
            const endpoint = `${process.env.ENDPOINT || "http://localhost:1337"}/bugs/${bug.id}`;
            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                url: endpoint,
            } as any;

            yield axios.delete(config.url, config)
            destroy(bug as any)
            console.log('self.bugs updated :>> ', self.bugs)
        }),
        putBug: flow(function* (patch: any) {
            console.log('patch', patch)

            // Update db: 
            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                url: `${ENDPOINT}/${patch.id}`,
            } as any;
            console.log('config.url', config.url)
            const response = yield axios.put(config.url, { ...patch, resolved: !patch.resolved }, config)
            console.log('response', response)
            const bug = response.data
            console.log('updated bug :>> ', bug)
            patch.resolved = bug.resolved
            console.log('self.resolved (after)', patch.resolved)

            // Update array:
            const index = self.bugs.findIndex(b => b.id == bug.id)
            console.log('index', index)
            // console.log('self.bugs[index]', toJS(self.bugs.filter(b => b.id === '33')[0]))
            console.log('self.bugs[index]', toJS(self.bugs[index]), "bug", bug)
            self.bugs[index] = bug;
            console.log('self.bugs updated :>> ', self.bugs)
        })
    }))
    .views(self => ({
        get completedBugs() {
            return self.bugs.filter(t => t.resolved)
        },
        get percentDone() {
            return Math.round(100.00 * self.bugs.filter(b => b.resolved)?.length / self.bugs?.length || null) || ''
        }
        // TODO: findBugsByUser(user)
    }))


// Debugging tools
// onPatch(BugStore, patch => {
// });

export default Bug;