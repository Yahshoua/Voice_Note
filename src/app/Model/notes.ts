export class Notes {
    public content;
    public createdAt;
    public modifiedAt;
    public type;
    public tag: string[];
    public folder;
    public description;
    constructor(public id: number, public author='You') {
         this.content = '';
         this.createdAt=  new Date();
         this.type = '';
         this.folder = '';
         this.description = '';
    }
}