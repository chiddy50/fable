const questions = [
    {
        index: 1,
        title: "Let's Focus On The Character",
        slug: stringToSlug("Let's Focus On The Character"),
        questions: [
            {
                index: 1,
                name: "Who is the character?",
                slug: stringToSlug("Who is the character?"),
                answer: "",
            },
            {
                index: 2,
                name: "What do they want & Who has what they want?",
                slug: stringToSlug("What do they want & Who has what they want?"),
                answer: "",
            },
            // {
            //     index: 3,
            //     name: "Who has what they want?",
            //     slug: stringToSlug("Who has what they want?"),
            //     answer: "",
            // },
            {
                index: 4,
                name: "Who happens if they don't get it?",
                slug: stringToSlug("Who happens if they don't get it?"),
                answer: "",
            },
        ]
    },
    {
        index: 2,
        title: "Let's simplify the character",
        slug: stringToSlug("Let's simplify the character"),
        questions: [
            {
                index: 1,
                name: "What obstacles or challenges does the character face in achieving their goal?",
                slug: stringToSlug("What obstacles or challenges does the character face in achieving their goal?"),
                answer: "",
            },
            // {
            //     index: 2,
            //     name: "What are the character's strengths and weaknesses?",
            //     slug: stringToSlug("What are the character's strengths and weaknesses?"),
            //     answer: "",
            // },
            {
                index: 3,
                name: "What motivates or drives the character to pursue their goal?",
                slug: stringToSlug("What motivates or drives the character to pursue their goal?"),
                answer: "",
            },
            {
                index: 4,                
                name: "What conflicts or relationships shape the character's journey?",
                slug: stringToSlug("What conflicts or relationships shape the character's journey?"),
                answer: "",
            },
        ]
    },
    {
        index: 3,
        title: "Exploring Character Motivations: Uncovering Triggers and Driving Forces",
        slug: stringToSlug("Exploring Character Motivations: Uncovering Triggers and Driving Forces"),
        questions: [
            {
                index: 1,
                name: "What events or circumstances trigger strong emotions in the character?",
                slug: stringToSlug("What events or circumstances trigger strong emotions in the character?"),
                answer: "",
            },
            {
                index: 2,
                name: "Are there specific past experiences that influence the character's actions or decisions?",
                slug: stringToSlug("Are there specific past experiences that influence the character's actions or decisions?"),
                answer: "",
            },
            // {
            //     index: 3,
            //     name: "What external factors or pressures push the character to take action?",
            //     slug: stringToSlug("What external factors or pressures push the character to take action?"),
            //     answer: "",
            // },
            {
                index: 4,
                name: "How does the character respond when faced with adversity or conflict?",
                slug: stringToSlug("How does the character respond when faced with adversity or conflict?"),
                answer: "",
            },
        ]
    },
    {
        index: 4,
        title: "Exploring the Character's Problem-Solving Journey",
        slug: stringToSlug("Exploring the Character's Problem-Solving Journey"),
        questions: [
            {
                index: 1,
                name: "What strategies or tactics does the character employ when faced with challenges or obstacles?",
                slug: stringToSlug("What strategies or tactics does the character employ when faced with challenges or obstacles?"),
                answer: "",
            },
            {
                index: 2,
                name: "Are there any underlying factors or events that contribute to the problem the character is trying to solve?",
                slug: stringToSlug("Are there any underlying factors or events that contribute to the problem the character is trying to solve?"),
                answer: "",
            },
            {
                index: 3,
                name: "How does the character prioritize or approach problem-solving amidst competing goals or conflicts?",
                slug: stringToSlug("How does the character prioritize or approach problem-solving amidst competing goals or conflicts?"),
                answer: "",
            }
        ]
    },
    {
        index: 5,
        title: "Unveiling the Solution: Tracing the Character's Path to Resolution",
        slug: stringToSlug("Unveiling the Solution: Tracing the Character's Path to Resolution"),
        questions: [
            {
                index: 1,
                name: "What inspired or led the character to discover their chosen solution?",
                slug: stringToSlug("What inspired or led the character to discover their chosen solution?"),
                answer: "",
            },
            {
                index: 2,
                name: "How does the character adapt or refine their solution as they encounter new challenges or information?",
                slug: stringToSlug("How does the character adapt or refine their solution as they encounter new challenges or information?"),
                answer: "",
            },
            {
                index: 3,
                name: "What sacrifices or risks does the character face in implementing their solution, and how do they navigate these obstacles?",
                slug: stringToSlug("What sacrifices or risks does the character face in implementing their solution, and how do they navigate these obstacles?"),
                answer: "",
            }
        ]
    },
    {
        index: 6,
        title: "Counting the Costs: Delving into the Sacrifices for the Solution",
        slug: stringToSlug("Counting the Costs: Delving into the Sacrifices for the Solution"),
        questions: [
            {
                index: 1,
                name: "What personal sacrifices did the character make along their journey to finding the solution?",
                slug: stringToSlug("What personal sacrifices did the character make along their journey to finding the solution?"),
                answer: "",
            },
            // {
            //     index: 2,
            //     name: "How did the character navigate moral dilemmas or ethical challenges while pursuing their solution?",
            //     slug: stringToSlug("How did the character navigate moral dilemmas or ethical challenges while pursuing their solution?"),
            //     answer: "",
            // },
            {
                index: 3,
                name: "Were there any significant losses or setbacks the character experienced as a result of seeking their solution?",
                slug: stringToSlug("Were there any significant losses or setbacks the character experienced as a result of seeking their solution?"),
                answer: "",
            },
            {
                index: 4,
                name: "In what ways did the character's relationships or connections change or evolve due to the sacrifices made for their solution?",
                slug: stringToSlug("In what ways did the character's relationships or connections change or evolve due to the sacrifices made for their solution?"),
                answer: "",
            }
        ]
    },
    {
        index: 7,
        title: "Resuming the Journey: Exploring the Character's Return to Action",
        slug: stringToSlug("Resuming the Journey: Exploring the Character's Return to Action"),
        questions: [
            {
                index: 1,
                name: "What newfound confidence or resolve does the character bring back with them after facing the challenges?",
                slug: stringToSlug("What newfound confidence or resolve does the character bring back with them after facing the challenges?"),
                answer: "",
            },
            {
                index: 2,
                name: "How do other characters or the environment react to the character's return, and how does this impact their next steps?",
                slug: stringToSlug("How do other characters or the environment react to the character's return, and how does this impact their next steps?"),
                answer: "",
            },
            {
                index: 3,
                name: "What lessons or insights did the character gain during their absence, and how do they apply these to their actions upon returning?",
                slug: stringToSlug("What lessons or insights did the character gain during their absence, and how do they apply these to their actions upon returning?"),
                answer: "",
            },
            // {
            //     index: 4,
            //     name: "Are there any lingering consequences or unresolved issues from the character's departure that affect their reentry into the story?",
            //     slug: stringToSlug("Are there any lingering consequences or unresolved issues from the character's departure that affect their reentry into the story?"),
            //     answer: "",
            // }
        ]
    },
    {
        index: 8,
        title: "Transformation Unveiled: Exploring the Character's Evolution and Resolutions",
        slug: stringToSlug("Transformation Unveiled: Exploring the Character's Evolution and Resolutions"),
        questions: [
            {
                index: 1,
                name: "How has the character's perspective or worldview evolved as a result of their journey and experiences?",
                slug: stringToSlug("How has the character's perspective or worldview evolved as a result of their journey and experiences?"),
                answer: "",
            },
            {
                index: 2,
                name: "In what ways have the character's goals or priorities shifted or been redefined throughout their journey?",
                slug: stringToSlug("In what ways have the character's goals or priorities shifted or been redefined throughout their journey?"),
                answer: "",
            },
            // {
            //     index: 3,
            //     name: "What internal conflicts or dilemmas has the character resolved, and how has this impacted their decisions and actions?",
            //     slug: stringToSlug("What internal conflicts or dilemmas has the character resolved, and how has this impacted their decisions and actions?"),
            //     answer: "",
            // },
            {
                index: 4,
                name: "Are there any newfound strengths or weaknesses the character has discovered about themselves as a result of their journey?",
                slug: stringToSlug("Are there any newfound strengths or weaknesses the character has discovered about themselves as a result of their journey?"),
                answer: "",
            }
        ]
    }
];

function stringToSlug(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');
}

export {
    questions,
    stringToSlug
}