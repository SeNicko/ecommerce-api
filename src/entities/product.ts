import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Variant } from './variant';

export interface IProduct {
	name: string;
	description: string;
	slug?: string;
	sku?: string;
	barcode?: string;
	price: number;
}

@Entity({ name: 'products' })
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	description!: string;

	@Column({ unique: true })
	slug!: string;

	@Column({ unique: true, nullable: true })
	sku!: string;

	@Column({ unique: true, nullable: true })
	barcode!: string;

	@Column()
	price!: number;

	@ManyToOne(() => Variant)
	variants!: Variant[];

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
