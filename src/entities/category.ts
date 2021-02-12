import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';

export interface ICategory {
	slug?: string;
	name: string;
}

@Entity()
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column({ unique: true })
	slug!: string;

	@ManyToMany(() => Product, product => product.categories, {
		onDelete: 'CASCADE',
	})
	products!: Product[];
}
