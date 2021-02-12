import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
