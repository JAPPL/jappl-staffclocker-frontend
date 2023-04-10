import { it, expect, describe } from 'vitest';
import { loadProjectMember } from './project-member-service';
import type { Project } from '../interface/project';
import type { User } from '../interface/user';
import type { MemberFilter } from '../interface/member-filter';

global.fetch = vi.fn();

const project: Project = {
	projectId: 1,
	projectName: 'test'
};

const user: User = {
	userId: 1,
	firstName: 'Test',
	lastName: 'User',
	email: 'test@gmail.com'
};

describe('Project Member Service', () => {
	it('should fetch with no query param', async () => {
		const filter: MemberFilter = {
			project: undefined,
			user: undefined
		};
		await loadProjectMember(filter, 'token');
		expect(fetch).toHaveBeenCalledWith('api/project-member/list?', {
			method: 'GET',
			headers: new Headers({ Authorization: 'Bearer token' })
		});
	});

	it('should fetch with project query param', async () => {
		const filter: MemberFilter = {
			project: project,
			user: undefined
		};
		await loadProjectMember(filter, 'token');
		expect(fetch).toHaveBeenCalledWith(`api/project-member/list?project=${project.projectId}`, {
			method: 'GET',
			headers: new Headers({ Authorization: 'Bearer token' })
		});
	});

	it('should fetch with user query param', async () => {
		const filter: MemberFilter = {
			project: undefined,
			user: user
		};
		await loadProjectMember(filter, 'token');
		expect(fetch).toHaveBeenCalledWith(`api/project-member/list?user=${user.userId}`, {
			method: 'GET',
			headers: new Headers({ Authorization: 'Bearer token' })
		});
	});
});
