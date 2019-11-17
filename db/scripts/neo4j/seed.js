const faker = require('faker');
const { belts, arts } = require('./consts');
const _ = require('lodash');
const Promise = require('bluebird');
require('dotenv').config();

var config = {
    uri: process.env.GRAPHENE_BOLT_URL || "bolt://localhost",
    user: process.env.GRAPHENE_BOLT_USER || "neo4j",
    password: process.env.GRAPHENE_BOLT_PASSWORD || 'root',
}

var Seeder = class {
    constructor(...config) {
        if (config) {
            Object.assign(this, ...config)
            console.log('new configuration: ', this);
        }
        else {
            this.uri = "bolt://localhost";
            this.user = "neo4j";
            this.password = 'root';
        }
        this.neo4j = require('neo4j-driver').v1;
        this.driver = this.neo4j.driver(this.uri, this.neo4j.auth.basic(this.user, this.password));
    }

    async CreateAlliances() {
        var alliances = arts.map(art => art + " Alliance");
        console.log(`Creating ${alliances.length} Alliances...`);

        const session = await this.driver.session();
        const constraint = "create constraint on (alliance:Alliance) assert alliance.name is unique";
        await session.run(constraint);

        const chunkedAlliances = _.chunk(alliances, 50);

        await Promise.map(chunkedAlliances, async (chunkOfAlliances) => {

            const query = [
                `CREATE `,
                chunkOfAlliances
                    .map((alliance) => ` (:Alliance { name: '${alliance}'})`)
                    .join(', ')
            ].join('');
            // console.log(query)
            return session.run(query)
                .catch((err) => {
                    if (!(err.code === "Neo.ClientError.Schema.ConstraintValidationFailed")) {
                        throw err;
                    }
                }).then(() => {
                    console.log('finished insert')
                })
        }, {
            concurrency: 3
        })

    }

    GenerateKiyapClusters(limit) {

        let clusters = [];
        for (let i = 0; i < limit; i++) {

            const art = faker.helpers.randomize(arts);
            const alliance = art + " Alliance";

            const instructorname = faker.name.lastName() + ", " + faker.name.lastName();
            const schoolname = instructorname + "'s school of " + art;
            const belt = faker.helpers.randomize(belts);
            const fullname = faker.name.lastName() + ", " + faker.name.lastName();

            var nextCluster = { art, alliance, instructorname, schoolname, belt, fullname };
            clusters.push(nextCluster);
        }

        return clusters;

    }

    async ConnectClusters() {
        let clusterCount = arts.length * belts.length;
        console.log(`Creating ${clusterCount} Clusters...`);
        const chunkSize = 10;
        const clusters = this.GenerateKiyapClusters(clusterCount);
        const session = await this.driver.session();

        const chunked = _.chunk(clusters, chunkSize);
        console.log('chunked: ', chunked.length, 'total: ', clusters.length);

        await Promise.map(chunked, async (chunkOfClusters) => {
            console.log('cluster size: ', chunkOfClusters.length)
            return session
                .run([chunkOfClusters.map((cluster) => {
                    // console.log('inner cluster: ', cluster);
                    const { fullname, instructorname, belt, schoolname } = cluster;

                    const query = `merge (p:Student {name:"${fullname}", belt: "${belt}"}) \
                    merge (i:Instructor {name:"${instructorname}"}) \
                    merge (s:School {name: "${schoolname}"}) \
                    merge (i)-[:Instructs]->(p) \
                    merge (i)-[:Teaches_At]->(s) \
                    merge (p)-[:Attends]->(s)
                    //merge (s)-[:Member_Of]->(a) \
                    `
                    // console.log('query: ', query);
                    return query;
                })

                ].join(';'))
                .then(result => {
                    session.close();
                })
                .catch(error => {
                    session.close();
                    throw error;
                });
        }, {
            concurrency: 3
        })

        console.log(`Created ${clusterCount} Kiyap clusters.`)
    }

    async run() {

        console.log('Seeding Kiyap...')
        await this.DropNodes();
        await this.CreateAlliances();
        await this.ConnectClusters();
        console.log('DONE Seeding Kiyap...')
    }

    async DropNodes() {
        const session = this.driver.session();
        session.run("match (r) detach delete (r)");
        session.close();
    }
}

var generator = new Seeder(config);

// Create a load of new nodes:
generator.run()
// (async () => generator.run())();