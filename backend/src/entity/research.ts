import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Research {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  component: string;

  @Column()
  // 用途
  purpose: string;

  @Column()
  // 位置
  location: string;

  @Column()
  // 保管人
  keeper: string;

  @Column('text',{ nullable: true })
  img?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
