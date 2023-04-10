import type { MemberFilter, MemberFilterParam } from '../interface/member-filter';
import { stringify } from 'query-string';

export const loadProjectMember = async (param: MemberFilter, token: string): Promise<Response> => {
	const newParam: MemberFilterParam = {
		project: param.project?.projectId,
		user: param.user?.userId
	};
	if (!newParam.project) {
		delete newParam['project'];
	}
	if (!newParam.user) {
		delete newParam['user'];
	}
	return fetch(`api/project-member/list?${stringify(newParam)}`, {
		method: 'GET',
		headers: new Headers({ Authorization: `Bearer ${token}` })
	});
};
