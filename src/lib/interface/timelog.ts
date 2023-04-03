export interface TimeLog {
	id: number;
	timestamp: string;
	message: string;
	projectId: {
		projectId: number;
		projectName: string;
	};
	hourSpent: number;
	approved: boolean;
	paid: boolean;
}
