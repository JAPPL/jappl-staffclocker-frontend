import type { Project } from './project';
import type { User } from './user';

export interface ProjectMember {
	projectMemberId: number;
	user: User;
	project: Project;
	isPm: boolean;
}
