import { Parents } from './parents.model';
import { Kids } from './kids.model';

export class Family {
    id: number;
    parents: Parents[];
    kids: Kids[];
}