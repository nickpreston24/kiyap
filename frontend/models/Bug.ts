import axios from "axios";
import { destroy, flow, getParent, IAnyStateTreeNode, types } from "mobx-state-tree";

const ENDPOINT = `http://localhost:1337/bugs`

export const Bug = types.model("Bug", {
    id: types.identifier,
    message: types.string,
    resolved: types.maybeNull(types.boolean),
})
    .actions(self => ({
        toggleResolved: flow(function* () {

            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                url: `${ENDPOINT}/${self.id}`,
            } as any;

            const response = yield axios.put(config.url, { ...self, resolved: !self.resolved }, config)
            const bug = response.data
            self.resolved = bug.resolved

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
        postBug: flow(function* (error, friendlyMessage = "") {

            if (!error) return;

            const endpoint = `${process.env.ENDPOINT || "http://localhost:1337"}/bugs`;

            error && console.error(error);

            let message = `## Bug Report\n### The Following Error Occurred in your App:\n*${friendlyMessage}*\n### Stack Trace\n${error}`;

            const response = yield axios.post(
                endpoint, {
                message,
                screenshot: null,
            })

            if (response.error)
                console.error('Bug could not be saved.  Please contact your administrator' + error)
            else
                console.info('Bug saved successfully')

            let bug = {
                ...response.data,
                id: response.data.id.toString()
            }
            console.log('bug for posting :>> ', bug)
            self.bugs.push(bug)
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
        }),
        putBug: flow(function* (patch: any) {

            // Update db: 
            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                url: `${ENDPOINT}/${patch.id}`,
            } as any;

            const response = yield axios.put(config.url, { ...patch, resolved: !patch.resolved }, config)
            const bug = response.data
            patch.resolved = bug.resolved

            // Update array:
            const index = self.bugs.findIndex(b => b.id == bug.id)
            self.bugs[index] = bug;
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

export default Bug;