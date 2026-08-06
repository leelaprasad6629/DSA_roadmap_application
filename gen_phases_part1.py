import json

phases = [
    {
        "id": 0, "name": "Programming & Logic Building", "description": "Master fundamental programming concepts and logic building",
        "prerequisites": [], "estimatedDuration": 10, "order": 0,
        "learningObjectives": ["Understand variables, data types, and operators", "Master control flow with conditionals and loops", "Learn functions and Java Fast I/O", "Develop logical thinking through pattern problems"],
        "topics": [
            {"id":"p0-t1","name":"Variables, Data Types & Operators","difficulty":"Beginner","estimatedHours":2,"subtopics":["Primitive types","Type casting","Arithmetic operators","Relational operators","Logical operators"],"theory":"Variables are named storage locations in memory. Each variable has a type that determines what kind of data it can hold. Understanding type systems helps you choose the right data type for efficiency and correctness. Operators let you perform computations and comparisons on these variables, forming the basis of all program logic.","commonMistakes":["Integer overflow with large values","Using float for precise calculations","Confusing assignment = with equality =="],"bestPractices":["Use meaningful variable names","Choose the smallest sufficient type","Initialize variables before use"],"revisionChecklist":["Review all primitive types","Practice type conversion problems","Memorize operator precedence"]},
            {"id":"p0-t2","name":"Conditionals & Control Flow","difficulty":"Beginner","estimatedHours":2,"subtopics":["if-else","switch-case","Nested conditionals","Ternary operator","Short-circuit evaluation"],"theory":"Control flow determines which instructions execute based on conditions. If-else and switch statements let your program make decisions. Understanding short-circuit evaluation and nested conditionals is essential for writing efficient, readable code.","commonMistakes":["Deep nesting reducing readability","Missing break in switch","Using = instead of == in conditions"],"bestPractices":["Prefer early returns","Use switch for multiple discrete values","Avoid more than 3 levels of nesting"],"revisionChecklist":["Practice nested if-else problems","Review switch fall-through behavior","Master ternary operator"]},
            {"id":"p0-t3","name":"Loops & Iteration","difficulty":"Beginner","estimatedHours":3,"subtopics":["for loops","while loops","do-while","break and continue","Nested loops"],"theory":"Loops repeat a block of code until a condition is met. For loops are used when the count is known, while loops when it's not. Understanding loop termination, break, continue, and nested loops is fundamental to solving algorithmic problems efficiently.","commonMistakes":["Off-by-one errors","Infinite loops from wrong condition","Modifying loop variable inside body"],"bestPractices":["Use for loops when count is known","Always ensure loop termination","Prefer enhanced for-each when possible"],"revisionChecklist":["Solve pattern printing problems","Practice nested loop problems","Review break vs continue"]},
            {"id":"p0-t4","name":"Functions & Recursion Basics","difficulty":"Beginner","estimatedHours":2,"subtopics":["Function definition","Parameters and return values","Pass by value vs reference","Function overloading","Scope and lifetime"],"theory":"Functions encapsulate reusable code. Understanding parameters, return types, scope, and how arguments are passed (by value or reference) is critical for structuring programs well. This phase also introduces the concept of recursion at a basic level.","commonMistakes":["Not returning a value","Modifying parameters unexpectedly","Confusing local and global scope"],"bestPractices":["Keep functions small and focused","Use descriptive function names","Avoid side effects in pure functions"],"revisionChecklist":["Practice function decomposition","Review pass by value vs reference","Write recursive sum and factorial"]},
        ]
    },
]

# Generate TypeScript output
output = "import type { Phase } from '@/types';\n\nexport const phases: Phase[] = [\n"

for p in phases:
    output += "  {\n"
    output += f"    id: {p['id']}, name: \"{p['name']}\", description: \"{p['description']}\",\n"
    output += f"    prerequisites: {json.dumps(p['prerequisites'])}, learningObjectives: {json.dumps(p['learningObjectives'])},\n"
    output += f"    estimatedDuration: {p['estimatedDuration']}, order: {p['order']},\n"
    output += "    topics: [\n"
    for t in p['topics']:
        output += "      {\n"
        output += f"        id: \"{t['id']}\", name: \"{t['name']}\", difficulty: \"{t['difficulty']}\", estimatedHours: {t['estimatedHours']},\n"
        output += f"        subtopics: {json.dumps(t['subtopics'])},\n"
        theory = t['theory'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
        output += f"        theory: \"{theory}\",\n"
        output += f"        commonMistakes: {json.dumps(t['commonMistakes'])},\n"
        output += f"        bestPractices: {json.dumps(t['bestPractices'])},\n"
        output += f"        revisionChecklist: {json.dumps(t['revisionChecklist'])},\n"
        output += "      },\n"
    output += "    ],\n"
    output += "  },\n"

output += "];\n"

with open("src/data/phases.ts", "w") as f:
    f.write(output)

print(f"Phases file written with {len(phases)} phases")
