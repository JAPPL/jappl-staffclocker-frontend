export interface TimeLog {
	id: number;
	timestamp: string;
	message: string;
	projectId: {
		projectId: number;
		projectName: string;
	};
	userId: {
		userId: number;
		firstName: string;
		lastName: string;
	};
	hourSpent: number;
	approved: boolean;
	paid: boolean;
}
