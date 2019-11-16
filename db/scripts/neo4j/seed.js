const faker = require('faker');
const neo4j = require('neo4j-driver');

const belts = [
    'Black',
    'Blue',
    'Green',
    'Yellow',
    'Blue',
    'Blue',
    'Purple'
]

const arts = [
    'Taekwondo',
    'Brazilian Jiu-Jitsu',
    'Kickboxing',
    'Karate',
    'Jeet Kun Do',
    'Kung Fu',
    'Tai Chi',
    'Fencing',
    'Krav Maga',
    'Muay Thai',
    'Arnis',
    'Aikido',
    'Mixed Martial Arts',
    'Boxing',
    'Capoeira',
    'Wrestling',
    'Jojutso',
    'Judo',
    'Kendo',
    'Ninjutsu',
    'Sambo',
    'Sumo',
    'Wing Chun',
]

var Seeder = class {
    constructor() {
        this.uri = "bolt://localhost";
        this.user = "neo4j";
        this.password = 'root';
        this.neo4j = require('neo4j-driver').v1;
        this.driver = this.neo4j.driver(this.uri, this.neo4j.auth.basic(this.user, this.password));
    }
    async run() {
        //run neo4j query over random data:
        // console.log('running generation...')

        const session = this.driver.session();
        const art = faker.helpers.randomize(arts);
        const instructorname = faker.name.lastName() + ", " + faker.name.lastName();
        const schoolname = instructorname + "'s school of " + art;
        const belt = faker.helpers.randomize(belts);
        const fullname = faker.name.lastName() + ", " + faker.name.lastName();

        return session
            .run(
                "merge (p:Student {name:{fullname}, belt: {belt}}) \
                merge (i:Instructor {name:{instructorname}}) \
                merge (s:School {name: {schoolname}}) \
                merge (d:Discipline {name: {art}}) \
                merge (i)-[:Instructs]->(p) \
                merge (i)-[:Teaches_At]->(s) \
                merge (s)-[:Has]->(d) \
                ",
                {
                    fullname,
                    belt,
                    art,
                    instructorname,
                    schoolname,
                })
            .then(result => {
                session.close();
                // console.log(result)
            })
            .catch(error => {
                session.close();
                throw error;
            });
    }
}

var generator = new Seeder();

// Create a load of new nodes:
let clusterCount = arts.length * belts.length;
for (i = 0; i <= clusterCount; i++) {
    generator.run();
}

console.log(`Created ${clusterCount} clusters of related nodes.`)