export class Version {

    id: number;
    title: string;
    description: string;
    dueDate = new Date();
    constructor(values: any = {}) {
        Object.assign(this, values);
    }

}