import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Outcome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text',{ nullable: true })
  desc: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
