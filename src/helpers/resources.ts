export interface IStep {
    title: string;
    description: string;
    image: string | null;
}

export const howTo: {
    classes: {
        addClass: IStep[];
        // editClass: IStep[];
    };
} = {
    classes: {
        addClass: [
            {
                title: "Step 1",
                description: 'Click on the "Add Class" button',
                image: null,
            },
            {
                title: "Step 2",
                description: "Fill out the form",
                image: null,
            },
            {
                title: "Step 3",
                description: "Click on next to add students",
                image: null,
            },
            {
                title: "Step 4",
                description: "Fill out the student form",
                image: null,
            },
            {
                title: "Step 5",
                description: 'Click on "Add Class" to create the class',
                image: null,
            },
        ],
    },
};
