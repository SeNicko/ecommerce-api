import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';
import { Option } from './option';

export interface IVariant {
	name: string;
}

@Entity()
export class Variant extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@OneToMany(() => Option, option => option.variant, { onDelete: 'CASCADE' })
	options!: Option[];

	@ManyToOne(() => Product, product => product.variants, {
		onDelete: 'CASCADE',
	})
	product!: Product;

	@CreateDateColumn()
	createdAt!: Date;
}
