import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
} from 'typeorm';
import { Product } from './product';

export interface IImage {
	url: string;
	alt?: string;
}

@Entity()
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	url!: string;

	@Column({ nullable: true })
	alt!: string;

	@ManyToOne(() => Product, product => product.images)
	product!: Product;
}
