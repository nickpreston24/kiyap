// Seed
merge (p:Student {name: "Bobby", belt: "Green Belt"})
merge (i:Instructor {name: "Jenny", belt:"5th Degree Blackbelt"})
merge (s:School {name: "Trump Krav Maga"})
merge (d:Discipline {name: "Krav Maga"})
merge (i)-[:Instructs]->(p)
merge (i)-[:Teaches_At]->(s)
merge (s)-[:Has]->(d)