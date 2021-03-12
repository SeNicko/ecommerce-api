import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart';

export interface IUserRegister {
	email: string;
	password: string;
}

// Changed name of table because of postgres (tablename user is restricted)
@Entity({ name: 'users' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToOne(() => Cart, { onDelete: 'SET NULL' })
	@JoinColumn()
	cart!: Cart;
}
