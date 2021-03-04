import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

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
}
