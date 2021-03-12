import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Category } from './category';
import { Variant } from './variant';
import { Image } from './image';
import { CartItem } from './cartItem';

export interface IProduct {
	name: string;
	description: string;
	slug?: string;
	sku?: string;
	barcode?: string;
	price: number;
}

@Entity()
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

	@Column({ type: 'float' })
	price!: number;

	@ManyToOne(() => CartItem, cartItem => cartItem.product)
	cartItems!: CartItem[];

	@OneToMany(() => Image, image => image.product, { onDelete: 'CASCADE' })
	images!: Image[];

	@OneToMany(() => Variant, variant => variant.product, { onDelete: 'CASCADE' })
	variants!: Variant[];

	@ManyToMany(() => Category, category => category.products, {
		onDelete: 'CASCADE',
	})
	@JoinTable()
	categories!: Category[];

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
