// Seed
merge (p:Student {name: "Bobby", belt: "Green Belt"})
merge (i:Instructor {name: "Jenny", belt:"5th Degree Blackbelt"})
merge (s:School {name: "Trump Krav Maga"})
merge (a:Alliance {name: "Krav Maga Alliance"})
merge (i)-[:Instructs]->(p)
merge (i)-[:Teaches_At]->(s)
merge (s)-[:Has]->(d)
merge (s)-[:Member_Of]->(a)

// // Seed 2
// merge (p:Student {name: "Jack", belt: "Red Belt"})
// merge (i:Instructor {name: "Tony", belt:"1st Degree Blackbelt"})
// merge (s:School {name: "Key West Muay Thai"})
// merge (a:Alliance {name: "Muay Thai Alliance", teaches: ["Boxing", "Muay Thai"]})
// merge (i)-[:Instructs]->(p)
// merge (i)-[:Teaches_At]->(s)
// merge (s)-[:Member_Of]->(a)


// // Seed 3
// merge (p:Student {name: "Stacy", belt: "Orange Belt"})
// merge (i:Instructor {name: "Mark", belt:"2nd Degree Blackbelt"})
// merge (s:School {name: "Trump Krav Maga"})
// merge (a:Alliance {name: "Krav Maga Alliance", teaches: ["Krav Maga", "Muay Thai"]})
// merge (i)-[:Instructs]->(p)
// merge (i)-[:Teaches_At]->(s)
// merge (s)-[:Member_Of]->(a)