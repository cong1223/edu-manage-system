import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reports)
  user: User;

  @Column()
  title: string;

  @Column('text',{ nullable: false })
  thisContent: string;

  @Column('text',{ nullable: false })
  nextContent: string;

  @Column()
  tag: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
