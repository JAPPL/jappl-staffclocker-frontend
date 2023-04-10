import type { Project } from './project';
import type { User } from './user';

export interface MemberFilter {
	project: Project | undefined;
	user: User | undefined;
}

export interface MemberFilterParam {
	project?: number;
	user?: number;
}
