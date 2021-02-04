import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IVariant {
	name: string;
}

@Entity()
export class Variant extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;
}
