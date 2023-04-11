import type { Project } from './project';
import type { User } from './user';

export interface TimeLog {
	id: number;
	timestamp: string;
	message: string;
	projectId: Project;
	userId: User;
	hourSpent: number;
	approved: boolean;
	paid: boolean;
}
