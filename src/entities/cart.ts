import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cartItem';

@Entity()
export class Cart extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToMany(() => CartItem, cartItem => cartItem.cart)
	items!: CartItem[];
}
