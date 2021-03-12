import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart';
import { Product } from './product';

export interface ICartItemDoc {
	quantity: number;
}

@Entity()
export class CartItem extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	quantity!: number;

	@ManyToOne(() => Product, product => product.cartItems, {
		onDelete: 'CASCADE',
	})
	product!: Product;

	@ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
	cart!: Cart;
}
