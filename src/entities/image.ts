import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
} from 'typeorm';
import { Product } from './product';

export interface IImageCreate {
	alt?: string;
}

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

	@ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
	product!: Product;
}
