export class Book {

    public id: string;

    public title: string;

    public author: string;

    public publisher: string;

    public publishYear: Date;

    public categoryId: string;

    public categoryName: string;

    public totalCopies: number;

    public description: string;

    public imageUrl: string;


    constructor(data?: Partial<Book>) {
        this.id = data?.id || '';
        this.title = data?.title || '';
        this.author = data?.author || '';
        this.publisher = data?.publisher || '';
        this.publishYear = data?.publishYear || new Date();
        this.categoryId = data?.categoryId || '';
        this.categoryName = data?.categoryName || '';
        this.totalCopies = data?.totalCopies || 0;
        this.description = data?.description || '';
        this.imageUrl = data?.imageUrl ? `http://localhost:8200${data.imageUrl}` : '';
    }

}
